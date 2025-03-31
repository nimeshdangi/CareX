"use client"
import { useEffect, useState } from "react";
import DoctorSideBar from "../../../components/doctorSideBar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('email', profile.email);
            formData.append('phone_no', profile.phone_no);
            formData.append('specification', profile.specification);
            formData.append('qualification', profile.qualification);
            formData.append('registrationNumber', profile.registrationNumber);
            if (profile.image) formData.append('image', profile.image);  // Add the image file if selected

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                body: formData
            });

            const result = await response.json();
            router.push('/doctor/profile');
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProfile({
            ...profile,
            [name]: files ? files[0] : value
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <DoctorSideBar>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="justify-center w-4/5 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-auto pb-4">
                    <div className="flex">
                        <div className="w-2/3 p-4">
                            <h3 className="text-xl font-bold">Profile Picture</h3>
                            <p className="text-gray-500">Upload a profile picture</p>
                            <img
                                src={profile.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${profile.image}` : '/doctor.jpg'}
                                alt="Profile"
                                className="w-48 h-48 rounded-full object-cover my-3 mx-auto"
                            />
                            <input type="file" name="image" onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" />
                        </div>
                        <div className="w-2/3 p-4">
                            <h3 className="text-xl font-bold">Personal Information</h3>
                            <p className="text-gray-500">Enter your personal information</p>
                            <input type="text" name="name" value={profile.name} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Name" />
                            <input type="text" name="email" value={profile.email} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Email" />
                            <input type="text" name="phone_no" value={profile.phone_no} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Phone Number" />
                            <input type="text" name="specification" value={profile.specification} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Specification" />
                            <input type="text" name="qualification" value={profile.qualification} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Qualification" />
                            <input type="text" name="registrationNumber" disabled value={profile.registrationNumber} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Registration Number" />
                        </div>
                    </div>
                    <button className="flex justify-center mx-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </DoctorSideBar>
    )
} 

export default EditProfile;