import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ExamApi from '../api/examapi';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function ExamGradeChartComponent(props) {

    const [myData, setMyData] = useState([
        0,0,0,0,0,0,0,0,0,0
    ]);

    const emptyTable = [0,0,0,0,0,0,0,0,0,0];

    const examApi = new ExamApi();
    

    useEffect(() => {
        fetchGrades();
    },[]);

    async function fetchGrades() {
        const response = (await examApi.getGrades(props.examId)).data;
        const tempData = [...emptyTable];
        console.log(response);
        response.map((g) => tempData[parseInt(g / 10)]++);
        setMyData(tempData);
    }

    

    const labels = ['<10', '<20', '<30', '<40', '<50', '<60', '<70', '<80', '<90', '<100', '100'];

    const data = {
        labels,
    datasets: [
          {
            label: 'Öğrenciler',
            data: myData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };   
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sınav Not Dağılımı',
            },
        },
    };

    return <div style={{margin:'auto', width:'60%'}}><Bar options={options} data={data} /></div>
}