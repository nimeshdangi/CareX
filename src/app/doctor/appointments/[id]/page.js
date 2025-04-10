"use client"

import { useEffect, useState } from "react";
// import VideoChat from "../../../../components/VideoChat";
import VideoChat from "../../../../components/VideoChat2";
import { useRouter } from "next/navigation";

const DoctorAppointment = ({ params }) => {
    const { id } = params;
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [profile, setProfile] = useState({});
    const [message, setMessage] = useState("Processing...");
    const [isReadyForVideo, setIsReadyForVideo] = useState(false);
    const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        setToken(userToken);
        // console.log("User Token");

        const fetchAppointmentDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/appointment/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                setAppointmentDetails(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchProfileDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
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
        if (appointmentDetails && profile && appointmentDetails.doctor_id === profile.id) {
            const now = new Date();
            const startTime = new Date(appointmentDetails.start_date_time);
            const endTime = new Date(appointmentDetails.end_date_time);
            // console.log("Now: ", now);
            // console.log("Start Time: ", startTime);
            // console.log("End Time: ", endTime);

            setMessage("Preparing video chat...");

            if (now >= startTime && now <= endTime) {
                const timeout = setTimeout(() => {
                    setIsReadyForVideo(true);
                }, 500);
                return () => clearTimeout(timeout);
            } else {
                if (now > endTime) {
                    setShowAppointmentDetails(true);
                }
                setMessage("The appointment has not started yet.");
            }
        }
    }, [appointmentDetails, profile]);

    if (showAppointmentDetails) {
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
                <button onClick={() => router.push("/")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Go back to Home
                </button>
            </div>
        )
    }

    if(!id || !token) {
        return <div>Loading...</div>
    }

    if (!appointmentDetails || !profile) {
        return <div className='flex flex-col gap-5 justify-center items-center h-screen'>
            <h1 className='text-2xl'>{message}</h1>
            <button onClick={() => router.push("/")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Go back to Home
            </button>
        </div>;
    }

    if (appointmentDetails.doctor_id !== profile.id) {
        return (
            <div className='flex flex-col gap-5 justify-center items-center h-screen'>
                <h1 className='text-2xl'>You are not authorized to access this page.,</h1>
                <button onClick={() => router.push("/")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Go back to Home
                </button>
            </div>
        );
    }
    // return <VideoChat appointmentId={id} token={localStorage.getItem('token')} userRole={"doctor"} />
    // return <VideoChat />
     return (
        <div>
            {/* Optionally show appointment or profile info here */}
            {isReadyForVideo ? (
                <VideoChat appointmentId={id} token={token} userRole={"doctor"} />
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
}

export default DoctorAppointment;