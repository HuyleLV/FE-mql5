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
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CustomUpload from "../customUpload";
import CustomReactQuill from "../customReactQuill";
  
export default function IdentifyForm({
  id = "",
  initialValues = {},
  onSubmit = () => {},
}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [identifyCategory, setIdentifyCategory] = useState([]);
  const [editorValue, setEditorValue] = useState('');

  const getAllIdentifyCategory = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/identifyCategory/getAllIdentifyCategory`, {params: {
          page: 1,
          pageSize: 10,
        }}
      );
      setIdentifyCategory(result?.data?.data);
    } catch (e) {
      message.error(e);
    }
  };

  const deleteIdentify = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/identify/delete/${id}`)
      .then(() => message.success("Xoá sản thành công"))
  };

  useEffect(() => {
    getAllIdentifyCategory();
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const removeIdentify= async () => {
    try {
      await deleteIdentify();
      return navigate("/admin/identify");
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
      onOk: () => removeIdentify(),
    });
  };
  return (
    <div className={"p-[40px] bg-white rounded-[10px]"}>
      <div className={"!text-[#2d2e32] pb-[10px]"}>
        <Link
          to={"/admin/identify"}
          className={
            "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
          }
        >
          {"Thông tin nhận định"}
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
            name="identify_title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
              <Input size="large" placeholder={"Nhập"} />
          </Form.Item>

          <Form.Item label={"Danh mục nhận định"} name="identify_category_id">
              <Select
                  showSearch
                  size="large"
                  placeholder="Select a person"
                  optionFilterProp="children"
                  options={identifyCategory?.map((value) => ({
                    value: value.identify_category_id,
                    label: value.identify_category_title,
                  }))}
              />
          </Form.Item>

          <Form.Item label={"Trang hiển thị"} name="page">
              <Select
                  showSearch
                  size="large"
                  placeholder="Select a person"
                  optionFilterProp="children"
                  options={[
                    {
                      label: "Nhận định",
                      value: 1
                    },
                    {
                      label: "Tin tức",
                      value: 2
                    }
                  ]}
              />
          </Form.Item>
  
          <Form.Item
              name="identify_image"
              label={"Link ảnh"}
              rules={[{ required: true, message: "Vui lòng chọn file!" }]}
          >
              <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
          </Form.Item>

          <Form.Item 
              name="identify_description" 
              label={"Nội dung"}
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <CustomReactQuill value={editorValue} onChange={(e)=> setEditorValue(e)} />
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
  