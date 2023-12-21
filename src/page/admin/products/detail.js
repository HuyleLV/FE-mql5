import { Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductForm } from "../../../component";

export default function ProductsDetail() {
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

//   const createProduct = async () => {
//     await axios
//       .get(`${process.env.REACT_APP_API_URL}/product/create`)
//       .then((res) => {
//         const data = res?.data;
//         setInitialValues(...data);
//       });
//   };

  useEffect(() => {
    if (id && id !== "create") {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values) => {
  };

  useEffect(() => {
    if (id) fetchProduct();
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);

  return (
    <ProductForm
      id={id !== 'create' ? id : undefined}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}
