"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
    const paymentProcessed = useRef(false);

    useEffect(() => {
        const sendPaymentData = async () => {
            if (typeof window !== "undefined") {
                const urlParams = new URLSearchParams(window.location.search);
                const extractedData = Object.fromEntries(urlParams.entries());
                console.log(extractedData);
    
                if (extractedData && extractedData.status === 'Completed' && !paymentProcessed.current) {
                    try {
                        console.log("Trying to send payment data to the backend...");
                        // Prepare the data to be sent to the backend
                        const dataToSend = {
                            appointment_id: extractedData.purchase_order_id,
                            payment_data: extractedData,
                        };

                        console.log(dataToSend);
                        // console.log(localStorage.getItem('token'));
    
                        // Send the data to the backend using fetch with async/await
                        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/payment-complete`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token'),
                            },
                            body: JSON.stringify(dataToSend),
                        });
    
                        // Handle the response
                        if (response.ok) {
                            const data = await response.json();
                            console.log('Payment data sent successfully:', data);
                            toast.success(data.message);
                        } else {
                            const data = await response.json();
                            console.error('Failed to send payment data:', response.statusText);
                            toast.error(data.message);
                        }
                        paymentProcessed.current = true;
                    } catch (error) {
                        console.error('Error processing payment data:', error);
                    }
                }
            }
        };
    
        sendPaymentData();
    }, [paymentProcessed.current])

    return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
            <h1 className="">Payment Success</h1>
            <Link href={"/appointment"} className="p-2 mt-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-white">Go back to Appointments</Link>
        {/* <p>Doctor ID: {doctor_id}</p> */}
        </div>
    );
}

export default PaymentSuccessPage;