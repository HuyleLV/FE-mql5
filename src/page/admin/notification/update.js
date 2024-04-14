import {
    Form,
    Row,
    Input,
    Space,
    Button,
    message,
    Modal,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import { ExclamationCircleOutlined } from "@ant-design/icons";
  import CustomReactQuill from "../../../component/customReactQuill";
    
  export default function NotificationUpdate() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [editorValue, setEditorValue] = useState('');  
    const [initialValues, setInitialValues] = useState({});
    const params = useParams();
    const id = params?.id;
  
  
    const fetchNotification = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/notification/getByIdUser/${id}`)
        .then((res) => {
          const data = res?.data[0];
          const values = {
            ...data,
          };
          setInitialValues(values);
        });
    };
  
    const deleteNotification = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/notification/delete/${id}`)
        .then(() => message.success("Xoá thông báo thành công"))
    };

    const onSubmit = async (values) => {
        try {

            await axios.post(
                `${process.env.REACT_APP_API_URL}/notification/update/${id}`,
                values
              );
            message.success("Cập nhập thành công");

            navigate("/admin/notification");
        } catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        if (Object.keys(initialValues)?.length > 0) {
            form.resetFields();
        }
    }, [initialValues]);

      
    useEffect(() => {
        fetchNotification();
    }, []);
  
    const removeNotification= async () => {
      try {
        await deleteNotification();
        return navigate("/admin/notification");
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
        onOk: () => removeNotification(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/notification"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin thông báo"}
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
              name="notification_title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>
  
            <Form.Item 
                name="notification_description" 
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
    