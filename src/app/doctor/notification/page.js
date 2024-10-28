"use client"
import { useEffect, useState } from "react";
import DoctorSideBar from "../../../components/doctorSideBar";
import { useRouter } from "next/navigation";

const Notification = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);

    function timeAgo(dateString) {
        const givenDate = new Date(dateString);
        const now = new Date();

        const diffInMs = now.getTime() - givenDate.getTime(); // difference in milliseconds

        if (diffInMs < 0) {
            return 'Just now'; // Handle future dates as 'Just now' or adjust as needed
        }

        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(diffInMs / (1000 * 60));
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days <= 3) {
            return `${days} days ago`;
        } else {
            // Display date and time in 'YYYY-MM-DD HH:mm:ss' format
            const year = givenDate.getFullYear();
            const month = String(givenDate.getMonth() + 1).padStart(2, '0');
            const day = String(givenDate.getDate()).padStart(2, '0');
            const hours = String(givenDate.getHours()).padStart(2, '0');
            const minutes = String(givenDate.getMinutes()).padStart(2, '0');
            const seconds = String(givenDate.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/notifications`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                setNotifications(data.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    const markNotificationAsRead = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/read-notification/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            router.push(`/doctor?notification=${id}`);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    return (
        <DoctorSideBar>
            <div className="m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Notification</h1>
                <div className="mt-4">
                    {notifications.length === 0 ? (
                        <p>No notifications yet.</p>
                    ) : (
                        notifications.map(notification => (
                            <div onClick={() => markNotificationAsRead(notification.id)} key={notification.id} className={`flex items-start border-b border-gray-300 py-4 px-6 ${notification.isRead ? '' : 'bg-gray-100'}`}>
                                {/* <img 
                                    src={review.patient.image || "/doctor.jpg"} // Adjust the placeholder path
                                    alt={review.patient.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                /> */}
                                <div className="flex-1">
                                    <h3 className="font-semibold">{notification.title}</h3>
                                    <p className="mt-2">{notification.message}</p>
                                    <p className="mt-2 text-gray-500 text-xs">{timeAgo(notification.createdAt)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DoctorSideBar>
    )
}

export default Notification