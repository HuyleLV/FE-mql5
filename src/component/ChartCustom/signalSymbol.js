import { message } from 'antd';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SignalSymbol({masterKey}) {
    const [total, setTotal] = useState([]);

    const getSignalSymbol = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getSignalSymbol/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            console.log(data);
            setTotal(data);
          });
    };

    const data = {  
        labels: total?.symbol,
        datasets: [
            {
                label: "Count",
                data: total?.total_symbol,
                backgroundColor: [
                    '#22c55e',
                    '#14b8a6',
                    '#ef4444',
                    '#06b6d4',
                    '#f97316',
                    '#f59e0b',
                    '#eab308',
                    '#84cc16',
                    '#10b981',
                    '#0ea5e9',
                    '#6366f1',
                    '#ec4899',
                    '#64748b',
                    '#6b7280'
                ],
            }
        ],
    };

    useEffect(() => { 
        getSignalSymbol();
    }, [masterKey]);

    return (
        <>
            <p className='text-center pb-5 font-bold text-gray-500'>Biểu đồ Tỷ lệ cặp tiền</p>
            <Pie data={data}/>
        </>
    )
}