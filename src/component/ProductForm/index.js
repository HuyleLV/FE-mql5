import { Form, Row, Col, Input, Space, Button, Upload, message, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

export default function ProductForm({
  id = "",
  initialValues = {},
  onSubmit = () => {},
}) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const uploadFile = async (file) => {
    setUploading(true);
    try {
      const uploadForm = new FormData();
      uploadForm.append("product_link", file);
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload/file`,
        uploadForm
      );
      const url = `${process.env.REACT_APP_API_URL}${result?.data}`;

      return url;
    } catch (e) {
      message.error(e);
    } finally {
      setUploading(false);
    }
  };

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
              <InputNumber className="!w-full" size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Version"}
              name="product_version"
            >
              <InputNumber className="!w-full" size="large" placeholder={"Nhập"} />
            </Form.Item>
            
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={20}>
              <Col xs={24} lg={20}>
                <Form.Item label={"Image"} name="product_image">
                  <Input size="large" placeholder={"Nhập"} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item label={<div className="hidden">upload</div>}>
                  <Upload
                    action={false}
                    accept='.png, .jpg, .jpeg, .jfif'
                    beforeUpload={async (file) => {
                      const url = await uploadFile(file);
                      form.setFieldValue("product_image", url);
                    }}
                    showUploadList={false}
                  >
                    <Button
                      size="middle"
                      icon={<UploadOutlined />}
                      loading={uploading}
                    >
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} lg={20}>
                <Form.Item
                  label={"Link"}
                  name="product_link"
                  rules={[{ required: true, message: "Vui lòng nhập link" }]}
                >
                  <Input size="large" placeholder={"Nhập"} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item label={<div className="hidden">upload</div>}>
                  <Upload
                    accept='.exe'
                    beforeUpload={async (file) => {
                      const url = await uploadFile(file);
                      form.setFieldValue("product_link", url);
                    }}
                    showUploadList={false}
                  >
                    <Button
                      size="middle"
                      icon={<UploadOutlined />}
                      loading={uploading}
                    >
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Mô tả" name={"product_description"}>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"py-[20px] pl-[20px]"}>
          <Space align="center">
            <Button type={"primary"} htmlType={"submit"}>
              {id ? "Update" : "Create"}
            </Button>
            {id && (
              <Button type={"primary"} danger>
                Delete
              </Button>
            )}
          </Space>
        </Row>
      </Form>
    </div>
  );
}
