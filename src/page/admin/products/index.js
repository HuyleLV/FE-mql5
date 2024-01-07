import { Table, message, Button, Row, Col, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const fetchProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getAll`, {params: pagination})
      .then((res) => {
        const data = res?.data;
        setProducts(data || []);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination]);

  const columns = [
    {
      title: <div>ID</div>,
      key: "product_id",
      dataIndex: "product_id",
      width: 100,
      sorter: (a, b) => a.product_id - b.product_id,
      render: (_, record) => <div>{record?.product_id}</div>,
    },
    {
      title: <div>Tên</div>,
      key: "product_name",
      dataIndex: "product_name",
      width: 200,
      ...SearchProps("product_name"),
      render: (_, record) => <div>{record?.product_name}</div>,
    },
    {
      title: <div>Slug</div>,
      key: "product_slug",
      dataIndex: "product_slug",
      width: 200,
      ...SearchProps("product_slug"),
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
      width: 200,
      sorter: (a, b) => a.product_price - b.product_price,
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
      sorter: (a, b) => a.product_version - b.product_version,
      render: (_, record) => {
        return (
          <div className={"cursor-pointer text-[14px] font-normal"}>
            {record?.product_version}
          </div>
        );
      },
    },
    {
      title: <div>Người tạo</div>,
      key: "displayName",
      dataIndex: "displayName",
      width: 200,
      ...SearchProps("displayName"),
      render: (_, record) => <div>{record?.displayName}</div>,
    },
    {
      title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
      key: "createdAt",
      dataIndex: "createdAt",
      width: 100,
      sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
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
            to={`/admin/products/${record?.product_id}`}
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
            <div className={"text-[20px] font-medium"}>Sản phẩm</div>
          </Col>
          <Col>
            <Link to={"/admin/products/create"}>
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
          dataSource={products?.data}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="flex justify-center absolute inset-x-0 bottom-10"
          current={pagination.page}
          total={products?.total}
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
