import {
    Form,
    Row,
    Input,
    Space,
    Button,
    message,
    InputNumber,
    Select,
    Modal,
  } from "antd";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ExclamationCircleOutlined } from "@ant-design/icons";
  
  export default function NotificationForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [user, setUser] = useState([]);

    const getAllUser = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/getAll`, {params: {
            page: 1,
            pageSize: 10,
          }}
        );
        setUser(result?.data?.data);
      } catch (e) {
        message.error(e);
      }
    };
  
    const deleteNotification = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/notification/delete/${id}`)
        .then(() => message.success("Xoá notification thành công"))
    };
  
    useEffect(() => {
        getAllUser();
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeNotification= async () => {
      try {
        await deleteNotification();
        return navigate("/admin/notification");
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const confirmDeleteBusiness = () => {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá notification này?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeNotification(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/notification"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin Notification"}
          </Link>
        </div>
  
        <Form
          layout={"vertical"}
          colon={false}
          form={form}
          initialValues={initialValues}
          onFinishFailed={(e) => console.log(e)}
          onFinish={onSubmit}
        >
            <Form.Item
                label={"Tiêu đề"}
                name="notification_title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Nội dung"}
                name="notification_description"
                rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Gửi đến"}
                name="notification_user"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
            >
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: "ALL",
                            label: "Gửi tất cả",
                        },
                        {
                            value: "MASTER",
                            label: "Gửi master",
                        },
                        ...user?.map((value) => ({
                            value: value.user_id,
                            label: value.email,
                        }))
                    ]}
                />
            </Form.Item>
  
          <Row gutter={40} className={"my-[40px] pl-[20px]"}>
            <Space align="center">
              <Button type={"primary"} htmlType={"submit"}>
                {id ? "Cập nhập" : "Tạo"}
              </Button>
              {id && (
                <Button type={"primary"} danger onClick={confirmDeleteBusiness}>
                  Xoá
                </Button>
              )}
            </Space>
          </Row>
        </Form>
      </div>
    );
  }
  