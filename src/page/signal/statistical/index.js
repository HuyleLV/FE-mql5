import { Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { Pie } from "react-chartjs-2";
import logo from "../../../component/image/logo_signal.png"
import { DecimalNumber } from "../../../utils/format";

export default function Statistical() {
    const [detail, setDetail] = useState([]);
    const [tradingSystem, setTradingSystem] = useState([]);
    const [signalByMonth, setSignalByMonth] = useState([]);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2024);
    const [allRanking, setAllRanking] = useState([]);
    const dataMonth = [1,2,3,4,5,6,7,8,9,10,11,12];

    const getByTradingSystem = async () => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystem/All`)
            .then(({ data }) => {
                setTradingSystem(data[0]);
            });
    }
    
    const getTradingSystemDetail = async () => {
        await axiosInstance.get(`/tradingSystem/getTradingSystemDetail/All`)
            .then(({ data }) => {
                setDetail(data);
            });
    }
    
    const getSignalByMonthDetail = async () => {
        await axiosInstance.get(`/tradingSystem/getSignalByMonthDetail/All`,{
            params: {
                month: month,
                year: year
            }
        })
        .then(({ data }) => {
            setSignalByMonth(data[0]);
        });
    }
    
    const getAllRanking = async () => {
        await axiosInstance.get(`/tradingSystem/getAllRanking`)
            .then(({ data }) => {
                setAllRanking(data);
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
        getByTradingSystem()
        getTradingSystemDetail();
        getAllRanking();
    }, []);

    useEffect(() => { 
        getSignalByMonthDetail();
    }, [month, year]);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="bg-blue-800 rounded-xl my-10">
                <p className="text-2xl font-bold text-white p-10">Thống Kê</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border border-black rounded-xl py-10">
                <div>
                    <p className="font-semibold text-lg">Trading Sysrtem</p>
                    <p className="font-bold text-xl">All</p>
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
                                    <p className="text-lg pt-2">{DecimalNumber(detail?.result[0]?.signal_week, 2)}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Lời Lỗ Trung Bình/ Tuần</p>
                                    <p className="text-lg pt-2">{DecimalNumber(detail?.result[0]?.pips_week, 2)}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Tín Hiệu Trung Bình/ Tháng</p>
                                    <p className="text-lg pt-2">{DecimalNumber(detail?.result[0]?.signal_month, 2)}</p>
                                </div>
                                <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                    <p className="text-base">Lời Lỗ Trung Bình/ Tháng</p>
                                    <p className="text-lg pt-2">{DecimalNumber(detail?.result[0]?.pips_month, 2)}</p>
                                </div>
                            </div>
                        )}
                    </Col>
                    <Col xs={24} xl={16}>
                        
                    </Col>
                </Row>
            </div>
            <div className="py-10">
                <p className="text-xl font-semibold">Thống kê hiệu quả tín hiệu từng tháng</p>
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
            <div className="py-10">
                <p className="text-2xl font-bold pb-10">Các loại tài sản giao dịch</p>
                <Row>
                    <Col xs={24} xl={12}>
                        <Select
                            className="w-[150px]"
                            defaultValue={year}
                            onChange={(i)=>setYear(i)}
                            options={[
                              {
                                value: 2022,
                                label: 2022,
                              },
                              {
                                value: 2023,
                                label: 2023,
                              },
                              {
                                value: 2024,
                                label: 2024,
                              },
                            ]}
                        />
                        <div className="grid grid-cols-4 gap-4 text-center pt-5">
                            {dataMonth?.map((_,i)=> (
                                <div className={`${month === _ ? "bg-blue-500 text-white" : "bg-white border-black"} border rounded-full p-2 font-semibold cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500`} onClick={()=> setMonth(_)}>
                                    <p className="text-xl">Tháng {_}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col xs={24} xl={12}>
                        <div className="flex justify-center">
                            <div className="w-2/3 border p-5 rounded-2xl">
                                <p className="text-xl font-bold text-center">Thống kê: {month} - {year}</p>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Tín hiệu</p>
                                    <p className="text-xl font-bold">{signalByMonth?.count_signal}</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Lời/ Lỗ tích lũy</p>
                                    <p className="text-xl font-bold">
                                        {signalByMonth?.pips ? signalByMonth?.pips > 0 ? "+"+ DecimalNumber(signalByMonth?.pips, 2) : DecimalNumber(signalByMonth?.pips, 2) : 0}
                                    </p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Tỷ lệ thắng</p>
                                    <p className="text-xl font-bold">{DecimalNumber(signalByMonth?.win_rate * 100, 2)}%</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Tỷ lệ Lời/ Lỗ</p>
                                    <p className="text-xl font-bold">{signalByMonth?.profit ? DecimalNumber(signalByMonth?.profit, 2) : 0}</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Lời trung bình</p>
                                    <p className="text-xl font-bold">{signalByMonth?.win_medium ? DecimalNumber(signalByMonth?.win_medium, 2) : 0}</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Lỗ trung bình</p>
                                    <p className="text-xl font-bold">{signalByMonth?.loss_medium ? DecimalNumber(signalByMonth?.loss_medium, 2) : 0}</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Thời gian giữ lệnh trung bình</p>
                                    <p className="text-xl font-bold">{signalByMonth?.hours_medium ? DecimalNumber(signalByMonth?.hours_medium, 2) : 0}</p>
                                </div>
                                <div className="flex justify-between border-b py-4">
                                    <p className="text-xl font-semibold text-gray-600">Tín hiệu trung bình hàng ngày</p>
                                    <p className="text-xl font-bold">{DecimalNumber(signalByMonth?.signal_date, 2)}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="py-10">
                    <p className="font-bold text-2xl">Các hệ thống giao dịch của chúng tôi</p>
                    <div className="grid grid-cols-4 py-5">
                        {allRanking?.map((_,i)=> (
                            <a href={"/signal/thong-ke/" + _?.trading_system}>
                                <div className="border rounded-xl p-5 m-2">
                                    <img src={logo} className="h-[125px]" alt="Logo" />
                                    <p className="py-2 font-semibold text-lg text text-center">Trading System {_?.trading_system}</p>
                                    <div className="grid grid-cols-2 text-center">
                                        <p>Tín Hiệu: {_?.count_signal}</p>
                                        <p>Tỷ Lệ Thắng: {_?.win_rate * 100}%</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}