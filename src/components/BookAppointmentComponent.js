"use client"
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const BookAppointmentComponent = () => {
    const router = useRouter();
    const params = useParams();
    const {id} = params;
    const [doctor, setDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(-1);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/time_slots?doctor_id=${id}&date=${appointmentDate}`);
                const data = await response.json();
                console.log(data);
                setTimeSlots(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchTimeSlots();
    }, [appointmentDate, id]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${id}`);
                const data = await response.json();
                console.log(data);
                setDoctor(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        if(selectedTimeIndex === -1) {
            toast.error("Please select a time slot");
            return;
        }
        const appointmentId = timeSlots[selectedTimeIndex].id;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/book-appointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({doctor_id: id, appointment_id: appointmentId}),   
            });

            console.log(response);

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                toast.success(result.message);
                router.push("/appointment");
            } else if (response.status === 401) {
                toast.error(result.message);
                router.push("/login");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if(!doctor) {
        return <div className="flex justify-center items-center h-screen w-full">Loading...</div>
    }

    return (
        <SideBar>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center">Book Appointment</h1>
                <div className="flex justify-center w-4/5 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
                    <Image 
                        src={doctor.image !== null ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doctor.image}` : "/doctor1.jpeg"}
                        alt="doctor"
                        width={500}
                        height={500}
                        className="rounded-l-lg w-1/3 object-cover"
                    />
                    <div className="w-2/3 p-4">
                        <h3 className="text-xl font-bold">Dr. {doctor.name}</h3>
                        <p className="text-gray-500">Specialty: {doctor.specification}</p>
                        <p className="text-gray-500">Qualification: {doctor.qualification}</p>
                        <p className="text-gray-500">Rating: 4.5</p>
                        <p className="text-gray-500">Experience: 10 years</p>
                        <p className="text-gray-500">50 Appointments</p>
                    </div>
                </div>
                <label>Select Appointment Date</label>
                <br />
                <input
                    value={appointmentDate}
                    onChange={(e) => {setAppointmentDate(e.target.value); setSelectedTimeIndex(-1)}}
                    type="date"
                    className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                />
                <br />
                {appointmentDate && timeSlots?.length > 0 ? (
                    <>
                        <h3 className="text-xl font-bold">Available Time Slots on Selected Date</h3>
                        <div className="mt-3 space-x-2">
                            {timeSlots.map((timeSlot, index) => (
                                <p key={index} onClick={() => setSelectedTimeIndex(index)} className={`inline-block p-2 rounded-lg border border-gray-600 ${selectedTimeIndex === index ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
                                    {(new Date(timeSlot.start_date_time)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true, timeZone: "Asia/Katmandu"})}
                                    {" - "}
                                    {(new Date(timeSlot.end_date_time)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true, timeZone: "Asia/Katmandu"})}
                                </p>
                            ))}
                        </div>
                    </>
                ): !appointmentDate ? (
                    <p>Please select a date</p>
                ): timeSlots?.length === 0 ? (
                    <p>No time slots available on selected date</p>
                ): <p>Loading</p>}
                {/* <br /> */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4" onClick={handleBookAppointment}>Book Appointment</button>
            </div>
        </SideBar>
    )
}

export default BookAppointmentComponent;