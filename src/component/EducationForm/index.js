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
  import CustomReactQuill from "../customReactQuill";
  
  export default function EducationForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [educationCategoryChild, setEducationCategoryChild] = useState([]);
    const [editorValue, setEditorValue] = useState('');

    const getAllEducationCategoryChild = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/educationCategoryChild/getAll`, {params: {
            page: 1,
            pageSize: 10,
          }}
        );
        setEducationCategoryChild(result?.data?.data);
      } catch (e) {
        message.error(e);
      }
    };
  
    const deleteEducation = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/education/delete/${id}`)
        .then(() => message.success("Xoá sản thành công"))
    };
  
    useEffect(() => {
      getAllEducationCategoryChild();
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeEducation= async () => {
      try {
        await deleteEducation();
        return navigate("/admin/education");
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
        onOk: () => removeEducation(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/education"}
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
                name="education_title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item label={"Danh mục nhận định"} name="education_categoryChild_id">
                <Select
                    showSearch
                    size="large"
                    placeholder="Select a person"
                    optionFilterProp="children"
                    options={educationCategoryChild?.map((value) => ({
                      value: value.education_categoryChild_id,
                      label: "[" + value.education_category_title + "] " + value.education_categoryChild_title,
                    }))}
                />
            </Form.Item>
    
            <Form.Item
                name="education_image"
                label={"Link ảnh"}
                rules={[{ required: true, message: "Vui lòng chọn file!" }]}
            >
                <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
            </Form.Item>

            <Form.Item 
                name="education_description" 
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
  