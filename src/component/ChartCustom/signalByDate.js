import { message } from 'antd';
import axios from 'axios';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
    Legend
);

export default function SignalByDate({masterKey}) {
    const [totalSignal, setTotalSignal] = useState([]);
    const [totalLot, setTotalLot] = useState([]);

    const getSignalByDate = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getSignalByDate/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            const sortedSignals = data.map((item) => item[0].total_signal);
            const sortedLot = data.map(item => item[0].total_lot);
            setTotalSignal(sortedSignals);
            setTotalLot(sortedLot);
          });
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Biểu đồ lệnh theo ngày",
            },
        },
    };
    
    const labels = [
        'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'
    ]
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Số lượng lệnh',
                data: totalSignal,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Tổng số lot',
                data: totalLot,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => { 
        getSignalByDate();
    }, [masterKey]);

    return (
        <Bar options={options} data={data} />
    )
}