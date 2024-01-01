import { Table, message, Button, Row, Col, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const fetchcategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category/getAllAdmin`, {params: pagination})
      .then((res) => {
        const data = res?.data;
        setCategories(data);
        console.log(data);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchcategories();
  }, [pagination]);

  const columns = [
    {
      title: <div>ID</div>,
      key: "category_id",
      dataIndex: "category_id",
      width: 100,
      render: (_, record) => <div>{record?.category_id}</div>,
    },
    {
      title: <div>Tên</div>,
      key: "category_name",
      dataIndex: "category_name",
      width: 150,
      render: (_, record) => <div>{record?.category_name}</div>,
    },
    {
      title: <div>Mô tả</div>,
      key: "category_description",
      dataIndex: "category_description",
      width: 150,
      render: (_, record) => <div>{record?.category_description}</div>,
    },
    {
      title: <div>Icon</div>,
      key: "category_link",
      dataIndex: "category_link",
      width: 150,
      render: (_, record) => <div><img src={record?.category_link} className="h-10 w-10"/></div>,
    },
    {
      title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 100,
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
            to={`/admin/categories/${record?.category_id}`}
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
      <div className="w-full h-full mt-5 relative">
        <Table
          className={"custom-table"}
          dataSource={categories?.data}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="flex justify-center absolute inset-x-0 bottom-10"
          current={pagination.page}
          total={categories?.total}
          pageSize={pagination.pageSize}
          onChange={(p)=> {
            setPagination({
              page: p,
              pageSize: pagination.pageSize
            })
          }}
        />
      </div>
    </>
  );
}
