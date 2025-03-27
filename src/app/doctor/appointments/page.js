"use client";
import { useRouter } from "next/navigation";
import DoctorSideBar from "../../../components/doctorSideBar";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast } from "sonner";

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

  // Initialize the localizer with moment
  const mLocalizer = momentLocalizer(moment);

const Appointments = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('month');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/doctor/appointment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          toast.error(data.message);
          router.push("/login");
        }

        const formattedAppointments = data.data.map((appointment) => ({
          title: appointment.patient_id ? "Appointment Slot Booked" : "Slot Not Booked Yet",
          start: new Date(appointment.start_date_time),
          end: new Date(appointment.end_date_time),
          id: appointment._id,
        }))
        setAppointments(formattedAppointments);
        // console.log(data);
        // setAppointments(data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }

    fetchAppointments();
  }, []);

  // Memoize the components, defaultDate, max, and views to optimize rendering
  const { components, defaultDate, max, views } = useMemo(() => {
    return {
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: moment().endOf('day').subtract(1, 'hours').toDate(), // Properly calculate 'max' using moment
      views: Object.keys(Views).map((k) => Views[k]),
        views: ['day', 'week', 'month'],
    };
  }, []);

  // Ensure all event IDs are unique
  const events = [
    {
      id: 1,
      title: 'Video Appointment',
      start: new Date(2024, 8, 13, 7, 0, 0),
      end: new Date(2024, 8, 13, 7, 30, 0),
    },
    {
      id: 2, // Changed ID to be unique
      title: 'Another Video Appointment',
      start: new Date(2024, 8, 13, 8, 0, 0),
      end: new Date(2024, 8, 13, 8, 30, 0),
    },
    {
      id: 3, // Changed ID to be unique
      title: 'Video Appointment 2',
      start: new Date(2024, 8, 14, 18, 0, 0),
      end: new Date(2024, 8, 14, 18, 30, 0),
    },
    {
      id: 4, // Changed ID to be unique
      title: 'Video Appointment Again',
      start: new Date(2024, 8, 14, 20, 0, 0),
      end: new Date(2024, 8, 14, 20, 30, 0),
    },
  ];

  if(appointments.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Render the Calendar component with the proper properties
  return (
    <DoctorSideBar>
        <Calendar
            localizer={mLocalizer}
            events={appointments}
            defaultDate={defaultDate}
            max={max}
            components={components}
            showMultiDayTimes
            step={30}
            views={views}
            view={currentView}
            // defaultView={currentView}
            // currentView={currentView}
            onView={setView => {
                console.log("View changed to " + setView);
                setCurrentView(setView);
            }}
            style={{ height: 600, padding: 20 }}
        />
        <button onClick={() => router.push("/doctor/appointments/add")} className="flex w-auto mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Add Appointment Slots</button>
    </DoctorSideBar>
  );
};

export default Appointments;