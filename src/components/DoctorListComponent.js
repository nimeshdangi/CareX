"use client"
import Image from "next/image";
import SideBar from "./sidebar"
import Link from "next/link";
import { useEffect, useState } from "react";

const DoctorListComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState('Available Doctors');

    useEffect(() => {
        const fetchDoctors = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor`);
                const data = await response.json();
                console.log(data);
                setDoctors(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    if(isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    const getDoctorBasedOnKeyword = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor?search=${searchText}`);
            const data = await response.json();
            console.log(data);
            setDoctors(data.data);
            if(searchText === '') {
                setSearchTitle('Available Doctors');
            } else {
                setSearchTitle(`Search results for "${searchText}"`);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <SideBar>
            <div className={`bg-gradient-to-r from-[#B5D2F0] to-[#FCF7E1] flex items-center justify-between px-4 py-4`}>
                <h1 className="text-2xl font-bold text-gray">{searchTitle}</h1>
                <div className="w-1/3">
                    <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            id="search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            required
                        />
                        <button
                            onClick={getDoctorBasedOnKeyword}
                            type="button"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="relative w-1/2 mx-auto my-4">
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search doctors by name or specialization"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <button onClick={getDoctorBasedOnKeyword} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-64 flex justify-center mb-4 mx-auto">Search</button>
            <h2 className="text-2xl font-bold text-center">{searchTitle}</h2> */}
            <div>
                {doctors.map((doctor, index) => (
                    <div key={index} className="flex justify-center w-2/3 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
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