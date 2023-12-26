import { Table, message, Space, Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentDashboard() {
  const [comments, setComments] = useState([]);
  const fetchcomments = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/comment/getAll`)
      .then((res) => {
        const data = res?.data;
        setComments(data);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchcomments();
  }, []);


  const removeProduct = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete/${id}`
    ).finally(() => {
      fetchcomments()
      message.success('Xoá thành công')
    })
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá comment này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeProduct(id),
    });
  };
  const columns = [
    {
      title: <div>ID</div>,
      key: "comment_id",
      dataIndex: "comment_id",
      width: 100,
      render: (_, record) => <div>{record?.comment_id}</div>,
    },

    {
      title: <div>Id sản phẩm</div>,
      key: "product_id",
      dataIndex: "product_id",
      width: 150,
      render: (_, record) => <div>{record?.product_id}</div>,
    },
    {
      title: <div>Nội dung</div>,
      key: "comment_content",
      dataIndex: "comment_content",
      width: 250,
      render: (_, record) => <div>{record?.comment_content}</div>,
    },
    {
      title: <div>Người tạo</div>,
      key: "displayName",
      dataIndex: "displayName",
      width: 250,
      render: (_, record) => <div>{record?.displayName}</div>,
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
      key: "operation",
      dataIndex: "operation",
      width: 50,
      render: (_, record) => {
        return (
          <>
            <Space>
              {/* <Link
                to={`/admin/comments/${record?.comment_id}`}
                className={"text-[var(--blue)]"}
              >
                <EditOutlined />
              </Link> */}
              <div className={"text-[var(--red)]"} onClick={() => confirmDelete(record?.comment_id)}>
                <DeleteOutlined />
              </div>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[20px] font-medium"}>Comment</div>
          </Col>
        </Row>
      </div>
      <Table
        className={"custom-table"}
        rowKey={(record) => record?.product_id + ""}
        dataSource={comments}
        columns={columns}
      />
    </>
  );
}
