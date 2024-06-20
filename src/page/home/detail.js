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
                        <p className="font-bold text-4xl">Kiếm Tiền Tự Động Cùng Tipper Trade</p>
                        <p className="pt-5 font-medium text-lg pr-20">
                            Xác định xu hướng thị trường một cách tự động trên nền tảng Meta Trader bằng sản phẩm của chúng tôi. 
                            Sử dụng dữ liệu toàn cầu để có cái nhìn tổng quan và đưa ra gợi ý giao dịch đến khách hàng một cách 
                            chính xác nhất ngay trên nền tảng giao dịch.
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
                    <p className="font-bold text-3xl">Những Điểm Ưu Việt Mà Chúng Tôi Cung Cấp!</p>
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
                                    <p className="pt-2 font-normal text-base">
                                        Xác định xu hướng thị trường, sức mạnh  <br/>
                                        đồng tiền. Không có đủ kinh nghiệm để <br/>
                                        phân tích thị trường? Sản phầm này sẽ <br/>
                                        giúp bạn về thời điểm vào lệnh.
                                    </p>
                                    <p className="font-semibold text-xl pt-10">2, Managerment solotions</p>
                                    <p className="pt-2 font-none text-lg">
                                        Là công cụ Quản Lý Giao Dịch với Trợ Lý  <br/>
                                        Ảo tiên tiến nhất mà bạn từng gặp.  <br/>
                                        Một công cụ Hoàn Hảo cho các nhà giao dịch  <br/>
                                        Chuyên Nghiệp, giúp họ Tự Động Hoá   <br/>
                                        các tác vụ mang đến trải nghiệm xuất <br/>
                                        sắc để trở nên giàu có.
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
                                        Bạn là nhà giao dịch lướt sóng, nhà giao dịch <br/>
                                        trong ngày hay nhà giao dịch dài hạn? <br/>
                                        Bạn muốn giao dịch FX, Chỉ số, Vàng hay <br/>
                                        Tiền điện tử. Sản phẩm dành cho bạn!
                                    </p>
                                    <p className="font-semibold text-xl pt-10">4, Trading Signals</p>
                                    <p className="pt-2 font-none text-lg">
                                        Tín hiệu giao dịch được xây dựng trên hệ thống <br/>
                                        giao dịch độc quyền xác định được Xu Hướng <br/>
                                        thị trường cung cấp Hành Động Giao Dịch với <br/>
                                        xác xuất chiến thắng cao. Hệ thống Ai cung <br/>
                                        cấp tín hiệu trên bất kỳ cặp nào và trên <br/>
                                        tất cả các khung thời gian
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
                        <span className="font-semibold">Tại Tipper Trade</span> chúng tôi tin rằng thành công trong giao dịch không chỉ là có Công Cụ Phù Hợp mà còn có Tư Duy Đúng <br/>
                        Đắn. Đó là lý do tại sao chúng tôi không chỉ cung cấp phần mềm giao dịch tiên tiến mà còn cung cấp Kiến Thức và Hỗ Trợ để<br/>
                        giúp khách hàng phát triển các kỹ năng đầu tư và sự kỷ luật cần thiết để đạt được Thành Công trên thị trường.
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
                                    <p className="font-semibold text-2xl">Phân tích thị trường và tạo tín hiệu</p>
                                    <p className="text-lg pt-2">
                                        Sản phẩm của chúng tôi phân tích thị trường ngoại hối 24/7, tạo ra tín hiệu giao dịch chính xác 
                                        thông qua các thuật toán và chi báo nâng cao.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-10">
                                <img src={icon_3} style={{width: 130, height: 130}}/>
                                <div className="pl-4">
                                    <p className="font-semibold text-2xl">Thực hiện giao dịch tự động hoặc thủ công</p>
                                    <p className="text-lg pt-2">
                                        Chọn giữa thực hiện giao dịch tự động dựa trên tín hiệu được tạo hoặc áp dụng tín hiệu theo cách 
                                        thủ công cho chiến lược giao dịch của bạn.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-10">
                                <img src={icon_2} style={{width: 130, height: 130}}/>
                                <div className="pl-4">
                                    <p className="font-semibold text-2xl">Quản lý rủi ro mạnh mẽ</p>
                                    <p className="text-lg pt-2">
                                        Sử dụng các biện pháp bảo vệ như rút vốn và bảo vệ lợi nhuận, Sản phẩm bảo vệ các giao dịch của bạn 
                                        bảo toàn lợi nhuận và hạn chế thua lỗ
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
                                Sản phẩm của chúng tôi có thể tự phân tích thị trường và bạn sẽ được cảnh báo 
                                khi phát hiện các điểm vào lệnh với xác xuất chiến thắng trên 70%
                            </p>
                        </Col>
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_5} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Kiếm thu nhập thụ động</p>
                            <p className="text-base pt-2">
                                Tận hưởng giao dịch tự động vì sản phẩm của chúng tôi chuyển đổi liền mạch 
                                các cơ hội tại thị trường thành thu nhập thụ động ổn định!
                            </p>
                        </Col>
                        <Col xs={24} xl={6} className="px-4">
                            <div className="flex justify-center">
                                <img src={icon_6} style={{height: 300}}/>
                            </div>
                            <p className="font-semibold text-xl">Đạt mục tiêu tài chính</p>
                            <p className="text-base pt-2">
                                Sứ Mệnh của chúng tôi là giúp các nhà giao dịch đạt được Mục Tiêu Tài Chính của 
                                họ bằng cách cung cấp cho họ các Công Cụ, Đào Tạo và Hỗ Trợ những thứ họ cần để 
                                thành công một cách nhanh nhất
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
                        src="https://www.youtube.com/embed/jNOPRlFV1zU" 
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
                                    <p className="font-bold text-2xl">Để nhanh chóng trở thành master trong thị trường!</p>
                                    <p className="font-none text-lg pt-5">
                                        Cho dù bạn là nhà giao dịch theo xu hướng, nhà giao dịch ngược xu hướng hay cả hai, 
                                        sản phẩm của chúng tôi nhanh xu hướng hiện tại của thị trường có thể cải thiện việc 
                                        ra quyết định của bạn khi tham gia giao dịch. Không nhưng thế, với kho kiến thức khổng lồ, 
                                        trực quan, dễ hiểu sẽ nhanh chóng giúp bạn thành Master Tradae
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xl={12}>
                            <div className="flex justify-center items-center h-full">
                                <div className="p-5">
                                    <p className="font-bold text-2xl">Giao dịch thông minh hơn với hệ thống Ai</p>
                                    <p className="font-none text-lg pt-5">
                                        Hãy cùng nhau làm cho giao dịch trở nên dễ dàng! Hệ thống của chúng tôi sẵn sàng trở thành 
                                        người hướng dẫn thân thiện cho bạn, đơn giản hóa những quyết định khó khăn đó và giúp bạn 
                                        điều hướng thị trường một cách dễ dàng.
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