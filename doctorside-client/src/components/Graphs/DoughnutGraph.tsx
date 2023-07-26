import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChat = ({ male, female }: any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['female', 'male'],
        datasets: [
            {
                label: 'Number of Patients',
                data: [female, male],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)',
                ]
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
}

export default DoughnutChat;