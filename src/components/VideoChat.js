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
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ],
    };

    const peerConnection = new RTCPeerConnection(config);
    peerConnectionRef.current = peerConnection;

    // Get local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });

    // Handle incoming offer
    socket.on('offer', (offer) => {
      console.log('Received offer:', offer);  // Log offer
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        return peerConnection.createAnswer();
      }).then((answer) => {
        console.log('Sending answer:', answer);  // Log answer
        return peerConnection.setLocalDescription(answer);
      }).then(() => {
        socket.emit('answer', peerConnection.localDescription);
      }).catch((error) => {
        console.error('Error handling offer/answer:', error);
      });

      peerConnection.ontrack = (event) => {
        console.log('Received remote track:', event.streams[0]);  // Log remote stream
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    });

    socket.on('answer', (answer) => {
      console.log('Received answer:', answer);  // Log answer
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer)).catch((error) => {
        console.error('Error setting remote description:', error);
      });
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);  // Log ICE candidate
        socket.emit('iceCandidate', event.candidate);
      }
    };

    socket.on('iceCandidate', (candidate) => {
      console.log('Received ICE candidate:', candidate);  // Log received ICE candidate
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding received ICE candidate:', error);
      });
    });
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoChat;
