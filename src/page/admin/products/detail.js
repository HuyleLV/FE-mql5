import { Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductForm } from "../../../component";
import { useNavigate } from 'react-router-dom';
export default function ProductsDetail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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

  const createProduct = async (values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, values)
  };

  const updateProduct = async (id, values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/product/update/${id}`, values)
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (values) => {
    try {
      if (id && id !== 'create') {
        await updateProduct(id, values)
      } else {
        await createProduct(values)
      }
      navigate('/admin/products')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) fetchProduct();
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);

  return (
    <ProductForm
      id={id !== 'create' ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
