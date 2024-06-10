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
    
  export default function EconomicNewsForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [editorValue, setEditorValue] = useState('');
  
    const deleteEconomicNews = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/economicNews/delete/${id}`)
        .then(() => message.success("Xoá sản thành công"))
    };
  
    useEffect(() => {
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeEconomicNews= async () => {
      try {
        await deleteEconomicNews();
        return navigate("/admin/economic-news");
      } catch (err) {
        console.log(err.message);
      }
    };
  
    const confirmDeleteBusiness = () => {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có chắc chắn xoá?",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk: () => removeEconomicNews(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/economic-news"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin Bản tin tài chính"}
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
              name="economic_news_title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>
    
            <Form.Item
                name="economic_news_image"
                label={"Link ảnh"}
                rules={[{ required: true, message: "Vui lòng chọn file!" }]}
            >
                <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
            </Form.Item>
  
            <Form.Item 
                name="economic_news_description" 
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
    