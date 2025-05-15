"use client"
import { useEffect, useState } from "react";

const Topbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [patientName, setPatientName] = useState("Patient");

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })

                const data = await response.json();
                console.log(data);
                if(response.ok) {
                    if(data.data.role == "patient") {
                        setIsLoggedIn(true);
                    } else if (data.data.role == "doctor") {
                        router.push("/doctor");
                    } else if (data.data.role == "admin") {
                        router.push("/admin");
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsLoggedIn(false);
            }
        }

        const getProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })

                const data = await response.json();
                console.log(data);
                if(response.ok) {
                    // if(data.data.role == "patient") {
                    //     setIsLoggedIn(true);
                    // } else if (data.data.role == "doctor") {
                    //     router.push("/doctor");
                    // } else if (data.data.role == "admin") {
                    //     router.push("/admin");
                    // }
                    setPatientName(data.data.name);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsLoggedIn(false);
            }
        }

        checkAuth();
        getProfile();
    }, []);

    return (
        <div className={`bg-gradient-to-r from-[#B5D2F0] to-[#FCF7E1] flex items-center ${isLoggedIn ? "justify-between" : "justify-center"} px-4 py-4`}>
            {isLoggedIn ? (
                <h1 className="text-2xl font-bold text-gray">Welcome, {patientName}</h1>
            ): (null)}
            <form className="w-1/3">   
                <label htmlFor="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
    )
}

export default Topbar;