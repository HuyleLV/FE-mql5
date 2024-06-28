import { Col, Row, Segmented, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import logo from "../../component/image/logo_signal.png"
import logo_black from "../../component/image/logo_black.png"
import icon_buy from "../../component/image/icon/buy.svg"
import icon_sell from "../../component/image/icon/sell.svg"
import { IconSignal } from "../../utils/iconSignal";
import dayjsInstance from "../../utils/dayjs";
import check_icon from "../../component/image/icon/check.png"
import { timeDifference } from "../../helper";

export default function SignalOpen() {
    const [signal, setSignal] = useState([]);
    const [allSymbol, setAllSymbol] = useState([]);
    const [symbol, setSymbol] = useState();
    const [timeDone, setTimeDone] = useState(1);
    const [dataSymbol, setDataSymbol] = useState([]);
    const [value, setValue] = useState(1);
    
    const getAllSymbol = async () => {
        await axiosInstance.get(`/tradingSystem/getAllSymbol`)
            .then(({ data }) => {
                setAllSymbol(data);
            });
    }

    const getSignalCondition = async (symbol, timeDone) => {
        await axiosInstance.get(`/tradingSystem/getSignalCondition`, {params: {
            symbol: symbol,
            time_done: timeDone
        }})
            .then(({ data }) => {
                setSignal(data);
            });
    }

    useEffect(() => { 
        getAllSymbol();
    }, []);

    useEffect(() => { 
        if(value === 1) {
            setTimeDone(1);
        } else if(value === 2) {
            setTimeDone(0);
        }
    }, [value]);
    
    useEffect(() => { 
        if(symbol) {
            getSignalCondition(symbol, timeDone);
        }else {
            getSignalCondition(allSymbol[0]?.symbol, timeDone);
        }
    }, [symbol, timeDone, allSymbol]);
    
        
    useEffect(() => { 
        if (signal?.length > 0) {
            const interval = setInterval(async () => {
              try {
                const fetchData = async () => {
                    const promises = signal.map(async (symbol) => {
                    const response = await axiosInstance.get(`/symbol/getBySymbol/${symbol?.symbol}`);
                    return response.data[0];
                  });
                  const data = await Promise.all(promises);
                  setDataSymbol(data);
                };
                await fetchData();
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }, 1500);

            return () => clearInterval(interval);
          }
    }, [signal, dataSymbol]);

    return (
        <Row className="pb-10">
            <Col xs={24} xl={2} className="pt-20">
                <div className="border rounded-xl mx-3 shadow-sm">
                    <p className={`${value == 1 ? "font-semibold bg-green-100 border-r-2 border-green-500" : ""} pl-1 text-base py-2 mt-2 cursor-pointer`} onClick={()=>setValue(1)}>
                        Đang giao dịch
                    </p>
                    <p className={`${value == 2 ? "font-semibold bg-green-100 border-r-2 border-green-500" : ""} pl-1 text-base py-2 mb-2 cursor-pointer`} onClick={()=>setValue(2)}>
                        Đã kết thúc
                    </p>
                </div>
            </Col>
            <Col xs={24} xl={14} className="border rounded-2xl p-5">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">Lệnh đang chạy</p>
                    <div className="flex items-center">
                        <Select
                            style={{
                                width: 150,
                            }}
                            placeholder="Chọn cặp tiền"
                            onChange={setSymbol}
                            options={allSymbol?.map((value) => ({
                                value: value.symbol,
                                label: value.symbol,
                              }))}
                        />
                    </div>
                </div>
                <div>
                    {signal?.map((_,i) => (
                        <>
                            <p className="pt-6 pb-2 font-semibold text-xl">{dayjsInstance(_?.create_at).format("HH:mm DD/MM/YYYY")} - Id: {_?.ticket}</p>
                            <div className={_?.type === "SELL" ? "bg-red-50 hover:bg-white" : "bg-green-50 hover:bg-white"}>
                                <div className={`border-t-4 border border-x-slate-500 ${_?.type === "SELL" ? "border-t-red-500" : "border-t-green-500"}`}>
                                <div className="flex justify-between px-10 py-5">
                                    <div className="flex items-center">
                                        <p className={`${_?.type === "SELL" ? "bg-red-500" : "bg-green-500"} font-semibold text-white text-xl w-min py-1 px-2 rounded-lg`}>
                                            {_?.type}
                                        </p>
                                        <div className="flex items-center">
                                            
                                            <a href={"/signal/" + _?.trading_system_id}>
                                                <p className="pl-2 font-semibold text-black text-xl underline decoration-1">
                                                    {_?.symbol}
                                                </p>
                                            </a>
                                            <p className={`${_?.type === "SELL" ? "text-red-500" : "text-green-500"} font-bold text-xl ml-5`}>
                                                {dataSymbol[i]?.price}
                                            </p>
                                            <img className="h-[40px]" src={_?.type === "SELL" ? icon_sell : icon_buy}/>
                                        </div>
                                    </div>
                                    
                                    <a href={"/master/" + _?.master_key}>
                                        <button className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4">Theo Dõi</button>
                                    </a>
                                </div>
                                </div>
                                <div className="w-full border border-slate-500 px-10 py-5 relative">
                                    <div className="flex justify-center opacity-10">
                                        <img src={logo} className="h-[120px]" alt="Logo" />
                                    </div>
                                    <div className="absolute top-6 left-10 w-full">
                                        <div className="flex items-center">
                                            <div className="text-xl font-semibold w-2/3">
                                                <div className="grid grid-cols-3">
                                                    <p>Entry: {_?.price}</p>
                                                    <p>Entry: {_?.price}</p>
                                                </div>
                                                <div className="grid grid-cols-3 pt-2">
                                                    <p className="flex items-center">
                                                        TP1: {_?.tp1}
                                                        {_?.time_tp1 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                                                    </p>
                                                    <p className="flex items-center">
                                                        TP2: {_?.tp2}
                                                        {_?.time_tp2 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                                                    </p>
                                                    <p className="flex items-center">
                                                        TP3: {_?.tp3}
                                                        {_?.time_tp3 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center pt-6">
                                                    <img src={logo_black} className="h-[25px] pr-2" alt="Logo" />
                                                    <p className="text-xl font-semibold">Trading System 01</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-center bg-blue-200 p-3">
                                                    <p className="text-xl">P&L(pips)</p>
                                                    <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </Col>
            <Col xs={24} xl={6} className="px-5">
                <p className="text-2xl font-bold pb-5">Thống kê</p>
                <div className="border rounded-2xl p-5 text-center">
                    <div className="grid grid-cols-2 pt-4">
                        <div>
                            <p className="text-lg font-semibold">Lời lỗ</p>
                            <p className="font-bold text-green-500 text-xl">+123.24</p>
                            <p className="pt-5 text-lg font-semibold">Tuần trước</p>
                            <p className="font-bold text-green-500 text-xl">+123.24</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Hôm qua</p>
                            <p className="font-bold text-green-500 text-xl">+123.24</p>
                            <p className="pt-5 text-lg font-semibold">Tháng trước</p>
                            <p className="font-bold text-green-500 text-xl">+123.24</p>
                        </div>
                    </div>
                    <a href={"/signal/thong-ke"} className="flex justify-center pt-5">
                        <button className="text-green-500 text-lg font-semibold rounded-full border border-green-500 hover:bg-green-500 hover:text-white py-2 px-4">
                            Xem Thêm
                        </button>
                    </a>
                </div>
                <p className="text-2xl font-bold py-5">Bảng xếp hạng</p>
                <div className="border rounded-2xl p-5">
                    <div className="flex py-2">
                        <img src={logo_black} className="h-[100px]"/>
                        <div className="w-full px-4">
                            <p className="font-semibold text-xl">Trading System 01</p>
                            <div className="flex justify-between w-full">
                                <p className="text-lg">Tín hiệu: 132123</p>
                                <p className="text-lg">Tỷ lệ thắng: 30%</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex py-2">
                        <img src={logo_black} className="h-[100px]"/>
                        <div className="w-full px-4">
                            <p className="font-semibold text-xl">Trading System 02</p>
                            <div className="flex justify-between w-full">
                                <p className="text-lg">Tín hiệu: 132123</p>
                                <p className="text-lg">Tỷ lệ thắng: 30%</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex py-2">
                        <img src={logo_black} className="h-[100px]"/>
                        <div className="w-full px-4">
                            <p className="font-semibold text-xl">Trading System 03</p>
                            <div className="flex justify-between w-full">
                                <p className="text-lg">Tín hiệu: 132123</p>
                                <p className="text-lg">Tỷ lệ thắng: 30%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={24} xl={2}>

            </Col>
        </Row>
    )
}