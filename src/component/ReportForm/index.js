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
  import CustomUpload from "../customUpload";
import ReactQuill from "react-quill";
  
  export default function ReportForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const deleteReport = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/report/delete/${id}`)
        .then(() => message.success("Xoá report thành công"))
    };
  
    useEffect(() => {
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeReport= async () => {
      try {
        await deleteReport();
        return navigate("/admin/report");
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const confirmDeleteBusiness = () => {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá report này?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeReport(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/report"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin report"}
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
                name="report_title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Giá tiền"}
                name="report_price"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>
    
            <Form.Item
                name="report_img"
                label={"Upload Image"}
                rules={[{ required: true, message: "Vui lòng chọn file!" }]}
            >
                <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
            </Form.Item>
    
            <Form.Item
                name="report_pdf"
                label={"Upload PDF"}
                rules={[{ required: true, message: "Vui lòng chọn file!" }]}
            >
                <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
            </Form.Item>

            <Form.Item 
                name="report_description" 
                label={"Nội dung"}
                rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
                <ReactQuill className="h-[400px] pb-10" theme="snow" />
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
  