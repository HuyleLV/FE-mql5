import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReportForm from "../../../component/ReportForm";

export default function ReportDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchReport = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/report/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createReport = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/report/create`,
      values
    );
  };

  const updateReport = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/report/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchReport();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      create_by: cookies.admin?.user_id
    };

    try {
      if (id && id !== "create") {
        await updateReport(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createReport(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/report");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchReport();
    form.resetFields();
  }, [form, id]);

  return (
    <ReportForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
