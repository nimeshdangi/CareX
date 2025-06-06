"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RegisterComponent = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone_number || !address || !password) {
            const errors = [];
            if (!name) errors.push("Name is required");
            if (!email) errors.push("Email is required");
            if (!phone_number) errors.push("Phone number is required");
            if (!address) errors.push("Address is required");
            if (!password) errors.push("Password is required");

            errors.forEach((msg, index) => {
                setTimeout(() => {
                    toast.error(msg);
                }, index * 700);
            });

            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone_number, address, password })
            });

            const result = await response.json();

            if(response.status === 201) {
                toast.success(result.message + " Please Login.");
                router.push('/login');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <Image
                src="/register.jpeg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="z-0"
                priority
            />

            {/* Centered Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
                    {/* Your content here */}
                    <h1 className="text-4xl font-bold mb-4 text-center">Sign Up</h1>
                    <p className="mb-8 text-center">With account you can consult with our therapists</p>
                    <div className="flex text-left gap-5">
                        <div className="flex-1">
                            <label htmlFor="email">Full Name</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Contact Number</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="tel"
                                pattern="^(\+977-?)?(98|97)\d{8}$"
                                title="Enter a valid Nepali phone number (e.g., 9801234567 or +9779801234567)"
                                placeholder="Phone Number"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Address</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Password</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <p className="mt-2 text-sm text-center"><Link href="/doctor-registration">Register as a Doctor</Link></p>
                    <p className="mt-2 text-sm text-center"><Link href={"/login"}>Already have an account?</Link></p>
                </form>
            </div>
        </div>
    )
}

export default RegisterComponent;