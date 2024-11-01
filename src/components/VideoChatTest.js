"use client";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const VideoChat = ({ appointmentId, token, userRole }) => {
  const myVideo = useRef();
  const remoteVideo = useRef();
  const iceCandidateQueue = useRef([]);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const roomId = `appointment_${appointmentId}`;

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    socketRef.current = socket;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      myVideo.current.srcObject = currentStream;

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          // Include TURN servers as needed
        ]
      });
      peerConnectionRef.current = peerConnection;

      currentStream.getTracks().forEach((track) => {
        console.log('Adding track:', track);
        peerConnection.addTrack(track, currentStream);
      });

      peerConnection.ontrack = (event) => {
        console.log('ontrack event:', event);
        const [remoteStream] = event.streams;
        if (remoteStream && remoteStream.getVideoTracks().length > 0) {
          remoteVideo.current.srcObject = remoteStream;
        } else {
          console.log('No video track found in remote stream');
        }
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate:", event.candidate);
          socket.emit('iceCandidate', roomId, event.candidate);
        }
      };

      socket.on('iceCandidate', (candidate) => {
        console.log('Received ICE candidate:', candidate);
        if (peerConnection.remoteDescription) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            .catch((error) => console.error('Error adding ICE candidate:', error));
        } else {
          iceCandidateQueue.current.push(candidate);
        }
      });

      socket.on('offer', (offer) => {
        console.log('Received offer:', offer);
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => {
            createAnswer(peerConnection);
            processQueuedIceCandidates(peerConnection);
          })
          .catch(console.error);
      });

      socket.on('answer', (answer) => {
        console.log('Received answer:', answer);
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
          .then(() => processQueuedIceCandidates(peerConnection))
          .catch(console.error);
      });

      socket.on('user-connected', () => {
        console.log("User connected to room.");
        if (peerConnection.signalingState === 'stable') {
          createOffer(peerConnection);
        }
      });

      socket.emit('joinAppointment', { token, appointmentId });
    }).catch(console.error);

    const createOffer = (peerConnection) => {
      peerConnection.createOffer().then((offer) => {
        console.log('Sending offer:', offer);
        peerConnection.setLocalDescription(offer);
        socketRef.current.emit('offer', roomId, offer);
      }).catch(console.error);
    };

    const createAnswer = (peerConnection) => {
      peerConnection.createAnswer().then((answer) => {
        console.log('Sending answer:', answer);
        peerConnection.setLocalDescription(answer);
        socketRef.current.emit('answer', roomId, answer);
      }).catch(console.error);
    };

    const processQueuedIceCandidates = (peerConnection) => {
      while (iceCandidateQueue.current.length > 0) {
        const candidate = iceCandidateQueue.current.shift();
        console.log('Adding queued ICE candidate:', candidate);
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
      }
    };

    return () => {
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      socketRef.current.disconnect();
    };
  }, [appointmentId, token]);

  return (
    <div>
      <video ref={myVideo} autoPlay playsInline muted />
      <video ref={remoteVideo} autoPlay playsInline />
    </div>
  );
};

export default VideoChat;
