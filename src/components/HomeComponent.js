"use client"
import Image from "next/image";
import SideBar from "./sidebar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HomeComponent = () => {
    const router = useRouter();

    return (
        <SideBar>
            <section className="flex items-center justify-center px-6 py-24 bg-white">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center">
                {/* Left Section - Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left pr-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Expert Care From Care<span className="text-[#003D87]">X</span>
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                    Get the right specialist consultation for you or your loved ones from the comfort of your home. Whether you&apos;re seeking care for autism, therapy, 
                    or sports medicine, our platform connects you to trusted professionals, ensuring expert advice and support at your convenience.
                    </p>
                    <button className="bg-[#003D87] text-white py-2 pl-6 pr-4 rounded-md hover:bg-blue-700 transition duration-300">
                    <div 
                        className="flex justify-between"
                        onClick={() => {
                            if (localStorage.getItem("token") === null) {
                                toast.error("Please login to book an appointment")
                                router.push("/login")
                            } else {
                                router.push("/doctor-list")
                            }
                        }}
                    >
                        Book Appointment &nbsp;&nbsp;&nbsp;
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                        </svg>
                    </div>
                    </button>
                    <button onClick={() => router.push("/about-us")} className="ml-3 bg-white border border-2 border-[#003D87] text-[#003D87] hover:text-white py-2 px-6 rounded-md hover:bg-[#003D87] transition duration-300">
                    Explore
                    </button>
                </div>

                {/* Right Section - Image */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <Image
                    src={"/hero.png"}
                    alt="Hero Image"
                    className="max-w-full h-auto"
                    width={5000}
                    height={5000}
                    priority
                    />
                </div>
                </div>
            </section>
            <div className="bg-[#f2f4f8] px-6 py-8">
                <h1 className="text-3xl text-center font-bold underline mb-6">OUR SERVICES</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <Image className="rounded-t-lg" src="/service-1.png" alt="Service image" width={500} height={500} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h6 className="text-lg font-medium text-gray-900 dark:text-white">Therapist</h6>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Autism Consultations</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Helping individuals with autism find the right care and therapy solutions.</p>
                            <a href="#" className="inline-flex items-center py-2 text-sm font-medium text-center text-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Learn more
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <Image className="rounded-t-lg" src="/service-2.png" alt="Service image" width={500} height={500} />
                        </a>
                        <div className="p-5">
                        <a href="#">
                            <h6 className="text-lg font-medium text-gray-900 dark:text-white">Therapist</h6>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Therapist Consultations</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Access speech, behavioral, or physical therapy for a range of conditions.</p>
                        <a href="#" className="inline-flex items-center py-2 text-sm font-medium text-center text-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Learn more
                        </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <Image className="rounded-t-lg" src="/service-4.png" alt="Service image" width={500} height={500} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h6 className="text-lg font-medium text-gray-900 dark:text-white">Consultant</h6>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sports Medicine</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Get expert advice and rehabilitation from sports injuries.</p>
                            <a href="#" className="inline-flex items-center py-2 text-sm font-medium text-center text-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Learn more
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <Image className="rounded-t-lg" src="/service-3.png" alt="Service image" width={500} height={500} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h6 className="text-lg font-medium text-gray-900 dark:text-white">Therapist</h6>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mental Health</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Get expert advice and rehabilitation for mental health.</p>
                            <a href="#" className="inline-flex items-center py-2 text-sm font-medium text-center text-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar>
    )
}

export default HomeComponent;