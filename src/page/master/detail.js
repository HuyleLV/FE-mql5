import { Button, Col, Dropdown, Form, Image, Input, Modal, Pagination, Radio, Row, Select, Space, Switch, Table, Tooltip, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjsInstance from "../../utils/dayjs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {  FilterOutlined, InfoOutlined } from "@ant-design/icons";
import { FormatDollar } from "../../utils/format";
import axiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";
import SignalByHour from "../../component/ChartCustom/signalByHour";
import SignalByDate from "../../component/ChartCustom/signalByDate";
import SignalBuySell from "../../component/ChartCustom/signalBuySell";
import SignalSymbol from "../../component/ChartCustom/signalSymbol";
import SignalWinLoss from "../../component/ChartCustom/signalWinLoss";

export default function MasterDetail() {  
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [form] = Form.useForm();

    const mass_1 = Form.useWatch('mass_1', form);
    const mass_2 = Form.useWatch('mass_2', form);
    const mass_3 = Form.useWatch('mass_3', form);

    const [master, setMaster] = useState([]);
    const [allMaster, setAllMaster] = useState([]);
    const [vps, setVps] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCopy, setIsOpenCopy] = useState(false);
    const [isOpenVps, setIsOpenVps] = useState(false);  

    const [priceFl, setPriceFl] = useState(0);
    const [priceMaster, setPriceMaster] = useState(0);
    const [priceVps, setPriceVps] = useState(0);
    const [vpsTime, setVpsTime] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isReport, setIsReport] = useState(1);
    const [report, setReport] = useState([]);
    const [signal, setSignal] = useState([]);
    const [masterKey, setMasterKey] = useState(params?.master_key);

    const [paginationSignal, setPaginationSignal] = useState({
      page: 1,
      pageSize: 8,
    });

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const getTotalByMasterKey = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getTotalByMasterKey/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            console.log(data);
            setMaster(data);
            getAllByUser(data);
          });
    };

    const getReportByMasterKey = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getReportByMasterKey/${masterKey}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setReport(data?.[0]);
          });
    };
    
    const getAllByUser = async (data) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAllByUserInMaster/${data.user?.user_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setAllMaster(data);
            });
    };

    const getAllVps = async () => {
        await axiosInstance.get(`/vps/getAllUser`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setVps(data);
            });
    };

    const getPriceMaster = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/masterPrice/getById/1`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setPriceMaster(data[0]);
            });
    };

    const getPriceVps = async (vps_id) => {
        await axiosInstance
            .get(`vps/getPrice/${vps_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setPriceVps(data[0]?.vps_price);
            });
    };

    const getSignal = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/signal/getByMasterKey/${masterKey}`, {params: paginationSignal})
        .catch(function (error) {
          message.error(error.response.status);
        })
        .then(( res ) => {
          const data = res?.data;
          setSignal(data);
        });
    };

    const handleChange = async (values) => {
        setMasterKey(values?.master_key);
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

    const onSubmit = async (value) => {
        let i = 0;
        if(value?.mass_1?.length > 0) {
            i = 1;
        }else if(value?.mass_2?.length > 0){
            i = 2;
        }else if(value?.mass_3?.length > 0){
            i = 3;
        }

        if(cookies?.user?.account_balance >= totalPrice) {
            const data = {
                ...value,
                regime: i,
                mass: i === 1 ? mass_1 : i === 2 ? mass_2 : i=== 3 ? mass_3 : 0,
                master_key: params?.master_key,
                total_price: totalPrice,
                create_by: cookies?.user?.user_id
            }

            await axiosInstance.post(`/user/updateBalance`, {
                price: totalPrice
            });
    
            await axiosInstance.post(`/followerDraft/create`, data)
                .catch(function (error) {
                    message.error(String(error.response.status));
                })
                .then((res) => {
                    message.success(String(res?.data?.message));
                    setIsOpen(false);
                });
        } else {
            message.warning("Số dư của bạn không đủ!");
        }
    }

    
    const columnSignal = [
        {
            title: <div>ID</div>,
            key: "signal_id",
            dataIndex: "signal_id",
            width: 50,
            render: (_, record) => <div>{record?.signal_id}</div>,
        },
        {
            title: <div>Master Key</div>,
            key: "master_key",
            dataIndex: "master_key",
            width: 50,
            render: (_, record) => <div>{record?.master_key}</div>,
        },
        {
            title: <div>Type</div>,
            key: "type",
            dataIndex: "type",
            width: 50,
            render: (_, record) => <div>{record?.type}</div>,
        },
        {
            title: <div>Symbol</div>,
            key: "symbol",
            dataIndex: "symbol",
            width: 50,
            render: (_, record) => <div>{record?.symbol}</div>,
        },
        {
            title: <div>Giá</div>,
            key: "price",
            dataIndex: "price",
            width: 50,
            render: (_, record) => <div>{record?.price}</div>,
        },
        {
            title: <div>Take profit</div>,
            key: "take_profit",
            dataIndex: "take_profit",
            width: 50,
            render: (_, record) => <div>{record?.take_profit}</div>,
        },
        {
            title: <div>Stop loss</div>,
            key: "stop_loss",
            dataIndex: "stop_loss",
            width: 50,
            render: (_, record) => <div>{record?.stop_loss}</div>,
        },
        {
          title: <div>Profit</div>,
          key: "profit",
          dataIndex: "profit",
          width: 50,
          render: (_, record) => <div>{record?.profit}</div>,
        },
        {
            title: <div className="text-center">Trạng thái lệnh</div>,
            key: "signal_status",
            dataIndex: "signal_status",
            width: 50,
            render: (_, record) => 
            record?.signal_status === 1 ?
                <div className="flex justify-center text-center">
                    Open 
                </div> 
            : 
                <div>
                    <p className="text-center">Close</p>
                </div> 
            ,
        },
        {
            title: <div>Ngày tạo</div>,
            key: "create_at",
            dataIndex: "create_at",
            width: 50,
            render: (_, record) => <div>{dayjsInstance(record?.create_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
        },
        {
            title: <div>Ngày cập nhật</div>,
            key: "update_at",
            dataIndex: "update_at",
            width: 50,
            render: (_, record) => <div>{dayjsInstance(record?.update_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
        },
    ]

    useEffect(() => { 
        getTotalByMasterKey();
        getAllVps();
        getPriceMaster();
        getReportByMasterKey();
        getSignal();
    }, [masterKey, paginationSignal]);
    

    useEffect(() => { 
        setTotalPrice(priceFl + (priceVps * vpsTime))
    }, [priceFl, priceVps, vpsTime]);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-[50px]">
                <div>
                    <p className="font-medium px-5">
                        <Link to="/">Trang chủ</Link> / <Link to="/signal">Signals</Link> / <span className="text-blue-600">{params?.master_key}</span>
                    </p>
                </div>
                
                <Row justify={"center"} align={"middle"} className="pt-10 border-b-2">
                    <Col xs={24} xl={12}>
                        <div className="flex p-2 h-[200px]">
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
                                {/* <p className="text-[20px] font-none">My private key: <span className="text-[22px] font-medium">{master?.user?.private_key}</span></p> */}
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={12} className="border-l-2">
                        <div className="p-2 pl-5 text-black">
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
                                    <p className="py-2">Tổng signal: {master?.results?.[0]?.total ? Math.round(master?.results?.[0]?.total * 100) / 100 : 0}</p>
                                    <p>
                                        Win / Lost: {master?.results?.[0]?.gltb ? master?.results?.[0]?.win : 0} / {master?.results?.[0]?.loss ? master?.results?.[0]?.loss : 0}
                                    </p>
                                    <p className="py-2">Thời gian giao dịch: {master?.results?.[0]?.time_trade ? Math.round(master?.results?.[0]?.time_trade * 100) / 100 : 0} h</p>
                                    <p className="pb-2">Thời gian giữ lệnh trung bình: {master?.results?.[0]?.gltb ? Math.round(master?.results?.[0]?.gltb * 100) / 100 : 0} h</p>
                                    </div>
                                    <div className="pl-10">
                                    <p>Tỷ lệ win: {master?.results?.[0]?.win_rate ? Math.round(master?.results?.[0]?.win_rate * 100) / 100 : 0}</p>
                                    <p className="py-2">Profit: {master?.results?.[0]?.total_profit ? Math.round(master?.results?.[0]?.total_profit * 100) / 100 : 0}</p>
                                    <p>Lệnh trung bình 1 ngày: {master?.results?.[0]?.tb1n ? Math.round(master?.results?.[0]?.tb1n * 100) / 100 : 0}</p>
                                    <p className="py-2">Follower: {master?.results?.[0]?.follower ? Math.round(master?.results?.[0]?.follower * 100) / 100 : 0}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="flex justify-center py-5 border-b">
                    <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-gray-500 rounded-full text-white font-semibold text-xl"
                        onClick={()=>{
                            if(!cookies?.user) {
                                message.warning("Vui lòng đăng nhập để dùng chức năng này!")
                            } else {
                                setIsOpen(true)
                            }
                        }}
                    >
                        Theo dõi master
                    </button>
                </div>
                <div className="py-10 flex justify-center">
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl" onClick={()=>setIsReport(1)}>
                        Báo cáo
                    </button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl mx-20" onClick={()=>setIsReport(2)}>
                        Phân tích
                    </button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl" onClick={()=>setIsReport(3)}>
                        Lịch sử
                    </button>
                </div>
                <div>
                    {isReport === 1 && (
                        <Row className="bg-gray-100 text-white rounded-xl p-10">
                            <Col xs={24} xl={24} className="text-black p-2">
                                <p className="text-center font-bold text-2xl pb-5">BÁO CÁO</p>
                            </Col>

                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Sụt giảm cao nhất</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tỷ lệ sụt giảm dựa trên số dư</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.sgcn * 100) / 100} %</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Giao dịch có lợi nhuận cao nhất</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Giao dịch có lợi nhuận cao nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.profit_max * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Tổng lệnh đã trade</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng số giao dịch đã trade</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.total * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Giao dịch loss nhiều nhất</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Giao dịch có loss lớn nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.profit_min * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Tổng lệnh đang chạy</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng số giao dịch đang mở</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.total_open * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Lợi nhuận trung bình</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Bằng tổng lợi nhuận chia tổng giao dịch thắng</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.lntb * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Tổng lệnh win</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng số giao dịch thắng</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.total_win * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Thua lỗ trung bình</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Bằng tổng thua lỗ chia tổng giao dịch loss</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.loss_tb * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Tổng lệnh loss</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng số giao dịch lỗ</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.total_loss * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Thời gian phục hồi</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Thời gian phục hồi dựa trên mức sụt giảm cao nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.tgph * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Lợi nhuận trung bình / lot</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Lợi nhuận trung bình trên 1 lot</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.lntb_lot * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Lợi nhuận liên tiếp</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng lợi nhuận của chuỗi giao dịch win liên tiếp cao nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.lnlt * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Lợi nhuận trung bình / ngày</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Lợi nhuận trung bình của 1 ngày</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.lntb_date * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Loss liên tiếp</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng thua lỗ của chuỗi giao dịch loss liên tiếp cao nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.llt * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Số lệnh win liên tiếp</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Chuỗi giao dịch win liên tiếp lớn nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.slwlt * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Volume giữ cao nhất</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng khối lượng của tổng số lệnh lớn nhất được giữ khi giao dịch</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.volumne_max * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Số lệnh loss liên tiếp</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Chuỗi giao dịch loss liên tiếp lớn nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.slllt * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Khối lượng lệnh trung bình</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Khối lượng lệnh trung bình của tài khoản</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.volumne_tb * 100) / 100}</p>
                                </div>
                            </Col>
                            
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Số lệnh trạng thái nhiều nhất</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Tổng giao dịch được giữ lớn nhất</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.slttnn * 100) / 100}</p>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="p-2">
                                <div className="flex justify-between py-2 px-10 bg-gradient-to-r from-slate-800 to-blue-700 rounded-xl">
                                    <div className="flex items-center">
                                        <p className="text-center font-bold text-lg">Tăng trưởng tài khoản</p>
                                        <Tooltip 
                                            placement="top" 
                                            title={
                                                <span className="text-white font-semibold text-md">Phần trăm tăng trưởng tài khoản</span>
                                            } 
                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                            >
                                            <InfoOutlined className="p-1 text-white text-md"/>
                                        </Tooltip>
                                    </div>
                                    <p className="text-center font-bold text-lg">{Math.round(report?.tttk * 100) / 100} %</p>
                                </div>
                            </Col>
                        </Row>
                    )}

                    {isReport === 2 && (
                        <Row>
                            <Col xs={24} xl={24}>
                                <SignalByHour masterKey={masterKey}/>
                            </Col>
                            <Col xs={24} xl={12} className="pt-10">
                                <SignalByDate masterKey={masterKey}/>
                            </Col>
                            <Col xs={24} xl={12} className="pt-10">
                                <div className="flex justify-center items-center">
                                    <div className="w-[400px]">
                                        <SignalBuySell masterKey={masterKey}/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="pt-10">
                                <div className="flex justify-center items-center">
                                    <div className="w-[400px]">
                                        <SignalSymbol masterKey={masterKey}/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="pt-10">
                                <div className="flex justify-center items-center">
                                    <div className="w-[400px]">
                                        <SignalWinLoss masterKey={masterKey}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}

                    {isReport === 3 && (
                        <div className="w-full h-full mt-5 pb-2 relative">
                            <Table
                                className={"custom-table pb-[20px]"}
                                dataSource={signal?.data}
                                columns={columnSignal}
                                pagination={false}
                            />
                            <Pagination
                                className="flex justify-center"
                                current={paginationSignal.page}
                                total={signal?.total}
                                pageSize={paginationSignal.pageSize}
                                showSizeChanger
                                onChange={(p, ps)=> {
                                    setPaginationSignal({
                                        page: p,
                                        pageSize: ps
                                    })
                                }}
                            />
                        </div>
                    )}
                    
                </div>
            </div>
            <Modal 
                title="Theo dõi Master" 
                width={1200}
                open={isOpen} 
                onOk={()=>setIsOpen(false)} 
                okText={"Theo Dõi Master"}
                onCancel={()=>setIsOpen(false)}
                footer={null}>
                <Form 
                    form={form}
                    layout={"vertical"}
                    onFinishFailed={(e) => console.log(e)}
                    onFinish={onSubmit}
                >
                    <Row>
                        <Col xs={24} xl={12} className="px-5 border-r">
                            <Row>
                                <Col xs={24} xl={24} className="border-b py-2">
                                    <p className="text-lg font-medium flex items-center justify-between">
                                        Bạn muốn tự động sao chép giao dịch?
                                        <Switch defaultChecked={false} onChange={()=>setIsOpenCopy(!isOpenCopy)} />
                                    </p>
                                    {isOpenCopy && ( 
                                        <div>
                                            <p className="font-semibold text-red-500"> 
                                                Lưu ý: Xác nhận tương đương bạn đã đồng ý với chính sách
                                                bảo mật và tuyên bố miễn trừ trách nhiệm của chúng tôi
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 pt-2">
                                                <Form.Item
                                                    label={
                                                        <div className="flex items-center">
                                                            <p className="font-semibold">Broker</p>
                                                            <Tooltip 
                                                                placement="top" 
                                                                title={
                                                                    <span className="text-white font-semibold text-md">Chọn Broker tài khoản của bạn</span>
                                                                } 
                                                                className="flex items-center bg-gray-400 rounded-full ml-2"
                                                                >
                                                                <InfoOutlined className="p-1 text-white text-md"/>
                                                            </Tooltip>
                                                        </div>
                                                    }
                                                    name="broker"
                                                    rules={[{ required: true, message: "Vui lòng chọn broker!" }]}
                                                >
                                                    <Input placeholder="broker" />
                                                </Form.Item>
                                                
                                                <Form.Item
                                                    label={
                                                        <div className="flex items-center">
                                                            <p className="font-semibold">Password</p>
                                                            <Tooltip 
                                                                placement="top" 
                                                                title={
                                                                    <span className="text-white font-semibold text-md">Nhập password tài khoản của bạn</span>
                                                                } 
                                                                className="flex items-center bg-gray-400 rounded-full ml-2"
                                                                >
                                                                <InfoOutlined className="p-1 text-white text-md"/>
                                                            </Tooltip>
                                                        </div>
                                                    }
                                                    name="password"
                                                    rules={[{ required: true, message: "Vui lòng chọn VPS!" }]}
                                                >
                                                    <Input type="password" placeholder="password" />
                                                </Form.Item>
                                            </div>
                                            <p className="font-semibold text-lg">Chế độ sao chép</p>
                                            <div className="grid grid-cols-2 gap-2 pt-2">
                                                
                                                <div className="flex">
                                                    <p className="font-semibold">Chọn chế độ</p>
                                                    <Tooltip 
                                                        placement="top" 
                                                        title={
                                                            <span className="text-white font-semibold text-md">Chọn chế độ mà bạn muốn theo dõi tín hiệu</span>
                                                        } 
                                                        className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                        >
                                                        <InfoOutlined className="p-1 text-white text-md"/>
                                                    </Tooltip>
                                                </div>

                                                <Form.Item
                                                    name="mass_1"
                                                    className="col-span-2"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-full flex">
                                                            <p className="font-semibold">Theo khối lượng mặc định:</p>
                                                            <Tooltip 
                                                                placement="top" 
                                                                title={
                                                                    <span className="text-white font-semibold text-md">Khối lượng luôn cố định như bạn cài đặt</span>
                                                                } 
                                                                className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                                >
                                                                <InfoOutlined className="p-1 text-white text-md"/>
                                                            </Tooltip>
                                                        </div>
                                                        <Input type="number" placeholder="Điền khối lượng" disabled={mass_2?.length > 0 || mass_3?.length > 0 ? true : false} />
                                                        <Tooltip 
                                                            placement="top" 
                                                            title={
                                                                <span className="text-white font-semibold text-md">Chọn chế độ mà bạn muốn theo dõi tín hiệu</span>
                                                            } 
                                                            className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                            >
                                                            <InfoOutlined className="p-1 text-white text-md invisible"/>
                                                        </Tooltip>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item
                                                    name="mass_2"
                                                    className="col-span-2"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-full flex">
                                                            <p className="font-semibold">Theo tỷ lệ khối lượng:</p>
                                                            <Tooltip 
                                                                placement="top" 
                                                                title={
                                                                    <span className="text-white font-semibold text-md">Lệnh được sao chép với khối lượng theo tỷ lệ sao chép đã chọn</span>
                                                                } 
                                                                className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                                >
                                                                <InfoOutlined className="p-1 text-white text-md"/>
                                                            </Tooltip>
                                                        </div>
                                                        <Input type="number" disabled={mass_1?.length > 0 || mass_3?.length > 0 ? true : false} placeholder="X...lần" />
                                                        <Tooltip 
                                                            placement="top" 
                                                            title={
                                                                <span className="text-white font-semibold text-md">Cho phép tài khoản sao chép bằng ... lần khối lượng giao dịch</span>
                                                            } 
                                                            className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                            >
                                                            <InfoOutlined className="p-1 text-white text-md"/>
                                                        </Tooltip>
                                                    </div>
                                                </Form.Item>

                                                <Form.Item
                                                    name="mass_3"
                                                    className="col-span-2"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-full flex">
                                                            <p className="font-semibold">Theo tỷ lệ số dư:</p>
                                                            <Tooltip 
                                                                placement="top" 
                                                                title={
                                                                    <span className="text-white font-semibold text-md">Khối lượng lệnh sẽ được sao chép theo tỷ lệ số dư</span>
                                                                } 
                                                                className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                                >
                                                                <InfoOutlined className="p-1 text-white text-md"/>
                                                            </Tooltip>
                                                        </div>
                                                        <Input type="number" disabled={mass_1?.length > 0 || mass_2?.length > 0 ? true : false} placeholder="Tỷ lệ" />
                                                        <Tooltip 
                                                            placement="top" 
                                                            title={
                                                                <span className="text-white font-semibold text-md">Khối lượng lệnh sẽ được sao chép theo tỷ lệ số dư</span>
                                                            } 
                                                            className="flex items-center bg-gray-400 rounded-full ml-2 h-min"
                                                            >
                                                            <InfoOutlined className="p-1 text-white text-md invisible"/>
                                                        </Tooltip>
                                                    </div>
                                                </Form.Item>
                                            </div>
                                            <Form.Item
                                                label={
                                                    <div className="flex items-center">
                                                        <p className="font-semibold">DrawDown</p>
                                                        <Tooltip 
                                                            placement="top" 
                                                            title={
                                                                <span className="text-white font-semibold text-md">Nhập % drawdown mà bạn mong muốn</span>
                                                            } 
                                                            className="flex items-center bg-gray-400 rounded-full ml-2"
                                                            >
                                                            <InfoOutlined className="p-1 text-white text-md"/>
                                                        </Tooltip>
                                                    </div>
                                                }
                                                name="drawDown"
                                                rules={[{ required: true, message: "Vui lòng nhập DrawDown!" }]}
                                            >
                                                <Input type="text" placeholder="DrawDown" />
                                            </Form.Item>

                                        </div>
                                    )}
                                </Col>
                                <Col xs={24} xl={24} className="py-2">
                                    <p className="text-lg font-medium flex items-center justify-between">
                                        Bạn muốn thuê copy VPS?
                                        <Switch defaultChecked={false} onChange={(e)=>{
                                            if(e === false) {
                                                setPriceVps(0);
                                                form.setFieldsValue({
                                                    vps_id: null,
                                                    vps_time: null
                                                });
                                            }
                                            setIsOpenVps(e);
                                        }} />
                                    </p>
                                    {isOpenVps && ( 
                                        <div>
                                            <Form.Item
                                                label={"Lựa chọn Vps"}
                                                name="vps_id"
                                                rules={[{ required: true, message: "Vui lòng chọn VPS!" }]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={(e)=> getPriceVps(e)}
                                                    options={vps?.map((_, i) => ({
                                                        value: _?.vps_id,
                                                        label: "vps " + ( i+1 )
                                                    }))}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={"Thời gian gia hạn"}
                                                name="vps_time"
                                                rules={[{ required: true, message: "Vui lòng chọn Thời gian!" }]}
                                            >
                                                <Select
                                                    showSearch
                                                    onChange={(e)=> setVpsTime(e)}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    options={[
                                                        {
                                                            label: "1 tháng",
                                                            value: 1
                                                        },
                                                        {
                                                            label: "5 tháng",
                                                            value: 5
                                                        },
                                                        {
                                                            label: "1 năm",
                                                            value: 12
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                            <p className="text-lg font-medium">
                                                Price Vps: <span className="text-red-500">{FormatDollar(priceVps ? (priceVps * vpsTime) : 0)}</span>
                                            </p>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} xl={12} className="px-5">
                            <div>
                                <p className="text-lg font-semibold px-2">Tài khoản: </p>
                                <Row>
                                    <Col xs={24} xl={12} className="p-2">
                                        <Form.Item
                                            label={
                                                <div className="flex items-center">
                                                    <p className="font-semibold">ID</p>
                                                    <Tooltip 
                                                        placement="top" 
                                                        title={
                                                            <span className="text-white font-semibold text-md">Nhập id Metatrader mà bạn muốn copy theo</span>
                                                        } 
                                                        className="flex items-center bg-gray-400 rounded-full ml-2"
                                                        >
                                                        <InfoOutlined className="p-1 text-white text-md"/>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name="mt4_acc"
                                            rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
                                        >
                                            <Input type="text" placeholder="ID" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} xl={12} className="p-2">
                                        <Form.Item
                                            label={
                                                <div className="flex items-center">
                                                    <p className="font-semibold">Nền Tảng</p>
                                                </div>
                                            }
                                            name="communication"
                                            rules={[{ required: true, message: "Vui lòng chọn nền tảng!" }]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                options={[
                                                    {
                                                        label: "Meta Trader 4",
                                                        value: 1
                                                    },
                                                    {
                                                        label: "Meta Trader 5",
                                                        value: 2
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} xl={24} className="p-2">
                                        <p className="text-lg font-medium">Phương thức thanh toán</p>
                                    </Col>
                                    <Col xs={24} xl={12} className="p-2">
                                        <Form.Item
                                            name="time"
                                            rules={[{ required: true, message: "Vui lòng chọn!" }]}
                                        >
                                            <Radio.Group
                                                onChange={(e)=> setPriceFl(Number(priceMaster?.master_price) * e?.target?.value)}>
                                                <Space direction="vertical">
                                                    <Radio value={1}><p className="text-lg font-medium">1 tháng</p></Radio>
                                                    <Radio value={3}><p className="text-lg font-medium">3 tháng</p></Radio>
                                                    <Radio value={6}><p className="text-lg font-medium">6 tháng</p></Radio>
                                                    <Radio value={12}><p className="text-lg font-medium">12 tháng</p></Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                        <p className="text-lg font-medium py-5">
                                            Total: <span className="text-red-500">
                                                {FormatDollar(totalPrice)}
                                            </span>
                                        </p>
                                    </Col>
                                    <Col xs={24} xl={12} className="p-2">
                                        <p className="text-lg font-semibold pb-2">Nếu đăng ký 1 tháng</p>
                                        <Form.Item label="Tự động gia hạn" name="auto">
                                            <Switch />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className="absolute bottom-0 right-0">
                                    <Button type={"primary"} htmlType={"submit"}>
                                        Theo dõi Master
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}