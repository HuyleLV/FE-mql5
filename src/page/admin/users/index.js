import { Table, Row, Col, Button, message, Modal, Space, Select } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersDashboard() {
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/getAll`)
      .then((res) => {
        const data = res?.data;
        setUser(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

  const removeUser = async (user_id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/user/delete/${user_id}`)
      .finally(() => {
        fetchUser();
        message.success("Xoá thành công");
      });
  };

  const confirmDelete = (user_id) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá comment này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeUser(user_id),
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = async (value, id) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/update/${id}`, {role: value})
      .finally(() => {
        fetchUser();
        message.success("Cập nhập thành công!");
      });
    
  };

  const optionRole = [
    { value: 1, label: "User" },
    { value: 2, label: "Admin" },
  ];
  const columns = [
    {
      title: <div className={"base-table-cell-label"}>ID</div>,
      key: "user_id",
      dataIndex: "user_id",
      width: 50,
      render: (_, record) => <div>{record?.user_id}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Họ và Tên</div>,
      key: "displayName",
      dataIndex: "displayName",
      width: 280,
      render: (_, record) => <div>{record?.displayName}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Email</div>,
      key: "email",
      dataIndex: "email",
      width: 280,
      render: (_, record) => {
        return <div>{record?.email}</div>;
      },
    },
    {
      title: <div className={"base-table-cell-label"}>Vài trò</div>,
      key: "role",
      dataIndex: "role",
      width: 280,
      render: (_, record) => {
        return (
          <div>
            <Select
              options={optionRole}
              className={"w-[100px]"}
              defaultValue={record?.role}
              onChange={(value) => updateUser(value, record?.user_id)}
            />
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 280,
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
      width: 100,
      render: (_, record) => {
        return (
          <Space>
            <div
              className={"text-[var(--red)]"}
              onClick={() => confirmDelete(record?.user_id)}
            >
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={10} className={"mb-[8px]"}>
        <Col flex={1}>
          <div className={"text-[20px] font-medium"}>Người dùng</div>
        </Col>
        <Col>
          <Link to={"/admin/users/create"}>
            <Button type={"primary"} onClick={() => {}}>
              Tạo
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        className={"custom-table"}
        rowKey={(record) => record?.user_id + ""}
        dataSource={user}
        columns={columns}
      />
    </>
  );
}
