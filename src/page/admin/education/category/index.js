import { Button, Col, Image, Pagination, Row, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function EducationCategory() {
    const [educationCategory, setEducationCategory] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllEducationCategory = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/educationCategory/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setEducationCategory(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "education_category_id",
          dataIndex: "education_category_id",
          width: 50,
          sorter: (a, b) => a.education_category_id - b.education_category_id,
          render: (_, record) => <div>{record?.education_category_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "education_category_title",
          dataIndex: "education_category_title",
          width: 150,
          ...SearchProps("education_category_title"),
          render: (_, record) => <div>{record?.education_category_title}</div>,
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
                to={`/admin/education-category/${record?.education_category_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllEducationCategory();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục education</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/education-category/create"}>
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
                    dataSource={educationCategory?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={educationCategory?.total}
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