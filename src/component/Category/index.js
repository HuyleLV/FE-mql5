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
  
  export default function CategoryForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const deleteCategory = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/category/delete/${id}`)
        .then(() => message.success("Xoá sản thành công"))
    };
  
    useEffect(() => {
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeCategoryChild = async () => {
      try {
        await deleteCategory();
        return navigate("/admin/categories");
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const confirmDeleteBusiness = () => {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá danh mục con này?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeCategoryChild(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/categories"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin danh mục cha"}
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
            label={"Tên"}
            name="category_name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input size="large" placeholder={"Nhập"} />
          </Form.Item>
  
          <Form.Item label={"Mô tả"} name="category_description">
            <InputNumber className="!w-full" size="large" placeholder={"Nhập"} />
          </Form.Item>
  
          <Form.Item
            name="category_link"
            label={"Link ảnh"}
            rules={[{ required: true, message: "Vui lòng chọn file!" }]}
          >
            <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
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
  