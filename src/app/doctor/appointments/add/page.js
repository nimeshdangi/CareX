"use client"
import { useState } from "react";
import DoctorSideBar from "../../../../components/doctorSideBar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddAppointment = () => {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const [starttime, setStarttime] = useState(new Date());
    const [endtime, setEndtime] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Start Date Time: ", date.toISOString().split("T")[0] + " " + starttime);
        console.log("End Date Time: ", date.toISOString().split("T")[0] + " " + endtime);
        // console.log(date, starttime, endtime);
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
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <DoctorSideBar>
            <div className="m-4 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Add Appointment</h1>
                <div className="flex flex-col p-5 w-4/5 mx-auto my-4 bg-gray-50">
                    <label htmlFor="date">Select Date</label>
                    <div 
                        onClick={() => document.getElementById('datepicker').showPicker()}
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
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
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
                    >
                        <input
                            value={starttime}
                            onChange={(e) => setStarttime(e.target.value)}
                            type="time"
                            id="starttime"
                            className="bg-transparent w-full focus:outline-none"
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    {/* <input type="time" className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"/> */}
                    <label htmlFor="end_time">Select End Time</label>
                    <div 
                        onClick={() => document.getElementById('endtime').showPicker()}
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
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
                    <button onClick={handleSubmit} className="bg-blue-600 w-64 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">Add Appointment</button>
                </div>
            </div>
        </DoctorSideBar>
    );
};

export default AddAppointment;