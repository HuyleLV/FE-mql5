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
    Rate,
    DatePicker,
  } from "antd";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ExclamationCircleOutlined } from "@ant-design/icons";
import CustomUpload from "../customUpload";
import dayjsInstance from "../../utils/dayjs";
  
  export default function IndicatorNewsForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const deleteIndicatorNews = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/indicatorNews/delete/${id}`)
        .then(() => message.success("Xoá link thành công"))
    };
  
    useEffect(() => {
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeIndicatorNews= async () => {
      try {
        await deleteIndicatorNews();
        return navigate("/admin/indicator-news");
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
        onOk: () => removeIndicatorNews(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/IndicatorNews"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin IndicatorNews"}
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
                label={"Tên chỉ báo"}
                name="indicator_news_title"
                rules={[{ required: true, message: "Vui lòng nhập tên chỉ báo!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Ngày tạo"}
                name="create_at"
                rules={[{ required: true, message: "Vui lòng nhập tên ngày tạo!" }]}
                getValueProps={(e) => ({
                  value: e ? dayjsInstance(e) : "",
                })}
            >
              
              <DatePicker 
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
                label={"IMP."}
                name="indicator_news_imp"
                rules={[{ required: true, message: "Vui lòng nhập IMP!" }]}
            >
                <Rate />
            </Form.Item>

            <Form.Item
                label={"Thực tế"}
                name="indicator_news_real"
                rules={[{ required: true, message: "Vui lòng nhập thực tế!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Dự báo"}
                name="indicator_news_forecast"
                rules={[{ required: true, message: "Vui lòng nhập dự báo!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
                label={"Trước đó"}
                name="indicator_news_before"
                rules={[{ required: true, message: "Vui lòng nhập trước đó!" }]}
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
  