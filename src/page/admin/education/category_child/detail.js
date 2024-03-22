import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EducationCategoryForm from "../../../../component/EducationCategoryForm";
import EducationCategoryChildForm from "../../../../component/EducationCategoryChildForm";

export default function EducationCategoryChildDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  console.log(id);

  const fetchEducationCategoryChild = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/educationCategoryChild/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createEducationCategoryChild = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/educationCategoryChild/create`,
      values
    );
  };

  const updateEducationCategoryChild = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/educationCategoryChild/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchEducationCategoryChild();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateEducationCategoryChild(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createEducationCategoryChild(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/education-categorychild");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchEducationCategoryChild();
    form.resetFields();
  }, [form, id]);

  return (
    <EducationCategoryChildForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
