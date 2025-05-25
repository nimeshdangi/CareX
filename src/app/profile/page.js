"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import SideBar from "../../components/sidebar";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(localStorage.getItem('token'));
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                if(response.status === 401) {
                    toast.error(data.message);
                    router.push('/login');
                }
                setProfile(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [])

    return (
        <SideBar>
            {loading ? <div className="flex justify-center items-center h-screen">Loading...</div> : (
                <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5 pb-5">
                    <div className="flex flex-col items-center space-y-4 p-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <Image 
                                src={profile.image !== null ? profile.image.includes("\\") ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/doctors/${profile.documents}` : `${profile.image}` : "/doctor.jpg"} 
                                width={200} 
                                height={200} 
                                alt="Profile Picture" 
                                className="w-full h-full object-cover"
                                unoptimized/>
                        </div>
                        <div className="text-center space-y-1">
                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                            {/* <p className="text-gray-500">{profile.specification}</p> */}
                        </div>
                    </div>
                    <div className="px-6 text-center">
                        <p className="text-gray-600">
                            <strong>Email: </strong>{profile.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Contact Number: </strong>{profile.phone_number}
                        </p>
                        <p className="text-gray-600">
                            <strong>Address: </strong>{profile.address}
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            <Link href={'/edit-profile'}>Edit Profile</Link>
                        </button>
                        {/* <p className="text-gray-600">
                            <strong>Registration Number: </strong>{profile.registrationNumber}
                        </p>
                        <p>
                            <strong>Documents: </strong>
                            <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/doctors/documents/${profile.documents}`} width={200} height={200} alt="Profile Picture" className="w-full h-full" />
                        </p> */}
                    </div>
                </div>
            )}
        </SideBar>
    )
}

export default ProfilePage;