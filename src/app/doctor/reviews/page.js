"use client"

import { useEffect, useState } from "react";
import DoctorSideBar from "../../../components/doctorSideBar";

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/review`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.status === 401) {
                    toast.error(data.message);
                    router.push('/login');
                }
                setReviews(data.data);
                setAverageRating(parseFloat(data.averageRating.averageRating) || 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    // Function to render stars based on rating
    const renderStars = (rating) => {
        console.log("Rating: ", rating);
        console.log("Type of rating: ", typeof rating);
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

    return (
        <DoctorSideBar>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Average Rating</h2>
                <div className="flex items-center">
                    <span className="text-4xl font-bold">
                        {averageRating != null ? averageRating.toFixed(1) : 'N/A'}
                    </span>
                    <div className="ml-2">{renderStars(averageRating)}</div>
                </div>

                <h2 className="mt-6 text-xl font-bold">Reviews</h2>
                <div className="mt-4">
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        reviews.map(review => (
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
        </DoctorSideBar>
    )
}

export default ReviewPage;