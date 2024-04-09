import { Button, Col, Image, Modal, Pagination, Row, Select, Space, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import axiosInstance from "../../../utils/axios";
import { FormatDollar } from "../../../utils/format";

export default function FollowerDraftDashboard() {
    const [followerDraft, setFollowerDraft] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllFollowerDraft = async () => {
        await axiosInstance.get(`/followerDraft/getAll/`, {params: pagination})
            .then((res) => {
                const data = res?.data;
                setFollowerDraft(data);
            })
            .catch(() => message.error("Error server!"));
    };

    const updateStatus = async (value, e) => {
        await axiosInstance
        .post(`/followerDraft/updateStatus/${value?.follower_draft_id}`, {
            status: e,
            vps_id: value?.vps_id
        })
        .finally(() => {
            getAllFollowerDraft();
            message.success("Cập nhập thành công!");
        });
        
    };

    const columns = [
        {
          title: "ID",
          key: "follower_draft_id",
          dataIndex: "follower_draft_id",
          width: 50,
          sorter: (a, b) => a.follower_draft_id - b.follower_draft_id,
          render: (_, record) => <div>{record?.follower_draft_id}</div>,
        },
        {
          title: "mt4_acc",
          key: "mt4_acc",
          dataIndex: "mt4_acc",
          width: 150,
          ...SearchProps("mt4_acc"),
          render: (_, record) => <div>{record?.mt4_acc}</div>,
        },
        {
          title: "Nền tảng",
          key: "communication",
          dataIndex: "communication",
          width: 150,
          render: (_, record) => 
            <div>
                {
                    record?.communication === 1 ? "Meta Trader 4" : 
                    record?.communication === 2 ? "Meta Trader 5" : 0
                }
            </div>,
        },
        {
          title: "Broker",
          key: "broker",
          dataIndex: "broker",
          width: 150,
          render: (_, record) => <div>{record?.broker ? record?.broker : <div className="bg-red-100 w-10 h-10"></div>}</div>,
        },
        {
          title: "ID Vps",
          key: "vps_id",
          dataIndex: "vps_id",
          width: 150,
          render: (_, record) => <div>{record?.vps_id ? record?.vps_id : <div className="bg-orange-100 w-10 h-10"></div>}</div>,
        },
        {
          title: "Trạng thái",
          key: "status",
          dataIndex: "status",
          width: 150,
          render: (_, record) => 
            <div>
                {record?.status === 0 ?
                    <Select
                        className={"w-[150px]"}
                        value={record?.status === 0 ? "Chờ xác nhận" : "Xác nhận"}
                        defaultValue={record?.status === 0 ? "Chờ xác nhận" : "Xác nhận"}
                        options={[
                            {
                                label: "Chờ xác nhận",
                                value: 0
                            },
                            {
                                label: "Xác nhận",
                                value: 1
                            }
                        ]}
                        onChange={(e) => updateStatus(record, e)}
                    />
                    : <p className="font-semibold text-lg">Xác nhận</p>
                }
            </div>,
        },
        {
          title: "Tổng tiền",
          key: "total_price",
          dataIndex: "total_price",
          width: 150,
          render: (_, record) => <div className="font-bold text-red-500">{FormatDollar(record?.total_price)}</div>,
        },
        {
          title: "Ngày tạo",
          key: "create_at",
          dataIndex: "create_at",
          width: 100,
          sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.create_at).format("DD/MM/YYYY")}
                </span>
              </div>
            );
          },
        },
        {
          key: "operation",
          dataIndex: "operation",
          width: 50,
          render: (_, record) => {
            return (
                <Space>
                    <div 
                        className="px-2"
                        onClick={() => showInfo(record)}
                    >
                        <InfoOutlined className="text-white text-xl rounded-full bg-sky-400 p-1 cursor-pointer" />
                    </div>
                    <Link
                        to={`/admin/follower-draft/${record?.follower_draft_id}`}
                        className={"text-[var(--blue)]"}
                    >
                        <EditOutlined />
                    </Link>
                </Space>
            );
          },
        },
    ]
    

    const showInfo = (values) => {
        Modal.info({
        title: 'Thông tin người dùng',
        width: 900,
        content: (
            <Row className="py-5">
                <Col xs={24} xl={24} className="py-2">
                    <div className="text-lg flex items-center">
                        <p className="text-lg pr-2"><b>Người mua:</b> </p>
                        <p>{values?.displayName}</p>
                        <p className="px-2">-</p>
                        <p>{values?.email}</p>
                    </div>
                </Col>
                <Col xs={24} xl={24} className="py-2">
                    <p className="text-lg"><b>master_key:</b> {values?.master_key}</p>
                </Col>
                <Col xs={24} xl={24} className="border-t py-5">
                    <p className="font-bold text-2xl">Tài khoản: </p>
                </Col>
                <Col xs={24} xl={12}>
                    <p className="text-lg"><b>Mt4_acc:</b> {values?.mt4_acc}</p>
                </Col>
                <Col xs={24} xl={12}>
                    {
                        values?.communication === 1 ? <p className="text-lg"><b>Nền tảng:</b> Meta Trader 4</p> : 
                        values?.communication === 2 ? <p className="text-lg"><b>Nền tảng:</b> Meta Trader 5</p> : 0
                    }
                </Col>
                <Col xs={24} xl={12}>
                    <p className="text-lg"><b>Gia hạn tự động:</b> {values?.auto}</p>
                </Col>
                <Col xs={24} xl={12}>
                    <p className="text-lg"><b>Thời hạn:</b> {values?.time} tháng</p>
                </Col>
                <Col xs={24} xl={24} className="pb-5">
                    <p className="text-lg"><b>Tổng tiền:</b> <span className="text-red-500 font-bold">{FormatDollar(values?.total_price)}</span></p>
                </Col>
                <Col xs={24} xl={24} className="py-5 border-t">
                    <p className="font-bold text-2xl">Tự động sao chép giao dịch: {values?.broker ? null : "Không"}</p>
                </Col>
                {values?.broker && values?.password && values?.mass ?
                    <>
                        <Col xs={24} xl={12}>
                            <p className="text-lg"><b>broker:</b> {values?.broker}</p>
                        </Col>
                        <Col xs={24} xl={12}>
                            <p className="text-lg"><b>password:</b> {values?.password}</p>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className="flex items-center text-lg">
                                <p className="pr-5"><b>Chế độ sao chép:</b></p>
                                {
                                    values?.regime === 1 ? <p>Theo khối lượng mặc định</p> :
                                    values?.regime === 2 ? <p>Theo tỷ lệ khối lượng</p> :
                                    values?.regime === 3 ? <p>Theo tỷ lệ số dư</p> : 
                                    <p></p>
                                }
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <p className="text-lg"><b>Khối lượng:</b> {values?.mass}</p>
                        </Col>
                        <Col xs={24} xl={12} className="pb-5">
                            <p className="text-lg"><b>Draw down:</b> {values?.draw_down ? values?.draw_down : 0}</p>
                        </Col>
                    </>
                    : <></>
                }
                <Col xs={24} xl={24} className="py-5 border-t">
                    <p className="font-bold text-2xl">Thuê copy VPS: {values?.vps_id ? null : "Không"}</p>
                </Col>
                {values?.vps_id && values?.vps_time ?
                    <>
                        <Col xs={24} xl={12}>
                            <p className="text-lg"><b>ID Vps:</b> {values?.vps_id}</p>
                        </Col>
                        <Col xs={24} xl={12}>
                            <p className="text-lg"><b>Thời hạn:</b> {values?.vps_time} tháng</p>
                        </Col>
                    </>
                    : <></>
                }
                
            </Row>
        ),
        });
    }
    
    useEffect(() => {
        getAllFollowerDraft();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục follower Draft</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/follower-draft/create"}>
                            <Button type={"primary"} onClick={() => {}}>
                                Tạo
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div className="flex">
                <p className="text-lg font-semibold py-2">Lưu ý :</p>
                <div className="flex items-center px-10">
                    <div className="bg-red-100 w-10 h-10 mr-5"></div>
                    <p>Là không muốn tự động sao chép giao dịch</p>
                </div>
                <div className="flex items-center px-10">
                    <div className="bg-orange-100 w-10 h-10 mr-5"></div>
                    <p>Là không muốn thuê copy VPS</p>
                </div>
            </div>
            <div className="w-full h-full mt-5 pb-20 relative">
                <Table
                    className={"custom-table"}
                    dataSource={followerDraft?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={followerDraft?.total}
                    pageSize={pagination.pageSize}
                    showSizeChanger
                    onChange={(p, ps)=> {
                        setPagination({
                            page: p,
                            pageSize: ps
                        })
                    }}
                />
            </div>
        </>
    )
}