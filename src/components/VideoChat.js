'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoChat = ({ appointmentId, token }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    // Set up socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    // Join appointment room with token
    newSocket.emit('joinAppointment', { token, appointmentId });

    // Socket handlers
    newSocket.on('joined', () => {
      console.log('Connected to the appointment room');
      startWebRTCConnection(newSocket);
    });

    newSocket.on('error', (data) => {
      console.error(data);
    });

    return () => {
      if (peerConnection) {
        peerConnection.close(); // Close WebRTC connection on unmount
      }
      newSocket.disconnect();  // Disconnect socket on unmount
    };
  }, [appointmentId, token, peerConnection]);

  const startWebRTCConnection = (socket) => {
    // Setup peer connection
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ],
    };

    const newPeerConnection = new RTCPeerConnection(config);
    setPeerConnection(newPeerConnection);

    // Get local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      if (document.getElementById('localVideo')) {
        document.getElementById('localVideo').srcObject = stream;  // Set local video stream
      }

      stream.getTracks().forEach((track) => newPeerConnection.addTrack(track, stream));
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });

    // Handle incoming offer
    socket.on('offer', (offer) => {
      newPeerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        newPeerConnection.createAnswer().then((answer) => {
          newPeerConnection.setLocalDescription(answer);
          socket.emit('answer', answer);
        });
      }).catch((error) => {
        console.error('Error setting remote description or creating answer:', error);
      });

      newPeerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (document.getElementById('remoteVideo')) {
          document.getElementById('remoteVideo').srcObject = event.streams[0];  // Set remote video stream
        }
      };
    });

    // Handle ICE candidates
    newPeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('iceCandidate', event.candidate);
      }
    };
  };

  return (
    <div>
      <video id="localVideo" autoPlay muted playsInline />
      <video id="remoteVideo" autoPlay playsInline />
    </div>
  );
};

export default VideoChat;