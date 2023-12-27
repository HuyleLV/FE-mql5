import { Form, Row, Col, Input, Space, Button, message } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../component/UserForm";
import axios from "axios";
import { useEffect } from "react";
export default function UserDetail() {
  const [form] = Form.useForm();
  const params = useParams();
  const user_id = params?.user_id;
  const navigate = useNavigate();

  const createUser = async (values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/user/create`,
      values
    );
  };

  const updateUser = async (user_id, values) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/category/update/${user_id}`,
      values
    );
  };

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
    };

    try {
      if (user_id && user_id !== "create") {
        // await updateCategory(id, submitValues);
        // message.success("Cập nhập thành công");
      } else {
        await createUser(submitValues);
        message.success("Tạo mới thành công");
        navigate("/admin/users");
      }
    } catch (error) {
      if(error){
        message.error("Email đã tồn tại");
      }
    }
  };

  useEffect(() => {

  }, [user_id]);
  return (
    <div className={"p-[40px] bg-white rounded-[10px]"}>
      <UserForm
        id={user_id !== "create" ? user_id : undefined}
        onSubmit={onSubmit}
      />
    </div>
  );
}
