import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const SymptomDoughnut = ({ symptomType }:any) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const labels:any =[]
    const data:any = []
    console.log(symptomType)

    symptomType?.map((item:any)=>{
        labels.push(item._id)
        data.push(item.count)
    })

    const datas = {
        labels,
        datasets: [
            {
                label: 'Number of Patients',
                data,
                backgroundColor: [
                    'rgb(93,149,247)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                ]
            },
        ],
    };

    return (
        <div>
            <Doughnut data={datas} />
        </div>
    );
}

export default SymptomDoughnut;