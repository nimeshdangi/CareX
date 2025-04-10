"use client"

import { useEffect, useState } from "react";
// import VideoChat from "../../../../components/VideoChat";
import VideoChat from "../../../../components/VideoChat2";

const DoctorAppointment = ({ params }) => {
    const { id } = params;
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        setToken(userToken);
        console.log("User Token");

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

        fetchProfileDetails();
        fetchAppointmentDetails();
    }, []);

    if(!id || !token) {
        return <div>Loading...</div>
    }

    if (appointmentDetails.doctor_id !== profile.id) {
        return <div className="flex justify-center items-center h-screen">You are not authorized to access this page</div>;
    }
    // return <VideoChat appointmentId={id} token={localStorage.getItem('token')} userRole={"doctor"} />
    // return <VideoChat />
    return <VideoChat appointmentId={id} token={token} userRole={"doctor"} />
}

export default DoctorAppointment;