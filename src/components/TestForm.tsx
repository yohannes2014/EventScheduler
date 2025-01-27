import React, { useState } from "react";

// Type for selected days state
type SelectedDays = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
};

interface EventFormData {
  eventName: string;
  selectedWeekDates: string[]; // Dates of the selected weekdays
  time: string;
  eventDetails: string;
  startDate: string;
  endDate: string;
}

const EventScheduler: React.FC = () => {
  const [eventName, setEventName] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<SelectedDays>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [time, setTime] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Helper function to get the first occurrence of a weekday within a date range
  const getFirstWeekdayDate = (weekday: number, startDate: Date): Date => {
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + ((7 + weekday - currentDate.getDay()) % 7));
    return currentDate;
  };

  // Function to get all the selected weekdays' actual dates within the range
  const getWeekDatesInRange = (start: Date, end: Date): string[] => {
    const selectedWeekDates: string[] = [];
    const dayNames: { [key: string]: number } = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };

    // Loop through the selected days and find the corresponding dates
    for (let i = 0; i < 7; i++) { // Loop through each day of the week (0 to 6)
      const dayName = Object.keys(selectedDays)[i];
      if (selectedDays[dayName as keyof SelectedDays]) {
        const weekday = dayNames[dayName];
        let firstDate = getFirstWeekdayDate(weekday, start);

        // Loop to generate all occurrences of the selected weekday within the date range
        for (let currentDate = new Date(firstDate); currentDate <= end; currentDate.setDate(currentDate.getDate() + 7)) {
          selectedWeekDates.push(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
        }
      }
    }

    return selectedWeekDates;
  };

  const handleDayChange = (day: keyof SelectedDays): void => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (startDate && endDate) {
      const selectedWeekDates = getWeekDatesInRange(new Date(startDate), new Date(endDate));

      const scheduleData: EventFormData = {
        eventName,
        selectedWeekDates,
        time,
        eventDetails,
        startDate,
        endDate,
      };

      console.log("Event Scheduled:", scheduleData);
      // You can now save the data or send it to a server
    } else {
      alert("Please select a start and end date.");
    }
  };

  return (
    <div>
      <h2>Schedule Your Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Details:</label>
          <textarea
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            placeholder="Optional details for your event"
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Weekdays within Date Range:</label>
          <div>
            {startDate && endDate && (
              <div>
                <h4>Available Weekdays:</h4>
                <ul>
                  {Object.keys(selectedDays).map((day) => (
                    <li key={day}>
                      <input
                        type="checkbox"
                        id={day}
                        checked={selectedDays[day as keyof SelectedDays]}
                        onChange={() => handleDayChange(day as keyof SelectedDays)}
                      />
                      <label htmlFor={day}>{day}</label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button type="submit">Schedule Event</button>
      </form>

      <div>
        <h3>Scheduled Dates:</h3>
        <ul>
          {getWeekDatesInRange(new Date(startDate), new Date(endDate)).map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventScheduler;
