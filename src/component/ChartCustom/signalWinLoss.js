import { message } from 'antd';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SignalWinLoss({masterKey}) {
    const [total, setTotal] = useState([]);

    const getSignalWinLoss = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getSignalWinLoss/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setTotal(data[0]);
          });
    };

    const data = {  
        labels: ['Số lệnh win: ' + total?.total_win, 'Số lệnh loss: ' + total?.total_loss],
        datasets: [
            {
                label: '% Lệnh',
                data: [
                    Math.round((total?.total_win / (total?.total_win + total?.total_loss)) * 100 * 100) / 100, 
                    Math.round((total?.total_loss/ (total?.total_win + total?.total_loss)) * 100 * 100) / 100
                ],
                backgroundColor: [
                    '#10b981',
                    '#f87171',
                  ],
            }
        ],
    };

    useEffect(() => { 
        getSignalWinLoss();
    }, [masterKey]);

    return (
        <>
            <p className='text-center pb-5 font-bold text-gray-500'>Biểu đồ Tỷ lệ win rate</p>
            <Pie data={data}/>
        </>
    )
}