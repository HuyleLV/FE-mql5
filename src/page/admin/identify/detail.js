import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import IdentifyForm from "../../../component/IdentifyForm";

export default function IdentifyDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchIdentify = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/identify/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createIdentify = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/identify/create`,
      values
    );
  };

  const updateIdentify = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/identify/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchIdentify();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateIdentify(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createIdentify(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/identify");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchIdentify();
    form.resetFields();
  }, [form, id]);

  return (
    <IdentifyForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
