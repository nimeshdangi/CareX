"use client"
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import 'webrtc-adapter';

const VolumeMute = () => {
  return (
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14"/>
    </svg>
  )
}

const VolumeUnmute = () => {
  return (
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12a4.984 4.984 0 0 1-1.43 3.5m2.794 2.864A8.972 8.972 0 0 0 21 12a8.972 8.972 0 0 0-2.636-6.364M12 6.135v11.73a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"/>
    </svg>
  )
}

const CameraDisable = () => {
  return (
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9V16M3 3L21 21M11.6598 15.9809C10.2795 15.8251 9.18287 14.7327 9.02069 13.3543M3 9V17C3 18.1046 3.89543 19 5 19H14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  )
}

const Camera = () => {
  return (
    <svg className='w-6 h-6 text-gray-800 dark:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 17V9C21 7.89543 20.1046 7 19 7H16.5C15.9477 7 15.5 6.55228 15.5 6C15.5 5.44772 15.0523 5 14.5 5H9.5C8.94772 5 8.5 5.44772 8.5 6C8.5 6.55228 8.05228 7 7.5 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17Z" stroke="#000000" strokeWidth="1.5"></path> <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" stroke="#000000" strokeWidth="1.5"></path> </g></svg>
  )
}

const App = ({ appointmentId, token, userRole }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const myVideo = useRef(null);
  const remoteVideo = useRef(null);
  const myPeerConnection = useRef(null);
  const socketRef = useRef(null);
  const roomId = 'appointment_' + appointmentId;
  const iceCandidateQueue = useRef([]); // Queue ICE candidates before setting remote description

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL);

    // Initialize PeerConnection
    const initializePeerConnection = () => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: [
              "stun:bn-turn2.xirsys.com",
              "turn:bn-turn2.xirsys.com:80?transport=udp",
              "turn:bn-turn2.xirsys.com:3478?transport=udp",
              "turn:bn-turn2.xirsys.com:80?transport=tcp",
              "turn:bn-turn2.xirsys.com:3478?transport=tcp",
              "turns:bn-turn2.xirsys.com:443?transport=tcp",
              "turns:bn-turn2.xirsys.com:5349?transport=tcp",
            ],
            username: 'Sazomc2jQNHULkg18A2-fC9pNaAlxaK0zSzM0cm4jrhJeVI8oPXmDcxXaKD1CO-AAAAAAGcID4ViYWJlbA==',
            credential: '87a7376c-872d-11ef-a4b5-0242ac140004'
          },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]
      });

      myPeerConnection.current = peerConnection;

      // Add event handlers for PeerConnection
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteStream) {
          remoteVideo.current.srcObject = remoteStream;
        }
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('ice-candidate', roomId, event.candidate);
        }
      };

      return peerConnection;
    };

    // Initialize local media and setup PeerConnection
    const setupLocalMediaAndConnection = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      myVideo.current.srcObject = stream;

      const peerConnection = initializePeerConnection();
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

      return peerConnection;
    };

    // Set up socket event listeners for WebRTC signaling
    socketRef.current.on('connect', async () => {
      console.log(`Connected to socket server with ID ${socketRef.current.id}`);
      const peerConnection = await setupLocalMediaAndConnection();

      socketRef.current.emit('joinAppointment', roomId, token);

      socketRef.current.on('user-connected', async () => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socketRef.current.emit('offer', roomId, offer);
      });

      socketRef.current.on('offer', async (offer) => {
        if (peerConnection.signalingState === 'stable' || peerConnection.signalingState === 'have-remote-offer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socketRef.current.emit('answer', roomId, answer);

          // Add queued ICE candidates now that remote description is set
          iceCandidateQueue.current.forEach((candidate) => {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          });
          iceCandidateQueue.current = [];
        }
      });

      socketRef.current.on('answer', async (answer) => {
        if (peerConnection.signalingState === 'have-local-offer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      // Queue ICE candidates if remote description isn't set
      socketRef.current.on('ice-candidate', (candidate) => {
        if (peerConnection.remoteDescription) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          iceCandidateQueue.current.push(candidate);
        }
      });

      socketRef.current.on('updateData', (data) => {
        console.log("Data received:", data);
        if (data.symptoms) {
          setSymptoms(data.symptoms);
        }
        if (data.diagnosis) {
          setDiagnosis(data.diagnosis);
        }
        if (data.prescription) {
          setPrescription(data.prescription);
        }
      });
    });

    const getAppointmentDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/${appointmentId}`);
        const data = await response.json();
        if (data.data) {
          setSymptoms(data.data.symptoms);
          setDiagnosis(data.data.diagnosis);
          setPrescription(data.data.prescription);
        }
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    }

    getAppointmentDetails();

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
      if (myPeerConnection.current) {
        myPeerConnection.current.close();
      }
    };
  }, []);

  const toggleMute = () => {
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if(localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
        }
    }
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
    socketRef.current.emit('updateData', { appointmentId, symptoms: e.target.value });
  };

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
    socketRef.current.emit('updateData', { appointmentId, diagnosis: e.target.value });
  };

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
    socketRef.current.emit('updateData', { appointmentId, prescription: e.target.value });
  };

//   return (
//     <div>
//       <h2>Video Call Application</h2>
//       <div>
//         <video ref={myVideo} autoPlay playsInline muted style={{ width: '45%' }}></video>
//         <video ref={remoteVideo} autoPlay playsInline style={{ width: '45%' }}></video>
//       </div>
//     </div>
//   );

  return (
    <>
      <h2 className='text-center text-3xl my-4'>CareX Video Consultation</h2>
      <Link href="/appointment" className='flex w-96 justify-center mx-auto py-2 px-5 bg-blue-500 rounded-lg'>Back to Appointments</Link>
      <div className='flex'>
        <div className='w-1/2'>
          <div className="absolute h-[500px]">
            <video className='relative top-4 left-4 w-full scale-x-[-1]' ref={remoteVideo} autoPlay playsInline />
            <video className='relative -top-[200px] left-[400px] w-1/3 scale-x-[-1]' ref={myVideo} autoPlay playsInline muted />
            <div className="absolute -bottom-32 left-0 right-0 flex justify-evenly">
              <button className="p-5 border border-black rounded-full" onClick={toggleMute}>{isMuted ? <VolumeMute /> : <VolumeUnmute />}</button>
              <button className='p-5 border border-black rounded-full' onClick={toggleCamera}>{isCameraOff ? <CameraDisable /> : <Camera />}</button>
            </div>
          </div>
        </div>
        <div className='w-1/2 mx-4 mt-8 flex flex-col space-y-4'>
          <textarea
            placeholder="Enter symptoms..."
            value={symptoms}
            onChange={handleSymptomsChange}
            className="border p-2 rounded-md h-32"
          />
          <textarea
            placeholder="Enter diagnosis..."
            value={diagnosis}
            onChange={handleDiagnosisChange}
            disabled={userRole !== 'doctor'}
            className="border p-2 rounded-md h-32"
          />
          <textarea
            placeholder="Enter prescription..."
            value={prescription}
            onChange={handlePrescriptionChange}
            disabled={userRole !== 'doctor'}
            className="border p-2 rounded-md h-32"
          />
        </div>
      </div>
    </>
  )
};

export default App;