import DoctorSideBar from "../../components/doctorSideBar";

const DoctorDashboard = () => {
    return (
        <DoctorSideBar>
            <h1 className="text-4xl font-bold mb-4 text-center">Doctor Dashboard</h1>
            <div className="flex justify-evenly flex-wrap">
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Total Appointments
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Total Patients
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Appointments this month
                    </div>
                </div>
                <div>
                    <div className="w-48 h-48 bg-blue-500 rounded-lg flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-white">10</h1>
                        Appointments this week
                    </div>
                </div>
            </div>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Appointments Today</h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Patient Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Start Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation End Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Period
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    John Doe
                                </th>
                                <td class="px-6 py-4">
                                    6:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    6:30 AM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Completed</span>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Pro Patient
                                </th>
                                <td class="px-6 py-4">
                                    7:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    7:30 AM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postponed to later(By Patient)</span>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td class="px-6 py-4">
                                    8:00 PM
                                </td>
                                <td class="px-6 py-4">
                                    8:30 PM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <div className="rounded-lg bg-blue-500 text-white px-3 py-1 text-center">Start Video Consultation</div>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Daniel Grayson
                                </th>
                                <td class="px-6 py-4">
                                    9:00 PM
                                </td>
                                <td class="px-6 py-4">
                                    9:30 PM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pending</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    N/A
                                </th>
                                <td class="px-6 py-4">
                                    10:00 PM
                                </td>
                                <td class="px-6 py-4">
                                    10:30 PM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Not Booked yet</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DoctorSideBar>
    )
}

export default DoctorDashboard;