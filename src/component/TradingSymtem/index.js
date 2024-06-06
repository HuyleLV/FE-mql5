import { Col, Row, Spin } from "antd";
import { IconSignal } from "../../utils/iconSignal";
import dayjsInstance from "../../utils/dayjs";
import logo from "../../component/image/logo.png"

export default function TradingSymtem() {
    return (
        <>
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex justify-between items-center">
                    <p className="float-start font-bold text-2xl">Trading System 01</p>
                    <div>
                        <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white">
                            Siêu Máy Tính
                        </button>
                        <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white mr-5">
                            Cặp Tiền Hiển Thị
                        </button>
                    </div>
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
                    <div className="flex items-center justify-center">
                        <div>
                            <p className="text-center font-bold text-[#004AAD] text-xl">XAUUSD</p>
                            <p className="text-center font-bold text-lg">2390.34</p>
                            <p className="text-center font-semibold text-green-600 text-sm">+13.88(+0.58%)</p>
                        </div>
                    </div>
                    <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white">
                        <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <p className="bg-red-500 font-semibold text-white text-xs w-min py-1 px-1 rounded-lg">
                                        SELL
                                    </p>
                                    <p className="pl-2 font-semibold text-black text-xs">XAUUSD</p>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        {IconSignal("XAUUSD")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xs">ID: 54748</p>
                                <p className="font-medium text-xs text-gray-700">{dayjsInstance(Date()).format("DD/MM/YYYY hh:mm:ss")}</p>
                            </div>
                        </div>
                        <div className="w-full p-2 relative">
                            <div className="flex justify-center opacity-15">
                                <img src={logo} className="h-[100px]" alt="Logo" />
                            </div>
                            <div className="absolute flex items-center top-2 left-2 w-full">
                                <div className="w-1/2">
                                    <p className="text-sm font-semibold">Entry: 864687</p>
                                    <p className="text-sm font-semibold">Tp1: 864687</p>
                                    <p className="text-sm font-semibold">Tp2: 864687</p>
                                    <p className="text-sm font-semibold">Tp3: 864687</p>
                                    <p className="text-sm font-semibold">SL: 864687</p>
                                </div>
                                <div className="px-2 py-1 bg-cyan-100">
                                    <p>P&L (Pips)</p>
                                    <p className="text-xl font-bold text-emerald-500">+45.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white">
                        <Spin tip="Đang cập nhật" size="large">
                            <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <p className="bg-red-500 font-semibold text-white text-xs w-min py-1 px-1 rounded-lg">
                                            SELL
                                        </p>
                                        <p className="pl-2 font-semibold text-black text-xs">XAUUSD</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-center">
                                            {IconSignal("XAUUSD")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-xs">ID: 54748</p>
                                    <p className="font-medium text-xs text-gray-700">{dayjsInstance(Date()).format("DD/MM/YYYY hh:mm:ss")}</p>
                                </div>
                            </div>
                            <div className="w-full p-2 relative">
                                <div className="flex justify-center opacity-15">
                                    <img src={logo} className="h-[100px]" alt="Logo" />
                                </div>
                                <div className="absolute flex items-center top-3 left-2 w-full">
                                    <div className="w-1/2">
                                        <p className="text-sm font-semibold">Entry: 864687</p>
                                        <p className="text-sm font-semibold">Tp1: 864687</p>
                                        <p className="text-sm font-semibold">Tp2: 864687</p>
                                        <p className="text-sm font-semibold">Tp3: 864687</p>
                                        <p className="text-sm font-semibold">SL: 864687</p>
                                    </div>
                                    <div className="px-2 py-1 bg-cyan-100">
                                        <p>P&L (Pips)</p>
                                        <p className="text-xl font-bold text-emerald-500">+45.5</p>
                                    </div>
                                </div>
                            </div>
                        </Spin>
                    </div>
                    <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white">
                        <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <p className="bg-red-500 font-semibold text-white text-xs w-min py-1 px-1 rounded-lg">
                                        SELL
                                    </p>
                                    <p className="pl-2 font-semibold text-black text-xs">XAUUSD</p>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        {IconSignal("XAUUSD")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xs">ID: 54748</p>
                                <p className="font-medium text-xs text-gray-700">{dayjsInstance(Date()).format("DD/MM/YYYY hh:mm:ss")}</p>
                            </div>
                        </div>
                        <div className="w-full p-2 relative">
                            <div className="flex justify-center opacity-15">
                                <img src={logo} className="h-[100px]" alt="Logo" />
                            </div>
                            <div className="absolute flex items-center top-2 left-2 w-full">
                                <div className="w-1/2">
                                    <p className="text-sm font-semibold">Entry: 864687</p>
                                    <p className="text-sm font-semibold">Tp1: 864687</p>
                                    <p className="text-sm font-semibold">Tp2: 864687</p>
                                    <p className="text-sm font-semibold">Tp3: 864687</p>
                                    <p className="text-sm font-semibold">SL: 864687</p>
                                </div>
                                <div className="px-2 py-1 bg-cyan-100">
                                    <p>P&L (Pips)</p>
                                    <p className="text-xl font-bold text-emerald-500">+45.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white">
                        <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <p className="bg-red-500 font-semibold text-white text-xs w-min py-1 px-1 rounded-lg">
                                        SELL
                                    </p>
                                    <p className="pl-2 font-semibold text-black text-xs">XAUUSD</p>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        {IconSignal("XAUUSD")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xs">ID: 54748</p>
                                <p className="font-medium text-xs text-gray-700">{dayjsInstance(Date()).format("DD/MM/YYYY hh:mm:ss")}</p>
                            </div>
                        </div>
                        <div className="w-full p-2 relative">
                            <div className="flex justify-center opacity-15">
                                <img src={logo} className="h-[100px]" alt="Logo" />
                            </div>
                            <div className="absolute flex items-center top-2 left-2 w-full">
                                <div className="w-1/2">
                                    <p className="text-sm font-semibold">Entry: 864687</p>
                                    <p className="text-sm font-semibold">Tp1: 864687</p>
                                    <p className="text-sm font-semibold">Tp2: 864687</p>
                                    <p className="text-sm font-semibold">Tp3: 864687</p>
                                    <p className="text-sm font-semibold">SL: 864687</p>
                                </div>
                                <div className="px-2 py-1 bg-cyan-100">
                                    <p>P&L (Pips)</p>
                                    <p className="text-xl font-bold text-emerald-500">+45.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white">
                        <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <p className="bg-red-500 font-semibold text-white text-xs w-min py-1 px-1 rounded-lg">
                                        SELL
                                    </p>
                                    <p className="pl-2 font-semibold text-black text-xs">XAUUSD</p>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        {IconSignal("XAUUSD")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xs">ID: 54748</p>
                                <p className="font-medium text-xs text-gray-700">{dayjsInstance(Date()).format("DD/MM/YYYY hh:mm:ss")}</p>
                            </div>
                        </div>
                        <div className="w-full p-2 relative">
                            <div className="flex justify-center opacity-15">
                                <img src={logo} className="h-[100px]" alt="Logo" />
                            </div>
                            <div className="absolute flex items-center top-2 left-2 w-full">
                                <div className="w-1/2">
                                    <p className="text-sm font-semibold">Entry: 864687</p>
                                    <p className="text-sm font-semibold">Tp1: 864687</p>
                                    <p className="text-sm font-semibold">Tp2: 864687</p>
                                    <p className="text-sm font-semibold">Tp3: 864687</p>
                                    <p className="text-sm font-semibold">SL: 864687</p>
                                </div>
                                <div className="px-2 py-1 bg-cyan-100">
                                    <p>P&L (Pips)</p>
                                    <p className="text-xl font-bold text-emerald-500">+45.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div>
                            <div className="bg-cyan-100 py-1 px-2 text-center m-2">
                                <p className="text-sm font-semibold">Lời lỗ:</p>
                                <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                            </div>
                            <div className="bg-cyan-100 py-1 px-2 text-center m-2">
                                <p className="text-sm font-semibold">Tuần trước:</p>
                                <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                            </div>
                            <div className="bg-cyan-100 py-1 px-2 text-center m-2">
                                <p className="text-sm font-semibold">Tháng trước:</p>
                                <p className="font-semibold text-lg text-emerald-500">+12248.8</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}