import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function IdentifyCategory() {
    const [identifyCategory, setIdentifyCategory] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllIdentifyCategory = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/identifyCategory/getAllIdentifyCategory`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setIdentifyCategory(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "identify_category_id",
          dataIndex: "identify_category_id",
          width: 50,
          sorter: (a, b) => a.identify_category_id - b.identify_category_id,
          render: (_, record) => <div>{record?.identify_category_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "identify_category_title",
          dataIndex: "identify_category_title",
          width: 150,
          ...SearchProps("identify_category_title"),
          render: (_, record) => <div>{record?.identify_category_title}</div>,
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
                  {dayjsInstance(record?.create_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
            );
          },
        },
        {
          title: "Người tạo",
          key: "create_at",
          dataIndex: "create_at",
          width: 150,
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
                to={`/admin/identify-category/${record?.identify_category_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllIdentifyCategory();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục nhận định</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/identify-category/create"}>
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
                    dataSource={identifyCategory?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={identifyCategory?.total}
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