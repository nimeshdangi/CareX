"use client"
import { useRouter, useSearchParams } from "next/navigation";
import DoctorSideBar from "../../components/doctorSideBar";
import DoctorDashboardTopbar from "../../components/DoctorDashboardTopbar";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DoctorDashboard = () => {
    const params = useSearchParams();
    const notificationId = params.get('notification');
    const [appointmentId, setAppointmentId] = useState(0);
    const [appointmentsToday, setAppointmentsToday] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [appointmentStats, setAppointmentStats] = useState({});
    const [appointmentHistory, setAppointmentHistory] = useState([]);
    const router = useRouter();

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

        const fetchAppointmentStats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/appointment-stats`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                setAppointmentStats(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAppointmentStats();
        fetchUpcomingAppointments();
        fetchAppointmentsToday();
        fetchPreviousAppointments();
    }, []);

    const fetchAppointmentsToday = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/appointments-today`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setAppointmentsToday(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchPreviousAppointments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/past-appointments`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setAppointmentHistory(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const markAsCompleted = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/appointment-status/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ status: 'Completed' })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success(data.message);
                fetchPreviousAppointments();
                fetchAppointmentsToday();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DoctorSideBar>
            <DoctorDashboardTopbar />
            {/* <h1 className="text-4xl font-bold mb-4 text-center">Doctor Dashboard</h1> */}
            <div className="flex justify-evenly flex-wrap mt-5">
                <div>
                    <div className="w-48 h-48 border border-blue-500 border-[3px] rounded-3xl flex flex-col justify-center items-center px-5 text-center gap-3">
                        <h1 className="text-4xl font-bold">{appointmentStats.completedAppointmentsCount}</h1>
                        Total Appointments
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 border border-blue-500 border-[3px] rounded-3xl flex flex-col justify-center items-center px-5 text-center gap-3">
                        <h1 className="text-4xl font-bold">{appointmentStats.uniquePatientsCount}</h1>
                        Total Patients
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 border border-blue-500 border-[3px] rounded-3xl flex flex-col justify-center items-center px-5 text-center gap-3">
                        <h1 className="text-4xl font-bold">{appointmentStats.appointmentsThisMonth}</h1>
                        Appointments this month
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 border border-blue-500 border-[3px] rounded-3xl flex flex-col justify-center items-center px-5 text-center gap-3">
                        <h1 className="text-4xl font-bold">{appointmentStats.appointmentsThisWeek}</h1>
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
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointmentsToday.length > 0 ? (appointmentsToday.map((appointment) => {
                                    const now = new Date();
                                    const startTime = new Date(appointment.start_date_time);
                                    const endTime = new Date(appointment.end_date_time);
                                    const timeRemaining = Math.ceil((startTime - now) / 60000); // Time remaining in minutes
                                    
                                    return (
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                                <span className="font-medium text-blue-600 dark:text-blue-500">
                                                    {
                                                        appointment?.status === "Not Booked" ? (
                                                            "Not Booked Yet"
                                                        ) : (
                                                            appointment?.status
                                                        )
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    now >= startTime && now <= endTime ? (
                                                        <button onClick={() => router.push(`/doctor/appointments/${appointment.id}`)} className="w-full text-center font-medium bg-green-100 py-2 rounded-md text-center text-green-600 dark:text-green-500">
                                                            <svg class="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#16a34a" viewBox="0 0 24 24">
                                                                <path fill-rule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clip-rule="evenodd"/>
                                                            </svg> {" "}
                                                            Join Video Consultation
                                                        </button>
                                                    ) : (
                                                        appointment?.status === "Completed" ?
                                                            <div onClick={() => router.push(`/doctor/appointments/${appointment.id}`)} className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:bg-blue-200">View Appointment Detials</div>
                                                        : (
                                                            now > endTime ? (
                                                                <>
                                                                    <div onClick={() => markAsCompleted(appointment.id)} className="font-medium bg-green-100 py-2 rounded-md text-center text-green-600 dark:text-green-500 hover:bg-green-200">Mark as Completed</div>
                                                                </>
                                                            ): (
                                                                timeRemaining > 0 && timeRemaining < 15 ? (
                                                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                                                        {timeRemaining > 0 ? `Starts in ${timeRemaining} minutes` : "Appointment has ended"}
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        <div className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:underline">Postpone Appointment</div>
                                                                        <div className="font-medium bg-red-100 py-2 rounded-md text-center mt-2 text-red-600 dark:text-red-500 hover:underline">Cancel Appointment</div>
                                                                    </>
                                                                )
                                                            )
                                                        )
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })) : (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            No Appointments Today
                                        </td>
                                    </tr>
                                )
                            }
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
                            {upcomingAppointments?.length > 0 ? (upcomingAppointments.map((appointment) => (
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

            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Past Appointments</h1>
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
                            {appointmentHistory?.length > 0 ? (appointmentHistory.map((appointment) => (
                                <tr key={appointment.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                        {appointment?.status == "Booked" ? (
                                            <div onClick={() => markAsCompleted(appointment?.id)} className="font-medium cursor-pointer bg-green-100 py-2 rounded-md text-center text-green-600 dark:text-green-500 hover:bg-green-200">Mark as Completed</div>
                                        ) : (
                                            appointment?.status == "Completed" ? (
                                                <div onClick={() => router.push(`/doctor/appointments/${appointment.id}`)} className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:bg-blue-200">View Appointment Detials</div>
                                            ): (
                                                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Not Booked yet</span>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))): (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No Previous Appointments
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