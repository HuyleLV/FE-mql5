import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import IdentifyForm from "../../../component/IdentifyForm";
import IdentifyCategoryForm from "../../../component/IdentifyCategoryForm";

export default function IdentifyCategoryDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchIdentifyCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/identifyCategory/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createIdentifyCategory = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/identifyCategory/create`,
      values
    );
  };

  const updateIdentifyCategory = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/identifyCategory/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchIdentifyCategory();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateIdentifyCategory(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createIdentifyCategory(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/identify-category");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchIdentifyCategory();
    form.resetFields();
  }, [form, id]);

  return (
    <IdentifyCategoryForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
