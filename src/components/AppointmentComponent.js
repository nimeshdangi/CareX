"use client"
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import ReviewModal from "../components/ReviewModal";
import { toast } from "sonner";

const AppointmentComponent = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const [pastAppointments, setPastAppointment] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

    const fetchMyAppointments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/my-appointments`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setMyAppointments(data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchPastAppointments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/past-appointments`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setPastAppointment(data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchMyAppointments();
        fetchPastAppointments();
    }, []);

    const addReview = async (doctorId, comment, rating) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ doctor_id: doctorId, comment, rating }), // Pass the doctorId, comment, and rating in the request body
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setIsReviewModalOpen(false);
                fetchPastAppointments();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error adding review:", error);
            toast.error(error.message);
        }
    };

    return (
        <SideBar>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Upcoming Appointments</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Specialization
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
                            {myAppointments ? (myAppointments?.map((appointment, index) => (
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {appointment?.doctor.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {appointment?.doctor.specification}
                                    </td>
                                    <td className="px-6 py-4">
                                        {appointment?.start_date_time.split("T")[0]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(new Date(appointment?.start_date_time).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}))}
                                        {" - "}
                                        {(new Date(appointment?.end_date_time).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {calculateDuration(appointment.start_date_time, appointment.end_date_time)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:underline">Postpone Appointment</div>
                                        <div className="font-medium bg-red-100 py-2 rounded-md text-center mt-2 text-red-600 dark:text-red-500 hover:underline">Cancel Appointment</div>
                                    </td>
                                </tr>
                            ))): (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No appointments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Appointments History</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Specialization
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
                            {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    John Doe
                                </th>
                                <td className="px-6 py-4">
                                    Neurology
                                </td>
                                <td className="px-6 py-4">
                                    2024-01-01
                                </td>
                                <td className="px-6 py-4">
                                    6:00 AM - 6:30 AM
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
                                    Pro Doctor
                                </th>
                                <td className="px-6 py-4">
                                    Oncology
                                </td>
                                <td className="px-6 py-4">
                                    2024-01-02
                                </td>
                                <td className="px-6 py-4">
                                    7:00 AM - 7:30 AM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postponed to later(By You)</span>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td className="px-6 py-4">
                                    Cardiology
                                </td>
                                <td className="px-6 py-4">
                                    2024-01-03
                                </td>
                                <td className="px-6 py-4">
                                    8:00 PM - 8:30 PM
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
                                    Daniel Grayson
                                </th>
                                <td className="px-6 py-4">
                                    Psychology
                                </td>
                                <td className="px-6 py-4">
                                    2024-01-04
                                </td>
                                <td className="px-6 py-4">
                                    9:00 PM - 9:30 PM
                                </td>
                                <td className="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Completed</span>
                                </td>
                            </tr> */}
                            {pastAppointments.map((appointment) => (
                                <tr key={appointment.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {appointment.doctor.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {appointment.doctor.specification}
                                    </td>
                                    <td className="px-6 py-4">
                                        {appointment.start_date_time.split('T')[0]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(appointment.start_date_time).toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        })} - {new Date(appointment.end_date_time).toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        {calculateDuration(appointment.start_date_time, appointment.end_date_time)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {appointment.status === "Completed" ? (
                                            <span className="font-medium text-blue-600 dark:text-blue-500">
                                                Completed
                                                {appointment.doctor.reviews.length == 0 && 
                                                    <button onClick={() => {setSelectedDoctorId(appointment.doctor.id);setIsReviewModalOpen(true);}} className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Review</button>
                                                }
                                            </span>
                                        ) : (
                                            <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{appointment.status}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReviewModal isOpen={isReviewModalOpen} setIsOpen={setIsReviewModalOpen} doctorId={selectedDoctorId} addReview={addReview} />
        </SideBar>
    )
}

export default AppointmentComponent;