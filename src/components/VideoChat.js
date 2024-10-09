'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const VideoChat = ({ appointmentId, token }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCaller, setIsCaller] = useState(false);  // Determine if this peer is the caller
  const peerConnectionRef = useRef(null);  // Store the peer connection in a ref
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const connectionStarted = useRef(false);  // Ensure the connection is started only once

  useEffect(() => {
    // Set up socket connection
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

    // Join the appointment room with token
    socket.emit('joinAppointment', { token, appointmentId });

    socket.on('joined', () => {
      if (!connectionStarted.current) {
        console.log('Connected to the appointment room');
        setIsCaller(true);  // Mark this peer as the caller
        startWebRTCConnection(socket, true);  // Start WebRTC connection as caller
        connectionStarted.current = true;
      }
    });

    socket.on('peerJoined', () => {
      console.log('A peer has joined the room');
      if (!connectionStarted.current) {
        console.log('This peer will act as the answerer');
        startWebRTCConnection(socket, false);  // Start WebRTC connection as answerer
        connectionStarted.current = true;
      }
    });

    socket.on('error', (data) => {
      console.error(data);
    });

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close(); // Close WebRTC connection on unmount
      }
      socket.disconnect();  // Disconnect socket on unmount
    };
  }, [appointmentId, token]);

  const startWebRTCConnection = (socket, isCaller) => {
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

    // If this peer is the caller, create and send an offer
    if (isCaller) {
      peerConnection.createOffer().then((offer) => {
        console.log('Sending offer:', offer);
        return peerConnection.setLocalDescription(offer);
      }).then(() => {
        socket.emit('offer', peerConnection.localDescription);
      }).catch((error) => {
        console.error('Error creating offer:', error);
      });
    }

    // Handle incoming offer
    socket.on('offer', (offer) => {
      console.log('Received offer:', offer);
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        return peerConnection.createAnswer();
      }).then((answer) => {
        console.log('Sending answer:', answer);
        return peerConnection.setLocalDescription(answer);
      }).then(() => {
        socket.emit('answer', peerConnection.localDescription);
      }).catch((error) => {
        console.error('Error handling offer/answer:', error);
      });
    });

    // Handle incoming answer
    socket.on('answer', (answer) => {
      console.log('Received answer:', answer);
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer)).catch((error) => {
        console.error('Error setting remote description:', error);
      });
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        socket.emit('iceCandidate', event.candidate);
      }
    };

    socket.on('iceCandidate', (candidate) => {
      console.log('Received ICE candidate:', candidate);
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding received ICE candidate:', error);
      });
    });

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      console.log('Received remote track:', event.streams[0]);
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
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
