import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import banner from "../../component/image/banner_home.jpg"
import image1_home from "../../component/image/image1_home.png"
import video_home from "../../component/image/Video_home.mp4"
import { useEffect, useRef, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useDevice } from "../../hooks";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function HomeDetail() {  
    const { isMobile } = useDevice();
    const token = useLocation();
    const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);


    useEffect(() => {

    }, []);

    return (
        <div>
            <div className="max-w-screen-2xl items-center mx-auto pt-10">
                <Row>
                    <Col xs={24} xl={12} className="px-10 pt-16">
                        <p className="font-bold text-4xl">Trade with Confidence</p>
                        <p className="pt-5 font-medium text-lg pr-20">
                            Giải pháp giao dịch Net-AuAi, hệ thống giao dịch tiên tiến nhất từng được tạo ra. 
                            Hãy là một phần của cuộc cách mạng tài chính này để trở thành những nhà đầu tư có lợi nhuận và trở nên giàu có!
                        </p>
                        <div className="pt-5 flex">
                            <div>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Giao dịch tự đông nâng cao
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Tín hiệu giao dịch chính xác
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Quản lý hiệu xuất giao dịch mạnh mẽ
                                </p>
                            </div>
                            <div className="pl-10">
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Công nghệ Ai độc quyền
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Quản lý rủi ro chuyên nghiệp
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Prop-Firm đã sẵn có
                                </p>
                            </div>
                        </div>
                        <button className="border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                            Trải nghiệm ngay
                        </button>
                    </Col>
                    <Col xs={24} xl={12} className="px-10 pt-10">
                        <div className="flex justify-center">
                            <img src={image1_home} width={600} height={400}/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="py-10 bg-slate-50">
                <div className="max-w-screen-2xl items-center mx-auto pt-10 text-center">
                    <p className="font-bold text-3xl">NHỮNG CÔNG CỤ TỐT NHẤT MÀ CHÚNG TÔI CÓ!</p>
                    <p className="pt-4 font-none text-lg">
                        Cho dù bạn muốn đặt tất cả các giao dịch của mình ở chế độ tự động thí điểm hay kiểm soát các giao <br/>
                        dịch của mình bằng cách giao dịch thủ công, EA Giải pháp quản lý giao dịch !TakePropips có thể làm tất <br/>
                        cả cho bạn và hơn thế nữa
                    </p>
                    <Row>
                        <Col xs={24} xl={6}>
                            <div className="flex justify-end items-center w-full h-full">
                                <div className="text-right">
                                    <p className="font-semibold text-xl">1, Technical Analysis</p>
                                    <p className="pt-2 font-none text-lg">
                                        Xác định xu hướng thị trường, <br/>
                                        sức mạnh đồng tiền.
                                    </p>
                                    <p className="font-semibold text-xl pt-10">2, Managerment solotions</p>
                                    <p className="pt-2 font-none text-lg">
                                        Dashboard quản lý 1 cách vô cùng <br/>
                                        thuận tiện.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} xl={12} >
                            <div className="flex justify-center items-center">
                                <img src={image1_home} width={600}/>
                            </div>
                        </Col>
                        <Col xs={24} xl={6}>
                            <div className="flex justify-start items-center w-full h-full">
                                <div className="text-left">
                                    <p className="font-semibold text-xl">3, Trading Style</p>
                                    <p className="pt-2 font-none text-lg">
                                        Giao dịch theo phong cách phù hợp <br/>
                                        của riêng bạn.
                                    </p>
                                    <p className="font-semibold text-xl pt-10">4, Trading Signals</p>
                                    <p className="pt-2 font-none text-lg">
                                        Siêu công cụ sẽ giúp bạn kết nối cùng <br/>
                                        Master để việc giao dịch trở nên dễ<br/>
                                        dàng
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="py-10 bg-white">
                <div className="max-w-screen-2xl items-center mx-auto pt-10 text-center">
                    <p className="font-bold text-3xl">Chúng tôi hoạt động như thế nào ?</p>
                    <p className="pt-4 font-none text-lg">
                        Net Partner Trading Management Solutions EAGiải pháp quản lý giao dịch Net Profits EA là hệ thống <br/>
                        giao dịch tự động tất cả trong một cung cấp cho bạn mọi công cụ bạn cần như giao dịch tự động, tín <br/>
                        hiệu mua và bán, quản lý giao dịch, công cụ phân tích kỹ thuật, công cụ phân tích cơ bản sử dụng Al, vv.!
                    </p>
                </div>
            </div>
        </div>
    )
}