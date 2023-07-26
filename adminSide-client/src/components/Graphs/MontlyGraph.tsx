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
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const MontlyGraphs = () => {
  const [revenue, setRevenue] = useState()
  const labels = [];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let i = 0; i <= new Date().getMonth(); i++) {
    labels.push(months[i])
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Montly Revenue',
        data: revenue,
        borderColor: 'rgb(93,149,247)',
        backgroundColor: 'rgba(93,149,247,0.5)',
      },
    ],
  };

  useEffect(() => {
    const fetchRevenue = async () => {

      const revenue = async () => {
        return makeApiCall(`/doctor/get-fullmonthlyRevenue`, 'GET')
      }
      const { data } = await revenue()
      setRevenue(data.monthlyRevenueArray)
    }
    fetchRevenue()
  }, [])

  return <Line data={data} />;
}

export default MontlyGraphs;