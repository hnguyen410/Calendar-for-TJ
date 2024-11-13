import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleStartMonday, setScheduleStartMonday] = useState(() => {
    const savedDate = localStorage.getItem('scheduleStartMonday');
    return savedDate ? new Date(savedDate) : null;
  });
  const [isWeekOnePattern, setIsWeekOnePattern] = useState(() => {
    const savedPattern = localStorage.getItem('isWeekOnePattern');
    return savedPattern ? JSON.parse(savedPattern) : true;
  });

  useEffect(() => {
    if (scheduleStartMonday) {
      localStorage.setItem('scheduleStartMonday', scheduleStartMonday.toISOString());
      localStorage.setItem('isWeekOnePattern', JSON.stringify(isWeekOnePattern));
    }
  }, [scheduleStartMonday, isWeekOnePattern]);

  const handleCustomizeClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDateClick = (date) => {
    const dayOfWeek = date.getDay();
    const startMonday = new Date(date);
    startMonday.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to Monday

    setScheduleStartMonday(startMonday);
    setIsWeekOnePattern([1, 2, 5, 6, 0].includes(dayOfWeek)); // Week 1 if Mon, Tues, Fri, Sat, Sun; else Week 2
  };

  const handleUpdateSchedule = () => {
    if (scheduleStartMonday) {
      alert('Work schedule updated!');
      setIsModalOpen(false);
    } else {
      alert('Please select a start date first.');
    }
  };

  const getWorkPattern = (isWeekOne, dayOfWeek) => {
    const week1Workdays = [1, 2, 5, 6, 0];
    const week2Workdays = [3, 4];

    return isWeekOne ? week1Workdays.includes(dayOfWeek) : week2Workdays.includes(dayOfWeek);
  };

  const tileClassName = ({ date }) => {
    if (!scheduleStartMonday) return '';

    const currentMonday = new Date(date);
    const dayOfWeek = date.getDay();
    currentMonday.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to Monday

    const weeksBetween = Math.round((currentMonday - scheduleStartMonday) / (1000 * 60 * 60 * 24 * 7));
    const isCurrentWeekPatternWeekOne = isWeekOnePattern ? weeksBetween % 2 === 0 : weeksBetween % 2 !== 0;

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    // Add classes for workday/dayoff and additional class for today
    let classes = getWorkPattern(isCurrentWeekPatternWeekOne, dayOfWeek) ? 'workday' : 'dayoff';
    if (isToday) classes += ' today';

    return classes;
  };

  return (
    <div className='app-background'>
      <div  style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 0}}>
        <div>
          {/* <h1 >Calendar for My Cut Heo</h1> */}
          <div onClick={handleCustomizeClick} style={{marginTop: 40, cursor: 'pointer', color: 'black',
            fontSize: 50, alignItems: 'center', borderRadius: 10, display: 'flex', justifyContent: 'center', 
            alignSelf: 'center',  fontFamily: 'Gill Sans Extrabold, cursive'}}>
        <h3 style={{fontFamily: 'cursive'}}>Calendar for My Cut Heo!</h3>
        </div>
      </div>

      {isModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <button onClick={closeModal} style={closeButtonStyles}>Close</button>
            <h2>Select a Start Date for Your Schedule</h2>
            <Calendar
              value={selectedDate}
              onClickDay={handleDateClick}
              tileClassName={tileClassName}
            />
            <button onClick={handleUpdateSchedule} style={workDayButtonStyles}>
              Update My Work Schedule
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

// Modal styling
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '5px 10px',
};

const workDayButtonStyles = {
  marginTop: '30px',
  padding: '8px 12px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  color: 'black',
  border: 'black',
  borderRadius: '10px',
  width: '230px',
  height: '40px',
  cursor: 'pointer',
  borderWidth: '4px',
  borderColor: 'black',
  fontSize: '16px',
};

export default App;
