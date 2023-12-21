import { Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductForm } from "../../../component";

export default function ProductsDetail() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const id = params?.id;

  const fetchProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/getById/${params?.id}`)
      .then((res) => {
        const data = res?.data;
        setInitialValues(...data);
      });
  };

  const createProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/create`)
      .then((res) => {
        const data = res?.data;
        setInitialValues(...data);
      });
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values) => {
    // const hideMessage = message.loading('')
    // setLoading(true)
    // const valuesSubmit = {
    //   ...values,
    //   type: +values?.type,
    //   fields: JSON.stringify(values?.fields),
    // }
    // try {
    //   if (id && id !== 'create') {
    //     await updateFormApi(id, valuesSubmit)
    //     message.success('Update successful!')
    //   } else {
    //     await createFormApi(valuesSubmit)
    //     message.success('Create new successful!')
    //   }
    // //   return router.back()
    // } catch (e) {
    //   console.log(e.message)
    // } finally {
    //   hideMessage()
    //   setLoading(false)
    // }
  };

  useEffect(() => {
    if (params?.id) fetchProduct();
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, params?.id]);
  return (
    <ProductForm
      id={params?.id}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}
