import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import IndicatorNewsForm from "../../../component/IndicatorNewsForm";

export default function IndicatorNewsDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const fetchIndicatorNews = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/indicatorNews/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createIndicatorNews = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/indicatorNews/create`,
      values
    );
  };

  const updateIndicatorNews = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/indicatorNews/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchIndicatorNews();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateIndicatorNews(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createIndicatorNews(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/indicator-news");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchIndicatorNews();
    form.resetFields();
  }, [form, id]);

  return (
    <IndicatorNewsForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
