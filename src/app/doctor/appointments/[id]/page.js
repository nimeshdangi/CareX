"use client"

import { useEffect, useState } from "react";
// import VideoChat from "../../../../components/VideoChat";
import VideoChat from "../../../../components/VideoChat2";

const DoctorAppointment = ({ params }) => {
    const { id } = params;
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        setToken(userToken);
    }, []);

    if(!id || !token) {
        return <div>Loading...</div>
    }

    // return <VideoChat appointmentId={id} token={localStorage.getItem('token')} userRole={"doctor"} />
    // return <VideoChat />
    return <VideoChat appointmentId={id} token={token} userRole={"doctor"} />
}

export default DoctorAppointment;