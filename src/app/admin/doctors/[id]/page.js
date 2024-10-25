"use client"
import Image from "next/image";
import AdminSideBar from "../../../../components/adminSideBar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DoctorDetails = () => {
    const params = useParams();
    const router = useRouter();
    const {id} = params;
    const [doctor, setDoctor] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(!id) {
            router.push('/admin/doctors');
        }

        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${id}`);
                const data = await response.json();
                setDoctor(data.data);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        }

        fetchDoctor();
    }, [id, router]);

    const handleDoctorApproval = async (status) => {
        if(status === "Not Approved") {
            console.log("Token: ", token);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/approve/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })

            if(response.status === 401) {
                router.push("/login");
            }

            if(response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push('/admin/doctors');
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        }
    }

    return (
        <AdminSideBar>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center">Doctor Details</h1>
                <div className="w-4/5 mx-auto p-4 my-4 bg-gray-50 shadow-lg rounded-lg">
                    {/* <div className="w-2/3 p-4"> */}
                        <h3 className="text-2xl font-bold">Dr. {doctor.name}</h3>
                        <p className="text-gray-500">Email: {doctor.email}</p>
                        <p className="text-gray-500">Phone: {doctor.phone_no}</p>
                        <p className="text-gray-500">Registration Number: {doctor.registrationNumber}</p>
                        <p className="text-gray-500">Specialty: {doctor.specification}</p>
                        <p className="text-gray-500">Qualification: {doctor.qualification}</p>
                        Document
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/doctors/documents/${doctor.documents}`}
                            alt="doctor"
                            width={500}
                            height={500}
                            // className="rounded-l-lg w-1/3 object-cover"
                        />
                        <p className="text-gray-500">Rating: 4.5</p>
                        <p className="text-gray-500">Experience: 10 years</p>
                        <p className="text-gray-500">50 Appointments</p>
                    {/* </div> */}
                </div>
                <button onClick={() =>handleDoctorApproval(doctor.status)} className="flex w-auto mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                    {doctor.status == "Approved" ? "Decline" : "Approve"}
                </button>
            </div>
        </AdminSideBar>
    )
}

export default DoctorDetails;