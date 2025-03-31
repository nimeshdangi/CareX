"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import DoctorSideBar from "../../../components/doctorSideBar";
import Link from "next/link";

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                setProfile(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [])

    return (
        <DoctorSideBar>
            {loading ? <div>Loading...</div> : (
                <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5 pb-5">
                    <div className="flex flex-col items-center space-y-4 p-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <Image src={profile.image !== null ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${profile.image}`: '/doctor.jpg'} width={200} height={200} alt="Profile Picture" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center space-y-1">
                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                            <p className="text-gray-500">{profile.specification}</p>
                        </div>
                    </div>
                    <div className="px-6 text-center">
                        <p className="text-gray-600">
                            <strong>Email: </strong>{profile.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Contact Number: </strong>{profile.phone_no}
                        </p>
                        <p className="text-gray-600">
                            <strong>Qualification: </strong>{profile.qualification}
                        </p>
                        <p className="text-gray-600">
                            <strong>Registration Number: </strong>{profile.registrationNumber}
                        </p>
                        <p>
                            <strong>Documents: </strong>
                            <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/doctors/documents/${profile.documents}`} width={200} height={200} alt="Profile Picture" className="w-2/3 h-auto mx-auto  " />
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            <Link href={'/doctor/edit-profile'}>Edit Profile</Link>
                        </button>
                    </div>
                    {/* <div className="flex justify-center space-x-4 p-6">
                        <button className="text-gray-500 hover:text-gray-700">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                        </button>
                    </div> */}
                </div>
            )}
        </DoctorSideBar>
    )
}

export default ProfilePage