"use client";
import DoctorSideBar from "../../../components/doctorSideBar";
import moment from "moment";
import React, { useMemo } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

  // Initialize the localizer with moment
  const mLocalizer = momentLocalizer(moment);

const Appointments = () => {
    const [currentView, setCurrentView] = React.useState('month');

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

  // Render the Calendar component with the proper properties
  return (
    <DoctorSideBar>
        <Calendar
            localizer={mLocalizer}
            events={events}
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
            style={{ height: 500 }}
        />
    </DoctorSideBar>
  );
};

export default Appointments;