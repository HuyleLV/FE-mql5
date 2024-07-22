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
  
  export default function EducationCategoryChildForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [educationCategory, setEducationCategory] = useState([]);

    const getAllEducationCategory = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/educationCategory/getAll`, {params: {
            page: 1,
            pageSize: 10,
          }}
        );
        setEducationCategory(result?.data?.data);
      } catch (e) {
        message.error(e);
      }
    };
  
    const deleteEducationCategoryChild = async () => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/educationCategoryChild/delete/${id}`)
        .then(() => message.success("Xoá sản thành công"))
    };
  
    useEffect(() => {
        getAllEducationCategory();
      if (Object.keys(initialValues)?.length > 0) {
        form.resetFields();
      }
    }, [form, initialValues]);
  
    const removeEducationCategoryChild= async () => {
      try {
        await deleteEducationCategoryChild();
        return navigate("/admin/education-categorychild");
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
        onOk: () => removeEducationCategoryChild(),
      });
    };
    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/education-categorychild"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin danh mục con education"}
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
                name="education_categoryChild_title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
                <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item label={"Danh mục nhận định"} name="education_category_id">
              <Select
                showSearch
                size="large"
                placeholder="Select a person"
                optionFilterProp="children"
                options={educationCategory?.map((value) => ({
                  value: value.education_category_id,
                  label: value.education_category_title,
                }))}
              />
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
  