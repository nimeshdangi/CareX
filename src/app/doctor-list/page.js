import Image from "next/image";
import SideBar from "../../components/sidebar";
import Link from "next/link";

const DoctorList = () => {
    return (
        <SideBar>
            <div class="relative w-1/2 mx-auto my-4">
                <input
                    type="text"
                    placeholder="Search doctors by name or specialization"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-64 flex justify-center mb-4 mx-auto">Search</button>
            <h2 className="text-2xl font-bold text-center">Doctor List based on Popularity</h2>
            <div>
                <div className="flex justify-center w-2/3 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
                    <Image 
                        src="/doctor1.jpeg"
                        alt="doctor"
                        width={500}
                        height={500}
                        className="rounded-l-lg w-1/3 object-cover"
                    />
                    <div className="w-2/3 p-4">
                        <h3 className="text-xl font-bold">Dr. John Doe</h3>
                        <p className="text-gray-500">Specialty: Cardiologist</p>
                        <p className="text-gray-500">Rating: 4.5</p>
                        <p className="text-gray-500">Experience: 10 years</p>
                        <p className="text-gray-500">50 Appointments</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">View Profile</button>
                        <Link href="/book-appointment" className="bg-blue-500 text-white px-4 py-3 rounded-lg mt-4">Book Appointment</Link>
                        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Appointment</button> */}
                    </div>
                </div>
                <div className="flex justify-center w-2/3 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
                    <Image 
                        src="/doctor1.jpeg"
                        alt="doctor"
                        width={500}
                        height={500}
                        className="rounded-l-lg w-1/3 object-cover"
                    />
                    <div className="w-2/3 p-4">
                        <h3 className="text-xl font-bold">Dr. Jane Doe</h3>
                        <p className="text-gray-500">Specialty: Physiotherapist</p>
                        <p className="text-gray-500">Rating: 4.5</p>
                        <p className="text-gray-500">Experience: 8 years</p>
                        <p className="text-gray-500">53 Appointments</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">View Profile</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Appointment</button>
                    </div>
                </div>
                <div className="flex justify-center w-2/3 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
                    <Image 
                        src="/doctor1.jpeg"
                        alt="doctor"
                        width={500}
                        height={500}
                        className="rounded-l-lg w-1/3 object-cover"
                    />
                    <div className="w-2/3 p-4">
                        <h3 className="text-xl font-bold">Dr. Bob Smith</h3>
                        <p className="text-gray-500">Specialty: Dermatologist</p>
                        <p className="text-gray-500">Rating: 4.5</p>
                        <p className="text-gray-500">Experience: 9 years</p>
                        <p className="text-gray-500">56 Appointments</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">View Profile</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Appointment</button>
                    </div>
                </div>
            </div>
        </SideBar>
    )
}

export default DoctorList;