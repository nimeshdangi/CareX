"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DoctorRegisterComponent = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [specification, setSpecification] = useState('');
    const [qualification, setQualification] = useState('');
    const [password, setPassword] = useState('');
    const [documents, setDocuments] = useState(null);

    const handleFileChange = (e) => {
        setDocuments(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone_no', phone_number);
        formData.append('registrationNumber', registrationNumber);
        formData.append('specification', specification);
        formData.append('qualification', qualification);
        formData.append('password', password);
        if (documents) {
            formData.append('documents', documents);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/registration`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message + ". You can login after approval.");
                router.push('/login');
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
                <div className="bg-white rounded-lg shadow-lg px-8 py-4 max-w-2xl w-full">
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
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Contact Number</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Contact Number"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex text-left gap-5">
                        <div className="flex-1">
                            <label htmlFor="email">Email</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Specialization</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Specialization"
                                value={specification}
                                onChange={(e) => setSpecification(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex text-left gap-5">
                        <div className="flex-1">
                            <label htmlFor="email">Registration Number</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Registration Number"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Qualification</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            />
                        </div>
                    </div>
                    <label htmlFor="email">Documents</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="file"
                        placeholder="Documents like ID, Certificate, etc."
                        onChange={handleFileChange}
                    />
                    <label htmlFor="email">Password</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                    <p className="mt-2 text-sm text-center"><Link href="/register">Not a doctor? Sign up as a patient</Link></p>
                    <p className="mt-2 text-sm text-center"><Link href={"/login"}>Already have an account?</Link></p>
                </div>
            </div>
        </div>
    )
}

export default DoctorRegisterComponent;