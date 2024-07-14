import { Button, Col, Form, Input, InputNumber, message, Modal, Row } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import banner_fund from "../../component/image/banner_fund.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DecimalNumber, FormatVND } from "../../utils/format";
import axiosInstance from "../../utils/axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Fund() {
    const [fund, setFund] = useState([]);
    const [dollar, setDollar] = useState([]);
    const [listFund, setListFund] = useState([]);
    const [registerStep1, setRegisterStep1] = useState(0);
    const [registerFund, setRegisterFund] = useState(0);
    
    const [form] = Form.useForm();

    const getFundData = async () => {
        await axiosInstance
            .get(`/fund/getFundData`)
            .then(({ data }) => {
                setFund(data);
            });
    }
    
    const getDollar = async () => {
        await axiosInstance.get(`/dollar/getById`)
            .then((res) => {
                const data = res?.data;
                setDollar(data[0]);
            })
            .catch(() => message.error("Error server!"));
    };
    
    const getListFund = async () => {
        await axiosInstance.get(`/tradingAccount/getListFund`)
            .then(({ data }) => {
                setListFund(data);
            })
            .catch(() => message.error("Error server!"));
    };

    const onSubmit = async (e) => {
        await axiosInstance.post(`/tradingAccount/create`, e)
            .then((res) => {
                message.success(String(res?.data?.message));
                getFundData();

                if(Number(res?.data?.status) === 1) {
                    setRegisterFund(0);
                    form.resetFields();
                }
            })
    }

    const dataChartFund = {  
        labels: ["Khách Hàng", "Quỹ Tipper"],
        datasets: [
            {
                label: "Phần trăm",
                data: [
                    fund?.fund?.[0]?.client_balance / (fund?.fund?.[0]?.client_balance + fund?.fund?.[0]?.master_balance) * 100, 
                    fund?.fund?.[0]?.master_balance / (fund?.fund?.[0]?.client_balance + fund?.fund?.[0]?.master_balance) * 100
                ],
                backgroundColor: [
                    '#14b8a6',
                    '#06b6d4',
                    '#f97316',
                    '#f59e0b',
                    '#eab308',
                    '#84cc16',
                    '#10b981',
                    '#0ea5e9',
                    '#6366f1',
                    '#ec4899',
                    '#64748b',
                    '#6b7280'
                ],
            }
        ],
    };

    const dataChartSymbol = {  
        labels: fund?.symbolCategory?.map((_,i) => (_?.symbol)),
        datasets: [
            {
                label: "Số lệnh",
                data: fund?.symbolCategory?.map((_,i) => (_?.count_symbol)),
                backgroundColor: [
                    '#14b8a6',
                    '#06b6d4',
                    '#f97316',
                    '#f59e0b',
                    '#eab308',
                    '#84cc16',
                    '#10b981',
                    '#0ea5e9',
                    '#6366f1',
                    '#ec4899',
                    '#64748b',
                    '#6b7280'
                ],
            }
        ],
    };

    useEffect(() => { 
        getFundData();
        getDollar();
        getListFund();
    }, []);

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

            <Row className="max-w-screen-2xl mx-auto p-10 mt-10x">
                <Col xs={24} xl={14}>
                    <p className="font-bold text-4xl text-center text-[#3F485D]">
                        Hiệu Xuất Đầu Tư Trên <br></br>
                        Thời Gian Thực
                    </p>
                    <p className="font-semibold text-2xl text-center py-5">Tổng vốn: 
                        <span className="text-blue-800 font-bold"> {FormatVND((fund?.fund?.[0]?.master_balance + fund?.fund?.[0]?.client_balance) * dollar?.dollar_vnd)}</span>
                    </p>
                    <div className="border-2 border-gray-500 mx-20 rounded-xl my-10">
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                TẠI NGÀY {dayjs(Date()).format("DD/MM/YYYY")}
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
                                {DecimalNumber(fund?.fund?.[0]?.profit_half_year, 2)}
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                LỢI NHUẬN 1 NĂM (%)
                            </p>
                            <p className="w-1/3 text-end">
                                {DecimalNumber(fund?.fund?.[0]?.profit_one_year, 2)}
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl border-y border-gray-500">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH 3 NĂM (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                {DecimalNumber(fund?.fund?.[0]?.profit_three_year, 2)}
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH 5 NĂM (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                {DecimalNumber(fund?.fund?.[0]?.profit_five_year, 2)}
                            </p>
                        </div>
                        <div className="flex p-10 font-semibold text-xl border-t border-gray-500">
                            <p className="w-2/3">
                                LỢI NHUẬN KÉP TRUNG BÌNH TỪ NGÀY THÀNH LẬP (18-04-2017) (%/NĂM)
                            </p>
                            <p className="w-1/3 text-end">
                                {DecimalNumber(fund?.fund?.[0]?.profit_at, 2)}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={24} xl={10}>
                    <p className="font-bold text-4xl text-center text-[#3F485D]">Tỷ Lệ Phân Bổ Vốn</p>
                    <div className="flex justify-center h-[400px] my-10">
                        <Pie data={dataChartFund}/>
                    </div>
                    <p className="font-bold text-4xl text-center text-[#3F485D]">Danh mục đầu tư</p>
                    <div className="flex justify-center h-[400px] my-10">
                        <Pie data={dataChartSymbol}/>
                    </div>
                </Col>
            </Row>

            <div className="max-w-screen-2xl mx-auto flex justify-center">
                <div>
                    <p className="font-bold text-4xl text-[#004AAD] py-10 text-center">Những Khách Hàng Đã Tham Gia Quỹ Của Chúng Tôi</p>
                    {listFund?.map((_, i) => (
                        <p className="text-2xl border-b-2 border-gray-500 p-5 flex justify-center">
                            <span>{i+1}</span>
                            - {_?.fullname} - {_?.phone}  - {_?.email} - ngày tham gia {dayjs(_?.create_at).format("DD/MM/YYYY")} đã đầu tư {FormatVND(_?.init_balance * dollar?.dollar_vnd)} 
                        </p>
                    ))}
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
                                <button 
                                    className={`${registerStep1 == 1 ? "bg-blue-800" : "bg-blue-600"} text-xl text-white border px-6 py-2 rounded-full border-blue-600 font-semibold`}
                                    onClick={() => (setRegisterStep1(1), message.success("Vui lòng chuyển sang bước 2 để đăng ký!"))}
                                >
                                    Mở Tài Khoản Ngay
                                </button>
                            </p>
                            <p className="pb-5">
                                <button 
                                    className={`${registerStep1 == 2 ? "bg-blue-800" : "bg-blue-600"} text-xl text-white border px-6 py-2 rounded-full border-blue-600 font-semibold`}
                                    onClick={() => (setRegisterStep1(2), message.success("Vui lòng chuyển sang bước 2 để đăng ký!"))}
                                >
                                    Tôi Đã Có Tài Khoản
                                </button>
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
                                <button 
                                    className="text-xl text-white border px-12 py-2 rounded-full bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800"
                                    onClick={() => registerStep1 > 0 ? setRegisterFund(3) : message.warning("Vui lòng chọn ở bước 1!")}
                                >
                                    Đăng Ký Ngay
                                </button>
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
            
            <Modal
                title="Đăng ký tham gia quỹ!"
                className="flex justify-center"
                open={
                    registerFund == 3 
                }
                onCancel={() => setRegisterFund(0)}
                footer={null}
            >
                <p className="p-5">Vui lòng nhập đầy đủ thông tin để tham gia quỹ!</p>
                <Form
                    layout={"vertical"}
                    colon={false}
                    form={form}
                    onFinishFailed={(e) => console.log(e)}
                    onFinish={onSubmit}
                    >
                    <Form.Item
                        label={"Họ và tên"}
                        name="fullname"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input size="large" placeholder={"Nhập họ và tên"} />
                    </Form.Item>
            
                    <Form.Item label={"Số điện thoại"} name="phone">
                        <InputNumber className="!w-full" size="large" placeholder={"Nhập số điện thoại"} />
                    </Form.Item>

                    <Form.Item
                        label={"Email"}
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input type="email" size="large" placeholder={"Nhập email"} />
                    </Form.Item>

                    <Form.Item
                        label={"ID MT4"}
                        name="mt4_acc"
                        rules={[{ required: true, message: "Vui lòng nhập ID MT4!" }]}
                    >
                        <Input size="large" placeholder={"Nhập ID MT4"} />
                    </Form.Item>

                    <Form.Item
                        label={"Server"}
                        name="server"
                        rules={[{ required: true, message: "Vui lòng nhập server!" }]}
                    >
                        <Input size="large" placeholder={"Nhập server"} />
                    </Form.Item>
            
                    <Button type={"primary"} htmlType={"submit"} className="flex justify-end w-full">
                        {"Theo dõi"}
                    </Button>
                </Form>
            </Modal>
        </div>
    )
}