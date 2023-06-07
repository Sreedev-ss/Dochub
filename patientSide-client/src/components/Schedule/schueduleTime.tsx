import React, { useState } from 'react';
import { RadioGroup, Radio, FormControlLabel, Typography, Button, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import { makeApiCall } from '../../services/axios/axios';

interface TimeSlot {
  time: string
}

interface TimeSlotPickerProps {
  timeRange: TimeSlot;
  onValue: any;
  id: any;
}

const ScheduleTime: React.FC<TimeSlotPickerProps> = ({ timeRange, id, onValue }) => {
  const [scheduleTime, setScheduleTime] = useState({
    date: '',
    time: ''
  })
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    let start: number = 0;
    let end: number = 0;
    const { time } = timeRange;
    if (time == 'Day') start = 9, end = 17
    if (time == 'Evening') start = 16, end = 19
    if (time == 'Night') start = 19, end = 21
    for (let i = start; i <= end; i++) {
      timeSlots.push({ start: i, end: i + 1 });
    }
    return timeSlots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const validate = async (values: { date: string; time: string }) => {
    const errors: { date?: string; time?: string } = {};
    
    if (!values.date) {
      errors.date = 'Select a date';
    }
    if (!values.time) {
      errors.time = 'Select an hour slot';
    }
    if (values.date) {
      const getAppointment = async (credentials: { date: string, dId: string }) => {
        return makeApiCall(`/doctor/all-appointment-bydate`, 'POST', credentials)
      }
      const dId = id.doctor
      const date = values.date
      const { data } = await getAppointment({ date, dId })
      console.log(data);
      
      for (let i = 0; i < data?.length; i++) {
        console.log(data[i].time, values.time);
        if (data[i].time == values.time) {
          
          errors.time = 'Slot already booked'
          
        } 
      }
      return errors
    }
    return errors;
  };


  const formik = useFormik({
    initialValues: {
      date: '',
      time: ''
    },
    validate,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      onValue(values)
    }
  })

  function convertTo12HourFormat(timeRange: string): string {
    const [start, end] = timeRange.split("-");

    const formattedStartTime = formatTime(start);
    const formattedEndTime = formatTime(end);

    function formatTime(hour: any): string {
        const meridiem = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}${meridiem}`;
      }

    return `${formattedStartTime} - ${formattedEndTime}`;
}

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Typography className='flex' variant="h6">Select Date:</Typography>
          <RadioGroup row name="date" value={formik.values.date} onChange={formik.handleChange}>
            {dates.map((date: any, index) => (
              <FormControlLabel
                key={index}
                value={date.toDateString()}
                control={<Radio />}
                label={date.toLocaleDateString()}
              />
            ))}
          </RadioGroup>
          {formik.touched.date && formik.errors.date && (
            <FormHelperText error>{formik.errors.date}</FormHelperText>
          )}
        </div>

        <div className='mt-5'>
          <Typography className='flex' variant="h6">Select Hour Slot:</Typography>
          <RadioGroup name="time" value={formik.values.time} onChange={formik.handleChange}>
            {timeSlots.map((slot: any, index) => (
              <FormControlLabel
                key={index}
                value={`${slot.start}-${slot.end}`}
                control={<Radio />}
                label={`${convertTo12HourFormat(slot.start+'-'+slot.end)}`}
              />
            ))}
          </RadioGroup>
          {formik.touched.time && formik.errors.time && (
            <FormHelperText error>{formik.errors.time}</FormHelperText>
          )}
        </div>

        <Button type="submit" >Next</Button>
      </form>
    </div>
  );
};

export default ScheduleTime;
