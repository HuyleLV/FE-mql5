import { message } from 'antd';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SignalBuySell({masterKey}) {
    const [total, setTotal] = useState([]);

    const getSignalBuySell = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getSignalBuySell/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setTotal(data[0]);
          });
    };

    const data = {  
        labels: ['Số lệnh mua: ' + total?.total_buy, 'Số lệnh bán: ' + total?.total_sell],
        datasets: [
            {
                label: '% Lệnh mua',
                data: [
                    (total?.total_buy / (total?.total_buy + total?.total_sell)) * 100, 
                    (total?.total_sell/ (total?.total_buy + total?.total_sell)) * 100],
                backgroundColor: [
                    '#10b981',
                    '#f87171',
                  ],
            }
        ],
    };

    useEffect(() => { 
        getSignalBuySell();
    }, [masterKey]);

    return (
        <Pie data={data}/>
    )
}