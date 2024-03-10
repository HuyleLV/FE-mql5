import { Table, message, Button, Row, Col, Pagination, Select, DatePicker } from "antd";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import { CSVLink, CSVDownload } from "react-csv";

export default function MasterDashboard() {
    const [master, setMaster] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getAllMaster = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAll`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setMaster(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const updatePaymentStatus = async (e, values) => {
        await axios
        .post(`${process.env.REACT_APP_API_URL}/masterLicense/updatePaymentStatus`, {
            master_license_id: values?.master_license_id,
            payment_status: e
        })
        .finally(() => {
          getAllMaster();
          message.success("Cập nhật trạng thái thành công !");
        })
        .catch(()=>{
          message.error("Cập nhật thất bại!");
        });
    }

    const updateActiveStatus = async (e, values) => {
        await axios
        .post(`${process.env.REACT_APP_API_URL}/masterLicense/checkExpriceDate`, {
            master_license_id: values?.master_license_id,
            active_status: e
        })
        .finally(() => {
          getAllMaster();
            message.success("Cập nhật trạng thái thành công !");
        })
        .catch(()=>{
            message.error("Cập nhật thất bại!");
        });
    }

    const updateExpriceDate = async (e, values) => {
        await axios
        .post(`${process.env.REACT_APP_API_URL}/masterLicense/updateExpriceDate`, {
            master_license_id: values?.master_license_id,
            exprice_date: dayjsInstance(e.$d).format("YYYY-MM-DD")
        })
        .finally(() => {
          getAllMaster();
          message.success("Cập nhật thành công!");
        })
        .catch(()=>{
          message.error("Cập nhật thất bại!");
        });
    }

  const columns = [
    {
      title: "ID",
      key: "master_license_id",
      dataIndex: "master_license_id",
      width: 50,
      sorter: (a, b) => a.master_license_id - b.master_license_id,
      render: (_, record) => <div>{record?.master_license_id}</div>,
    },
    {
      title: "Master key",
      key: "master_key",
      dataIndex: "master_key",
      width: 100,
      ...SearchProps("master_key"),
      render: (_, record) => <div>{record?.master_key}</div>,
    },
    {
      title: "Exprice date",
      key: "exprice_date",
      dataIndex: "exprice_date",
      width: 150,
      render: (_, record) => 
        <div>
          <DatePicker 
            onChange={(e)=>updateExpriceDate(e, record)}
            value={dayjsInstance(record?.exprice_date)} 
            format={'DD/MM/YYYY'} 
          />
        </div>,
    },
    {
      title: "Active status",
      key: "active_status",
      dataIndex: "active_status",
      width: 100,
      render: (_, record) => 
        <Select
          size="large"
          placeholder="Select a person"
          optionFilterProp="children"
          value={record?.active_status}
          onChange={(e)=>updateActiveStatus(e, record)}
          options={[
          { 
              label: "Active",
              value: 1
          },
          { 
              label: "Inactive",
              value: 0
          }
          ]}
        />,
    },
    {
      title: "Payment status",
      key: "payment_status",
      dataIndex: "payment_status",
      width: 100,
      render: (_, record) => 
        <Select
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            value={record?.payment_status}
            onChange={(e)=>updatePaymentStatus(e, record)}
            options={[
            { 
                label: "Active",
                value: 1
            },
            { 
                label: "Inactive",
                value: 0
            }
            ]}
        />,
    },
    {
      title: "User",
      key: "displayName",
      dataIndex: "displayName",
      width: 100,
      render: (_, record) => 
        <div>
            <p>{record?.displayName}</p>
            <p>{record?.email}</p>
        </div>,
    },
    {
      title: "Total active",
      key: "total_active",
      dataIndex: "total_active",
      width: 100,
      render: (_, record) => 
        <div>
            <p>{record?.total_active}</p>
        </div>,
    },
    {
      title: "Total follow",
      key: "total_follow",
      dataIndex: "total_follow",
      width: 100,
      render: (_, record) => 
        <div>
            <p>{record?.total_follow}</p>
        </div>,
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
      width: 100,
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
      title: "More",
      key: "operation",
      dataIndex: "operation",
      width: 50,
      render: (_, record) => {
        return (
          <Link
            to={`/admin/master/${record?.master_key}`}
            className="flex justify-center"
          >
            <InfoOutlined className="border rounded-full p-1 hover:bg-blue-100"/>
          </Link>
        );
      },
    },
  ];
  
  useEffect(() => {
    getAllMaster();
  }, [pagination]);

  return (
    <>
      <div>
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[20px] font-medium"}>Danh mục Master</div>
            <div className="py-2">
              {master?.data && (
                  <CSVLink data={master?.data}>
                      <Button>DownLoad CSV</Button>
                  </CSVLink>
              )}
            </div>
          </Col>
          <Col>
            <p className="font-medium text-xl">Tổng số master: {master?.total}</p>
          </Col>
        </Row>
      </div>
      <div className="w-full h-full mt-5 pb-20 relative">
        <Table
          className={"custom-table"}
          dataSource={master?.data}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="flex justify-center absolute inset-x-0 bottom-20"
          current={pagination.page}
          total={master?.total}
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
