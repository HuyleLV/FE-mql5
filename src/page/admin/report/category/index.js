import { Button, Col, Image, Pagination, Row, Select, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import axiosInstance from "../../../../utils/axios";

export default function ReportCategoryDashboard() {
    const [report, setReport] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllReport = async () => {
        await axiosInstance
        .get(`/reportCategory/getAll/`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setReport(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const columns = [
        {
          title: "ID",
          key: "report_category_id",
          dataIndex: "report_category_id",
          width: 50,
          sorter: (a, b) => a.report_category_id - b.report_category_id,
          render: (_, record) => <div>{record?.report_category_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "report_category_title",
          dataIndex: "report_category_title",
          width: 150,
          ...SearchProps("report_category_title"),
          render: (_, record) => <div>{record?.report_category_title}</div>,
        },
        {
          title: "Ngày tạo",
          key: "create_at",
          dataIndex: "create_at",
          width: 100,
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
        {
          title: "Người tạo",
          key: "create_by",
          dataIndex: "create_by",
          width: 150,
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
                to={`/admin/report-category/${record?.report_category_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllReport();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục report</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/report-category/create"}>
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
                    dataSource={report?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={report?.total}
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