import React, { useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { docServer } from '../../services/axios/axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { showAlert } from '../../config/Redux/alertSlice';
import ScheduleFill from '../ScheduleFill/ScheduleFill';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Doctor {
  email: string,
  DoctorId: string,
  specialization: string,
  fees: number,
  mobile: number,
  address: string,
  photoURL: string,
  worktime: string,
  name: string;
  DOB: string;
  gender: string;
  about: string;

}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ScheduleDoctor = () => {
  const [value, setValue] = React.useState(0);
  const [doctor, setDoctor] = useState<Doctor>()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showLoading())
    docServer.get(`/get-doctor-details/${id}`).then(({ data }) => {
      setDoctor(data)
      dispatch(hideLoading())
    }).catch((err: any) => {
      dispatch(hideLoading())
      dispatch(showAlert(err.message))
    })
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabRef = useRef<any>(null);
  const tabRef1 = useRef<any>(null);
  const tabRef2 = useRef<any>(null);

  const handleClickTab1: any = () => {
    if (tabRef.current) {
      tabRef.current.click();
    }
  }
  const handleClickTab2: any = () => {
    if (tabRef1.current) {
      tabRef1.current.click()
    }

  }
  return (
    <React.Fragment>
      <h1 className='font-medium text-2xl mt-2 mb-2 flex justify-start mx-3 tracking-widest'>Schedule</h1>
      <div className="flex gap-2">

        <Box sx={{ width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Doctor" {...a11yProps(0)} />
              <Tab ref={tabRef} label="Details" {...a11yProps(1)} />
              <Tab ref={tabRef1} label="Time" {...a11yProps(2)} />
              <Tab ref={tabRef2} label="Payment" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box sx={{ backgroundColor: 'white', padding: 1, width: '100%', borderRadius: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  backgroundColor: '#f5f5f5',
                  maxWidth: 500,
                  margin: 'auto',
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    marginBottom: 2,
                  }}
                  alt={doctor?.name}
                  src={doctor?.photoURL ? doctor.photoURL : doctor?.name}
                />
                <Typography variant="h6" align="center">
                  Dr. {doctor?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  {doctor?.specialization}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" align='justify'>
                    {doctor?.about}
                  </Typography>
                </Box>
              </Box>
              <Button

                variant="contained"
                sx={{ width: '35%', marginTop: 2 }}
                onClick={handleClickTab1}
              >
                Proceed to booking
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ScheduleFill onClick={handleClickTab2} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </Box>
      </div>

    </React.Fragment >
  );
}

export default ScheduleDoctor