import { useParams } from "react-router-dom";
import { Button, Checkbox, Col, Divider, Modal, Row, Segmented, Select, Spin, message} from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import logo_black from "../../../component/image/logo_black.png"
import myGif from '../../../component/image/gif.gif';
import dayjsInstance from "../../../utils/dayjs";
import icon_buy from "../../../component/image/icon/buy.svg"
import icon_sell from "../../../component/image/icon/sell.svg"
import logo from "../../../component/image/logo_signal.png"
import check_icon from "../../../component/image/icon/check.png"
import { plainOptions } from "../../../helper";
import { useCookies } from "react-cookie";
const CheckboxGroup = Checkbox.Group;

export default function TradingSystem() {
    const params = useParams();
    const [cookies] = useCookies(["user"]);
    const [signal, setSignal] = useState([]);
    const [allSymbol, setAllSymbol] = useState([]);
    const [symbol, setSymbol] = useState();
    const [timeDone, setTimeDone] = useState(1);
    const [dataSymbol, setDataSymbol] = useState([]);
    const [value, setValue] = useState(1);
    const [tradingSystem, setTradingSystem] = useState([]);
    const [efficiency, setEfficiency] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [checkedList, setCheckedList] = useState([]);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };
    
    const getByTradingSystem = async () => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystem/${params?.trading_system}`)
            .then(({ data }) => {
                setTradingSystem(data[0]);
            });
    }
        
    const getByTradingSystemEfficiency = async () => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystemEfficiency/${params?.trading_system}`)
            .then(({ data }) => {
                setEfficiency(data);
            });
    }
    
    const getAllSymbol = async () => {
        await axiosInstance.get(`/tradingSystem/getAllSymbol`)
            .then(({ data }) => {
                setAllSymbol(data);
            });
    }

    const getSignalCondition = async (symbol, timeDone) => {
        await axiosInstance.get(`/tradingSystem/getSignalByTradingSystem/${params?.trading_system}`, {params: {
            symbol: symbol,
            time_done: timeDone
        }})
            .then(({ data }) => {
                setSignal(data);
            });
    }
    
    const createFollower = async () => {
        await axiosInstance.post(`/followerTradingSystem/createFollower`,{
            user_id: cookies?.user?.user_id,
            symbol: JSON.stringify(checkedList),
            trading_system: params?.trading_system
        }).then((res) => {
            message.success(String(res?.data?.message));
        })
    }

    useEffect(() => { 
        getAllSymbol();
        getByTradingSystem();
        getByTradingSystemEfficiency();
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
    }, [symbol, timeDone, allSymbol, params?.trading_system]);
    
        
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
        <div className="my-10">
            <div className="grid grid-cols-4 gap-4 border-black border-2 p-10 mx-5 rounded-2xl">
                <div>
                    <img src={logo_black} className="h-[300px]"/>
                </div>
                <div className="col-span-3">
                    <p className="text-4xl font-bold">Trading System {params?.trading_system}</p>
                    <p className="text-2xl pt-5">
                        Chúng tôi tin rằng đây là sản phẩm Mang Tính Tách Mạng. Là công cụ Quản Lý Giao Dịch 
                        với Trợ Lý Ảo tiên tiến nhất mà bạn từng gặp. Một công cụ Hoàn Hảo cho các nhà giao dịch Chuyên Nghiệp, 
                        giúp họ Tự Động Hoá các tác vụ mang đến trải nghiệm xuất sắc để trở nên giàu có. Cho dù bạn giao dịch Scalp, 
                        Swing, Day Trading hay Positon thì phần mềm này là sự lựa chọn hoàn hảo nhất cho bạn
                    </p>
                    <div className="flex pt-10">
                        <button 
                            className="text-white text-lg font-semibold border rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 py-2 px-4"
                            onClick={()=>setIsModalOpen(true)}
                        >
                            Theo Dõi
                        </button>
                        <button className="text-white text-lg font-semibold border rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 py-2 px-4 mx-10">
                            Nhiều Hơn
                        </button>
                        <button className="text-white text-lg font-semibold border rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 py-2 px-4">
                            Chia Sẽ
                        </button>
                    </div>
                </div>
            </div>
            
            <Row className="py-10">
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
                        <div className="flex">
                            <p className="text-2xl font-bold">Lệnh đang chạy</p>
                            <img src={myGif} alt="My GIF" className="h-8 pl-5" />
                        </div>
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
                                                        <p className="text-xl font-semibold">Trading System {_?.trading_system}</p>
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
                    <div className="border p-5 rounded-2xl">
                        <p className="text-2xl font-bold pb-5 text-center">Tổng Quan</p>
                        <div className="grid grid-cols-2 py-4 border-t">
                            <div>
                                <p className="text-lg font-medium text-gray-600">Bảng xếp hạng</p>
                                <p className="font-bold text-xl">{tradingSystem?.rank}</p>
                                <p className="pt-5 text-lg font-semibold text-gray-600">Tín hiệu</p>
                                <p className="font-bold text-xl">{tradingSystem?.count_signal}</p>
                                <p className="pt-12 text-lg font-semibold text-gray-600">Tỷ lệ thắng</p>
                                <p className="font-bold text-xl">{tradingSystem?.win_rate * 100}%</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-600">Lời/ Lỗ tích lũy</p>
                                <p className={`${tradingSystem?.total_pips > 0 ? "text-green-500" : "text-red-500"} font-bold  text-xl`}>
                                    {tradingSystem?.total_pips > 0 ? "+" + tradingSystem?.total_pips : tradingSystem?.total_pips}
                                </p>
                                <p className="pt-5 text-lg font-semibold text-gray-600">Thời gian giữ lệnh trung bình</p>
                                <p className="font-bold text-xl">{tradingSystem?.hours_medium} giờ</p>
                                <p className="pt-5 text-lg font-semibold text-gray-600">Tỷ lệ Lời/ Lỗ</p>
                                <p className="font-bold text-xl">{tradingSystem?.profit}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-bold pb-5 text-center">Hiệu Suất</p>
                        <div className="border rounded-2xl text-center">
                            <div className="grid grid-cols-3 gap-4 px-10 py-3 text-lg font-semibold text-gray-600">
                                <p>Thời gian</p>
                                <p>Tín hiệu</p>
                                <p>Lời & Lỗ</p>
                            </div>
                            {efficiency?.map((_,i) => (
                                <div className="grid grid-cols-3 gap-4 px-10 py-3 border-t">
                                    <p className="font-bold text-lg">{_?.thang + "/" + _?.nam}</p>
                                    <p className="font-bold text-lg">{_[0]?.count_signal ? _[0]?.count_signal : 0}</p>
                                    <p className={`font-bold text-lg ${_[0]?.total_pips > 0 ? "text-green-500" : "text-red-500"}`}>
                                        {_[0]?.total_pips ? _[0]?.total_pips : 0}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col xs={24} xl={2}></Col>
            </Row>
            <Modal
                title="Theo dõi Trading System"
                className="flex justify-center"
                open={isModalOpen}
                onOk={() => (setIsModalOpen(false), createFollower())}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ className: "bg-blue-500" }}
            >
                <p className="p-5">Vui lòng chọn những cặp tiền bạn muốn theo dõi!</p>
                <Checkbox 
                    indeterminate={indeterminate} 
                    onChange={onCheckAllChange} 
                    checked={checkAll}
                >
                    Check all
                </Checkbox>
                <Divider />
                <CheckboxGroup 
                    options={plainOptions} 
                    value={checkedList} 
                    onChange={onChange} 
                />
            </Modal>
        </div>
    )
}