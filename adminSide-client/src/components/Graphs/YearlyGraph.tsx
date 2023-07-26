import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
  import { makeApiCall } from '../../services/axios/axios';
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  
  const YearlyGraphs = () => {
    const [revenue, setRevenue] = useState()
    const [year,setYear] = useState(0)
    const labels = [];
      
    useEffect(() => {
        const fetchRevenue = async () => {
    
          const revenue = async () => {
            return makeApiCall(`/doctor/get-fullyearRevenue`, 'GET')
          }
          const { data } = await revenue()
          setRevenue(data?.yearlyRevenueArray)
          setYear(data?.result[0]?._id.year)
        }
        fetchRevenue()
      }, [])
    
  
    for (let i = 4; i >= 0; i--) {
      labels.push(year - i)
    }
    const data = {
      labels,
      datasets: [
        {
          label: 'Yearly Revenue',
          data: revenue,
          borderColor: 'rgb(93,149,247)',
          backgroundColor: 'rgba(93,149,247,0.5)',
        },
      ],
    };

    return <Line data={data} />;
  }
  
  export default YearlyGraphs;