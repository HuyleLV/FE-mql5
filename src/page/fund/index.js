import { Col, Row } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import { Link } from "react-router-dom";

export default function Fund() {

    return (
        <div>
            <div className="bg-gradient-to-r from-[#1C7AB9] via-[#1C7AB9] to-[#00C4CC]">
                <Row className="max-w-screen-2xl mx-auto px-10 py-20">
                    <Col xs={24} xl={14} className="text-center">
                        <p className="text-8xl font-bold text-[#6CB74E]">Giải Pháp Đầu Tư</p>
                        <p className="text-6xl font-semibold text-[#FFDE59] py-5">NET_Fund Investment</p>
                        <p className="px-10 font-semibold text-xl text-white leading-9">
                            NET_Fund Investment (NFI) là quỹ mở được quản lý chủ động và chuyên<br></br>
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
        </div>
    )
}