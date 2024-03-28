import { Button, Col, Image, Pagination, Row, Select, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

export default function SignalDashboard() {
    const [signal, setSignal] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllSignal = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/signal/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            console.log(data);
            setSignal(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const updateSignalHot = async (id, signal_hot) => {
        await axios
        .post(`${process.env.REACT_APP_API_URL}/signalHot/updateHot/${id}`, {
            signal_hot: signal_hot,
          page: 1
        })
        .finally(() => {
          getAllSignal();
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
          key: "signal_id",
          dataIndex: "signal_id",
          width: 50,
          sorter: (a, b) => a.signal_id - b.signal_id,
          render: (_, record) => <div>{record?.signal_id}</div>,
        },
        {
          title: "Ticket",
          key: "ticket",
          dataIndex: "ticket",
          width: 150,
          ...SearchProps("ticket"),
          render: (_, record) => <div>{record?.ticket}</div>,
        },
        {
          title: "Type",
          key: "type",
          dataIndex: "type",
          width: 150,
          render: (_, record) => <div>{record?.type}</div>,
        },
        {
          title: "Symbol",
          key: "symbol",
          dataIndex: "symbol",
          width: 150,
          ...SearchProps("symbol"),
          render: (_, record) => <div>{record?.symbol}</div>,
        },
        {
          title: "Signal hot nhất",
          key: "signal_hot",
          dataIndex: "signal_hot",
          width: 150,
          sorter: (a, b) => a.signal_hot - b.signal_hot,
          render: (_, record) => 
          <Select
            className="w-[100px]"
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            value={record?.signal_hot}
            onChange={(e)=>updateSignalHot(record?.signal_id, e)}
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
          title: "Open time",
          key: "open_time",
          dataIndex: "open_time",
          width: 150,
          sorter: (a, b) => dayjs(a.open_time) - dayjs(b.open_time),
          render: (_, record) => {
            return (
              <div className={"cursor-pointer text-[14px] font-normal"}>
                <span className={"!inline-block min-w-[100px]"}>
                  {dayjsInstance(record?.open_time).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
            );
          },
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
                to={`/admin/signal/${record?.signal_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link>
            );
          },
        },
    ]
    
    useEffect(() => {
        getAllSignal();
    }, [pagination]);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Quản lý Signal</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/signal/create"}>
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
                    dataSource={signal?.data}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-center absolute inset-x-0 bottom-20"
                    current={pagination.page}
                    total={signal?.total}
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