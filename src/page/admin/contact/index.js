import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import axiosInstance from "../../../utils/axios";

export default function ContactDashboard() {
    const [contact, setContact] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllContact = async () => {
        await axiosInstance
        .get(`/user/getAllContactFeedback`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setContact(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "contact_feedback_id",
          dataIndex: "contact_feedback_id",
          width: 50,
          sorter: (a, b) => a.contact_feedback_id - b.contact_feedback_id,
          render: (_, record) => <div>{record?.contact_feedback_id}</div>,
        },
        {
          title: "Họ và tên",
          key: "fullname",
          dataIndex: "fullname",
          width: 150,
          ...SearchProps("fullname"),
          render: (_, record) => <div>{record?.fullname}</div>,
        },
        {
          title: "Số điện thoại",
          key: "phone",
          dataIndex: "phone",
          width: 150,
          ...SearchProps("phone"),
          render: (_, record) => <div>{record?.phone}</div>,
        },
        {
          title: "Email",
          key: "email",
          dataIndex: "email",
          width: 150,
          ...SearchProps("email"),
          render: (_, record) => <div>{record?.email}</div>,
        },
        {
          title: "Lời nhắn",
          key: "feedback",
          dataIndex: "feedback",
          width: 150,
          ...SearchProps("feedback"),
          render: (_, record) => <div>{record?.feedback}</div>,
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
        // {
        //   key: "operation",
        //   dataIndex: "operation",
        //   width: 50,
        //   render: (_, record) => {
        //     return (
        //       <Link
        //         to={`/admin/contact-feedback/${record?.contact_feedback_id}`}
        //         className={"text-[var(--blue)]"}
        //       >
        //         <EditOutlined />
        //       </Link>
        //     );
        //   },
        // },
    ]
    
    useEffect(() => {
        getAllContact();
    }, [pagination]);

    return (
      <>
        <div>
            <Row gutter={10} className={"mb-[8px]"}>
                <Col flex={1}>
                    <div className={"text-[20px] font-medium"}>Danh mục Contact</div>
                </Col>
            </Row>
        </div>
        <div className="w-full h-full mt-5 pb-20 relative">
            <Table
                className={"custom-table"}
                dataSource={contact?.data}
                columns={columns}
                pagination={false}
            />
            <Pagination
                className="flex justify-center absolute inset-x-0 bottom-20"
                current={pagination.page}
                total={contact?.total}
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