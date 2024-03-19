import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import banner from "../../component/image/banner_home.jpg"
import image1_home from "../../component/image/image1_home.png"
import image2_home from "../../component/image/image2_home.png"
import image3_home from "../../component/image/image3_home.png"
import icon_1 from "../../component/image/icon/15.svg"
import icon_2 from "../../component/image/icon/16.svg"
import icon_3 from "../../component/image/icon/17.svg"
import icon_4 from "../../component/image/icon/18.svg"
import icon_5 from "../../component/image/icon/19.svg"
import icon_6 from "../../component/image/icon/20.svg"
import icon_7 from "../../component/image/icon/21.svg"
import image4 from "../../component/image/26.png"
import image5 from "../../component/image/27.png"
import image6 from "../../component/image/28.png"
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
                                <img src={image2_home} width={600}/>
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
                <div className="max-w-screen-2xl items-center mx-auto pt-10">
                    <p className="font-bold text-3xl text-center">Chúng tôi hoạt động như thế nào ?</p>
                    <p className="pt-4 font-none text-lg text-center">
                        <span className="font-semibold">Net AuAI Trading Management Solutions EA</span> là hệ thống giao dịch tự động tất cả trong một cung cấp <br/>
                        cho bạn mọi công cụ bạn cần như giao dịch tự động, tín hiệu mua và bán, quản lý giao dịch, <br/>
                        công cụ phân tích kỹ thuật, công cụ phân tích cơ bản sử dụng AI và hơn thế nữa!
                    </p>
                    <Row className="pt-10">
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center">
                                <img src={image3_home} width={600}/>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="flex items-center pt-10">
                                <img src={icon_1} style={{width: 130, height: 130}}/>
                                <div className="pl-4">  
                                    <p className="font-semibold text-xl">Phân tích thị trường và tạo tín hiệu</p>
                                    <p className="text-lg pt-2">
                                        EA của chúng tôi phân tích thị trường ngoại hối 24/7, tạo ra tín hiệu giao dịch
                                        chính xác thông qua các thuật toán và chi báo nâng cao.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-10">
                                <img src={icon_3} style={{width: 130, height: 130}}/>
                                <div className="pl-4">
                                    <p className="font-semibold text-xl">Thực hiện giao dịch tự động hoặc thủ công</p>
                                    <p className="text-lg pt-2">
                                        Chọn giữa thực hiện giao dịch tự động dựa trên tín hiệu được tạo hoặc áp dụng tín hiệu 
                                        theo cách thủ công cho chiến lược giao dịch của bạn.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-10">
                                <img src={icon_2} style={{width: 130, height: 130}}/>
                                <div className="pl-4">
                                    <p className="font-semibold text-xl">Quản lý rủi ro mạnh mẽ</p>
                                    <p className="text-lg pt-2">
                                        Sử dụng các biện pháp bảo vệ như rút vốn và bảo vệ lợi nhuận, EA bảo vệ các giao 
                                        dịch của bạn và giảm thiểu tổn thất tiềm ẩn.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="py-10 bg-slate-50">
                <div className="max-w-screen-2xl items-center mx-auto py-10 text-center">
                    <p className="font-bold text-3xl">Tại Sao Chọn Hệ Thống Giao Dịch Của Chúng Tôi?</p>

                    <Row className="pt-5">
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_4} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Tiết kiệm thời gian và công sức</p>
                            <p className="text-base pt-2">
                                EA của chúng tôi có thể tự phân tích thị trường và bạn sẽ được cảnh báo khi phát hiện các thiết lập có xác suất cao 24/7!
                            </p>
                        </Col>
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_5} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Kiếm thu nhập thụ động</p>
                            <p className="text-base pt-2">
                                Tận hưởng giao dịch rãnh tay vì EA của chúng tôi chuyển đổi liền mạch các cơ hội thị trường thành thu nhập thụ động ổn định!
                            </p>
                        </Col>
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_6} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Tài khoản giao dịch</p>
                            <p className="text-base pt-2">
                                Tăng cơ hội vượt qua các thử thách của công ty hỗ trợ để bạn có thể bắt đầu giao dịch trên các tài khoản được cấp vốn!
                            </p>
                        </Col>
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_7} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Giảm thiểu rủi ro, tối đa hóa lợi nhuận</p>
                            <p className="text-base pt-2">
                                Được thiết kế để giảm thiểu tổn thất thông qua quản lý rủi ro thông minh đồng thời tối ưu hóa các cơ hội sinh lời trên thị trường!
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>            
            <div className="py-10 bg-white">
                <div className="max-w-screen-2xl items-center mx-auto pt-10">
                    <p className="font-bold text-3xl text-center">VIDEO VỀ SẢN PHẨM</p>
                    <iframe 
                        className="w-full pt-10"
                        height="800" 
                        src="https://www.youtube.com/embed/q2iF26_Nf-8" 
                        title="TakePropips Trading Management Solutions EA Overview" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>       
            <div className="py-10 bg-white">
                <div className="max-w-screen-2xl items-center mx-auto pt-10">
                    <Row>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center">
                                <img src={image4} style={{width: "auto"}}/>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center h-full">
                                <div className="p-10">
                                    <p className="font-bold text-2xl">Đặt giao dịch của bạn ở chế độ lái tự động!</p>
                                    <p className="font-none text-lg pt-5">
                                        Hãy tưởng tượng một hành trình giao dịch nơi các chiến lược của bạn trở nên sống động một cách dễ dàng. 
                                        Hệ thống giao dịch ô tô của chúng tôi ở đây giống như một người bạn đáng tin cậy, đảm nhiệm các giao dịch 
                                        và chiến lược, giúp bạn tự do đạt được ước mơ tài chính của mình mà không bị ràng buộc vào màn hình.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center h-full">
                                <div className="p-5">
                                    <p className="font-bold text-2xl">Giao dịch thông minh hơn, không khó hơn</p>
                                    <p className="font-none text-lg pt-5">
                                        Hãy cùng nhau làm cho giao dịch trở nên dễ dàng! Hệ thống của chúng tôi sẵn sàng 
                                        trở thành người hướng dẫn thân thiện cho bạn, đơn giản hóa những quyết định khó khăn 
                                        đó và giúp bạn điều hướng thị trường một cách dễ dàng.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center">
                                <img src={image5} style={{width: "auto"}}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center">
                                <img src={image6} style={{width: "auto"}}/>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center h-full">
                                <div className="p-5">
                                    <p className="font-bold text-2xl">Giao dịch như một chuyên gia với các tín hiệu giao dịch chính xác của chúng tôi</p>
                                    <p className="font-none text-lg pt-5">
                                        Bạn có mệt mỏi khi cố gắng đoán động thái tiếp theo của thị trường không? 
                                        Hệ thống của chúng tôi cung cấp cho bạn các tín hiệu giao dịch chính xác và đáng 
                                        tin cậy dựa trên phân tích thị trường của AI, đảm bảo rằng bạn không bao giờ bỏ lỡ 
                                        cơ hội thực hiện giao dịch có lợi nhuận. Những tín hiệu này có thể giúp bạn đưa ra 
                                        quyết định sáng suốt về thời điểm tham gia và thoát giao dịch.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}