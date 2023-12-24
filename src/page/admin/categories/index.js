import { Table, message, Button, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const fetchcategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category/getAll`)
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
      key: "product_id",
      dataIndex: "product_id",
      width: 100,
      render: (_, record) => <div>{record?.product_id}</div>,
    },
    {
      title: <div>Tên</div>,
      key: "product_name",
      dataIndex: "product_name",
      width: 150,
      render: (_, record) => <div>{record?.product_name}</div>,
    },
    {
      title: <div>Slug</div>,
      key: "product_slug",
      dataIndex: "product_slug",
      width: 150,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            {record?.product_slug}
          </div>
        );
      },
    },
    {
      title: <div>Giá</div>,
      key: "product_price",
      dataIndex: "product_price",
      width: 150,
      render: (_, record) => (
        <div className={"cursor-pointer"}>
          <div className={"text-[14px] font-normal text"}>
            {record?.product_price}
          </div>
        </div>
      ),
    },
    {
      title: <div>Phiên bản</div>,
      key: "product_version",
      dataIndex: "product_version",
      width: 200,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            {record?.product_version}
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
      key: "operation",
      dataIndex: "operation",
      width: 50,
      render: (_, record) => {
        return (
          <Link
            to={`/admin/categories/${record?.product_id}`}
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
            <div className={"text-[20px] font-medium"}>Danh mục cha</div>
          </Col>
          <Col>
            <Link to={"/admin/categories/create"}>
              <Button type={"primary"} onClick={() => {}}>
                Tạo
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      {/* <Table
        className={"custom-table"}
        rowKey={(record) => record?.product_id + ""}
        dataSource={categories}
        columns={columns}
      /> */}
    </>
  );
}
