import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function ShortDashboard() {
    const [short, setShort] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllShort = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/short/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setShort(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "short_id",
          dataIndex: "short_id",
          width: 50,
          sorter: (a, b) => a.short_id - b.short_id,
          render: (_, record) => <div>{record?.short_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "short_title",
          dataIndex: "short_title",
          width: 150,
          ...SearchProps("short_title"),
          render: (_, record) => <div>{record?.short_title}</div>,
        },
        {
          title: "Link short",
          key: "short_link",
          dataIndex: "short_link",
          width: 150,
          render: (_, record) => 
            <div>
                <a href={record?.short_link}>{record?.short_link}</a>
            </div>,
        },
        {
          title: "Ảnh short",
          key: "short_image",
          dataIndex: "short_image",
          width: 150,
          render: (_, record) => 
            <div>
              <Image src={record?.short_image} width={150} height={200}/>
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
                  {dayjsInstance(record?.create_at).format("DD/MM/YYYY")}
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
          key: "operation",
          dataIndex: "operation",
          width: 50,
          render: (_, record) => {
            return (
              <Link
                to={`/admin/short/${record?.short_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllShort();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục link short</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/short/create"}>
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
                    dataSource={short?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={short?.total}
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