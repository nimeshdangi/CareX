"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if(response.ok) {
                localStorage.setItem('token', result.token);
                toast.success(result.message);
                if(result.role === 'admin') {
                    router.push('/admin');
                } else if(result.role === 'doctor') {
                    router.push('/doctor');
                } else if(result.role === 'patient') {
                    router.push('/appointment');
                }
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex">
            <div className="w-1/2">
                <div className="flex items-center h-full">
                    <div className="my-auto px-16 w-full">
                        <h1 className="text-3xl mb-8">Login</h1>
                        <label htmlFor="email">Email</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Jane Doe"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // aria-label="Full name"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 mt-3 py-3 px-3 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // aria-label="Full name"
                        />
                        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
                        <div className="flex justify-end my-4">
                            {/* <div className="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-checkbox" className="ms-2 mt-1 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                            </div> */}
                            <p className="text-blue-900 text-sm mt-1">Forgot Password?</p>
                        </div>
                        <button
                            className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                        <p className="mt-2 text-sm"><Link href={"/register"}>No Account Yet? Sign Up</Link></p>
                        <p className="mt-2 text-lg">
                            <Link href={"/"} className="flex items-center gap-2">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                                </svg>
                                Back to Home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <Image
                    src="/login.webp"
                    alt="Login image"
                    width={1000}
                    height={1000}
                    priority
                    className="object-cover w-full h-screen"
                />
            </div>
        </div>
    );
}

export default LoginComponent;