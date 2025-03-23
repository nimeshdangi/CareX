import AdminSideBar from "@/components/adminSideBar";

const Appointments = () => {
    return (
        <AdminSideBar>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Pending Appointments</h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Registration Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Patient Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Patient Contact
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Appointment Start Time
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
                                    123456789
                                </td>
                                <td class="px-6 py-4">
                                    Jane Doe
                                </td>
                                <td class="px-6 py-4">
                                    9876543210
                                </td>
                                <td class="px-6 py-4">
                                    2024-09-05 10:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inform Patient</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Pro Doctor
                                </th>
                                <td class="px-6 py-4">
                                    987654321
                                </td>
                                <td class="px-6 py-4">
                                    John Cena
                                </td>
                                <td class="px-6 py-4">
                                    1234567890
                                </td>
                                <td class="px-6 py-4">
                                    2024-09-05 10:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inform Patient</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td class="px-6 py-4">
                                    987654321
                                </td>
                                <td class="px-6 py-4">
                                    Lebowski
                                </td>
                                <td class="px-6 py-4">
                                    1234567890
                                </td>
                                <td class="px-6 py-4">
                                    2024-09-05 10:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inform Patient</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Daniel Grayson
                                </th>
                                <td class="px-6 py-4">
                                    987654321
                                </td>
                                <td class="px-6 py-4">
                                    Grayson
                                </td>
                                <td class="px-6 py-4">
                                    1234567890
                                </td>
                                <td class="px-6 py-4">
                                    2024-09-05 10:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inform Patient</a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Smith John
                                </th>
                                <td class="px-6 py-4">
                                    987654321
                                </td>
                                <td class="px-6 py-4">
                                    Smith Adams
                                </td>
                                <td class="px-6 py-4">
                                    1234567890
                                </td>
                                <td class="px-6 py-4">
                                    2024-09-05 10:00 AM
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inform Patient</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminSideBar>
    )
}

export default Appointments;