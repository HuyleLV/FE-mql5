import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TradingSystemForm from "../../../component/TradingSystemForm";
import axiosInstance from "../../../utils/axios";

export default function TradingSystemDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;

  const createTradingSystem = async (values) => {
    await axiosInstance.post(`/tradingSystem/create`, values)
    .then((res) => {
      message.success(String(res?.data?.message));
      navigate("/admin/trading-system");
    })
  };

  const onSubmit = async (values) => {
    const submitValues = {
      ...values
    };

    try {
      if (id && id !== "create") {

      } else {
        await createTradingSystem(submitValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [form, id]);

  return (
    <TradingSystemForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
