import { Button, Col, Image, Modal, Pagination, Rate, Row, Space, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function IndicatorNewsDashboard() {
    const [indicatorNews, setIndicatorNews] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllIndicatorNews = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/indicatorNews/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setIndicatorNews(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const removeIndicatorNews = async (id) => {
        await axios.delete(
        `${process.env.REACT_APP_API_URL}/indicatorNews/delete/${id}`
        ).finally(() => {
            getAllIndicatorNews()
            message.success('Xoá thành công')
        })
    };

    const confirmDelete = (id) => {
        Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá indicatorNews này?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeIndicatorNews(id),
        });
    };

    const columns = [
        {
          title: "ID",
          key: "indicator_news_id",
          dataIndex: "indicator_news_id",
          width: 50,
          sorter: (a, b) => a.indicator_news_id - b.indicator_news_id,
          render: (_, record) => <div>{record?.indicator_news_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "indicator_news_title",
          dataIndex: "indicator_news_title",
          width: 150,
          ...SearchProps("indicator_news_title"),
          render: (_, record) => <div>{record?.indicator_news_title}</div>,
        },
        {
          title: "IMP.",
          key: "indicator_news_imp",
          dataIndex: "indicator_news_imp",
          width: 150,
          render: (_, record) => 
            <div>
                <Rate disabled defaultValue={record?.indicator_news_imp} />
            </div>,
        },
        {
          title: "Thực tế",
          key: "indicator_news_real",
          dataIndex: "indicator_news_real",
          width: 150,
          render: (_, record) => 
            <div>
                {record?.indicator_news_real}
            </div>,
        },
        {
          title: "Dự báo",
          key: "indicator_news_forecast",
          dataIndex: "indicator_news_forecast",
          width: 150,
          render: (_, record) => 
            <div>
                {record?.indicator_news_forecast}
            </div>,
        },
        {
          title: "Trước đó",
          key: "indicator_news_before",
          dataIndex: "indicator_news_before",
          width: 150,
          render: (_, record) => 
            <div>
                {record?.indicator_news_before}
            </div>,
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
                <Space>
                    <Link
                        to={`/admin/indicator-news/${record?.indicator_news_id}`}
                        className={"text-[var(--blue)]"}
                    >
                        <EditOutlined />
                    </Link>
                    <div
                        className={"text-[var(--red)] text-lg cursor-pointer ml-2"}
                        onClick={() => confirmDelete(record?.indicator_news_id)}
                    >
                        <DeleteOutlined />
                    </div>
                </Space>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllIndicatorNews();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Danh mục IndicatorNews</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/indicator-news/create"}>
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
                    dataSource={indicatorNews?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={indicatorNews?.total}
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