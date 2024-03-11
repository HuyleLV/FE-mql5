import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EducationForm from "../../../component/EducationForm";

export default function EducationDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchEducation = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/education/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createEducation = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/education/create`,
      values
    );
  };

  const updateEducation = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/education/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchEducation();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateEducation(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createEducation(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/education");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchEducation();
    form.resetFields();
  }, [form, id]);

  return (
    <EducationForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
