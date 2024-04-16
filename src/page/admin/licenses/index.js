import { Table, Row, Col, Button, message, Modal, Space, Select, Pagination, DatePicker } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";
import axiosInstance from "../../../utils/axios";
console.log("LicensesDashboard");
export default function LicensesDashboard() {
  console.log("LicensesDashboard");
  const [license, setLicense] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const fetchLicense = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/license/getAll`)
      .then((res) => {
        const data = res?.data;
        setLicense(data || []);
        
      })
      .catch(() => message.error("Error server!"));
  };

  const updateEndDate = async (e, values) => {
      await axiosInstance
      .post(`/license/updateEndDate`, {
        license_id:  values?.license_id,
        end_date: dayjsInstance(e.$d).format("YYYY-MM-DD")
      })
      .finally(() => {
        fetchLicense();
        message.success("Cập nhật thành công!");
      })
      .catch(()=>{
        message.error("Cập nhật thất bại!");
      });
  }

  const removeLicense = async (license_id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/license/delete/${license_id}`)
      .finally(() => {
        fetchLicense();
        message.success("Xoá thành công");
      });
  };

  const confirmDelete = (license_id) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá license này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeLicense(license_id),
    });
  };

  useEffect(() => {
    fetchLicense();
  }, [pagination]);

  const updateLicense = async (value, id) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/license/updateActiveStatus/${id}`, {active_status: value})
      .finally(() => {
        fetchLicense();
        message.success("Cập nhập thành công!");
      });
    
  };

  const optionStatus = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];
  const columns = [
    {
      title: <div className={"base-table-cell-label"}>ID</div>,
      key: "license_id",
      dataIndex: "license_id",
      sorter: (a, b) => a.license_id - b.license_id,
      width: 50,
      render: (_, record) => <div>{record?.license_id}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>mt4_account</div>,
      key: "mt4_account",
      dataIndex: "mt4_account",
      width: 280,
      ...SearchProps("mt4_account"),
      render: (_, record) => <div>{record?.mt4_account}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>product_id</div>,
      key: "product_id",
      dataIndex: "product_id",
      width: 50,
      ...SearchProps("product_id"),
      render: (_, record) => <div>{record?.product_id}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>product_name</div>,
      key: "product_name",
      dataIndex: "product_name",
      width: 50,
      ...SearchProps("product_name"),
      render: (_, record) => <div>{record?.product_name}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>brocker_name</div>,
      key: "brocker_name",
      dataIndex: "brocker_name",
      width: 280,
      ...SearchProps("brocker_name"),
      render: (_, record) => <div>{record?.brocker_name}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>account_type</div>,
      key: "account_type",
      dataIndex: "account_type",
      width: 280,
      ...SearchProps("account_type"),
      render: (_, record) => <div>{record?.account_type}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>account_balance</div>,
      key: "account_balance",
      dataIndex: "account_balance",
      width: 280,
      ...SearchProps("account_balance"),
      render: (_, record) => <div>{record?.account_balance}</div>,
    },
    {
      title: <div className={"base-table-cell-label"}>account_profit</div>,
      key: "account_profit",
      dataIndex: "account_profit",
      width: 280,
      ...SearchProps("account_profit"),
      render: (_, record) => <div>{record?.account_profit}</div>,
    },
    {
      title: <div className={"base-table-cell-label "}>Ngày Active</div>,
      key: "active_date",
      dataIndex: "active_date",
      width: 280,
      sorter: (a, b) => dayjs(a.active_date) - dayjs(b.active_date),
      render: (_, record) => {
        return (
          <div>
            <span className={"!inline-block min-w-[100px]"}>
              {dayjsInstance(record?.active_date).format("DD/MM/YYYY")}
            </span>
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label "}>End Date</div>,
      key: "end_date",
      dataIndex: "end_date",
      width: 280,
      sorter: (a, b) => dayjs(a.end_date) - dayjs(b.end_date),
      render: (_, record) => {
        return (
          <div>
            <span className={"!inline-block min-w-[100px]"}>
              <DatePicker 
                onChange={(e)=>updateEndDate(e, record)}
                value={dayjsInstance(record?.end_date)} 
                format={'DD/MM/YYYY'} 
              />
            </span>
          </div>
        );
      },
    },
    {
      title: <div className={"base-table-cell-label"}>Active Status</div>,
      key: "active_status",
      dataIndex: "active_status",
      width: 280,
      filters: [
        { text: 'Active', value: 1 },
        { text: 'Inactive', value: 0 },
      ],
      onFilter: (value, record) => {
        return record?.active_status === value;
      },
      render: (_, record) => {
        return (
          <div>
            <Select
              options={optionStatus}
              className={"w-[100px]"}
              value={record?.active_status === 1 ? "Active" : "Inactive"}
              defaultValue={record?.active_status === 1 ? "Active" : "Inactive"}
              onChange={(value) => updateLicense(value, record?.license_id)}
            />
          </div>
        );
      },
    },
    
    {
      key: "operation",
      dataIndex: "operation",
      width: 100,
      render: (_, record) => {
        return (
          <Space>
            <div
              className={"text-[var(--red)]"}
              onClick={() => confirmDelete(record?.license_id)}
            >
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={10} className={"mb-[8px]"}>
        <Col flex={1}>
          <div className={"text-[20px] font-medium"}>Danh sách licenses</div>
        </Col>
      </Row>

      <div className="w-full h-full mt-5 pb-20 relative">
        <Table
          className={"custom-table"}
          dataSource={license}
          columns={columns}
          pagination={false}
        />
        {/* <Pagination
          className="flex justify-center absolute inset-x-0 bottom-10"
          current={pagination.page}
          total={license?.total}
          pageSize={pagination.pageSize}
          showSizeChanger
          onChange={(p, ps)=> {
            setPagination({
              page: p,
              pageSize: ps
            })
          }}
        /> */}
      </div>
    </>
  );
}
