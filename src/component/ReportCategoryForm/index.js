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
  import { ExclamationCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
  
  export default function ReportCategoryForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const deleteReport = async () => {
      await axiosInstance.delete(`/reportCategory/delete/${id}`)
        .then(() => message.success("Xoá danh mục report thành công"))
    };
  
    useEffect(() => {
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeReport= async () => {
      try {
        await deleteReport();
        return navigate("/admin/report-category");
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const confirmDeleteBusiness = () => {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá danh mục report này?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeReport(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/report-category"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin danh mục report"}
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
                name="report_category_title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
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
  