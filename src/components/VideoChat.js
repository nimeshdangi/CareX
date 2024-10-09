'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const VideoChat = ({ appointmentId, token }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const peerConnectionRef = useRef(null);  // Using a ref to store the peer connection
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // A flag to track if WebRTC connection is already set up
  const connectionStarted = useRef(false);

  useEffect(() => {
    // Set up socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    // Join appointment room with token
    newSocket.emit('joinAppointment', { token, appointmentId });

    // Socket handlers
    newSocket.on('joined', () => {
      if (!connectionStarted.current) {  // Only start WebRTC if it's not already started
        console.log('Connected to the appointment room');
        startWebRTCConnection(newSocket);
        connectionStarted.current = true;  // Mark connection as started
      }
    });

    newSocket.on('error', (data) => {
      console.error(data);
    });

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close(); // Close WebRTC connection on unmount
      }
      newSocket.disconnect();  // Disconnect socket on unmount
    };
  }, [appointmentId, token]);

  const startWebRTCConnection = (socket) => {
    // Setup peer connection
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ],
    };

    const peerConnection = new RTCPeerConnection(config);
    peerConnectionRef.current = peerConnection;  // Store in ref to use later

    // Get local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;  // Set local video stream
      }

      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });

    // Handle incoming offer
    socket.on('offer', (offer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        return peerConnection.createAnswer();
      }).then((answer) => {
        return peerConnection.setLocalDescription(answer);
      }).then(() => {
        socket.emit('answer', peerConnection.localDescription);
      });

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];  // Set remote video stream
        }
      };
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('iceCandidate', event.candidate);
      }
    };
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoChat;
