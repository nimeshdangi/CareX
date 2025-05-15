"use client"
import AdminSideBar from "../../components/adminSideBar";
// import { Pie } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const generateLabels = () => {
  const labels = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    if (i === 0) {
      labels.push("Today");
    } else if (i === 1) {
      labels.push("Yesterday");
    } else {
      labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" })); // Formats date as "Sep 5"
    }
  }

  return labels;
};

const AdminPanel = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [unapprovedDoctorCount, setUnapprovedDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [weeklyAppointments, setWeeklyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const labelsForLine = generateLabels();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countRes, appointmentRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/patient-doctor-count`),
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/this-week-appointments`),
                ]);

                const doctorPatientData = await countRes.json();
                const weeklyData = await appointmentRes.json();
                console.log(doctorPatientData, weeklyData);

                setDoctorCount(doctorPatientData.approvedDoctor || 0);
                setUnapprovedDoctorCount(doctorPatientData.unapprovedDoctor || 0);
                setPatientCount(doctorPatientData.patient || 0);

                setWeeklyAppointments(weeklyData.counts || []);
            } catch (error) {
                console.error("Error fetching admin dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AdminSideBar>
            <div>
                {loading ? (
                    <p className="text-center mt-20">Loading dashboard...</p>
                ) : (
                <div className="w-1/3 mx-auto mt-10">
                    <Pie
                        data={{
                            labels: ["Approved Doctors", "Unapproved Doctors", "Patients"],
                            datasets: [
                            {
                                data: [doctorCount, unapprovedDoctorCount, patientCount],
                                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                            },
                            ],
                        }}
                    />
                    <br />
                    <Line
                        data={{
                            labels: labelsForLine,
                            datasets: [
                            {
                                label: "Appointments This Week",
                                data: weeklyAppointments,
                                fill: true,
                                backgroundColor: "rgba(255,99,132,0.2)",
                                borderColor: "#FF6384",
                                tension: 0.2,
                            },
                            ],
                        }}
                        options={{
                            scales: {
                            y: { beginAtZero: true },
                            },
                        }}
                    />
                </div>
                )}
            </div>
        </AdminSideBar>
    )
}

export default AdminPanel;