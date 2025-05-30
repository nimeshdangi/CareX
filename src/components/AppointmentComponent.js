"use client"
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import ReviewModal from "../components/ReviewModal";
import Topbar from "../components/Topbar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AppointmentComponent = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const [pastAppointments, setPastAppointment] = useState([]);
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const router = useRouter();

    // Function to calculate duration
    const calculateDuration = (startDateTime, endDateTime) => {
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const durationInMinutes = (end - start) / 60000;

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

    const fetchCurrentAppointments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/current-appointments`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setCurrentAppointments(data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchMyAppointments();
        fetchPastAppointments();
        fetchCurrentAppointments();
    }, []);

    const addReview = async (doctorId, comment, rating) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ doctor_id: doctorId, comment, rating }),
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
            <Topbar />
            {currentAppointments?.length > 0 && (
                <div className="m-10">
                    <h1 className="text-4xl font-bold mb-4 mx-auto w-fit px-5 py-4 bg-gradient-to-r from-[#B5D2F0] to-[#FCF7E1]">Current Appointments</h1>
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
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAppointments.map((appointment) => {
                                    const now = new Date();
                                    const startTime = new Date(appointment.start_date_time);
                                    const endTime = new Date(appointment.end_date_time);
                                    const timeRemaining = Math.ceil((startTime - now) / 60000); // Time remaining in minutes

                                    return (
                                        <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                                {now >= startTime && now <= endTime ? (
                                                    <button onClick={() => router.push(`/appointment/${appointment.id}`)} className="w-full text-center font-medium bg-green-100 py-2 rounded-md text-center text-green-600 dark:text-green-500">
                                                        <svg className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#16a34a" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clip-rule="evenodd"/>
                                                        </svg> {" "}
                                                        Join Video Consultation
                                                    </button>
                                                ) : (
                                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                                        {timeRemaining > 0 ? `Starts in ${timeRemaining} minutes` : "Appointment has ended"}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 mx-auto w-fit px-5 py-4 bg-gradient-to-r from-[#B5D2F0] to-[#FCF7E1]">Upcoming Appointments</h1>
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
                            {myAppointments ? (myAppointments?.map((appointment, index) => {
                                const now = new Date();
                                const startTime = new Date(appointment.start_date_time);
                                const timeRemaining = Math.ceil((startTime - now) / 60000);
                                
                                return (
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
                                        {timeRemaining > 15 ? (
                                            <>
                                                <div className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:underline">Postpone Appointment</div>
                                                <div className="font-medium bg-red-100 py-2 rounded-md text-center mt-2 text-red-600 dark:text-red-500 hover:underline">Cancel Appointment</div>
                                            </>
                                        ) : (
                                            <span className="font-medium text-gray-600 dark:text-gray-400">
                                                {timeRemaining > 0 ? `Starts in ${timeRemaining} minutes` : "Appointment has ended"}
                                            </span>  
                                        )}
                                    </td>
                                </tr>
                            )})): (
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
                <h1 className="text-4xl font-bold mb-4 mx-auto w-fit px-5 py-4 bg-gradient-to-r from-[#B5D2F0] to-[#FCF7E1] text-center">Appointments History</h1>
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
                            {pastAppointments?.map((appointment) => (
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
                                                <div onClick={() => router.push(`/appointment/${appointment.id}`)} className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:bg-blue-200 cursor-pointer">View Appointment Detials</div>
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