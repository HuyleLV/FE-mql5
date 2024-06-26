import { Button, Col, List, Row, Spin, message } from "antd";
import { IconSignal } from "../../../utils/iconSignal";
import dayjsInstance from "../../../utils/dayjs";
import logo from "../../../component/image/logo_black.png"
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axios";
import check_icon from "../../../component/image/icon/check.png"

export default function TradingSymtemDashboard() {
    const [signalOpen, setSignalOpen] = useState([]);
    const [dataSymbol, setDataSymbol] = useState([]);

    const getSignalOpen = async () => {
        await axiosInstance.get(`/tradingSystem/getSignalOpenbyAdmin`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setSignalOpen(data);
            });
    };

    const updateStatus = async (trading_system_id) => {
        await axiosInstance.post(`/tradingSystem/updateStatus/${trading_system_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                message.success(String(res?.data?.message));
                getSignalOpen();
            });
    };

    useEffect(()=>{
        getSignalOpen();
    },[])
        
    useEffect(() => { 
        if (signalOpen?.length > 0) {
            const interval = setInterval(async () => {
              try {
                const fetchData = async () => {
                    const promises = signalOpen.map(async (symbol) => {

                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/symbol/getBySymbol/${symbol?.symbol}`);
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
    }, [signalOpen, dataSymbol]);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto pt-10">
                <div className="flex justify-between items-center">
                    <p className="float-start font-bold text-2xl">Trading System 01</p>
                </div>
                <div className="py-10 border mb-10 mt-5 grid grid-cols-12"> 
                    <div></div>
                    <div className="grid col-span-2 pb-10">
                        <p className="font-semibold text-xl text-center">M15</p>
                    </div>
                    <div className="grid col-span-2">
                        <p className="font-semibold text-xl text-center">M30</p>
                    </div>
                    <div className="grid col-span-2">
                        <p className="font-semibold text-xl text-center">H1</p>
                    </div>
                    <div className="grid col-span-2">
                        <p className="font-semibold text-xl text-center">H4</p>
                    </div>
                    <div className="grid col-span-2">
                        <p className="font-semibold text-xl text-center">Daily</p>
                    </div>
                    <div>
                        <p className="font-semibold text-xl text-center">Thống kê</p>
                    </div>

                    {signalOpen?.map((_,i)=> (
                        <>
                            <div className="flex items-center justify-center mb-10">
                                <div>
                                    <p className="text-center font-bold text-[#004AAD] text-xl">{dataSymbol[i]?.symbol}</p>
                                    <p className="text-center font-bold text-lg">${dataSymbol[i]?.price}</p>
                                    <p className="text-center font-semibold text-green-600 text-sm">
                                        {dataSymbol[i]?.change_price > 0 ? "+"+ dataSymbol[i]?.change_price : dataSymbol[i]?.change_price}%
                                    </p>
                                </div>
                            </div>

                            {_?.data.map((_)=> (
                                <>
                                    {_?.time_frame === "M15" ? (
                                        <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                            {_?.type}
                                                        </p>
                                                        <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center">
                                                            {IconSignal(_?.symbol)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-xs">ID: {_?.ticket}</p>
                                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2 relative">
                                                <div className="flex justify-center opacity-10">
                                                    <img src={logo} className="h-[120px]" alt="Logo" />
                                                </div>
                                                <div className="absolute flex items-center top-2 left-2 w-full">
                                                    <div className="w-1/2">
                                                        <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                            {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                            {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                            {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-cyan-100">
                                                        <p>P&L (Pips)</p>
                                                        <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                            <Spin tip="Đang cập nhật" size="large">
                                                <div className="h-full">
                                                </div>
                                            </Spin>
                                        </div>
                                    )}
                                    
                                    {_?.time_frame === "M30" ? (
                                        <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                            {_?.type}
                                                        </p>
                                                        <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center">
                                                            {IconSignal(_?.symbol)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-xs">ID: {_?.ticket}</p>
                                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2 relative">
                                                <div className="flex justify-center opacity-10">
                                                    <img src={logo} className="h-[120px]" alt="Logo" />
                                                </div>
                                                <div className="absolute flex items-center top-2 left-2 w-full">
                                                    <div className="w-1/2">
                                                        <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                            {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                            {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                            {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-cyan-100">
                                                        <p>P&L (Pips)</p>
                                                        <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {_?.status == 0 && (
                                                <div className="flex justify-center pb-2">
                                                    <Button type="primary" className="w-20" onClick={()=>updateStatus(_?.trading_system_id)}>Hiển Thị</Button>
                                                </div>
                                            )}
                                        </div>
                                    ): (
                                        <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                            <Spin tip="Đang cập nhật" size="large">
                                                <div className="h-full">
                                                </div>
                                            </Spin>
                                        </div>
                                    )}
                                    
                                    {_?.time_frame === "H1" ? (
                                        <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                            {_?.type}
                                                        </p>
                                                        <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center">
                                                            {IconSignal(_?.symbol)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-xs">ID: {_?.ticket}</p>
                                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2 relative">
                                                <div className="flex justify-center opacity-10">
                                                    <img src={logo} className="h-[120px]" alt="Logo" />
                                                </div>
                                                <div className="absolute flex items-center top-2 left-2 w-full">
                                                    <div className="w-1/2">
                                                        <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                            {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                            {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                            {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-cyan-100">
                                                        <p>P&L (Pips)</p>
                                                        <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                            <Spin tip="Đang cập nhật" size="large">
                                                <div className="h-full">
                                                </div>
                                            </Spin>
                                        </div>
                                    )}
                                     
                                    {_?.time_frame === "H4" ? (
                                        <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                            {_?.type}
                                                        </p>
                                                        <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center">
                                                            {IconSignal(_?.symbol)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-xs">ID: {_?.ticket}</p>
                                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2 relative">
                                                <div className="flex justify-center opacity-10">
                                                    <img src={logo} className="h-[120px]" alt="Logo" />
                                                </div>
                                                <div className="absolute flex items-center top-2 left-2 w-full">
                                                    <div className="w-1/2">
                                                        <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                            {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                            {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                            {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-cyan-100">
                                                        <p>P&L (Pips)</p>
                                                        <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                            <Spin tip="Đang cập nhật" size="large">
                                                <div className="h-full">
                                                </div>
                                            </Spin>
                                        </div>
                                    )}
                                     
                                    {_?.time_frame === "DAILY" ? (
                                        <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                            {_?.type}
                                                        </p>
                                                        <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center">
                                                            {IconSignal(_?.symbol)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-xs">ID: {_?.ticket}</p>
                                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2 relative">
                                                <div className="flex justify-center opacity-10">
                                                    <img src={logo} className="h-[120px]" alt="Logo" />
                                                </div>
                                                <div className="absolute flex items-center top-2 left-2 w-full">
                                                    <div className="w-1/2">
                                                        <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                            {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                            {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold flex items-center pb-1">
                                                            Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                            {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                        </p>
                                                        <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                    </div>
                                                    <div className="px-2 py-1 bg-cyan-100">
                                                        <p>P&L (Pips)</p>
                                                        <p className="text-xl font-bold text-emerald-500">{Math.round(((dataSymbol[i]?.price - _?.price) * 10) * 100) / 100}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                            <Spin tip="Đang cập nhật" size="large">
                                                <div className="h-full">
                                                </div>
                                            </Spin>
                                        </div>
                                    )}
                                    
                                </>
                            ))}

                            <div className="flex items-center justify-center mb-10">
                                <div>
                                    <div className=" py-1 px-2 text-center m-2">
                                        <p className="text-sm font-semibold">Lời lỗ:</p>
                                        <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                                    </div>
                                    <div className=" py-1 px-2 text-center m-2">
                                        <p className="text-sm font-semibold">Tuần trước:</p>
                                        <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                                    </div>
                                    <div className=" py-1 px-2 text-center m-2">
                                        <p className="text-sm font-semibold">Tháng trước:</p>
                                        <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}