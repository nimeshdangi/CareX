import Image from "next/image";
import Link from "next/link";

const DoctorRegister = () => {
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
                <div className="bg-white rounded-lg shadow-lg px-8 py-4 max-w-xl w-full">
                    {/* Your content here */}
                    <h1 className="text-4xl font-bold mb-4 text-center">Sign Up</h1>
                    <p className="mb-8 text-center">With account you can consult with our therapists</p>
                    <div className="flex text-left gap-5">
                        <div className="flex-1">
                            <label htmlFor="email">First Name</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Jane Doe"
                                aria-label="Full name"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email">Last Name</label>
                            <input
                                className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Jane Doe"
                                aria-label="Full name"
                            />
                        </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Jane Doe"
                        aria-label="Full name"
                    />
                    <label htmlFor="email">Contact Number</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Contact Number"
                        aria-label="Full name"
                    />
                    <label htmlFor="email">Registration Number</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Registration Number"
                        aria-label="Full name"
                    />
                    <label htmlFor="email">Password</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                        type="button"
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

export default DoctorRegister;