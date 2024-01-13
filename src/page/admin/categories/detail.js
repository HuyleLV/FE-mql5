import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryForm from "../../../component/Category";
import { useCookies } from "react-cookie";

export default function CategoryDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/category/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createCategory = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/category/create`,
      values
    );
  };

  const updateCategory = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/category/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchCategory();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateCategory(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createCategory(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchCategory();
    form.resetFields();
  }, [form, id]);

  return (
    <CategoryForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
