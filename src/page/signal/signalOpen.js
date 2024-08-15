import { Checkbox, Col, Divider, Dropdown, Row, Segmented, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import logo from "../../component/image/logo_signal.png"
import logo_black from "../../component/image/logo_black.png"
import icon_buy from "../../component/image/icon/buy.svg"
import icon_sell from "../../component/image/icon/sell.svg"
import { IconSignal } from "../../utils/iconSignal";
import dayjsInstance from "../../utils/dayjs";
import check_icon from "../../component/image/icon/check.png"
import close from "../../component/image/icon/close.png"
import stop from "../../component/image/icon/stop.png"
import { plainOptions, timeDifference } from "../../helper";
import myGif from '../../component/image/gif.gif';
import { DecimalNumber } from "../../utils/format";
const CheckboxGroup = Checkbox.Group;

export default function SignalOpen() {
    const [signal, setSignal] = useState([]);
    const [symbol, setSymbol] = useState();
    const [timeDone, setTimeDone] = useState(1);
    const [allRanking, setAllRanking] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [value, setValue] = useState(1);
    
    const [checkedList, setCheckedList] = useState([]);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    
    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };
    
    const getAllRanking = async () => {
        await axiosInstance.get(`/tradingSystem/getAllRanking`)
            .then(({ data }) => {
                setAllRanking(data);
            });
    }

    const getSignalCondition = async (symbol, timeDone) => {
        const list = "('" + symbol.join("','") + "')";
        await axiosInstance.get(`/tradingSystem/getSignalCondition`, {params: {
            symbol: list,
            time_done: timeDone
        }})
            .then(({ data }) => {
                setSignal(data);
            });
    }

    const getTradingSystemStatistics = async () => {
        await axiosInstance.get(`/tradingSystem/getTradingSystemStatistics`)
            .then(({ data }) => {
                setStatistics(data[0]);
            });
    }

    useEffect(() => { 
        getAllRanking();
        getTradingSystemStatistics();
    }, []);

    useEffect(() => { 
        if(value === 1) {
            setTimeDone(1);
        } else if(value === 2) {
            setTimeDone(0);
        }
    }, [value]);
    
    useEffect(() => { 
        if(checkedList.length > 0) {
            getSignalCondition(checkedList, timeDone);
        }else {
            getSignalCondition(plainOptions, timeDone);
        }
    }, [symbol, timeDone, checkedList]);
    
    useEffect(() => { 
        const interval = setInterval(async () => {
            try {
            if(checkedList.length > 0) {
                getSignalCondition(checkedList, timeDone);
            }else {
                getSignalCondition(plainOptions, timeDone);
            }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [signal]);

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
                    <div className="flex">
                        <p className="text-2xl font-bold">{value == 1 ? "Lệnh đang chạy" : "Đã kết thúc"}</p>
                        <img src={value == 1 ? myGif : stop} alt="My GIF" className="h-8 pl-5" />
                    </div>
                    <div className="flex items-center">
                        <Dropdown
                            dropdownRender={() => (
                                <div className="flex justify-center">
                                    <div className="bg-slate-50 w-[500px] mt-3 p-5 rounded-xl drop-shadow-md">
                                        <Checkbox 
                                            indeterminate={indeterminate} 
                                            onChange={onCheckAllChange} 
                                            checked={checkAll}
                                        >
                                            Hiển thị tất cả cặp tiền
                                        </Checkbox>
                                        <Divider />
                                        <CheckboxGroup
                                            options={plainOptions} 
                                            value={checkedList} 
                                            onChange={onChange} 
                                        />
                                    </div>
                                </div>
                            )}
                            placement="bottom"
                            trigger={['click']}
                        >
                            <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white mr-5">
                                Cặp Tiền Hiển Thị
                            </button>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    {signal?.map((_,i) => (
                        <>
                            <p className="pt-6 pb-2 font-semibold text-xl">
                                Giờ mua: {dayjsInstance(_?.create_at).format("HH:mm DD/MM/YYYY")} {_?.time_done && (<>- Giờ kết thúc: {dayjsInstance(_?.time_done).format("HH:mm DD/MM/YYYY")}</>)} - Id: {_?.ticket}
                            </p>
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
                                                {_?.price_symbol}
                                            </p>
                                            <img className="h-[40px]" src={_?.type === "SELL" ? icon_sell : icon_buy}/>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <a href={"/trading-system/" + _?.trading_system}>
                                            <button className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4 mr-2">Theo Dõi</button>
                                        </a>
                            
                                        <button 
                                            className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4"
                                            onClick={() => {
                                                navigator.clipboard.writeText(process.env.REACT_APP_URL+ "/signal/" + _?.trading_system_id);
                                                message.success("Link đã được copy!")
                                            }}>
                                            Chia Sẻ
                                        </button>
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
                                                    <p className="flex items-center">
                                                        SL: {_?.sl_show}
                                                        {_?.time_tp1 === null && value === 2 ? 
                                                            <img src={check_icon} className="h-6 ml-3"/> :  
                                                            <Spin style={{marginLeft: 10}}/> 
                                                        }
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-3 pt-2">
                                                    <p className="flex items-center">
                                                        TP1: {DecimalNumber(_?.tp1, _?.digit)}

                                                        {_?.time_tp1 ? 
                                                            <img src={check_icon} className="h-8 ml-3"/> : 
                                                            value === 1 ? 
                                                                <Spin style={{marginLeft: 10}}/> : 
                                                                <img src={close} className="h-4 ml-3"/>
                                                        }
                                                    </p>
                                                    <p className="flex items-center">
                                                        TP2: {DecimalNumber(_?.tp2, _?.digit)}
                                                        
                                                        {_?.time_tp2 ? 
                                                            <img src={check_icon} className="h-8 ml-3"/> : 
                                                            value === 1 ? 
                                                                <Spin style={{marginLeft: 10}}/> : 
                                                                <img src={close} className="h-4 ml-3"/>
                                                        }
                                                    </p>
                                                    <p className="flex items-center">
                                                        TP3: {DecimalNumber(_?.tp3, _?.digit)}
                                                        
                                                        {_?.time_tp3 ? 
                                                            <img src={check_icon} className="h-8 ml-3"/> : 
                                                            value === 1 ? 
                                                                <Spin style={{marginLeft: 10}}/> : 
                                                                <img src={close} className="h-4 ml-3"/>
                                                        }
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
                                                    <p className="text-xl font-bold text-emerald-500">
                                                        {value === 1 ?
                                                            <>
                                                                {_?.type === "BUY" ?
                                                                    DecimalNumber((((_?.price_symbol - _?.price) / _?.point) / 10), 2) :
                                                                    DecimalNumber((((_?.price - _?.price_symbol) / _?.point) / 10), 2)
                                                                }
                                                            </>
                                                            :
                                                            <>{DecimalNumber(_?.pips, 2)}</>
                                                        }
                                                    </p>
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
                            <p className={`${statistics?.pips > 0 ? "text-green-500" : "text-red-500"} font-bold text-xl`}>
                                {DecimalNumber(statistics?.pips, 2)}
                            </p>
                            <p className="pt-5 text-lg font-semibold">Tuần trước</p>
                            <p className={`${statistics?.pips_week > 0 ? "text-green-500" : "text-red-500"} font-bold text-xl`}>
                                {statistics?.pips_week ? DecimalNumber(statistics?.pips_week, 2) : "NULL"}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Hôm qua</p>
                            <p className={`${statistics?.pips_date > 0 ? "text-green-500" : "text-red-500"} font-bold text-xl`}>
                                {statistics?.pips_date ? DecimalNumber(statistics?.pips_date, 2) : "NULL"}
                            </p>
                            <p className="pt-5 text-lg font-semibold">Tháng trước</p>
                            <p className={`${statistics?.pips_month > 0 ? "text-green-500" : "text-red-500"} font-bold text-xl`}>
                                {statistics?.pips_month ? DecimalNumber(statistics?.pips_month, 2) : "NULL"}
                            </p>
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

                    {allRanking?.map((_,i) => (
                        <a href={"/signal/thong-ke/" + _?.trading_system}>
                            <div className="flex py-4">
                                <img src={logo_black} className="h-[100px]"/>
                                <div className="w-full px-4 text-black">
                                    <p className="font-semibold text-xl">Trading System {_?.trading_system}</p>
                                    <div className="flex justify-between w-full pt-2">
                                        <p className="text-lg">Tín hiệu: {_?.count_signal}</p>
                                        <p className="text-lg">Tỷ lệ thắng: {DecimalNumber(_?.win_rate * 100, 2)}%</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}

                </div>
            </Col>
            <Col xs={24} xl={2}>

            </Col>
        </Row>
    )
}