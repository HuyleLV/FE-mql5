import { Table, message, Space, Row, Col, Modal, Image, Select, Pagination } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";

export default function TransferDashboard() {
  const [transfer, setTransfer] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 6,
  });
  
  const fetchTransfer = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/transfer/getAll`, {params: pagination})
      .then((res) => {
        const data = res?.data;
        setTransfer(data);
      })
      .catch(() => message.error("Error server!"));
  };

  const removeTransfer = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/transfer/delete/${id}`
    ).finally(() => {
        fetchTransfer()
        message.success('Xoá thành công')
    })
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá comment này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeTransfer(id),
    });
  };

  const repMessenge = (id) => {
    
  }

  const updateTransfer = async (value, e) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/transfer/updateStatus/${value?.transfer_id}`, {
        transfer_price: value?.transfer_price,
        transfer_status: e,
        create_by: value?.user_id
      })
      .finally(() => {
        fetchTransfer();
        message.success("Cập nhập thành công!");
      });
    
  };

  const optionTransfer = [
    { value: "1", label: "Chờ Xác nhận" },
    { value: "2", label: "Xác nhận" },
  ];
  
  useEffect(() => {
    fetchTransfer();
  }, [pagination]);

  const columns = [
    {
      title: <div>ID</div>,
      key: "transfer_id",
      dataIndex: "transfer_id",
      width: 50,
      sorter: (a, b) => a.transfer_id - b.transfer_id,
      render: (_, record) => <div>{record?.transfer_id}</div>,
    },
    {
      title: <div>Nội dung</div>,
      key: "transfer_content",
      dataIndex: "transfer_content",
      width: 160,
      render: (_, record) => <div>{record?.transfer_content}</div>,
    },
    {
      title: <div className="text-center">Giá</div>,
      key: "transfer_price",
      dataIndex: "transfer_price",
      width: 160,
      sorter: (a, b) => a.transfer_price - b.transfer_price,
      render: (_, record) => <div className="text-center">{record?.transfer_price}</div>,
    },
    {
      title: <div className="text-center">Trạng thái</div>,
      key: "transfer_status",
      dataIndex: "transfer_status",
      width: 160,
      filters: [
        { text: 'Chờ xác nhận', value: "1" },
        { text: 'Xác nhận', value: "2" },
      ],
      onFilter: (value, record) => {
        return record?.transfer_status === value;
      },
      render: (_, record) => (
        <div className="flex justify-center">
          <Select
            options={optionTransfer}
            className={"w-[150px]"}
            value={record?.transfer_status === "1" ? "Chờ xác nhận" : "Xác nhận"}
            defaultValue={record?.transfer_status === "1" ? "Chờ xác nhận" : "Xác nhận"}
            onChange={(e) => updateTransfer(record, e)}
            />
        </div>
      ),
    },
    {
      title: <div className="text-center">Ảnh</div>,
      key: "transfer_image",
      dataIndex: "transfer_image",
      width: 160,
      render: (_, record) => 
        <div className="flex justify-center">
          <Image
              width={80}
              src={record?.transfer_image}
              />
        </div>,
    },
    {
      title: <div>Loại</div>,
      key: "type",
      dataIndex: "type",
      width: 160,
      filters: [
        { text: 'Chuyển tiền', value: 1 },
        { text: 'Mua sản phẩm', value: 2 },
      ],
      onFilter: (value, record) => {
        return record?.type === value;
      },
      render: (_, record) => (
        <p>
          {record?.type === 1 ? "Chuyển tiền" : record?.type === 2 ? "Mua sản phẩm" : null}
        </p>
      ),
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
      key: "create_at",
      dataIndex: "create_at",
      width: 160,
      sorter: (a, b) => dayjs(a.create_at) - dayjs(b.create_at),
      render: (_, record) => {
        return (
          <div>
            <span className={"!inline-block min-w-[100px]"}>
              {dayjsInstance(record?.create_at).format("DD/MM/YYYY")}
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
          <Space>
            <div
              className={"text-[var(--blue)] text-lg cursor-pointer"}
              onClick={() => repMessenge(record?.transfer_id)}
            >
              <MessageOutlined />
            </div>
            <div
              className={"text-[var(--red)] text-lg cursor-pointer ml-2"}
              onClick={() => confirmDelete(record?.transfer_id)}
            >
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    }
    
  ];

  return (
    <>
      <div>
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[20px] font-medium pb-10 pt-5"}>Quản lý giao dịch</div>
          </Col>
        </Row>
      </div>
      <div className="w-full h-full mt-5 pb-20 relative">
        <Table
          className={"custom-table"}
          dataSource={transfer?.data}
          columns={columns}
          pagination={false}
        />
      
        <Pagination 
          className="flex justify-center absolute inset-x-0 bottom-24"
          current={pagination.page}
          total={transfer?.total}
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
