import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import logo from "../../component/image/logo_signal.png"
import logo_black from "../../component/image/logo_black.png"
import icon_buy from "../../component/image/icon/buy.svg"
import icon_sell from "../../component/image/icon/sell.svg"
import dayjsInstance from "../../utils/dayjs";
import check_icon from "../../component/image/icon/check.png"
import { Spin } from "antd";
import { DecimalNumber } from "../../utils/format";
import facebook from "../../component/image/facebook.png"
import twitter from "../../component/image/twitter.png"
import youtube from "../../component/image/youtube.png"
import instagram from "../../component/image/instagram.png"
import telegram from "../../component/image/telegram.png"

export default function TradingSystemDetail() {
    const params = useParams();
    const [signal, setSignal] = useState([]);
    const [tradingSystem, setTradingSystem] = useState([]);
    const [allRanking, setAllRanking] = useState([]);
    
    const getByTradingSystem = async (trading_system) => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystem/${trading_system}`)
            .then(({ data }) => {
                setTradingSystem(data[0]);
            });
    }
    
    const getAllRanking = async () => {
        await axiosInstance.get(`/tradingSystem/getAllRanking`)
            .then(({ data }) => {
                setAllRanking(data);
            });
    }

    useEffect(() => { 
        getAllRanking();
    }, []);

    useEffect(() => { 
        if(signal) {
            getByTradingSystem(signal?.trading_system);
        }
    }, [signal]);

    // useEffect(()=>{
    //     let descMeta=document.querySelector("meta[name='description']")
    //     descMeta.setAttribute("content", `Description of your page ${signal?.pips}`)
    // },[])

    useEffect(() => { 
        if (params?.trading_system_id) {
            const interval = setInterval(async () => {
              try {
                    const response = await axiosInstance.get(`/tradingSystem/getById/${params?.trading_system_id}`);
                    setSignal(response.data[0]);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }, 1500);

            return () => clearInterval(interval);
          }
    }, [signal]);

    return (
        <div className="grid grid-cols-8 gap-2 mx-auto py-10">
            <div className="flex justify-center pt-20">
                <div className="border w-min h-min p-2 rounded-2xl">
                    <div className="border rounded-full p-2 bg-blue-500 border-blue-500 w-8 flex justify-center items-center">
                        <a target="_blank" href="https://www.facebook.com/NetAuAi">
                            <img src={facebook} width={20} height={20}/>
                        </a>
                    </div>
                    <div className="border rounded-full p-2 bg-black border-black w-8 my-3 flex justify-center items-center">
                        <a target="_blank" href="https://twitter.com/Net_lnvest">
                            <img src={twitter} width={20} height={20}/>
                        </a>
                    </div>
                    <div className="border rounded-full p-2 bg-blue-500 border-blue-500 w-8 flex justify-center items-center">
                        <a target="_blank" href="https://t.me/Net_lnvest">
                            <img src={telegram} width={20} height={20}/>
                        </a>
                    </div>
                    <div className="border rounded-full p-2 bg-red-500 border-red-500 w-8 h-8 my-3 flex justify-center items-center">
                        <a target="_blank" href="https://www.youtube.com/channel/UCbHKyoqNuV8gBrNSdtTt67A">
                            <img src={youtube} width={20} height={20}/>
                        </a>
                    </div>
                    <div className="border rounded-full p-2 bg-[#BC2A8D] border-pink-500 w-8 flex justify-center items-center">
                        <a target="_blank" href="https://www.facebook.com/NetAuAi">
                            <img src={instagram} width={20} height={20}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-span-6 grid grid-cols-4 gap-4">
                <div className="col-span-3 p-5 grid grid-cols-3 border border-black rounded-xl">
                    <div className="mx-2 bg-blue-100 flex items-center rounded-xl h-[250px]">
                        <div className="text-center w-full">
                            <p className="text-2xl pb-5">P&L (pips)</p>
                            <p className={`${signal?.pips > 0 ? "text-green-500" : "text-red-500"} font-bold text-4xl`}>
                                {signal?.time_done === null ?
                                    <>
                                        {signal?.type === "BUY" ?
                                            DecimalNumber((((signal?.price_symbol - signal?.price) / signal?.point) / 10), 2) :
                                            DecimalNumber((((signal?.price - signal?.price_symbol) / signal?.point) / 10), 2)
                                        }
                                    </>
                                    :
                                    <>{DecimalNumber(signal?.pips, 2)}</>
                                }
                            </p>
                        </div>
                    </div>
                    <div className={`${signal?.type === "SELL" ? "hover:bg-white" : "hover:bg-white"} col-span-2 mx-2`}>
                        <div className={`border-t-4 border border-x-slate-500 ${signal?.type === "SELL" ? "border-t-red-500" : "border-t-green-500"}`}>
                            <div className="flex justify-between px-10 py-5">
                                <div className="flex items-center">
                                    <p className={`${signal?.type === "SELL" ? "bg-red-500" : "bg-green-500"} font-semibold text-white text-xl w-min py-1 px-2 rounded-lg`}>
                                        {signal?.type}
                                    </p>
                                    <div className="flex items-center">
                                        <p className="pl-2 font-semibold text-black text-xl underline decoration-1">
                                            {signal?.symbol}
                                        </p>
                                        <p className={`${signal?.type === "SELL" ? "text-red-500" : "text-green-500"} font-bold text-xl ml-5`}>
                                            {signal?.price_symbol}
                                        </p>
                                        <img className="h-[40px]" src={signal?.type === "SELL" ? icon_sell : icon_buy}/>
                                    </div>
                                </div>
                                
                                <a href={"/trading-system/" + signal?.trading_system}>
                                    <button className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4">Theo Dõi</button>
                                </a>
                            </div>
                        </div>
                        <div className="w-full border border-slate-500 px-10 py-5 relative">
                            <div className="flex justify-center opacity-10">
                                <img src={logo} className="h-[125px]" alt="Logo" />
                            </div>
                            <div className="absolute top-6 left-0 w-full">
                                <div className="flex items-center justify-center px-14">
                                    <div className={`${signal?.sl_entry === null && signal?.pass_sl === 1 ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                                    <div className={`${signal?.sl_entry === null && signal?.pass_sl === 1  ? "bg-green-500" : "bg-gray-500"} w-[150px] h-0.5`}></div>
                                    <div className={`${signal?.sl_entry ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                                    <div className={`${signal?.time_tp1 ? "bg-green-500" : "bg-gray-500"} w-[150px] h-0.5`}></div>
                                    <div className={`${signal?.time_tp1 ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                                    <div className={`${signal?.time_tp2 ? "bg-green-500" : "bg-gray-500"} w-[150px] h-0.5`}></div>
                                    <div className={`${signal?.time_tp2 ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                                    <div className={`${signal?.time_tp3 ? "bg-green-500" : "bg-gray-500"} w-[150px] h-0.5`}></div>
                                    <div className={`${signal?.time_tp3 ? "bg-green-500" : "bg-gray-500"} w-4 h-4 rounded-full`}></div>
                                </div>
                                <div className="flex items-center justify-center pt-5">
                                    <div className="w-[166px] text-center">
                                        <p className="font-semibold text-xl">{signal?.sl_show}</p>
                                        <p className="font-semibold text-lg text-gray-600">SL</p>
                                    </div>
                                    <div className="w-[166px] text-center">
                                        <p className="font-semibold text-xl">{signal?.price}</p>
                                        <p className="font-semibold text-lg text-gray-600">Entry</p>
                                    </div>
                                    <div className="w-[166px] text-center">
                                        <p className="font-semibold text-xl">{signal?.tp1}</p>
                                        <p className="font-semibold text-lg text-gray-600">Tp1</p>
                                    </div>
                                    <div className="w-[166px] text-center">
                                        <p className="font-semibold text-xl">{signal?.tp2}</p>
                                        <p className="font-semibold text-lg text-gray-600">Tp2</p>
                                    </div>
                                    <div className="w-[166px] text-center">
                                        <p className="font-semibold text-xl">{signal?.tp3}</p>
                                        <p className="font-semibold text-lg text-gray-600">Tp3</p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <p className="pl-8 font-semibold text-lg">
                                        Id: {signal?.ticket} - {dayjsInstance(signal?.create_at).format("HH:mm DD/MM/YYYY")}     
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 bg-gray-200 rounded-xl mx-2 my-5 flex">
                        <div className="w-3 ml-5 my-5">
                            <div className={`bg-gray-500 w-3 h-3 rounded-full`}></div>
                            <div className="flex justify-center">
                                <div className={`w-0.5 h-[250px] bg-gray-500`}></div>
                            </div>
                            <div className={`bg-gray-500 w-3 h-3 rounded-full`}></div>
                        </div>
                        <div className="m-5">
                            <p className="font-semibold text-xl py-2">
                                Id: {signal?.ticket} - {dayjsInstance(signal?.create_at).format("HH:mm DD/MM/YYYY")}     
                            </p>
                            <p className="font-semibold text-xl py-2">Entry: {signal?.price}</p>
                            <p className="flex items-center font-semibold text-xl py-2">
                                SL: {signal?.sl_show}
                                {signal?.sl_entry === null && signal?.pass_sl === 1  ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                            </p>
                            <p className="flex items-center font-semibold text-xl py-2">
                                TP1: {signal?.tp1}
                                {signal?.time_tp1 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                            </p>
                            <p className="flex items-center font-semibold text-xl py-2">
                                TP2: {signal?.tp2}
                                {signal?.time_tp2 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                            </p>
                            <p className="flex items-center font-semibold text-xl py-2">
                                TP3: {signal?.tp3}
                                {signal?.time_tp3 ? (<img src={check_icon} className="h-8 ml-3"/>) : (<Spin style={{marginLeft: 10}}/>)}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 mx-2 my-5">
                        <p className="font-bold text-2xl">Chiến Lược Khác</p>
                        <div className="grid grid-cols-3 py-5">
                            {allRanking?.map((_,i)=> (
                                <a href={"/signal/thong-ke/" + _?.trading_system}>
                                    <div className="border rounded-xl p-5 m-2">
                                        <img src={logo} className="h-[125px]" alt="Logo" />
                                        <p className="py-2 font-semibold text-lg text text-center">Trading System {_?.trading_system}</p>
                                        <div className="grid grid-cols-2 text-center">
                                            <div>
                                                <p>Tín Hiệu</p>
                                                <p>{_?.count_signal}</p>
                                            </div>
                                            <div>
                                                <p>Tỷ Lệ Thắng</p>
                                                <p>{DecimalNumber(_?.win_rate * 100, 2)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border border-black rounded-xl h-min">
                    <div className="flex p-2 border-b border-black items-center">
                        <img src={logo_black} className="h-20"/>
                        <p className="font-semibold text-xl">Trading System {tradingSystem?.trading_system}</p>
                    </div>
                    <div className="grid grid-cols-2 p-2 text-center">
                        <div className="py-5">
                            <p className="text-gray-500 text-lg font-semibold">Bảng xếp hạng</p>
                            <p className="font-bold text-2xl">{tradingSystem?.rank}</p>
                            <p className="pt-8 text-gray-500 text-lg font-semibold">Tín hiệu</p>
                            <p className="font-bold text-2xl">{tradingSystem?.count_signal}</p>
                            <p className="pt-8 text-gray-500 text-lg font-semibold">Tỷ lệ thắng</p>
                            <p className="font-bold text-2xl">{DecimalNumber(tradingSystem?.win_rate * 100, 2)}%</p>
                        </div>
                        <div className="py-5">
                            <p className="text-gray-500 text-lg font-semibold">Lời / Lỗ tích lũy</p>
                            <p className={`${tradingSystem?.total_pips > 0 ? "text-green-500" : "text-red-500"} font-bold text-2xl`}>
                                {tradingSystem?.total_pips > 0 ? "+" + DecimalNumber(tradingSystem?.total_pips, 2) : DecimalNumber(tradingSystem?.total_pips, 2)}
                            </p>
                            <p className="pt-5 text-gray-500 text-lg font-semibold">Thời gian giữ lệnh trung bình</p>
                            <p className="font-bold text-2xl">{DecimalNumber(tradingSystem?.hours_medium, 2)}</p>
                            <p className="pt-5 text-gray-500 text-lg font-semibold">Tỷ lệ lời lỗ</p>
                            <p className="font-bold text-2xl">{DecimalNumber(tradingSystem?.profit, 2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}