import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EducationCategoryForm from "../../../../component/EducationCategoryForm";

export default function EducationCategoryDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchEducationCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/educationCategory/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createEducationCategory = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/educationCategory/create`,
      values
    );
  };

  const updateEducationCategory = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/educationCategory/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchEducationCategory();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateEducationCategory(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createEducationCategory(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/education-category");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchEducationCategory();
    form.resetFields();
  }, [form, id]);

  return (
    <EducationCategoryForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
