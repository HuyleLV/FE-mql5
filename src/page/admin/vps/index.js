import { Button, Col, Image, Pagination, Row, Select, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { FormatDollar } from "../../../utils/format";

export default function VpsDashboard() {
    const [vps, setVps] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllVps = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/vps/getAll/`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setVps(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "vps_id",
          dataIndex: "vps_id",
          width: 50,
          sorter: (a, b) => a.vps_id - b.vps_id,
          render: (_, record) => <div>{record?.vps_id}</div>,
        },
        {
          title: "IP",
          key: "vps_ip",
          dataIndex: "vps_ip",
          width: 150,
          ...SearchProps("vps_ip"),
          render: (_, record) => <div>{record?.vps_ip}</div>,
        },
        {
          title: "Username",
          key: "vps_username",
          dataIndex: "vps_username",
          width: 150,
          ...SearchProps("vps_username"),
          render: (_, record) => <div>{record?.vps_username}</div>,
        },
        {
          title: "Password",
          key: "vps_password",
          dataIndex: "vps_password",
          width: 150,
          render: (_, record) => <div>{record?.vps_password}</div>,
        },
        {
          title: "Giá tiền",
          key: "vps_price",
          dataIndex: "vps_price",
          width: 150,
          render: (_, record) => <div>{FormatDollar(record?.vps_price)}</div>,
        },
        {
          title: "Người thuê",
          key: "user_email",
          dataIndex: "user_email",
          width: 150,
          filters: [
            { text: 'Chưa được thuê', value: null },
          ],
          onFilter: (value, record) => {
            return record?.user_displayName === value;
          },
          render: (_, record) => {
            return (
                <div className={"text-[14px] font-normal"}>
                  <p>{record?.user_displayName ? record?.user_displayName : "Chưa có người thuê"}</p>
                  <p>{record?.user_email}</p>
                </div>
              );
          },
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
          title: "Người tạo",
          key: "create_by",
          dataIndex: "create_by",
          width: 150,
          render: (_, record) => {
            return (
              <div className={"text-[14px] font-normal"}>
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
          width: 100,
          sorter: (a, b) => dayjs(a.update_at) - dayjs(b.update_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.update_at).format("DD/MM/YYYY")}
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
                to={`/admin/vps/${record?.vps_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllVps();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục VPS</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/vps/create"}>
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
                    dataSource={vps?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={vps?.total}
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