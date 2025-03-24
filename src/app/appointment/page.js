import SideBar from "../../components/sidebar";

const Appointment = () => {
    return (
        <SideBar>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Upcoming Appointments</h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Specialization
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Time
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
                                    Neurology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-01
                                </td>
                                <td class="px-6 py-4">
                                    6:00 AM - 6:30 AM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <div className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:underline">Postpone Appointment</div>
                                    <div className="font-medium bg-red-100 py-2 rounded-md text-center mt-2 text-red-600 dark:text-red-500 hover:underline">Cancel Appointment</div>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Pro Doctor
                                </th>
                                <td class="px-6 py-4">
                                    Oncology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-02
                                </td>
                                <td class="px-6 py-4">
                                    7:00 AM - 7:30 AM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <div className="font-medium bg-blue-100 py-2 rounded-md text-center text-blue-600 dark:text-blue-500 hover:underline">Postpone Appointment</div>
                                    <div className="font-medium bg-red-100 py-2 rounded-md text-center mt-2 text-red-600 dark:text-red-500 hover:underline">Cancel Appointment</div>
                                    {/* <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postponed to later(By You)</span> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Appointments History</h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Specialization
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Consultation Time
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
                                    Neurology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-01
                                </td>
                                <td class="px-6 py-4">
                                    6:00 AM - 6:30 AM
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
                                    Pro Doctor
                                </th>
                                <td class="px-6 py-4">
                                    Oncology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-02
                                </td>
                                <td class="px-6 py-4">
                                    7:00 AM - 7:30 AM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postponed to later(By You)</span>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td class="px-6 py-4">
                                    Cardiology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-03
                                </td>
                                <td class="px-6 py-4">
                                    8:00 PM - 8:30 PM
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
                                    Daniel Grayson
                                </th>
                                <td class="px-6 py-4">
                                    Psychology
                                </td>
                                <td class="px-6 py-4">
                                    2024-01-04
                                </td>
                                <td class="px-6 py-4">
                                    9:00 PM - 9:30 PM
                                </td>
                                <td class="px-6 py-4">
                                    30 Minutes
                                </td>
                                <td class="px-6 py-4">
                                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Completed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </SideBar>
    )
}

export default Appointment;