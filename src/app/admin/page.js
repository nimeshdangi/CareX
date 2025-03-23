"use client"
import AdminSideBar from "@/components/adminSideBar";
// import { Pie } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

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
    const labelForLine = generateLabels();

    return (
        <AdminSideBar>
            <div>
                <div className="w-1/3 mx-auto">
                    <Pie
                        data={{
                            labels: ["Approved Doctors", "Unapproved Doctors", "Patients"],
                            datasets: [
                                {
                                    label: "",
                                    data: [2, 3, 10],
                                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                                },
                            ]
                        }}
                    />
                    <br />
                    <Line
                        data={{
                            labels: labelForLine,
                            datasets: [
                                {
                                    label: "Number of Appointments",
                                    data: [12, 10, 15, 20, 25, 30, 35],
                                    fill: true,
                                    backgroundColor: "#FF6384",
                                    borderColor: "#FF6384",
                                    tension: 0.1,
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </AdminSideBar>
    )
}

export default AdminPanel;