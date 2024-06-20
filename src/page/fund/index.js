import { Col, Row } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import banner_fund from "../../component/image/banner_fund.png";
import { Link } from "react-router-dom";

export default function Fund() {

    return (
        <div>
            <div className="bg-gradient-to-r from-[#1C7AB9] via-[#1C7AB9] to-[#00C4CC]">
                <Row className="max-w-screen-2xl mx-auto px-10 py-20">
                    <Col xs={24} xl={14} className="text-center">
                        <p className="text-8xl font-bold text-[#6CB74E]">Giải Pháp Đầu Tư</p>
                        <p className="text-6xl font-semibold text-[#FFDE59] py-5">TIPPER_Fund Investment</p>
                        <p className="px-10 font-semibold text-xl text-white leading-9">
                            TIPPER_Fund Investment (NFI) là quỹ mở được quản lý chủ động và chuyên<br></br>
                            nghiệp bởi ACE Capital Group. Quỹ NFI đầu tư chủ yếu vào <br></br>
                            các sản phẩm tài chính như hàng hoá, chứng khoán, CFD.  <br></br>
                            Đây là những sản phẩm có lợi thế cạnh tranh trên thị  <br></br>
                            trường và có tiềm năng tăng trưởng tốt. <br></br>
                        </p>
                        <Link to={"/home-detail"}>
                            <button className="text-xl text-white border px-6 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                                Tham Gia Ngay
                            </button>
                        </Link>
                    </Col>
                    <Col xs={24} xl={10}>
                        <div className="flex justify-center">
                            <img src={image_mk4} className="w-[400px] h-[600px]"/>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className="max-w-screen-2xl mx-auto p-10">
                <Col xs={24} xl={14}>
                    <p className="font-bold text-4xl text-center text-[#3F485D]">
                        Hiệu Xuất Đầu Tư Trên <br></br>
                        Thời Gian Thực
                    </p>
                    <p className="font-semibold text-2xl text-center py-5">Tổng vốn: <span className="text-blue-800 font-bold">1.000.000.000 VND</span></p>
                    <div className="border-2 border-gray-500 mx-20 rounded-xl my-10">
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                TẠI NGÀY 23/04/2024
                            </p>
                            <p className="w-1/3 text-end">
                                NFI
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl border-y border-gray-500">
                            <p className="w-2/3">
                                LỢI NHUẬN TỪ ĐẦU NĂM (2024) (%)
                            </p>
                            <p className="w-1/3 text-end">
                                6.0
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                LỢI NHUẬN 1 NĂM (%)
                            </p>
                            <p className="w-1/3 text-end">
                                28.3
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl border-y border-gray-500">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH 3 NĂM (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                13.6
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH 5 NĂM (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                18.4
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl border-t border-gray-500">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH TỪ NGÀY THÀNH LẬP (18-04-2017) (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                15.4
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={24} xl={10}>
                    <p className="font-bold text-4xl text-center text-[#3F485D]">Tỷ Lệ Phân Bổ Vốn</p>
                </Col>
            </Row>

            <div className="max-w-screen-2xl mx-auto flex justify-center">
                <div>
                    <p className="font-bold text-4xl text-[#004AAD] py-10 text-center">Những Khách Hàng Đã Tham Gia Quỹ Của Chúng Tôi</p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <p className="text-xl border-b-2 border-gray-500 p-5">
                        <span>1 - </span>
                        Ông Trần Văn xxx - 0912345xxx  - acvxxx@gmail.com - ngày tham gia 01/05/2024 đã đầu tư 5.000.000đ 
                    </p>
                    <Link to={""} className="flex justify-center">
                        <button className="text-xl text-white border px-6 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                            Xem Thêm
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-gradient-to-r from-[#1C7AB9] via-[#1C7AB9] to-[#00C4CC] my-10">
                <div className="max-w-screen-2xl mx-auto py-10">
                    <p className="font-bold text-2xl text-white">Tổng quan</p>
                    <p className="font-bold text-2xl text-white">Thông tin về quỹ Tipper Fund Investment</p>
                    <Row className="py-5">
                        <Col xs={24} xl={12}>
                            <div className="font-semibold text-xl text-[#57E4FF] leading-8">
                                <p>Hình Thức: </p>
                                <p>Số tiền đầu tư tối thiểu: 1.000.000đ</p>
                                <p>Tần xuất giao dịch: Từ thứ 2-6</p>
                                <p>Phí quản lý: 30$/tháng</p>
                                <p>Chỉ số tham chiếu tham khảo: Vn-Index</p>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="font-semibold text-xl text-[#57E4FF] leading-8">
                                <p>Ngày Thành Lập: 01/05/2024</p>
                                <p>Tần xuất giao dịch: Từ thứ 2-6</p>
                                <p>Phí quản lý: 30$/tháng</p>
                                <p>Chỉ số tham chiếu tham khảo: Vn-Index</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row className="bg-[#0A1A44]">
                    <Col xs={24} xl={8} className="py-10 px-20 border-r">
                        <div className="flex items-center pb-5">
                            <p className="bg-[#00C4CC] w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg">01</p>
                            <p className="text-white pl-2 font-semibold text-xl">Tầm Nhìn</p>
                        </div>
                        <p className="text-lg font-normal text-white">
                            Tầm nhìn của chúng tôi là giúp các nhà giao dịch 
                            đạt được Mục Tiêu Tài Chính của họ bằng cách cung cấp 
                            cho họ những giải pháp tốt nhất
                        </p>
                    </Col>
                    <Col xs={24} xl={8} className="py-10 px-20 border-r">
                        <div className="flex items-center pb-5">
                            <p className="bg-[#00C4CC] w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg">02</p>
                            <p className="text-white pl-2 font-semibold text-xl">Sứ Mệnh</p>
                        </div>
                        <p className="text-lg font-normal text-white">
                            Xây dựng TIPPER trở thành một nền tảng đầu tư tất cả 
                            trong một với trải nghiệm đơn giản, dễ hiểu và thuận tiện, 
                            giúp khách hàng đạt mục tiêu về tự do tài chính.
                        </p>
                    </Col>
                    <Col xs={24} xl={8} className="py-10 px-20">
                        <div className="flex items-center pb-5">
                            <p className="bg-[#00C4CC] w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg">03</p>
                            <p className="text-white pl-2 font-semibold text-xl">Tôn Chỉ Hoạt Động</p>
                        </div>
                        <p className="text-lg font-normal text-white">
                            + An Toàn <br></br>
                            + Nhanh Chóng <br></br>
                            + Chính Xác <br></br>
                            + Hiệu Quả <br></br>
                            + Minh Bạch
                        </p>
                    </Col>
                </Row>
            </div>

            <div className="max-w-screen-2xl mx-auto py-10">
                <p className="font-bold text-4xl text-[#004AAD]">Ban Điều Hành Quỹ</p>
                <Row className="py-10">
                    <Col xs={24} xl={12} className="pr-10">
                        <img src={image_mk4} className="w-full h-[700px] rounded-2xl"/>
                    </Col>
                    <Col xs={24} xl={12} className="pl-10">
                        <div className="grid grid-cols-2 text-center">
                            <div>
                                <div className="flex justify-center">
                                    <img src={image_mk4} className="w-[250px] h-[250px] rounded-full"/>
                                </div>
                                <p className="pt-5 font-bold text-xl">Ông Trần Văn A</p>
                                <p className="text-lg">Nhà điều hành Quỹ</p>
                            </div>
                            <div>
                                <div className="flex justify-center">
                                    <img src={image_mk4} className="w-[250px] h-[250px] rounded-full"/>
                                </div>
                                <p className="pt-5 font-bold text-xl">Ông Trần Văn A</p>
                                <p className="text-lg">Nhà điều hành Quỹ</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 text-center pt-5">
                            <div>
                                <div className="flex justify-center">
                                    <img src={image_mk4} className="w-[250px] h-[250px] rounded-full"/>
                                </div>
                                <p className="pt-5 font-bold text-xl">Ông Trần Văn A</p>
                                <p className="text-lg">Nhà điều hành Quỹ</p>
                            </div>
                            <div>
                                <div className="flex justify-center">
                                    <img src={image_mk4} className="w-[250px] h-[250px] rounded-full"/>
                                </div>
                                <p className="pt-5 font-bold text-xl">Ông Trần Văn A</p>
                                <p className="text-lg">Nhà điều hành Quỹ</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="max-w-screen-2xl mx-auto text-center py-10">
                <p className="font-bold text-4xl text-[#004AAD]">Lợi ích khi đầu tư cùng quỹ</p>
                <p className="font-bold text-4xl text-[#004AAD]">Tipper Fund Investment</p>
                <img src={banner_fund} className="w-full pt-10"/>
            </div>

            <div className="bg-[#1C7AB9]">
                <div className="max-w-screen-2xl mx-auto text-white py-10">
                    <p className="font-bold text-4xl pb-10">Hướng Dẫn Đầu Tư</p>

                    <Row>
                        <Col xs={24} xl={4} className="border-b-2">
                            <div className="flex items-center h-full">
                                <p className="font-bold text-2xl px-5">1</p>
                            </div>
                        </Col>
                        <Col xs={24} xl={14} className="border-b-2">
                            <div className="flex items-center h-full">
                                <p className="font-semibold text-2xl px-5">
                                    Mở tài khoản đầu tư tại một trong những đối tác của chúng tôi
                                </p>
                            </div>
                        </Col>
                        <Col xs={24} xl={6} className="border-b-2">                            
                            <p className="pb-2">
                                <Link to={""}>
                                    <button className="text-xl text-white border px-6 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800">
                                        Mở Tài Khoản Ngay
                                    </button>
                                </Link>
                            </p>
                            <p className="pb-5">
                                <Link to={""}>
                                    <button className="text-xl text-white border px-6 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800">
                                        Tôi Đã Có Tài Khoản
                                    </button>
                                </Link>
                            </p>
                        </Col>
                        
                        <Col xs={24} xl={4} className="py-5 border-b-2">
                            <div className="flex items-center h-full">
                                <p className="font-bold text-2xl px-5">2</p>
                            </div>
                        </Col>
                        <Col xs={24} xl={14} className="py-5 border-b-2">
                            <div className="flex items-center h-full">
                                <p className="font-semibold text-2xl px-5">
                                    Đăng ký tham gia quỹ Tipper Fund Investment
                                </p>
                            </div>
                        </Col>
                        <Col xs={24} xl={6} className="py-5 border-b-2">                            
                            <p className="pb-2">
                                <Link to={""}>
                                    <button className="text-xl text-white border px-12 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800">
                                        Đăng Ký Ngay
                                    </button>
                                </Link>
                            </p>
                        </Col>
                        
                        <Col xs={24} xl={4} className="py-5">
                            <div className="flex items-center h-full">
                                <p className="font-bold text-2xl px-5">3</p>
                            </div>
                        </Col>
                        <Col xs={24} xl={14} className="py-5">
                            <div className="flex items-center h-full">
                                <p className="font-semibold text-2xl px-5">
                                    Nhận Xác Thực từ Tipper Fund Invesment <br></br>
                                    <span className="text-lg">
                                        Tipper Fund Investment sẽ xác nhận qua tin nhắn và email khi nhận được thông tin đăng ký tham gia đầu tư của bạn
                                    </span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}