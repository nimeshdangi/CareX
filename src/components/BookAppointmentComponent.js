"use client"
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import DoctorDashboardTopbar from "../components/DoctorDashboardTopbar";

const BookAppointmentComponent = () => {
    const router = useRouter();
    const params = useParams();
    const {id} = params;
    const [doctor, setDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(-1);
    const [timeSlots, setTimeSlots] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [price, setPrice] = useState(0); // State to store price

    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/time_slots?doctor_id=${id}&date=${appointmentDate}`);
                const data = await response.json();
                console.log(data);
                setTimeSlots(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchTimeSlots();
    }, [appointmentDate, id]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${id}`);
                const data = await response.json();
                console.log(data);
                setDoctor(data.data);
                setAverageRating(parseFloat(data.data.averageRating) || 0);
            } catch (error) {
                toast.error(error.message);
            }
        };

        // const fetchReviews = async () => {
        //     try {
        //         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/review`, {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': localStorage.getItem('token')
        //             }
        //         });
        //         const data = await response.json();
        //         console.log(data);
        //         if (response.status === 401) {
        //             toast.error(data.message);
        //             router.push('/login');
        //         }
        //         setAverageRating(parseFloat(data.averageRating.averageRating) || 0);
        //         setLoading(false);
        //     } catch (error) {
        //         console.error('Error fetching reviews:', error);
        //     }
        // }

        fetchDoctor();
        // fetchReviews();
    }, [id]);

    // Function to calculate duration and set price
    const calculatePrice = (start, end) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const durationInMinutes = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes

        if (durationInMinutes === 60) return 200;
        if (durationInMinutes === 30) return 100;
        if (durationInMinutes === 15) return 50;
        return 0; // Default price if no match
    };

    // Handle selecting a time slot and updating price
    const handleSelectTimeSlot = (index) => {
        setSelectedTimeIndex(index);
        const selectedSlot = timeSlots[index];
        if (selectedSlot) {
            const price = calculatePrice(selectedSlot.start_date_time, selectedSlot.end_date_time);
            setPrice(price);
        }
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        if(selectedTimeIndex === -1) {
            toast.error("Please select a time slot");
            return;
        }
        if (localStorage.getItem("token") === null) {
            toast.error("Please login to book an appointment");
            router.push("/login");
            return;
        }
        const appointmentId = timeSlots[selectedTimeIndex].id;

        try {

            // code for khalti payment

            const payload = {
                return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment-complete/`,
                website_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
                amount: price * 100,
                purchase_order_id: appointmentId,
                purchase_order_name: `Appointment with Dr. ${doctor.name}`,
            }
            console.log(payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/khalti-api`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log(data);
            // toast.success("Payment Succeeded via Khalti");

            if (response.ok) {
                window.location.href = data.data.payment_url;
            } else {
                toast.error(data.message);
            }

            // code without khalti payment

            // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/book-appointment`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": localStorage.getItem("token")
            //     },
            //     body: JSON.stringify({doctor_id: id, appointment_id: appointmentId}),   
            // });

            // console.log(response);

            // const result = await response.json();
            // console.log(result);

            // if (response.ok) {
            //     toast.success(result.message);
            //     router.push("/appointment");
            // } else if (response.status === 401) {
            //     toast.error(result.message);
            //     router.push("/login");
            // } else {
            //     toast.error(result.message);
            // }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0; // Check for half star

        // Push filled stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`filled-${i}`} className="w-6 h-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
            );
        }

        // Push half star if needed
        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-6 h-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M13 4.024v-.005c0-.053.002-.353-.217-.632a1.013 1.013 0 0 0-1.176-.315c-.192.076-.315.193-.35.225-.052.05-.094.1-.122.134a4.358 4.358 0 0 0-.31.457c-.207.343-.484.84-.773 1.375a168.719 168.719 0 0 0-1.606 3.074h-.002l-4.599.367c-1.775.14-2.495 2.339-1.143 3.488L6.17 15.14l-1.06 4.406c-.412 1.72 1.472 3.078 2.992 2.157l3.94-2.388c.592-.359.958-.996.958-1.692v-13.6Zm-2.002 0v.025-.025Z" clipRule="evenodd" />
                </svg>
            );
        }

        // Push blank stars for the remaining
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars.push(
                <svg key={`blank-${i}`} className="w-6 h-6 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                </svg>
            );
        }

        return <div className="flex">{stars}</div>;
    };

    if(!doctor) {
        return <div className="flex justify-center items-center h-screen w-full">Loading...</div>
    }

    return (
        <SideBar>
            <DoctorDashboardTopbar title="Book Appointment" />
            <div className="p-4 flex gap-5">
                <div className="flex-1 flex flex-col gap-10 justify-center my-4">
                    <div className="flex">
                        <Image 
                            src={doctor.image !== null ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doctor.image}` : "/doctor1.jpeg"}
                            alt="doctor"
                            width={300}
                            height={300}
                            className="rounded-full w-56 h-56 object-cover"
                        />
                        <div className="w-1/2 p-4 flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-3">Dr. {doctor.name}</h3>
                            <a className="text-gray-500" href={`mailto:${doctor.email}`}>{doctor.email}</a>
                            <a className="text-gray-500" href={`tel:${doctor.phone_no}`}>{doctor.phone_no}</a>
                            {/* <p className="text-gray-500">Rating: 4.5</p>
                            <p className="text-gray-500">Experience: 10 years</p>
                            <p className="text-gray-500">50 Appointments</p> */}
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex-2 bg-gray-100 shadow-md rounded-lg p-4">
                            <h3 className="text-xl font-bold mb-3">Qualification: {doctor.qualification}</h3>
                            <h3 className="text-xl font-bold">Registration Number: {doctor.registrationNumber}</h3>
                        </div>
                        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-bold">Average Rating</h2>
                            <div className="flex items-center">
                                <span className="text-4xl font-bold">
                                    {averageRating != null ? averageRating.toFixed(1) : 'N/A'}
                                </span>
                                <div className="ml-2">{renderStars(averageRating)}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Reviews</h2>
                        <div>
                            {doctor.reviews.length === 0 ? (
                                <div className="bg-gray-100 p-2 shadow-md rounded-lg">No reviews yet.</div>
                            ) : (
                                doctor.reviews.map(review => (
                                    <div key={review.id} className="flex items-start border-b border-gray-300 py-4">
                                        <img 
                                            src={review.patient.image || "/doctor.jpg"} // Adjust the placeholder path
                                            alt={review.patient.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{review.patient.name}</h3>
                                            <div className="flex items-center">
                                                {renderStars(review.rating)} {/* Display stars for the review rating */}
                                            </div>
                                            <p className="mt-2">{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <label>Select Appointment Date</label>
                    <br />
                    <div 
                        onClick={() => document.getElementById('appointmentDate').showPicker()}
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none cursor-pointer"
                    >
                        <input
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => {setAppointmentDate(e.target.value); setSelectedTimeIndex(-1)}}
                            type="date"
                            className="bg-transparent w-full focus:outline-none"
                            // className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        />
                    </div>
                    <br />
                    {appointmentDate && timeSlots?.length > 0 ? (
                        <>
                            <h3 className="text-xl font-bold">Available Time Slots on Selected Date</h3>
                            <div className="mt-3 space-x-2">
                                {timeSlots.map((timeSlot, index) => (
                                    <p key={index} onClick={() => handleSelectTimeSlot(index)} className={`inline-block p-2 rounded-lg border border-gray-600 ${selectedTimeIndex === index ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
                                        {(new Date(timeSlot.start_date_time)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true, timeZone: "Asia/Katmandu"})}
                                        {" - "}
                                        {(new Date(timeSlot.end_date_time)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true, timeZone: "Asia/Katmandu"})}
                                    </p>
                                ))}
                            </div>
                        </>
                    ): !appointmentDate ? (
                        <p>Please select a date</p>
                    ): timeSlots?.length === 0 ? (
                        <p>No time slots available on selected date</p>
                    ): <p>Loading</p>}
                    {/* <br /> */}
                    <div className="flex justify-center mt-4">
                        <button
                            className={`px-4 py-2 rounded-lg w-fit 
                                ${selectedTimeIndex < 0 || appointmentDate == null 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#5E338D] text-white hover:bg-[#7f4db5]"}
                            `}
                            disabled={selectedTimeIndex < 0 || appointmentDate == null}
                            onClick={handleBookAppointment}
                            >
                            Book {price > 0 && `via Khalti - Rs ${price}`}
                        </button>
                    </div>
                </div>
            </div>
        </SideBar>
    )
}

export default BookAppointmentComponent;