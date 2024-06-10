import { Button, Col, Image, Pagination, Row, Select, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function EconomicNewsDashboard() {
    const [economicNews, setEconomicNews] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllEconomicNews = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/economicNews/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setEconomicNews(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const updateEconomicNewsHot = async (economic_news_id, economic_news_hot) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}/economicNews/updateHot/${economic_news_id}`, {
                economic_news_hot: economic_news_hot
            })
            .finally(() => {
                getAllEconomicNews();
            })
            .then(async (response) => {
                message.success(String(response?.data?.message));
            })
            .catch(({ response })=>{
                message.error(String(response?.data?.message));
            });
    }

    const columns = [
        {
          title: "ID",
          key: "economic_news_id",
          dataIndex: "economic_news_id",
          width: 50,
          sorter: (a, b) => a.economic_news_id - b.economic_news_id,
          render: (_, record) => <div>{record?.economic_news_id}</div>,
        },
        {
          title: "Tiêu đề",
          key: "economic_news_title",
          dataIndex: "economic_news_title",
          width: 150,
          ...SearchProps("economic_news_title"),
          render: (_, record) => <div>{record?.economic_news_title}</div>,
        },
        {
          title: "Slug",
          key: "economic_news_slug",
          dataIndex: "economic_news_slug",
          width: 150,
          render: (_, record) => <div>{record?.economic_news_slug}</div>,
        },
        {
          title: "Ảnh",
          key: "economic_news_image",
          dataIndex: "economic_news_image",
          width: 150,
          render: (_, record) => <div className="flex justify-center"><Image src={record?.economic_news_image} width={100}/></div>,
        },
        {
          title: "Bài viết hot nhất",
          key: "economic_news_hot",
          dataIndex: "economic_news_hot",
          width: 150,
          sorter: (a, b) => a.economic_news_hot - b.economic_news_hot,
          render: (_, record) => 
          <Select
            className="w-[100px]"
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            value={record?.economic_news_hot}
            onChange={(e)=>updateEconomicNewsHot(record?.economic_news_id, e)}
            options={[
              { 
                value: 1
              },
              { 
                value: 2
              },
              { 
                value: 3
              },
              { 
                value: 4
              },
              { 
                value: 5
              },
              { 
                value: 6
              },
              { 
                label: "null",
                value: null
              }
            ]}
          />,
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
          title: "Ngày cập nhật",
          key: "update_at",
          dataIndex: "update_at",
          width: 150,
          sorter: (a, b) => dayjs(a.update_at) - dayjs(b.update_at),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.update_at).format("DD/MM/YYYY HH:mm:ss")}
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
                to={`/admin/economic-news/${record?.economic_news_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllEconomicNews();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Quản lý bản tin tài chính</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/economic-news/create"}>
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
                    dataSource={economicNews?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={economicNews?.total}
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