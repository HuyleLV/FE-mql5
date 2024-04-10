import {
    Form,
    Row,
    Input,
    Space,
    Button,
    message,
    Modal,
    Col,
  } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
import CustomReactQuill from "../customReactQuill";
  
export default function VpsForm({
  id = "",
  initialValues = {},
  onSubmit = () => {},
}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editorValue, setEditorValue] = useState('');

  const deleteVps = async () => {
    await axiosInstance.delete(`/vps/delete/${id}`)
      .then(() => message.success("Xoá vps thành công"))
  };

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const removeVps= async () => {
    try {
      await deleteVps();
      return navigate("/admin/vps");
    } catch (err) {
      console.log(err.message);
    }
  };

  const confirmDeleteBusiness = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xoá vps này?",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => removeVps(),
    });
  };
  return (
    <div className={"p-[40px] bg-white rounded-[10px]"}>
      <div className={"!text-[#2d2e32] pb-[10px]"}>
        <Link
          to={"/admin/vps"}
          className={
            "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
          }
        >
          {"Thông tin vps"}
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
          <Row>
              <Col xs={24} xl={12} className="pr-5">
                  <Form.Item
                      label={"IP"}
                      name="vps_ip"
                      rules={[{ required: true, message: "Vui lòng nhập IP!" }]}
                  >
                      <Input size="large" placeholder={"Nhập"} />
                  </Form.Item>
              </Col>
              <Col xs={24} xl={12} className="pl-5">
                  <Form.Item
                      label={"Username"}
                      name="vps_username"
                      rules={[{ required: true, message: "Vui lòng nhập Username!" }]}
                  >
                      <Input size="large" placeholder={"Nhập"} />
                  </Form.Item>
              </Col>
              <Col xs={24} xl={12} className="pr-5">
                  <Form.Item
                      label={"Password"}
                      name="vps_password"
                      rules={[{ required: true, message: "Vui lòng nhập Password!" }]}
                  >
                      <Input size="large" placeholder={"Nhập"} />
                  </Form.Item>
              </Col>
              <Col xs={24} xl={12} className="pl-5">
                  <Form.Item
                      label={"Giá tiền"}
                      name="vps_price"
                      rules={[{ required: true, message: "Vui lòng nhập Giá tiền!" }]}
                  >
                      <Input size="large" placeholder={"Nhập"} />
                  </Form.Item>
              </Col>
              <Col xs={24} xl={12} className="pr-5">
                  <Form.Item
                      label={"Người dùng vps"}
                      name="user_id"
                  >
                      <Input size="large" placeholder={"Nhập"} />
                  </Form.Item>
              </Col>
          </Row>

          <Form.Item 
              name="vps_description" 
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
  