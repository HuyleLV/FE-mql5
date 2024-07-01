import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";

export default function StatisticalDetail() {
    const params = useParams();
    const [tradingSystem, setTradingSystem] = useState([]);
    
    const getByTradingSystem = async () => {
        await axiosInstance.get(`/tradingSystem/getByTradingSystem/${params?.trading_system}`)
            .then(({ data }) => {
                setTradingSystem(data[0]);
            });
    }

    useEffect(() => { 
        getByTradingSystem();
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
                        <div className="grid grid-cols-2 gap-4 text-center pt-5">
                            <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                <p className="text-base">Tín Hiệu Trung Bình/ Tuần</p>
                                <p className="text-lg pt-2">123</p>
                            </div>
                            <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                <p className="text-base">Lời Lỗ Trung Bình/ Tuần</p>
                                <p className="text-lg pt-2">123</p>
                            </div>
                            <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                <p className="text-base">Tín Hiệu Trung Bình/ Tháng</p>
                                <p className="text-lg pt-2">123</p>
                            </div>
                            <div className="border border-black rounded-xl px-2 py-6 m-1 font-semibold">
                                <p className="text-base">Lời Lỗ Trung Bình/ Tháng</p>
                                <p className="text-lg pt-2">123</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={16}>
                        
                    </Col>
                </Row>
            </div>
            <div className="pt-10">
                <p className="text-xl font-semibold">Các loại tài sản giao dịch</p>
                <Row>
                    <Col xs={24} xl={8}>
                        <div className="grid grid-cols-2 gap-4 text-center pt-5">
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Tín Hiệu Trung Bình/ Tuần</p>
                            </div>
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Lời Lỗ Trung Bình/ Tuần</p>
                            </div>
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Tín Hiệu Trung Bình/ Tháng</p>
                            </div>
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Lời Lỗ Trung Bình/ Tháng</p>
                            </div>
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Tín Hiệu Trung Bình/ Tháng</p>
                            </div>
                            <div className="border border-black rounded-xl p-2 font-semibold">
                                <p className="text-base">Lời Lỗ Trung Bình/ Tháng</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={16}>
                        
                    </Col>
                </Row>
            </div>
        </div>
    )
}