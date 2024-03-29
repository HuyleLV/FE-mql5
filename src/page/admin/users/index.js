import { Table, Row, Col, Button, message, Modal, Space, Select, Pagination, Image } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, InfoOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";

export default function UsersDashboard() {
  const [user, setUser] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const fetchUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/getAll`, {params: pagination})
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

  const showInfo = (values) => {
    const identification_image = JSON.parse(values?.identification_image);
    Modal.info({
      title: 'Thông tin người dùng',
      width: 700,
      content: (
        <Row className="py-5">
          <Col xs={24} xl={12}>
            <p className="text-lg">Họ và tên: <b>{values?.fullname}</b></p>
            <p className="text-lg py-2">Số điện thoại: <b>{values?.phone}</b></p>
            <p className="text-lg">Giới tính: <b>{values?.gender}</b></p>
            <p className="text-lg py-2">Ngày sinh: <b>{values?.birthday ? dayjsInstance(values?.birthday).format("DD/MM/YYYY") : "Chưa có ngày sinh"}</b></p>
            <p className="text-lg">Quốc gia: <b>{values?.country ? values?.country : "Chưa có quốc gia"}</b></p>
            <p className="text-lg py-2">Số zalo: <b>{values?.phone ? values?.phone : "Chưa có số zalo"}</b></p>
            <p className="text-lg">Telegram: <b>{values?.telegram ? values?.telegram : "Chưa có telegram"}</b></p>
          </Col>
          <Col xs={24} xl={12}>
            <p className="text-lg">
              Loại giấy tờ: <b>{
                values?.identification_type === 1 ? "Căn Cước Công Dân" : 
                values?.identification_type === 2 ? "Bằng Lái Xe" : 
                values?.identification_type === 3 ? "Hộ Chiếu" : "Chưa có"
              }</b>
            </p>
            <p className="text-lg py-2">Số: <b>{values?.identification_number ? values?.identification_number : "Chưa có"}</b></p>
            <div>
              <p className="text-lg">Ảnh mặt trước: </p>
              <Image src={identification_image?.identification_front} width={300}/>
              <p className="text-lg pt-2">Ảnh mặt sau </p>
              <Image src={identification_image?.identification_back}  width={300}/>
            </div>
          </Col>
        </Row>
      ),
    });
  }

  useEffect(() => {
    fetchUser();
  }, [pagination]);

  const updateUser = async (value, id) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/update/${id}`, {role: value})
      .finally(() => {
        fetchUser();
        message.success("Cập nhập thành công!");
      });
    
  };

  const updateUserKyc = async (value, id) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/updateKyc/${id}`, {kyc: value})
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
      sorter: (a, b) => a.user_id - b.user_id,
      width: 50,
      render: (_, record) => <div>{record?.user_id}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Họ và Tên</div>,
      key: "displayName",
      dataIndex: "displayName",
      width: 280,
      ...SearchProps("displayName"),
      render: (_, record) => <div>{record?.displayName}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Email</div>,
      key: "email",
      dataIndex: "email",
      width: 280,
      ...SearchProps("email"),
      render: (_, record) => {
        return <div>{record?.email}</div>;
      },
    },
    {
      title: <div className={"base-table-cell-label"}>Giới tính</div>,
      key: "gender",
      dataIndex: "gender",
      width: 280,
      render: (_, record) => {
        return <div>{record?.gender}</div>;
      },
    },
    {
      title: <div className={"base-table-cell-label"}>KYC</div>,
      key: "kyc",
      dataIndex: "kyc",
      width: 280,
      render: (_, record) => {
        return (
          <div>
            <Select
              options={[
                { label: 'Chưa xác thực', value: 0 },
                { label: 'Đã xác thực', value: 1 },
              ]}
              className={"w-[150px]"}
              value={record?.kyc === 1 ? "Đã xác thực" : "Chưa xác thực"}
              defaultValue={record?.kyc === 1 ? "Đã xác thực" : "Chưa xác thực"}
              onChange={(value) => updateUserKyc(value, record?.user_id)}
            />
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label"}>Vai trò</div>,
      key: "role",
      dataIndex: "role",
      width: 280,
      filters: [
        { text: 'User', value: 1 },
        { text: 'Admin', value: 2 },
      ],
      onFilter: (value, record) => {
        return record?.role === value;
      },
      render: (_, record) => {
        return (
          <div>
            <Select
              options={optionRole}
              className={"w-[100px]"}
              value={record?.role === 1 ? "User" : "Admin"}
              defaultValue={record?.role === 1 ? "User" : "Admin"}
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
      sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
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
              onClick={() => showInfo(record)}
            >
              <InfoOutlined className="text-white text-xl rounded-full bg-sky-400 p-1 cursor-pointer" />
            </div>
            <div
              onClick={() => confirmDelete(record?.user_id)}
            >
              <DeleteOutlined className="text-white text-xl rounded-full bg-red-500 p-1 ml-1 cursor-pointer" />
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

      <div className="w-full h-full mt-5 pb-20 relative">
        <Table
          className={"custom-table"}
          dataSource={user?.data}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="flex justify-center absolute inset-x-0 bottom-10"
          current={pagination.page}
          total={user?.total}
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
  );
}
