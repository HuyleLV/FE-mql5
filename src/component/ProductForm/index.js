import {
  Form,
  Row,
  Col,
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CustomUpload from "../customUpload";

export default function ProductForm({
  id = "",
  initialValues = {},
  onSubmit = () => {},
}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoryChild, setCategoryChild] = useState([]);

  const fetchCategoryChild = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/categoryChild/getAll`
      );
      setCategoryChild(result?.data);
    } catch (e) {
      message.error(e);
    }
  };

  const deleteProduct = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`)
      .then(() => message.success("Xoá sản phẩm thành công"));
  };

  useEffect(() => {
    fetchCategoryChild();
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const removeProduct = async () => {
    try {
      await deleteProduct();
      return navigate("/admin/products");
    } catch (err) {
      console.log(err.message);
    }
  };

  const confirmDeleteBusiness = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá sản phẩm này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeProduct(),
    });
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
          {"Thông tin sản phẩm"}
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
          label={"Slug"}
          name="product_slug"
          rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
        >
          <Input size="large" placeholder={"Nhập"} />
        </Form.Item>

        <Form.Item
          label={"Tên"}
          name="product_name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
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
        <Row gutter={40}>
          <Col xs={24} lg={12}>
            <Form.Item label={"[Danh mục cha] Danh mục con"} name="categoryChild_id">
              <Select
                showSearch
                size="large"
                placeholder="Nhập"
                options={categoryChild?.map((value) => ({
                  value: value.categoryChild_id,
                  label: "["+ value.category_name + "] " + value.categoryChild_name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item label={"Version"} name="product_version">
              <InputNumber
                className="!w-full"
                size="large"
                placeholder={"Nhập"}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col xs={24}>
            <Form.Item name="product_description" label={"Mô tả"}>
              <ReactQuill className="h-[400px] pb-10" theme="snow" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Row gutter={40}>
              <Col xs={20}>
                <Form.Item label={"Link video"} name="link_video">
                  <Input
                    size="large"
                    placeholder={"Nhập"}
                    className={"!w-full"}
                  />
                </Form.Item>
              </Col>
              <Col xs={4}>
                <Form.Item
                  label={<div className={"hidden"}>Link video</div>}
                  name="link_video"
                >
                  <CustomUpload
                    type="file"
                    accept=".mp4"
                    multiple
                    //showUploadList={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24}>
            <Form.Item name="product_image" label={"Ảnh slide"}>
              <CustomUpload
                type="image"
                accept=".png, .jpg, .jpeg, .jfif"
                multiple
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Form.Item
            label={"Link"}
            name="product_link"
            rules={[{ required: true, message: "Vui lòng nhập link" }]}
          >
            <CustomUpload type="file" accept=".exe" />
          </Form.Item>
        </Row>
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
