"use client"
import Image from "next/image";
import SideBar from "./sidebar"
import Link from "next/link";
import { useEffect, useState } from "react";

const DoctorListComponent = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/doctor');
                const data = await response.json();
                console.log(data);
                setDoctors(data.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    if(doctors.length === 0) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <SideBar>
            <div className="relative w-1/2 mx-auto my-4">
                <input
                    type="text"
                    placeholder="Search doctors by name or specialization"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-64 flex justify-center mb-4 mx-auto">Search</button>
            <h2 className="text-2xl font-bold text-center">Doctor List based on Popularity</h2>
            <div>
                {doctors.map((doctor, index) => (
                    <div key={index} className="flex justify-center w-2/3 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
                        <Image
                            src="/doctor1.jpeg"
                            alt="doctor"
                            width={500}
                            height={500}
                            className="rounded-l-lg w-1/3 object-cover"
                        />
                        <div className="w-2/3 p-4">
                            <h3 className="text-xl font-bold">Dr. {doctor.name}</h3>
                            <p className="text-gray-500">Specialty: {doctor.specialization}</p>
                            <p className="text-gray-500">Rating: 4.5</p>
                            <p className="text-gray-500">Experience: 10 years</p>
                            <p className="text-gray-500">50 Appointments</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">View Profile</button>
                            <Link href={`/book-appointment/${doctor.id}`} className="bg-blue-500 text-white px-4 py-3 rounded-lg mt-4">Book Appointment</Link>
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Appointment</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </SideBar>
    )
}

export default DoctorListComponent;