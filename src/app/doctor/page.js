"use client"
import { useSearchParams } from "next/navigation";
import DoctorSideBar from "../../components/doctorSideBar";
import { useEffect, useState } from "react";

const DoctorDashboard = () => {
    const params = useSearchParams();
    const notificationId = params.get('notification');
    const [appointmentId, setAppointmentId] = useState(0);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    // Function to calculate duration
    const calculateDuration = (startDateTime, endDateTime) => {
        // console.log("Start Date Time:", startDateTime);
        // console.log("End Date Time:", endDateTime);
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const durationInMinutes = (end - start) / 60000; // Difference in minutes (1 min = 60000 ms)
        // console.log("Difference in minutes:", durationInMinutes);

        // Convert duration to hours and minutes
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = Math.floor(durationInMinutes % 60);

        return hours > 0 ? minutes == 0 ? hours > 1 ? `${hours} Hours` : `${hours} Hour` : `${hours} Hours ${minutes} Minutes` : `${minutes} Minutes`;
    };

    useEffect(() => {
        const fetchNotificationById = async () => {
            if (notificationId) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/notification/${notificationId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    const data = await response.json();
                    setAppointmentId(data.data.appointment_id);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setAppointmentId(0);
            }
        }
        fetchNotificationById();
    }, [notificationId]);

    useEffect(() => {
        const fetchUpcomingAppointments = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/upcoming-appointments`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                setUpcomingAppointments(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUpcomingAppointments();
    }, []);

    return (
        <DoctorSideBar>
            <h1 className="text-4xl font-bold mb-4 text-center">Doctor Dashboard</h1>
            <div className="flex justify-evenly flex-wrap">
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Total Appointments
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Total Patients
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Appointments this month
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Appointments this week
                    </div>
                </div>
            </div>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Appointments Today</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Patient Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Start Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation End Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Period
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    John Doe
                                </th>
                                <td className="px-6 py-4">
                                    6:00 AM
                                </td>
                                <td className="px-6 py-4">
                                    6:30 AM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Completed</span>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Pro Patient
                                </th>
                                <td className="px-6 py-4">
                                    7:00 AM
                                </td>
                                <td className="px-6 py-4">
                                    7:30 AM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postponed to later(By Patient)</span>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td className="px-6 py-4">
                                    8:00 PM
                                </td>
                                <td className="px-6 py-4">
                                    8:30 PM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <div className="rounded-lg bg-blue-500 text-white px-3 py-1 text-center">Start Video Consultation</div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Daniel Grayson
                                </th>
                                <td className="px-6 py-4">
                                    9:00 PM
                                </td>
                                <td className="px-6 py-4">
                                    9:30 PM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pending</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    N/A
                                </th>
                                <td className="px-6 py-4">
                                    10:00 PM
                                </td>
                                <td className="px-6 py-4">
                                    10:30 PM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Not Booked yet</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Upcoming Appointments</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Patient Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Period
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAppointments.length > 0 ? (upcomingAppointments.map((appointment) => (
                                <tr key={appointment.id} className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${appointmentId == appointment.id ? '!bg-blue-200' : ''}`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {appointment?.patient?.name || "N/A"}
                                    </th>
                                    <td className="px-6 py-4">
                                        {new Date(appointment?.start_date_time).toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(new Date(appointment?.start_date_time).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}))}
                                        {" - "}
                                        {(new Date(appointment?.end_date_time).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {calculateDuration(appointment?.start_date_time, appointment?.end_date_time)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Not Booked yet</span>
                                    </td>
                                </tr>
                            ))): (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No Upcoming Appointments
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DoctorSideBar>
    )
}

export default DoctorDashboard;