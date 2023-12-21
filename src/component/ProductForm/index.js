import { Form, Row, Col, Input, Space, Button, Upload } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {  UploadOutlined } from "@ant-design/icons"

export default function ProductForm({
  id = "",
  loading = false,
  initialValues = {},
  onSubmit = () => {},
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  return (
    <div className={"p-[40px] bg-white rounded-[10px]"}>
      <div className={"!text-[#2d2e32] pb-[10px]"}>
        <Link
          to={"/admin/products"}
          className={
            "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
          }
        >
          {"Product Information"}
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
        <Row gutter={20}>
          <Col xs={24} lg={12}>
            <Form.Item
              label={"Tên"}
              name="product_name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Slug"}
              name="product_slug"
              rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Giá"}
              name="product_price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Link"}
              name="product_link"
              rules={[{ required: true, message: "Vui lòng nhập link" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              name="product_link"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            

            <Form.Item label={"Image"} name="product_image">
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"py-[20px] pl-[20px]"}>
          <Space align="center">
            <Button type={"primary"} htmlType={"submit"}>
              {"Create"}
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  );
}
