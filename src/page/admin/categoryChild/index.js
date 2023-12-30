import { Table, message, Button, Row, Col, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryChildDashboard() {
  const [categories, setCategories] = useState([]);
  const fetchcategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/categoryChild/getAll`)
      .then((res) => {
        const data = res?.data;
        setCategories(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  const columns = [
    {
      title: <div>ID</div>,
      key: "categoryChild_id",
      dataIndex: "categoryChild_id",
      width: 100,
      render: (_, record) => <div>{record?.categoryChild_id}</div>,
    },
    {
      title: <div>Tên</div>,
      key: "categoryChild_name",
      dataIndex: "categoryChild_name",
      width: 250,
      render: (_, record) => {
        return (
          <div className={"flex items-center"}>
            {record?.categoryChild_link && (
              <div>
                <Image
                  preview={false}
                  src={`${record?.categoryChild_link}`}
                  width={50}
                  height={50}
                />
              </div>
            )}
            <div className={"ml-[10px]"}>{record?.categoryChild_name}</div>
          </div>
        );
      },
    },
    {
      title: <div>Mô tả</div>,
      key: "categoryChild_description",
      dataIndex: "categoryChild_description",
      width: 150,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            {record?.categoryChild_description}
          </div>
        );
      },
    },
    {
      title: <div>Danh mục cha</div>,
      key: "category_name",
      dataIndex: "category_name",
      width: 150,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            {record?.category_name}
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
          <div className={"cursor-pointer text-[14px] font-normal"}>
            <span className={"!inline-block min-w-[100px]"}>
              {dayjsInstance(record?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label "}>Người tạo</div>,
      key: "displayName",
      dataIndex: "displayName",
      width: 100,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            <span className={"!inline-block min-w-[100px]"}>
              {record?.displayName}
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
            to={`/admin/categoryChild/${record?.categoryChild_id}`}
            className={"text-[var(--blue)]"}
          >
            <EditOutlined />
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[20px] font-medium"}>Danh mục con</div>
          </Col>
          <Col>
            <Link to={"/admin/categoryChild/create"}>
              <Button type={"primary"} onClick={() => {}}>
                Tạo
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      <Table
        className={"custom-table"}
        rowKey={(record) => record?.product_id + ""}
        dataSource={categories}
        columns={columns}
      />
    </>
  );
}
