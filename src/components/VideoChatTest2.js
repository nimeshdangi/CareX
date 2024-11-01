import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import 'webrtc-adapter';

const App = ({ appointmentId, token, userRole }) => {
  const myVideo = useRef(null);
  const remoteVideo = useRef(null);
  const iceCandidateQueue = useRef([]);
  const myPeerConnection = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeSocketAndJoinRoom = () => {
      socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL);

      socketRef.current.on('connect', () => {
        console.log(`Connected to socket server with ID ${socketRef.current.id}`);
        socketRef.current.emit('joinAppointment', { token, appointmentId, userRole });
        initializeMedia();
      });
    };

    const initializeMedia = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream;
          createPeerConnection(stream);
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
        });
    };

    const createPeerConnection = (localStream) => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          // Additional TURN servers here...
        ]
      });

      myPeerConnection.current = peerConnection;

      // Add local stream tracks to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.ontrack = (event) => {
        console.log('ontrack event received:', event);
        const [remoteStream] = event.streams;
        if (remoteStream) {
          remoteVideo.current.srcObject = remoteStream;
          console.log("Remote video stream set successfully");
        } else {
          console.error('No tracks found in remote stream');
        }
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Sending ICE candidate:', event.candidate);
          socketRef.current.emit('ice-candidate', { candidate: event.candidate, roomId: `appointment_${appointmentId}` });
        }
      };

      peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE connection state changed to:', peerConnection.iceConnectionState);
      };

      setupSocketListeners();
    };

    const setupSocketListeners = () => {
      socketRef.current.on('offer', async (offer) => {
        console.log('Received offer:', offer);
        await myPeerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await myPeerConnection.current.createAnswer();
        await myPeerConnection.current.setLocalDescription(answer);
        socketRef.current.emit('answer', { answer, roomId: `appointment_${appointmentId}` });

        // Process queued ICE candidates
        processQueuedIceCandidates();
      });

      socketRef.current.on('answer', async (answer) => {
        console.log('Received answer:', answer);
        await myPeerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        processQueuedIceCandidates();
      });

      socketRef.current.on('ice-candidate', async (candidate) => {
        if (myPeerConnection.current.remoteDescription) {
          await myPeerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('ICE candidate added');
        } else {
          console.log('Remote description not set yet, queueing ICE candidate.');
          iceCandidateQueue.current.push(candidate);
        }
      });

      socketRef.current.on('user-connected', () => {
        console.log('User connected, sending offer...');
        createOffer();
      });
    };

    const createOffer = async () => {
      const offer = await myPeerConnection.current.createOffer();
      await myPeerConnection.current.setLocalDescription(offer);
      console.log('Offer created and set as local description:', offer);
      socketRef.current.emit('offer', { offer, roomId: `appointment_${appointmentId}` });
    };

    const processQueuedIceCandidates = () => {
      while (iceCandidateQueue.current.length > 0) {
        const candidate = iceCandidateQueue.current.shift();
        myPeerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(error => {
          console.error('Error adding queued ICE candidate:', error);
        });
      }
    };

    const cleanupConnections = () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (myPeerConnection.current) {
        myPeerConnection.current.close();
        myPeerConnection.current = null;
      }
    };

    initializeSocketAndJoinRoom();

    return () => {
      cleanupConnections();
    };
  }, [appointmentId, token]);

  return (
    <div>
      <h2>Video Call Application</h2>
      <div>
        <video ref={myVideo} autoPlay playsInline muted style={{ width: '45%' }}></video>
        <video ref={remoteVideo} autoPlay playsInline style={{ width: '45%' }}></video>
      </div>
    </div>
  );
};

export default App;