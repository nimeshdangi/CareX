'use client';

import { useEffect, useState } from 'react';
import VideoChat from "../../../components/VideoChat2";
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

const AppointmentPage = ({ params }) => {
  const { id } = params;
  const [token, setToken] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("Processing...");
  const [isReadyForVideo, setIsReadyForVideo] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);

    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/appointment/${id}`, {
          headers: { 'Authorization': userToken }
        });
        const data = await response.json();

        if (response.ok) {
          setAppointmentDetails(data.data);
        } else {
          toast.error(data.message);
          setMessage(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    };

    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/profile`, {
          headers: { 'Authorization': userToken }
        });
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchAppointmentDetails(), fetchProfileDetails()]);
    };

    if (userToken) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (appointmentDetails && profile && appointmentDetails.patient_id === profile.id) {
      const now = new Date();
      const startTime = new Date(appointmentDetails.start_date_time);
      const endTime = new Date(appointmentDetails.end_date_time);

      setMessage("Preparing your video session...");
      // Allow video only within the appointment time
      if (now >= startTime && now <= endTime) {
        const timer = setTimeout(() => {
          setIsReadyForVideo(true);
        }, 500); // Delay for smoother UX
        return () => clearTimeout(timer);
      } else {
        if (now > endTime) {
          setShowAppointmentDetails(true);
        }
        setMessage("The appointment is not currently active.");
      }
    }
  }, [appointmentDetails, profile]);

  if (showAppointmentDetails) {
    console.log(appointmentDetails);
    return (
      <div className='flex flex-col gap-5 justify-center items-center h-screen'>
        <h1 className='text-2xl'>Appointment already completed</h1>
        <h1 className='text-2xl text-bold'>{appointmentDetails?.doctor?.name}</h1>
        <p className='text-lg'><span className='font-bold'>Speciality:</span> {appointmentDetails?.doctor?.specification}</p>
        <p className='text-lg'><span className='font-bold'>Qualification:</span> {appointmentDetails?.doctor?.qualification}</p>
        <p className="text-lg"><span className='font-bold'>Date:</span> {appointmentDetails?.start_date_time.split('T')[0]}</p>
        <p className='text-lg'>
          <span className='font-bold'>Time:</span> {" "}
          {new Date(appointmentDetails?.start_date_time).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })} - {new Date(appointmentDetails?.end_date_time).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
        {appointmentDetails?.symptoms && (
          <p className='text-lg text-center'><span className='font-bold text-xl'>Symptoms</span><br /> {appointmentDetails.symptoms}</p>
        )}
        {appointmentDetails?.diagnosis && (
          <p className='text-lg text-center'><span className='font-bold text-xl'>Diagnosis</span><br /> {appointmentDetails.diagnosis}</p>
        )}
        {appointmentDetails?.prescription && (
          <p className='text-lg text-center'><span className='font-bold text-xl'>Prescription</span><br /> {appointmentDetails.prescription}</p>
        )}
        <button onClick={() => pathname.startsWith("/doctor") ? router.push("/doctor") : router.push("/appointment")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Go back to Appointments
        </button>
      </div>
    )
  }

  if (!id || !token) {
    return <div>Loading...</div>;
  }

  if (!appointmentDetails || !profile) {
    return <div className='flex flex-col gap-5 justify-center items-center h-screen'>
        <h1 className='text-2xl'>{message}</h1>
        <button onClick={() => router.push("/")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Go back to Home
        </button>
      </div>;
  }

  if (appointmentDetails.patient_id !== profile.id) {
    return (
      <div className='flex flex-col gap-5 justify-center items-center h-screen'>
        <h1 className='text-2xl'>You are not authorized to access this page.,</h1>
        <button onClick={() => router.push("/")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Optionally show appointment or profile info here */}
      {isReadyForVideo ? (
        <VideoChat appointmentId={id} token={token} userRole={"patient"} />
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
          <h1 className="text-2xl">{message}</h1>
          <button onClick={() => router.push("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;