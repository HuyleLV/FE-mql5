import { Col, Row } from "antd"
import banner from "../../component/image/banner_home.jpg"
import image1_home from "../../component/image/image1_home.png"
import video_home from "../../component/image/Video_home.mp4"
import { useEffect, useRef } from "react";
import { CheckOutlined } from "@ant-design/icons";

export default function Home() {  

    return (
        <div>
            <div className="relative">
                <video src={video_home} autoPlay muted controls={false} loop>
                </video>
                <div className="absolute top-0 px-[5%] text-white">
                    <p className="font-bold text-xl top-0 pt-20">Đỉnh Cao Công Nghệ Tài Chính</p>
                    <p className="font-bold text-6xl w-[700px] pt-[150px]">
                        Xây dựng sự giàu có của bạn bằng nền tảng của chúng tôi
                    </p>
                    <p className="font-semibold text-xl pt-10">Công cụ tối ưu được cung cấp bởi Netpartner</p>
                    <button className="border px-4 py-2 rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-20">
                        Trải nghiệm ngay
                    </button>
                </div>
            </div>
            <div className="max-w-screen-2xl items-center mx-auto pt-10">
                <Row>
                    <Col xs={24} xl={12} className="p-10 pt-16">
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
                            </div>
                        </div>
                        <button className="border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                            Trải nghiệm ngay
                        </button>
                    </Col>
                    <Col xs={24} xl={12} className="p-10">
                        <div className="flex justify-center">
                            <img src={image1_home} width={600} height={400}/>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}