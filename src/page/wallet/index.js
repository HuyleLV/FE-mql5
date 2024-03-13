import { Col, Input, Modal, Pagination, Row, Space, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useDevice } from "../../hooks";
import dayjsInstance from "../../utils/dayjs";
import { WarningOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/skeleton/Paragraph";
import { CustomUpload } from "../../component";

export default function Wallet() { 
    const { isMobile } = useDevice();
    const location = useLocation();
    const currentPath = location.pathname;
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const [transfer, setTransfer] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgTransfer, setImgTransfer] = useState("");
    const [price, setPrice] = useState(0);

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
      });

    const fetchTransfer = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/transfer/getByIdUser/${cookies.user?.user_id}`, {params: pagination})
        .then(( res ) => {
          const data = res?.data;
          setTransfer(data);
        });
    };

    const handleOk = async () => {
      if(imgTransfer !== "") {
        const transfer = {
          transfer_content: cookies?.user?.displayName + " chuyen tien",
          transfer_price: price,
          transfer_status: 1,
          transfer_image: imgTransfer,
          create_by: cookies?.user.user_id,
        };
    
        await axios
          .post(`${process.env.REACT_APP_API_URL}/transfer/create`, transfer)
          .then((res) => {
            message.success("Gửi lệnh chuyển tiền thành công!")
            setIsModalOpen(false);
            fetchTransfer();
            setPrice();
          })
          .catch(() => message.error("Error server!"));
      } else {
        message.error("Bạn chưa tải ảnh chứng minh lên!")
      }
    };

    const columns = [
      {
        title: <div>ID</div>,
        key: "transfer_id",
        dataIndex: "transfer_id",
        width: 50,
        render: (_, record) => <div>{record?.transfer_id}</div>,
      },
      {
        title: <div>Nội dung</div>,
        key: "transfer_content",
        dataIndex: "transfer_content",
        width: 160,
        hidden: isMobile ? true : false,
        render: (_, record) => <div>{record?.transfer_content}</div>,
      },
      {
        title: <div>Giá</div>,
        key: "transfer_price",
        dataIndex: "transfer_price",
        width: 160,
        render: (_, record) => <div>{record?.transfer_price}</div>,
      },
      {
        title: <div>Trạng thái</div>,
        key: "transfer_status",
        dataIndex: "transfer_status",
        width: 160,
        render: (_, record) => (
          <div>
            {record?.transfer_status === "1" ?
              <p className="font-bold text-yellow-500">Đang chờ xác nhận</p>
              : <p className="font-bold text-green-500">Đã xác nhận</p>
            }
          </div>
        ),
      },
      {
        title: <div>Ảnh</div>,
        key: "transfer_price",
        dataIndex: "transfer_price",
        width: 160,
        hidden: isMobile ? true : false,
        render: (_, record) => <div><img src={record?.transfer_image} className="h-20"/></div>,
      },
      {
        title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
        key: "create_at",
        dataIndex: "create_at",
        width: 160,
        hidden: isMobile ? true : false,
        render: (_, record) => {
          return (
            <div>
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
                className={"text-[var(--red)]"}
              >
                <WarningOutlined />
              </div>
            </Space>
          );
        },
      }
    ].filter(item => !item.hidden);

    useEffect(() => {
        if(!cookies?.user && currentPath?.includes('/wallet')){ 
            message.warning("Vui lòng đăng nhập!")
            navigate("/login");
        } else {
            fetchTransfer()
        }
    }, [cookies, pagination,price]);
    return (
        <div className="max-w-screen-2xl mx-auto py-10">
            <p className="font-bold text-3xl text-center">Thông tin ví</p>
            <Row>
                <Col xs={24} xl={12}>
                    <div className="my-8 m-2 p-5 bg-gray-100">
                        <p className="font-semibold text-xl">Thông tin người dùng: {cookies?.user?.displayName}</p>
                        <p className="font-semibold text-xl">Số dư ví: {cookies?.user?.account_balance}</p>
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                    <div className="my-8 m-2 p-5 bg-gray-100">
                        <p className="font-semibold text-xl">Tạo lệnh nộp tiền</p>
                        <Input style={{marginTop: 10, marginBottom: 10}} value={price} onChange={(i)=> setPrice(i?.target?.value)} type="number" placeholder="Nhập số tiền muốn nộp!"/>
                        <button 
                            className="border px-4 py-2 rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 text-white"
                            onClick={() => setIsModalOpen(true)}>
                            Tạo lệnh
                        </button>
                    </div>
                </Col>
                {transfer?.data?.length > 0 ?
                    <Col
                        xs={24} 
                        xl={24}
                        className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
                    >
                        <p className="text-center text-xl font-bold pt-5 pb-10"> Quản lý lệnh chuyển tiền</p>
                        <Table 
                            className={"custom-table pb-10"}
                            rowKey={(record) => record?.transfer_id + ""}
                            dataSource={transfer?.data} 
                            columns={columns} 
                            pagination={false}
                        />
                        <Pagination
                            className="flex justify-center"
                            current={pagination.page}
                            total={transfer?.total}
                            pageSize={pagination.pageSize}
                            onChange={(p)=> {
                                setPagination({
                                page: p,
                                pageSize: pagination.pageSize
                                })
                            }}
                        />
                    </Col>
                    : <></>
                }
            </Row>
            <Modal
                title="Thanh toán qua mã QR"
                className="grid justify-items-center"
                open={isModalOpen}
                onOk={handleOk}
                okText="Đã chuyển tiền"
                cancelText="Chưa chuyển tiền"
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ className: "bg-blue-500" }}
                >
                <center>
                    <img
                    src={
                        "https://vinacheck.vn/media/2019/05/ma-qr-code_vinacheck.vm_001.jpg"
                    }
                    className="w-[300px] h-[300px]"
                    />
                </center>
                <p className="flex px-5 pt-5 text-lg">
                    Nội dung CK:{" "}
                    <Paragraph copyable={{ text: cookies?.user?.displayName + " chuyen tien", tooltips: false }}>
                        <span className="font-semibold text-xl pl-5">{cookies?.user?.displayName} chuyen tien</span>
                    </Paragraph>
                </p>
                <p className="px-5 pb-3 text-lg">
                    Giá:{" "}
                    <span className="font-bold p-5 text-xl text-red-500">
                    {price} VND
                    </span>
                </p>
                <div className="px-5 pb-3">
                    <p className="text-lg">Thêm ảnh chứng minh:</p>
                    <div className="px-5 flex justify-center py-3">
                    <p className="flex justify-center"><CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" onChange={(transfer_image)=>setImgTransfer(transfer_image)} value={imgTransfer}/></p>
                    </div>
                </div>
            </Modal>
        </div>
    )
 }