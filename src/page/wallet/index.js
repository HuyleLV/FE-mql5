import { Col, Input, Modal, Pagination, Row, Space, Table, Tabs, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useDevice } from "../../hooks";
import dayjsInstance from "../../utils/dayjs";
import { WarningOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/skeleton/Paragraph";
import { CustomUpload } from "../../component";
import { FormatDollar } from "../../utils/formatDollar";
import image_mk4 from "../../component/image/mk4.jpg";

export default function Wallet() { 
    const { isMobile } = useDevice();
    const location = useLocation();
    const currentPath = location.pathname;
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const [transfer, setTransfer] = useState([]);
    const [transferProduct, setTransferProduct] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgTransfer, setImgTransfer] = useState("");
    const [price, setPrice] = useState(0);

    const [pagination, setPagination] = useState({
      page: 1,
      pageSize: 8
    });

    const [paginationProduct, setPaginationProduct] = useState({
      page: 1,
      pageSize: 8
    });

    const fetchTransfer = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/transfer/getByIdUser/${cookies.user?.user_id}`, {params:pagination})
        .then(( res ) => {
          const data = res?.data;
          setTransfer(data);
        });
    };

    const fetchTransferProduct = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/transferProduct/getByIdUser/${cookies.user?.user_id}`, {params:pagination})
        .then(( res ) => {
          const data = res?.data;
          setTransferProduct(data);
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

    const columnProduct = [
      {
        title: <div>ID</div>,
        key: "transfer_product_id",
        dataIndex: "transfer_product_id",
        width: 50,
        render: (_, record) => <div>{record?.transfer_product_id}</div>,
      },
      {
        title: <div>Tên sản phẩm</div>,
        key: "product_name",
        dataIndex: "product_name",
        width: 160,
        hidden: isMobile ? true : false,
        render: (_, record) => <div>{record?.product_name}</div>,
      },
      {
        title: <div>Ảnh</div>,
        key: "product_image",
        dataIndex: "product_image",
        width: 160,
        hidden: isMobile ? true : false,
        render: (_, record) => 
          <div>
            <img src={record?.product_image ? JSON.parse(record?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : <></>} className="h-20"/>
          </div>,
      },
      {
        title: <div>Giá</div>,
        key: "transfer_product_price",
        dataIndex: "transfer_product_price",
        width: 160,
        render: (_, record) => <div>{FormatDollar(record?.transfer_product_price)}</div>,
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
          fetchTransfer();
          fetchTransferProduct();
        }
    }, [cookies, pagination, price]);
    return (
        <div className="max-w-screen-2xl mx-auto py-10 h-screen">
            <p className="font-bold text-3xl text-center">Thông tin ví</p>
            <Row>
                <Col xs={24} xl={12}>
                    <div className="my-8 m-2 p-5 bg-gray-100">
                        <p className="font-semibold text-xl">Thông tin người dùng: {cookies?.user?.displayName}</p>
                        <p className="font-semibold text-xl">Số dư ví: {FormatDollar(cookies?.user?.account_balance)}</p>
                        <div className="pt-2">
                          <p className="font-semibold text-red-500 text-xl">Lưu ý:</p>
                          <li className="pt-2">Tỷ giá sẽ cập nhật vào sáng thứ 2 hàng tuần theo ngân hàng VCB</li>
                          <li className="py-2">Vui lòng điền chính xác nội dung chuyển khoản để thực hiện nạp tiền tự động.</li>
                          <li>
                            Tiền sẽ vào tài khoảng trong vòng 1-30 phút kể từ khi giao dịch thành công. Tuy nhiên đôi lúc do
                            một vài lỗi khách quan, tiền có thể sẽ vào chậm hơn một chút.
                          </li>
                          <li className="py-2">
                            Nếu quá lâu không thấy cập nhật số dư, Vui lòng liên hệ hỗ trợ viên: <a href="#">Tại đây</a>
                          </li>
                        </div>
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
            </Row>

            <Tabs type="card" className="border">
              <TabPane tab="Quản lý lệnh chuyển tiền" key="1" className="px-5">
                <p className="text-center text-xl font-bold pb-10"> Quản lý lệnh chuyển tiền</p>
                  
                {transfer?.data?.length > 0 ?
                  <>
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
                  </>
                  : 
                  <>
                    <p className="font-bold texl-2xl text-center bg-yellow-300 py-4 mb-10">Chưa có thông tin chuyển tiền</p>
                  </>
                }
              </TabPane>
              <TabPane tab="Lịch sử mua sản phẩm" key="2" className="px-5">
                <p className="text-center text-xl font-bold pb-10">Lịch sử mua sản phẩm</p>
                  
                {transfer?.data?.length > 0 ?
                  <>
                    <Table 
                      className={"custom-table pb-10"}
                      rowKey={(record) => record?.transfer_id + ""}
                      dataSource={transferProduct?.data} 
                      columns={columnProduct} 
                      pagination={false}
                    />
                    <Pagination
                      className="flex justify-center"
                      current={paginationProduct.page}
                      total={transferProduct?.total}
                      pageSize={paginationProduct.pageSize}
                      onChange={(p)=> {
                        setPaginationProduct({
                          page: p,
                          pageSize: paginationProduct.pageSize
                        })
                      }}
                    />
                  </>
                  : 
                  <>
                    <p className="font-bold texl-2xl text-center bg-yellow-300 py-4 mb-10">Chưa có thông tin chuyển tiền</p>
                  </>
                }
              </TabPane>
            </Tabs>
            <Modal
              open={isModalOpen}
              width={900}
              onOk={handleOk}
              okText="Đã chuyển tiền"
              cancelText="Chưa chuyển tiền"
              onCancel={() => setIsModalOpen(false)}
              okButtonProps={{ className: "bg-blue-500" }}
            >
              <Row>
                <Col xs={24} xl={12} className="bg-gray-100 p-5">
                  <p className="font-semibold text-lg text-center">Thông tin đơn hàng</p>
                  <p className="flex px-5 pt-5 text-lg">
                    Nội dung CK:{" "}
                    <Paragraph copyable={{ text: cookies?.user?.displayName + " chuyen tien", tooltips: false }}>
                        <span className="font-semibold text-xl pl-5">{cookies?.user?.displayName} chuyen tien</span>
                    </Paragraph>
                  </p>
                  <p className="px-5 text-lg">
                      Số tiền thanh toán:
                  </p>
                  <p className="font-semibold px-5 pb-3 text-xl text-sky-500">
                    {price} VND
                  </p>
                  <p className="px-5 text-lg">
                     Giá trị đơn hàng:
                  </p>
                  <p className="font-semibold px-5 pb-3 text-lg">
                    {price} VND
                  </p>
                  <div className="px-5 pb-3">
                      <p className="text-lg">Thêm ảnh chứng minh:</p>
                      <div className="px-5 flex justify-center py-3">
                      <p className="flex justify-center"><CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" onChange={(transfer_image)=>setImgTransfer(transfer_image)} value={imgTransfer}/></p>
                      </div>
                  </div>
                </Col>
                <Col xs={24} xl={12} className="text-center">
                  <p className="font-semibold text-xl pt-5">Quét mã qua Ứng dụng ngân hàng/</p>
                  <p className="font-semibold text-xl pb-5">Ví điện tử</p>
                  <div className="flex justify-center pb-10">
                    <img
                      src={image_mk4}
                      className="w-[300px] h-[300px]"
                    />
                  </div>
                </Col>
              </Row>
          </Modal>
        </div>
    )
 }