import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NotificationForm from "../../../component/NotificationForm";

export default function NotificationDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchNotification = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/notification/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createNotification = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/notification/create`,
      values
    );
  };

  const updateNotification = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/notification/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchNotification();
    }
  }, [id]);

  const onSubmit = async (values) => {

    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateNotification(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createNotification(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/notification");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchNotification();
    form.resetFields();
  }, [form, id]);

  return (
    <NotificationForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
