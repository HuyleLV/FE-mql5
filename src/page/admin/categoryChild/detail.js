import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryChildForm from "../../../component/CategoryChildForm";
import { useCookies } from "react-cookie";

export default function CategoryChilDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchCategoryChild = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/categoryChild/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        }
        setInitialValues(values);
      });
  };

  const createCategoryChild= async (values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/categoryChild/create`, values);
  };

  const updateCategoryChild = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/categoryChild/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
        fetchCategoryChild();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateCategoryChild(id, submitValues);
        message.success('Cập nhập thành công')
      } else {
        await createCategoryChild(submitValues);
        message.success('Tạo mới thành công')
      }
      navigate("/admin/categoryChild");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchCategoryChild();
    form.resetFields();
  }, [form, id]);

  return (
    <CategoryChildForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
