import DoughnutChat from '../Graphs/DoughnutGraph';
import YearlyGraphs from '../Graphs/YearlyGraph';
import MontlyGraphs from '../Graphs/MontlyGraph';
import SymptomDoughnut from '../Graphs/SymptomDoughnut';

const Dashboard = ({ totalPatients, revenue, gender, symptomType }: any) => {
    const cardData = [
        {
            title: 'Total Patients',
            data: totalPatients,
        },
        {
            title: 'Total Revenue',
            data: `Rs ${revenue}`,
        },
        {
            title: 'Total Appointments',
            data: '18',
        },
        {
            title: 'Patients',
            data: '100k',
        },
    ];

    return (
        <>
            <h1 className='font-medium text-2xl flex mx-5 mt-4'>Welcome Admin &#128522;</h1>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-5 mx-5">
                {cardData.map((data) => (
                    <div className="block w-full p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <h5 className="mb-2 float- text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
                        <p className="font-normal text-gray-700">{data.data}</p>
                    </div>
                ))}
            </div>
            <div className="bg-white mt-5 p-5 mx-5 rounded-xl flex w-screen items-center justify-around">
                <div className="w-3/12">
                    <DoughnutChat gender={gender} />
                </div>
                <div className='w-7/12'>
                    <MontlyGraphs />
                </div>
            </div>
            <div className="bg-white mt-5 p-5 mx-5 rounded-xl flex w-screen items-center justify-evenly">
            <div className="w-3/12">
                    <SymptomDoughnut symptomType={symptomType} />
                </div>
                <div className='w-7/12'>
                    <YearlyGraphs />
                </div>
            </div>
        </>
    );
}

export default Dashboard;