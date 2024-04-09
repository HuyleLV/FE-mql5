import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReportCategoryForm from "../../../../component/ReportCategoryForm";
import axiosInstance from "../../../../utils/axios";

export default function ReportCategoryDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);


  const fetchReport = async () => {
    await axiosInstance.get(`/reportCategory/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createReport = async (values) => {
    await axiosInstance.post(`/reportCategory/create`, values);
  };

  const updateReport = async (id, values) => {
    await axiosInstance.post(`/reportCategory/update/${id}`, values);
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchReport();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values
    };

    try {
      if (id && id !== "create") {
        await updateReport(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createReport(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/report-category");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchReport();
    form.resetFields();
  }, [form, id]);

  return (
    <ReportCategoryForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
