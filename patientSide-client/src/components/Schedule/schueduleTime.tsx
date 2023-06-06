import React, { useState } from 'react';
import { RadioGroup, Radio, FormControlLabel, Typography, Button, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';

interface TimeSlot {
  time: string
}

interface TimeSlotPickerProps {
  timeRange: TimeSlot;
  onValue: any;
  onClick:any;
}

const ScheduleTime: React.FC<TimeSlotPickerProps> = ({ timeRange, onValue, onClick }) => {

  const [scheduleTime, setScheduleTime] = useState({
    date: '',
    time: ''
  })

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
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

  const validate = (values: { date: string; time: string }) => {
    const errors: { date?: string; time?: string } = {};
    if (!values.date) {
      errors.date = 'Select a date';
    }
    if (!values.time) {
      errors.time = 'Select an hour slot';
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
      onClick()
    }
  })

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
            {timeSlots.map((slot:any,index) => (
              <FormControlLabel
                key={index}
                value={`${slot.start}-${slot.end}`}
                control={<Radio />}
                label={`${slot.start}:00 - ${slot.end}:00`}
              />
            ))}
          </RadioGroup>
          {formik.touched.time && formik.errors.time && (
            <FormHelperText error>{formik.errors.time}</FormHelperText>
          )}
        </div>

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

export default ScheduleTime;
