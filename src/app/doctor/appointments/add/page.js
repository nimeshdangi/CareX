"use client"
import { useState } from "react";
import DoctorSideBar from "../../../../components/doctorSideBar";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const AddAppointment = () => {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const [starttime, setStarttime] = useState(new Date());
    const [endtime, setEndtime] = useState(new Date());
    const [currentTime] = useState(new Date().toISOString().split("T")[1].slice(0, 5));

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Date: ", date.toISOString().split("T")[0]);
        console.log("Start Time: ", starttime);
        console.log("Start Time Length: ", starttime.length);
        console.log("End Time: ", endtime);
        console.log("min date", new Date().toISOString().split("T")[0]);
        // const currentTime = new Date();
        // const oneHourFromNow = new Date(currentTime.getTime() + 60 * 60 * 1000);
        // if (date.toISOString().split("T")[0] === currentTime.toISOString().split("T")[0]) {
        //     console.log("Time 1 hour from now: ", oneHourFromNow.toISOString().split("T")[1].slice(0, 5));
        // }
        console.log("min time", new Date().toISOString().split("T")[1]);

        // console.log("Is current time same as start time: ", currentTime.toISOString() === starttime.toISOString());
        console.log("Is start time set: ", starttime.length === 5);
        console.log("Is end time set: ", endtime.length === 5);

        console.log("Start Date Time: ", date.toISOString().split("T")[0] + " " + starttime);
        console.log("End Date Time: ", date.toISOString().split("T")[0] + " " + endtime);
        // console.log(date, starttime, endtime);

        if (!date || !starttime || !endtime) {
            const errors = [];
            if (!date) errors.push("Date is required");
            if (!starttime) errors.push("Start time is required");
            if (!endtime) errors.push("End time is required");

            errors.forEach((msg, index) => {
                setTimeout(() => {
                    toast.error(msg);
                }, index * 700);
            });
            return;
        }

        if (starttime.length !== 5 || endtime.length !== 5) {
            const errors = [];
            if (starttime.length !== 5) {
                errors.push("Start time is not set");
            }
            if (endtime.length !== 5) {
                errors.push("End time is not set");
            }
            errors.forEach((msg, index) => {
                setTimeout(() => {
                    toast.error(msg);
                }, index * 700);
            });
            return;
        }
        if (date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0]) {
            const currentTime = new Date();
            const oneHourFromNow = new Date(currentTime.getTime() + 60 * 60 * 1000);
            const selectedStartTime = new Date(date.toISOString().split("T")[0] + "T" + starttime);

            if (selectedStartTime <= oneHourFromNow) {
            toast.error("Start time must be greater than 1 hour from now");
            return;
            }
        }

        if (starttime >= endtime) {
            toast.error("End time must be greater than start time");
            return;
        }

        // check if difference between start and end time is 15, 30, or 60 minutes
        const start = new Date(date.toISOString().split("T")[0] + " " + starttime);
        const end = new Date(date.toISOString().split("T")[0] + " " + endtime);
        const diff = (end - start) / 1000 / 60; // difference in minutes

        if (diff !== 15 && diff !== 30 && diff !== 60) {
            toast.error("Appointment duration must be 15, 30, or 60 minutes");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/appointment`, {
                method: "POST",
                body: JSON.stringify({
                    start_date_time: date.toISOString().split("T")[0] + " " + starttime,
                    end_date_time: date.toISOString().split("T")[0] + " " + endtime,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                router.push("/doctor");
            } else if(response.status === 401) {
                toast.error(result.message);
                router.push("/login");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <DoctorSideBar>
            <h1 className="text-2xl font-bold text-center mt-12">Add Appointment</h1>
            <div className="mt-12 shadow-lg rounded-lg w-3/5 mx-auto border border-blue-600">
                <div className="flex flex-col p-5 w-4/5 mx-auto my-4 bg-gray-50">
                    <label htmlFor="date">Select Date</label>
                    <div 
                        onClick={() => document.getElementById('datepicker').showPicker()}
                        className="bg-gray-100 border border-gray-600 rounded-lg w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
                    >
                        <input
                            value={date.toISOString().split("T")[0]}
                            onChange={(e) => setDate(new Date(e.target.value))}
                            type="date"
                            id="datepicker"
                            className="bg-transparent w-full focus:outline-none"
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    {/* <input type="date" className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"/> */}
                    <label htmlFor="start_time">Select Start Time</label>
                    <div 
                        onClick={() => document.getElementById('starttime').showPicker()}
                        className="bg-gray-100 border rounded-lg border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
                    >
                        <input
                            value={starttime}
                            onChange={(e) => setStarttime(e.target.value)}
                            type="time"
                            id="starttime"
                            className="bg-transparent w-full focus:outline-none"
                            min={"04:00"}
                            // min={new Date().toISOString().split("T")[1]}
                        />
                    </div>
                    {/* <input type="time" className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"/> */}
                    <label htmlFor="end_time">Select End Time</label>
                    <div 
                        onClick={() => document.getElementById('endtime').showPicker()}
                        className="bg-gray-100 border rounded-lg border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
                    >
                        <input
                            value={endtime}
                            onChange={(e) => setEndtime(e.target.value)}
                            type="time"
                            id="endtime"
                            className="bg-transparent w-full focus:outline-none"
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    {/* <input type="time" className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"/> */}
                    <button onClick={handleSubmit} className="bg-blue-600 rounded-md w-64 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">Add Appointment</button>
                </div>
            </div>
        </DoctorSideBar>
    );
};

export default AddAppointment;