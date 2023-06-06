import React, { useState } from 'react';
import { TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ErrorMessage, useFormik } from 'formik';
import yupValidation from '../../auth/yupValidation';


const ScheduleFill: React.FC<any> = ({ onClick, onValue }) => {
  const [submitted, setSubmitted] = useState(false);
  const initialValues = {
    name: '',
    age: '',
    symptoms: '',
    email: '',
    mobile: '',
    gender: ''
  }

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: yupValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      onValue(values)
      setSubmitted(true);
    }
  })

  const handleDialogClose = () => {
    setSubmitted(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <h1 className='text-3xl font-extrabold mb-10'>Fill the form details to continue</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box display={'flex'} gap={2}>
          <TextField
            label='Name'
            name='name'
            fullWidth
            sx={{ mb: 2 }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name} />
          <TextField
            label='Age'
            name='age'
            fullWidth
            sx={{ mb: 2 }}
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age} />
        </Box>
        <Box display={'flex'} sx={{ mb: 4, gap: 2 }} >
          <TextField
            name='symptoms'
            label="Symptoms"
            multiline
            rows={4}
            fullWidth
            sx={{ mt: 2 }}
            value={formik.values.symptoms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.symptoms && Boolean(formik.errors.symptoms)}
            helperText={formik.touched.symptoms && formik.errors.symptoms} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }} gap={3}>
          <TextField
            name='email'
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }} 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email} />
          <TextField
            name='mobile'
            label="Mobile"
            fullWidth
            sx={{ mb: 2 }} 
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile} />
        </Box>
        <Box display={'flex'} sx={{ mt: 2, mb: 2, gap: 2 }} >
          <FormControl fullWidth sx={{ mb: 2 }} error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <span className='flex items-start text-sm text-[#d32f2f]'>{formik.touched.gender && formik.errors.gender}</span>
            <RadioGroup value={formik.values.gender} name='gender' row onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>

      <Dialog open={submitted} onClose={handleDialogClose}>
        <DialogTitle>Form submitted successfully!</DialogTitle>
        <DialogContent>
          <p>Your form has been submitted successfully.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Back to change</Button>
          <Button onClick={()=>onClick()}>Next</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default ScheduleFill;
