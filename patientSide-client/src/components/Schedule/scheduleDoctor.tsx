import React, { Suspense, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { makeApiCall } from '../../services/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { showAlert } from '../../config/Redux/alertSlice';
import Loading from '../Common/Loading/loading';
const ScheduleFill = React.lazy(() => import('./ScheduleFill'));
const ScheduleTime = React.lazy(() => import('./schueduleTime'));

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
  const [value, setValue] = useState(0);
  const [doctor, setDoctor] = useState<Doctor>()
  const [scheduleFormData, setScheduleFormData] = useState({})
  const [time, setTime] = useState('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    async function getDoctorData() {
      const doctorServer = async () => {
        return makeApiCall(`/doctor/get-doctor-details/${id}`, 'GET');
      };
      try {
        const { data } = await doctorServer()
        setDoctor(data)
        setTime(doctor?.worktime?.split(' ')[0] as string)
        dispatch(hideLoading())
      } catch (error: any) {
        dispatch(hideLoading())
        dispatch(showAlert(error.message))
      }
    }
    dispatch(showLoading())
    getDoctorData()
  }, [scheduleFormData])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const tabRef = useRef<any>(null);
  const tabRef1 = useRef<any>(null);
  const tabRef2 = useRef<any>(null);

  const handleClickTab1: any = () => {
    if (tabRef.current) {
      tabRef.current.click();
      setValue(1)
    }
  }
  const handleClickTab2: any = () => {
    if (tabRef1.current) {
      tabRef1.current.click()
      setValue(2)
    }
  }

  const handleScheduleForm = (value: any) => {
    setScheduleFormData(value)
  }

  const handleScheduleFormDate = ({ date, time }: any) => {
    setScheduleFormData((prev) => ({
      ...prev,
      date,
      time,
      doctorId: doctor?.DoctorId,
      patientId: user._id,
      fees:doctor?.fees
    }))
  }

  const handleSubmit = async() => {
    try {
      dispatch(showLoading())
      const addAppointment = async (credentials: { data: object }) => {
        return makeApiCall('/doctor/add-appointment', 'POST', credentials);
      };
      const {data} = await addAppointment({data:scheduleFormData})
      console.log(data);
      const payment = async (credentials:{appointmentId:string, fees:any}) => {
        return makeApiCall('/payment/stripe', 'POST', credentials);
      }
      const response = await payment({ appointmentId:data._id, fees:data.fees})
      console.log(response.data);
      window.location.href = response.data.url
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      
    }
    
  }

  return (
    <React.Fragment>
      <h1 className='font-medium text-2xl mt-2 mb-2 flex justify-start mx-3 tracking-widest'>Schedule</h1>
      <div className="flex gap-2">

        <Box sx={{ width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} aria-label="basic tabs example">
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
            <Suspense fallback={<Loading />}>
              <ScheduleFill onClick={handleClickTab2} onValue={handleScheduleForm} />
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Suspense fallback={<Loading />}>
              <ScheduleTime timeRange={{ time: time }} onClick={()=>handleSubmit()} onValue={handleScheduleFormDate} />
            </Suspense>
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