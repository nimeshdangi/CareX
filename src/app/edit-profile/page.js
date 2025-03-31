"use client"
import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('email', profile.email);
            formData.append('phone_number', profile.phone_number);
            formData.append('address', profile.address);
            if (profile.image) formData.append('image', profile.image);  // Add the image file if selected

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                body: formData
            });

            const result = await response.json();
            router.push('/profile');
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
        <SideBar>
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
                            <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" placeholder="Phone Number" />
                            <textarea className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" name="address" value={profile.address} onChange={handleChange} placeholder="Address"></textarea>
                        </div>
                    </div>
                    <button className="flex justify-center mx-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </SideBar>
    )
} 

export default EditProfile;