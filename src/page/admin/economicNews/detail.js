import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EconomicNewsForm from "../../../component/EconomicNewsForm";

export default function EconomicNewsDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchEconomicNews = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/economicNews/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createEconomicNews = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/economicNews/create`,
      values
    );
  };

  const updateEconomicNews = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/economicNews/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchEconomicNews();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateEconomicNews(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createEconomicNews(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/economic-news");
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [form, id]);

  return (
    <EconomicNewsForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
