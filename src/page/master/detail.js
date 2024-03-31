import { Col, Dropdown, Form, Image, Modal, Row, Select, Switch, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { Link, useParams } from "react-router-dom";
import logo from "../../component/image/logo.png";
import { CheckOutlined, FilterOutlined, SmileOutlined } from "@ant-design/icons";

export default function MasterDetail() {  
    const params = useParams();
    const [master, setMaster] = useState([]);
    const [allMaster, setAllMaster] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCopy, setIsOpenCopy] = useState(false);
    const [isOpenVps, setIsOpenVps] = useState(false);

    const getTotalByMasterKey = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getTotalByMasterKey/${params?.master_key}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setMaster(data);
            getAllByUser(data);
          });
    };

    const getAllByUser = async (data) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAllByUser/${data.user?.user_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setAllMaster(data);
            });
    };

    const handleChange = async (values) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/signal/getTotalByMasterKey/${values?.master_key}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
            const data = res?.data;
                setMaster(data);
            });
    }

    useEffect(() => { 
        getTotalByMasterKey();
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-[50px]">
                <div>
                    <p className="font-medium px-5">
                        <Link to="/">Trang chủ</Link> / <Link to="/signal">Signals</Link> / <span className="text-blue-600">{params?.master_key}</span>
                    </p>
                </div>
                
                <Row justify={"center"} align={"middle"} className="py-10">
                    <Col xs={24} xl={12}>
                        <div className="flex border-b-2 border-r-2 p-2 h-[200px]">
                        <Image
                            preview={false}
                            src={master?.user?.photos}
                            width={150}
                            height={150}
                        />
                        <div className="pl-5">
                            <p className="text-[20px] font-none">My name: <span className="text-[22px] font-medium">{master?.user?.displayName}</span></p>
                            <p className="text-[20px] font-none">Email: <span className="text-[22px] font-medium">{master?.user?.email}</span></p>
                            <p className="text-[20px] font-none">My master Key: <span className="text-[22px] font-medium">{master?.user?.master_key}</span></p>
                            <p className="text-[20px] font-none">My private key: <span className="text-[22px] font-medium">{master?.user?.private_key}</span></p>
                        </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={12}>
                        <div className="border-b-2 p-2 pl-5 text-black h-[200px]">
                            <div className="flex justify-between">
                                <p className="text-xl font-bold pb-5">Thống kê giao dịch</p>
                                <Dropdown
                                    trigger={['click']}
                                    dropdownRender={(menu) => (
                                        <div className="shadow-lg w-full p-5 rounded-xl bg-white">
                                        {allMaster?.map((_, index) => (
                                            <p className="my-1 text-lg border-b cursor-pointer" onClick={()=> handleChange(_)}>{_?.master_key} - {_?.master_key_name}</p>
                                        ))}
                                        </div>
                                    )}
                                >
                                    <button className="bg-blue-600 px-4 h-10 text-lg font-semibold text-white rounded-full">Lựa chọn chiến dịch <FilterOutlined /></button>
                                </Dropdown>
                            </div>
                            <div className="text-xl font-semibold flex">
                                <div>
                                    <p>Ranking: {master?.rank ? master?.rank : "Chưa có rank!"}</p>
                                    <p>Tổng signal: {master?.results?.[0]?.total ? master?.results?.[0]?.total : 0}</p>
                                    <p>
                                    Win / Lost: {master?.results?.[0]?.win ? master?.results?.[0]?.win : 0} / {master?.results?.[0]?.loss ? master?.results?.[0]?.loss : 0}
                                    </p>
                                </div>
                                <div className="pl-10">
                                    <p>Win Rate: {master?.results?.[0]?.win_rate ? master?.results?.[0]?.win_rate : 0}</p>
                                    <p>Profit: {master?.results?.[0]?.total_profit ? master?.results?.[0]?.total_profit : 0}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="flex justify-center pb-10 border-b">
                    <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-gray-500 rounded-full text-white font-semibold text-xl"
                        onClick={()=>setIsOpen(true)}
                    >
                        Theo dõi master
                    </button>
                </div>
                <div className="py-10 flex justify-center">
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl">Báo cáo</button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl mx-20">Phân tích</button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl">Lịch sử</button>
                </div>
            </div>
            <Modal title="Theo dõi Master" open={isOpen} onOk={()=>setIsOpen(false)} okText={"Theo Dõi Master"} onCancel={()=>setIsOpen(false)}>
                <Form 
                    layout={"vertical"}
                >
                    <div className="p-2 border-b">
                        <p className="text-lg font-medium flex items-center justify-between">
                            Bạn muốn tự động sao chép giao dịch?
                            <Switch defaultChecked={false} onChange={()=>setIsOpenCopy(!isOpenCopy)} />
                        </p>
                        {isOpenCopy && ( 
                            <p className="font-semibold text-red-500"> 
                                Lưu ý: Xác nhận tương đương bạn đã đồng ý với chính sách
                                bảo mật và tuyên bố miễn trừ trách nhiệm của chúng tôi
                            </p>
                        )}
                    </div>
                    <div className="p-2 border-b">
                        <p className="text-lg font-medium flex items-center justify-between">
                            Bạn muốn thuê copy VPS?
                            <Switch defaultChecked={false} onChange={()=>setIsOpenVps(!isOpenVps)} />
                        </p>
                        {isOpenVps && ( 
                            <div>
                                <Form.Item
                                    label={"Lựa chọn Vps"}
                                    name="vps"
                                    rules={[{ required: true, message: "Vui lòng chọn VPS!" }]}
                                >
                                    <Select
                                        showSearch
                                        size="large"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        options={[
                                            {
                                                label: "mt4",
                                                value: 123
                                            },
                                            {
                                                label: "mt5",
                                                value: 123
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={"Thời gian gia hạn"}
                                    name="vps"
                                    rules={[{ required: true, message: "Vui lòng chọn VPS!" }]}
                                >
                                    <Select
                                        showSearch
                                        size="large"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        options={[
                                            {
                                                label: "mt4",
                                                value: 123
                                            },
                                            {
                                                label: "mt5",
                                                value: 123
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-lg font-semibold px-2">Tài khoản: </p>
                        <Row>
                            <Col xs={24} xl={12} className="p-2">
                                <Form.Item
                                    label={"ID"}
                                    name="master_key"
                                    rules={[{ required: true, message: "Vui lòng chọn ID!" }]}
                                >
                                    <Select
                                        showSearch
                                        size="large"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        options={[
                                            {
                                                label:123,
                                                value:123
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <Form.Item
                                    label={"Nền tảng"}
                                    name="master_key"
                                    rules={[{ required: true, message: "Vui lòng chọn ID!" }]}
                                >
                                    <Select
                                        showSearch
                                        size="large"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        options={[
                                            {
                                                label: "mt4",
                                                value: 123
                                            },
                                            {
                                                label: "mt5",
                                                value: 123
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={24} className="p-2">
                                <p className="text-lg font-medium">Phương thức thanh toán</p>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <p className="text-lg font-medium"><CheckOutlined className="bg-green-400 rounded-full p-1 text-white"/> 1 tháng</p>
                                <p className="text-lg font-medium"><CheckOutlined className="bg-green-400 rounded-full p-1 text-white"/> 3 Tháng</p>
                                <p className="text-lg font-medium"><CheckOutlined className="bg-green-400 rounded-full p-1 text-white"/> 6 Tháng</p>
                                <p className="text-lg font-medium"><CheckOutlined className="bg-green-400 rounded-full p-1 text-white"/> 1 Năm</p>
                                <p className="pt-5">Total: ...</p>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <p className="text-lg font-semibold">Nếu đăng ký 1 tháng</p>
                                <p className="text-lg font-medium flex items-center justify-between pt-2">
                                    Tự động gia hạn?
                                    <Switch defaultChecked={false} />
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}