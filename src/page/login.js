import React from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const loginUser = async () => {
    const value = {
        email: email,
        password: password
    };

    console.log(value);
    await axios
        .post(`${process.env.REACT_APP_API_URL}/user/login`, value)
        .then((res) => {
            setCookie("user", res?.data[0]);
            message.success("Đăng nhập thành công!");
            navigate("/");
        })
        .catch(() => message.error("Tài khoản hoặc mật khẩu không đúng!"));
  };


  return (
    <div className="py-[100px]">
      <div className="mb-[10px]">
        <div className="pt-[20px] text-[40px] text-[var(--red)] flex justify-center">
          Sign in
        </div>
        <div className="text-[24px] flex justify-center">
          and access all MetaTrader 4 and MetaTrader 5 services{" "}
        </div>
        <div className="flex justify-center">
          If you do not have an account, please &nbsp;
          <Link to="/register" className="text-[var(--blue)] underline">
            register
          </Link>
        </div>
      </div>
      <Row justify={"center"} align={"middle"} style={{ height: "300px" }}>
        <Col lg={14} xs={22} style={{ maxWidth: 380 }}>
          <Form form={form} name="basic" layout={"vertical"} colon={false}>
            <Form.Item name="email">
              <Input
                className="!rounded-none p-[10px]"
                size={"large"}
                placeholder="Login"
              />
            </Form.Item>
            <Form.Item name="password" className="mt-[-6px]">
              <Input.Password
                className="!rounded-none p-[10px]"
                size={"large"}
                placeholder="Password"
              />
            </Form.Item>
            <div className="text-[#42639c] mt-[-12px] mb-[10px]">
              <Link href="#">Forgot your login/password?</Link>
            </div>
            <Button
              style={{
                background: "var(--yellow)",
                width: "100%",
                height: 50,
                borderRadius: 0,
                marginTop: 10,
              }}
              size={"large"}
              htmlType="submit"
              onClick={loginUser}
            >
              <span>Login</span>
            </Button>

            <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
              <Button
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 0,
                  marginTop: 10,
                }}
                size={"large"}
              >
                <span>Log in With Google</span>
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
