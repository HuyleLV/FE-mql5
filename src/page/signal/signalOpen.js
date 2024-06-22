import { Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import logo from "../../component/image/logo_signal.png"
import { IconSignal } from "../../utils/iconSignal";
import dayjsInstance from "../../utils/dayjs";

export default function SignalOpen() {
    const [signal, setSignal] = useState([]);
    const [allSymbol, setAllSymbol] = useState([]);
    const [timeFrame, setTimeFrame] = useState("M15");
    const [symbol, setSymbol] = useState();
    const [timeDone, setTimeDone] = useState(1);

    
    const getAllSymbol = async () => {
        await axiosInstance.get(`/tradingSystem/getAllSymbol`)
            .then(({ data }) => {
                setAllSymbol(data);
            });
    }

    const getSignalCondition = async (timeFrame, symbol, timeDone) => {
        await axiosInstance.get(`/tradingSystem/getSignalCondition`, {params: {
            time_frame: timeFrame,
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
        if(symbol) {
            getSignalCondition(timeFrame, symbol, timeDone);
        }else {
            getSignalCondition(timeFrame, allSymbol[0]?.symbol, timeDone);
        }
    }, [timeFrame, symbol, timeDone, allSymbol]);

    return (
        <Row className="pt-10">
            <Col xs={24} xl={16} className="border rounded-2xl p-5">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">Lệnh đang chạy</p>
                    <div className="flex items-center">
                        <Select
                            style={{
                                width: 150,
                                marginRight: 10
                            }}
                            placeholder="Chọn khung"
                            onChange={setTimeFrame}
                            options={[
                                {
                                    value: 'M15',
                                    label: 'M15',
                                },
                                {
                                    value: 'M30',
                                    label: 'M30',
                                },
                                {
                                    value: 'H1',
                                    label: 'H1',
                                },
                                {
                                    value: 'H4',
                                    label: 'H4',
                                },
                                {
                                    value: 'DAILY',
                                    label: 'DAILY',
                                },
                            ]}
                        />
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
                    <p>1 Giờ Trước - Id:123123</p>
                    {signal?.map((_,i) => (
                        <div className={_?.type === "sell" ? "bg-red-50 hover:bg-white mt-5" : "bg-green-50 hover:bg-white mt-5"}>
                            <div className={`border-t-4 border border-x-slate-500 ${_?.type === "sell" ? "border-t-red-500" : "border-t-green-500"}`}>
                            <div className="flex justify-between px-10 pt-5">
                                <div className="flex items-center">
                                <p className={`${_?.type === "sell" ? "bg-red-500" : "bg-green-500"} font-semibold text-white text-xl w-min py-1 px-2 rounded-lg`}>
                                    {_?.type}
                                </p>
                                <p className="pl-2 font-semibold text-black text-xl">{_?.symbol}</p>
                                </div>
                                
                                <a href={"/master/" + _?.master_key}>
                                <button className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4">FOLLOW</button>
                                </a>
                            </div>
                            <p className="texl-lg font-semibold text-gray-600 py-2 px-10">ID: {_?.ticket}</p>  
                            </div>
                            <div className="w-full border border-slate-500 px-10 py-5 relative">
                            <div className="flex justify-center opacity-20">
                                <img src={logo} className="h-[150px]" alt="Logo" />
                            </div>
                            <div className="absolute top-10 left-10 w-full">
                                <div className="flex items-center">
                                <div className="text-xl font-bold w-2/3">
                                    <p>Entry: {_?.price}</p>
                                    <p className="py-2">Take Profit: {_?.take_profit}</p>
                                    <p>Stop loss: {_?.stop_loss}</p>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                    {IconSignal(_?.symbol)}
                                    </div>
                                    <p className="text-base pt-2">{dayjsInstance(_?.open_time).format("DD/MM/YYYY hh:mm:ss")}</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
            <Col xs={24} xl={8}>
            
            </Col>
        </Row>
    )
}