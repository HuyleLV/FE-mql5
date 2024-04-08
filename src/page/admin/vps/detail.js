import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import VpsForm from "../../../component/VpsForm";
import axiosInstance from "../../../utils/axios";

export default function VpsDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;

  const fetchVps = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/vps/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data[0];
        const values = {
          ...data,
        };
        setInitialValues(values);
      });
  };

  const createVps = async (values) => {
    await axiosInstance.post(`/vps/create`, values);
  };

  const updateVps = async (id, values) => {
    await axiosInstance.post(`/vps/update/${id}`, values);
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchVps();
    }
  }, [id]);

  const onSubmit = async (values) => {
    const submitValues = {
      ...values
    };

    try {
      if (id && id !== "create") {
        await updateVps(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createVps(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/vps");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && id !== "create") fetchVps();
    form.resetFields();
  }, [form, id]);

  return (
    <VpsForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
