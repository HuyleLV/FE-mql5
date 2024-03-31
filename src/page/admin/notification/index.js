import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function NotificationDashboard() {
    const [notification, setNotification] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllNotification = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/notification/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setNotification(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "notification_id",
          dataIndex: "notification_id",
          width: 50,
          sorter: (a, b) => a.notification_id - b.notification_id,
          render: (_, record) => <div>{record?.notification_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "notification_title",
          dataIndex: "notification_title",
          width: 200,
          ...SearchProps("notification_title"),
          render: (_, record) => <div>{record?.notification_title}</div>,
        },
        {
          title: "Nội dung",
          key: "notification_description",
          dataIndex: "notification_description",
          width: 200,
          render: (_, record) => 
            <div>
                {record?.notification_description}
            </div>,
        },
        {
          title: "Gửi đến",
          key: "notification_user",
          dataIndex: "notification_user",
          width: 150,
          render: (_, record) => 
            <div>
              {record?.notification_user === "-1" ? "ALL" : record?.notification_user}
            </div>,
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
          key: "create_at",
          dataIndex: "create_at",
          width: 100,
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
                to={`/admin/notification/${record?.notification_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllNotification();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Quản lý notification</div>
                    </Col>
                    <Col>
                      <Link to={"/admin/notification/create"}>
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
                    dataSource={notification?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={notification?.total}
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