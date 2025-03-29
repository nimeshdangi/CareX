'use client'; // Make this component client-side

import { useEffect, useState } from 'react';
import VideoChat from "../../../components/VideoChat";

const AppointmentPage = ({ params }) => {
  const { id } = params; // Get appointmentId from params
  console.log(id);
  const [token, setToken] = useState(null);

  // Access localStorage only after component has mounted (client-side)
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);  // Set token state once it's fetched
    console.log(id);
    console.log(localStorage.getItem('token'));
  }, []);

  if (!id || !token) {
    return <div>Loading...</div>;
  }

  return <VideoChat appointmentId={id} token={token} />;
};

export default AppointmentPage;