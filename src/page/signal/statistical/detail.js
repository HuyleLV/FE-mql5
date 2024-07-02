import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticalDetail() {
    const params = useParams();
    const [tradingSystem, setTradingSystem] = useState([]);
    const [detail, setDetail] = useState([]);
    
    const getByTradingSystem = async () => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystem/${params?.trading_system}`)
            .then(({ data }) => {
                setTradingSystem(data[0]);
            });
    }
    
    const getTradingSystemDetail = async () => {
        await axiosInstance.get(`/tradingSystem/getTradingSystemDetail/${params?.trading_system}`)
            .then(({ data }) => {
                setDetail(data);
            });
    }

    const chartSymbol = {  
        labels: detail?.symbol?.map((_)=> (_?.symbol)),
        datasets: [
            {
                label: "Count",
                data: detail?.symbol?.map((_)=> (_?.count_symbol)),
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
        getByTradingSystem();
        getTradingSystemDetail();
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="bg-blue-800 rounded-xl my-10">
                <p className="text-2xl font-bold text-white p-10">Thống Kê</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border border-black rounded-xl py-10">
                <div>
                    <p className="font-semibold text-lg">Trading Sysrtem</p>
                    <p className="font-bold text-xl">{params?.trading_system}</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Số Tín Hiệu</p>
                    <p className="font-bold text-xl">{tradingSystem?.count_signal}</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Lời/lỗ thực thế( Pips )</p>
                    <p className="font-bold text-xl">{tradingSystem?.profit ? tradingSystem?.profit : 1}</p>
                </div>
            </div>
            <div className="pt-10">
                <p className="text-xl font-semibold">Kết quả giao dịch thực tế</p>
                <Row>
                    <Col xs={24} xl={8}>
                        {detail?.result && (
                            <div className="grid grid-cols-2 gap-4 text-center pt-5">
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Tín Hiệu Trung Bình/ Tuần</p>
                                    <p className="text-lg pt-2">{Math.round(detail?.result[0]?.signal_week * 100) / 100}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Lời Lỗ Trung Bình/ Tuần</p>
                                    <p className="text-lg pt-2">{Math.round(detail?.result[0]?.pips_week * 100) / 100}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Tín Hiệu Trung Bình/ Tháng</p>
                                    <p className="text-lg pt-2">{Math.round(detail?.result[0]?.signal_month * 100) / 100}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Lời Lỗ Trung Bình/ Tháng</p>
                                    <p className="text-lg pt-2">{Math.round(detail?.result[0]?.pips_month * 100) / 100}</p>
                                </div>
                            </div>
                        )}
                    </Col>
                    <Col xs={24} xl={16}>
                        
                    </Col>
                </Row>
            </div>
            <div className="py-10">
                <p className="text-xl font-semibold">Các loại tài sản giao dịch</p>
                <Row>
                    <Col xs={24} xl={8}>
                        <div className="grid grid-cols-2 gap-4 text-center pt-5">
                            {detail?.symbol?.map((_,i) => (
                                <div className="border border-black rounded-xl p-2 font-semibold">
                                    <p className="text-base">{_?.symbol} {_?.count_symbol} tín hiệu hàng tháng</p>
                                </div>
                            ))}

                        </div>
                    </Col>
                    <Col xs={24} xl={16} className="flex justify-center">
                        <div className="flex justify-center">
                            <div className="w-1/2">
                                <p className='text-center pb-5 font-bold text-gray-500'>Biểu đồ Tỷ lệ cặp tiền</p>
                                <Pie data={chartSymbol}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}