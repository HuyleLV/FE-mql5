import { Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductForm } from "../../../component";
import { parseSafe } from "../../../helper";

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
        const data = res?.data[0];
        const values = {
          ...data,
          product_image: data?.product_image
            ? parseSafe(data?.product_image)
            : undefined,
        };
        setInitialValues(values);
      });
  };

  const createProduct = async (values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, values);
  };

  const updateProduct = async (id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/product/update/${id}`,
      values
    );
  };

  useEffect(() => {
    if (id && id !== "create") {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (values) => {
    const imageLength = values?.product_image?.length < 4;
    if (imageLength)
      return message.warning("Ảnh slide phải có tối thiểu 4 ảnh!");

    const submitValues = {
      ...values,
      product_image: JSON.stringify(values?.product_image),
    };

    try {
      if (id && id !== "create") {
        await updateProduct(id, submitValues);
        message.success("Cập nhập thành công");
      } else {
        await createProduct(submitValues);
        message.success("Tạo mới thành công");
      }
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);

  return (
    <ProductForm
      id={id !== "create" ? id : undefined}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}
