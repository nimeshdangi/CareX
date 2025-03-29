'use client';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoChat = ({ appointmentId, token }) => {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const myVideo = useRef();
  const remoteVideo = useRef();
  const iceCandidateQueue = useRef([]);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const roomId = `appointment_${appointmentId}`;

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    socketRef.current = socket;

    // Ask user for permission to access their webcam and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setLocalStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      currentStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, currentStream);
      });

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('iceCandidate', roomId, event.candidate);
        }
      };

      socket.on('iceCandidate', (candidate) => {
        if (peerConnection.remoteDescription) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            .catch((error) => console.error('Error adding ICE candidate:', error));
        } else {
          iceCandidateQueue.current.push(candidate); // Queue the ICE candidate if remote description is not set
        }
      });

      socket.on('offer', (offer) => {
        if (peerConnection.signalingState === 'stable') {
          peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => {
              createAnswer(peerConnection);
              processQueuedIceCandidates(peerConnection); // Process any queued ICE candidates
            })
            .catch((error) => console.error('Error setting remote description:', error));
        }
      });

      socket.on('answer', (answer) => {
        if (peerConnection.signalingState === 'have-local-offer') {
          peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
            .then(() => {
              processQueuedIceCandidates(peerConnection); // Process any queued ICE candidates
            })
            .catch((error) => console.error('Error setting remote description:', error));
        }
      });

      socket.on('user-connected', () => {
        if (peerConnection.signalingState === 'stable') {
          createOffer(peerConnection);
        }
      });

      // Join the appointment room with token
      socket.emit('joinAppointment', { token, appointmentId });

      return () => {
        // Cleanup on component unmount
        socket.off('iceCandidate');
        socket.off('offer');
        socket.off('answer');
        socket.off('user-connected');
        if (peerConnection) {
          peerConnection.close();
        }
        socket.disconnect();
      };
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });

    const createOffer = (peerConnection) => {
      peerConnection.createOffer()
        .then((offer) => {
          return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          socketRef.current.emit('offer', roomId, peerConnection.localDescription);
        })
        .catch((error) => console.error('Error creating offer:', error));
    };

    const createAnswer = (peerConnection) => {
      peerConnection.createAnswer()
        .then((answer) => {
          return peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          socketRef.current.emit('answer', roomId, peerConnection.localDescription);
        })
        .catch((error) => console.error('Error creating answer:', error));
    };

    const processQueuedIceCandidates = (peerConnection) => {
      while (iceCandidateQueue.current.length > 0) {
        const candidate = iceCandidateQueue.current.shift();
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
          .catch((error) => console.error('Error adding ICE candidate:', error));
      }
    };
  }, [appointmentId, token]);

  return (
    <div>
      <h2>Video Call Application</h2>
      <div>
        <video ref={myVideo} autoPlay playsInline muted />
        <video ref={remoteVideo} autoPlay playsInline />
      </div>
    </div>
  );
};

export default VideoChat;