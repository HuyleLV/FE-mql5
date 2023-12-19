import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Users } from "../../../database";
import dayjsInstance from "../../../utils/dayjs";
import { Link, redirect } from "react-router-dom";

export default function UsersDashboard() {
  const columns = [
    {
      title: <div className={"base-table-cell-label"}>ID</div>,
      key: "id",
      dataIndex: "id",
      width: 100,
      render: (_, record) => <div>{record?.id}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Họ và Tên</div>,
      key: "fullName",
      dataIndex: "fullName",
      width: 400,
      render: (_, record) => <div>{record?.fullName}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>Số phone</div>,
      key: "phone",
      dataIndex: "phone",
      width: 150,
      render: (_, record) => (
        <div
          onClick={() => redirect(`/admin/users/${record?.id}`)}
          className={"cursor-pointer"}
        >
          <div className={"text-[14px] font-normal text"}>{record?.phone}</div>
        </div>
      ),
    },
    {
      title: <div className={"base-table-cell-label"}>Email</div>,
      key: "email",
      dataIndex: "email",
      width: 200,
      render: (_, record) => {
        return (
          <div
            className={"cursor-pointer text-[14px] font-normal"}
            //onClick={() => redirectMaterials(record)}
          >
            {record?.email}
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label"}>Vài trò</div>,
      key: "role",
      dataIndex: "role",
      width: 150,
      render: (_, record) => {
        return (
          <div
            className={"cursor-pointer text-[14px] font-normal"}
            //onClick={() => redirectMaterials(record)}
          >
            {record?.role}
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
      key: "createdAt",
      dataIndex: "createdAt",
      width: 100,
      render: (_, record) => {
        return (
          <div
            //onClick={() => redirectMaterials(record)}
            className={"cursor-pointer text-[14px] font-normal"}
          >
            <span className={"!inline-block min-w-[100px]"}>
              {dayjsInstance(record?.createdAt).format("DD/MM/YYYY")}
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
          <Link to={`/admin/users/${record?.id}`} className={'text-[var(--blue)]'}>
            <EditOutlined />
          </Link>
        );
      },
    },
  ];

  return (
    <Table
      className={"custom-table"}
      rowKey={(record) => record?.id + ""}
      dataSource={Users}
      columns={columns}
    />
  );
}
