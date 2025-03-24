import SideBar from "../../components/sidebar";
import Image from "next/image";

const BookAppointment = () => {
    return (
        <SideBar>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center">Book Appointment</h1>
                <div className="flex justify-center w-4/5 mx-auto my-4 bg-gray-50 shadow-lg rounded-lg h-64">
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
                    </div>
                </div>
                <label>Select Appointment Date</label>
                <br />
                <input type="date" className="bg-gray-100 border-b border-gray-600 w-2/3 text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none" />
                <br />
                <h3 className="text-xl font-bold">Available Time Slots on Selected Date</h3>
                <div className="mt-3 space-x-2">
                    <p className="inline-block p-2 rounded-lg text-gray-500 border border-gray-600">10:00 AM - 11:00 AM</p>
                    <p className="inline-block p-2 rounded-lg text-gray-500 border border-gray-600">6:00 AM - 7:00 AM</p>
                </div>
                {/* <br /> */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Appointment</button>
            </div>
        </SideBar>
    )
}

export default BookAppointment;