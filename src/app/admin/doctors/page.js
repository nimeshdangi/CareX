"use client"
import { useEffect, useState } from "react";
import AdminSideBar from "../../../components/adminSideBar";
import Link from "next/link";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/all`);
                const data = await response.json();
                setDoctors(data.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <AdminSideBar>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Doctor List</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Doctor Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Speciality
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Registration Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Approved or Not
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {doctor.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {doctor.specification}
                                    </td>
                                    <td className="px-6 py-4">
                                        {doctor.registrationNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {doctor.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/doctors/${doctor.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                    </td>
                                </tr>
                            ))}
                            {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    John Doe
                                </th>
                                <td className="px-6 py-4">
                                    Psychiatrist
                                </td>
                                <td className="px-6 py-4">
                                    123456789
                                </td>
                                <td className="px-6 py-4">
                                    Approved
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Pro Doctor
                                </th>
                                <td className="px-6 py-4">
                                    Neurologist
                                </td>
                                <td className="px-6 py-4">
                                    987654321
                                </td>
                                <td className="px-6 py-4">
                                    Unapproved
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Alexander
                                </th>
                                <td className="px-6 py-4">
                                    Dermatologist
                                </td>
                                <td className="px-6 py-4">
                                    987654321
                                </td>
                                <td className="px-6 py-4">
                                    Approved
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Daniel Grayson
                                </th>
                                <td className="px-6 py-4">
                                    Cardiologist
                                </td>
                                <td className="px-6 py-4">
                                    987654321
                                </td>
                                <td className="px-6 py-4">
                                    Unapproved
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Smith John
                                </th>
                                <td className="px-6 py-4">
                                    Neurosurgeon
                                </td>
                                <td className="px-6 py-4">
                                    987654321
                                </td>
                                <td className="px-6 py-4">
                                    Approved
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminSideBar>
    )
}

export default Doctors;