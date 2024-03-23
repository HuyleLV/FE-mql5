import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ShortForm from "../../../component/ShortForm";

export default function ShortDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchShort = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/short/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createShort = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/short/create`,
      values
    );
  };

  const updateShort = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/short/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchShort();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateShort(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createShort(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/short");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchShort();
    form.resetFields();
  }, [form, id]);

  return (
    <ShortForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
