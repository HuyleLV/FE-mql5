import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function IdentifyDashboard() {
    const [identify, setIdentify] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllIdentify = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/identify/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setIdentify(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "identify_id",
          dataIndex: "identify_id",
          width: 50,
          sorter: (a, b) => a.identify_id - b.identify_id,
          render: (_, record) => <div>{record?.identify_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "identify_title",
          dataIndex: "identify_title",
          width: 150,
          ...SearchProps("identify_title"),
          render: (_, record) => <div>{record?.identify_title}</div>,
        },
        {
          title: "Slug",
          key: "identify_slug",
          dataIndex: "identify_slug",
          width: 150,
          render: (_, record) => <div>{record?.identify_slug}</div>,
        },
        {
          title: "Ảnh",
          key: "identify_image",
          dataIndex: "identify_image",
          width: 150,
          render: (_, record) => <div className="flex justify-center"><Image src={record?.identify_image} width={100}/></div>,
        },
        {
          title: "Danh mục",
          key: "identify_category",
          dataIndex: "identify_category",
          width: 150,
          render: (_, record) => 
            <div>
                {
                    record?.identify_category === 1 ? "FOREX" 
                    : record?.identify_category === 2 ? "STOCK"
                    : record?.identify_category === 3 ? "CFD"
                    : record?.identify_category === 4 ? "HÀNG HÓA"
                    : record?.identify_category === 5 ? "CRYPTO" : null
                }
            </div>,
        },
        {
          title: "Ngày tạo",
          key: "create_at",
          dataIndex: "create_at",
          width: 150,
          sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.create_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
            );
          },
        },
        {
          title: "Người tạo",
          key: "create_at",
          dataIndex: "create_at",
          width: 150,
          sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <p>{record?.displayName}</p>
                <p>{record?.email}</p>
              </div>
            );
          },
        },
        {
          title: "Ngày cập nhật",
          key: "update_at",
          dataIndex: "update_at",
          width: 150,
          sorter: (a, b) => dayjs(a.update_at) - dayjs(b.update_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.update_at).format("DD/MM/YYYY HH:mm:ss")}
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
              <Link
                to={`/admin/identify/${record?.identify_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllIdentify();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục nhận định</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/identify/create"}>
                            <Button type={"primary"} onClick={() => {}}>
                                Tạo
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-full mt-5 pb-20 relative">
                <Table
                    className={"custom-table"}
                    dataSource={identify?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={identify?.total}
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