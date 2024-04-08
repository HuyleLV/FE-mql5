import { Button, Col, Form, Input, Radio, Row, Space, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import google from "../component/image/google.png";
import image_mk4 from "../component/image/mk4.jpg";
import logo from "../component/image/logo.png";

const Login = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const navigate = useNavigate();
  const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);
  const [value, setValue] = useState(1);

  const loginUser = async () => {
    const value = {
      email: email,
      password: password,
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, value)
      .then((res) => {
        console.log(res?.data);
        localStorage.setItem('token', res?.data);
        setCookieToken("accessToken", res?.data);
        message.success("Đăng nhập thành công!");
        navigate("/");
      })
      .catch(() => message.error("Tài khoản hoặc mật khẩu không đúng!"));
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {

  }, []);

  return (
    <div className="py-[100px]">
      <Row>
        <Col xs={24} xl={14}>
          <div className="flex justify-center">
            <img src={image_mk4} width={900} height={900}/>
          </div>
        </Col>
        <Col xs={24} xl={10}>
          <div className="flex justify-center">
            <div className="w-[500px] border-4 border-cyan-600 rounded-3xl p-10">
              <div className="flex justify-center">
                <img src={logo} width={200}/>
              </div>
              <p className="py-5 font-bold text-2xl text-center">Đăng nhập tài khoản</p>
              <Form form={form} name="basic" layout={"vertical"} colon={false}>
                <Form.Item name="email">
                  <Input
                    className="!rounded-none"
                    size={"large"}
                    placeholder="Login"
                  />
                </Form.Item>
                <Form.Item name="password">
                  <Input.Password
                    className="!rounded-none"
                    size={"large"}
                    placeholder="Password"
                  />
                </Form.Item>
                <div className="flex justify-end mt-[-8px]">
                  <Link href="#" className="text-cyan-500">Quên mật khẩu?</Link>
                </div>
                <div className="pb-5 pt-2">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio className="font-semibold" value={1}>Đăng nhập thành viên</Radio>
                      <Radio className="font-semibold" value={2}>Đăng nhập khách hàng</Radio>
                    </Space>
                  </Radio.Group>
                </div>
                <button
                  className="border-2 border-cyan-500 bg-cyan-500 hover:bg-white w-full rounded-2xl py-3 font-semibold text-xl text-white hover:text-cyan-500"
                  size={"large"}
                  htmlType="submit"
                  onClick={loginUser}
                >
                  Đăng nhập
                </button>

                <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                  <div className="border-2 border-cyan-500 bg-white hover:bg-cyan-500 w-full rounded-2xl py-3 font-bold text-xl text-cyan-600 hover:text-white mt-5">
                    <p className="flex justify-center w-full">
                      <img src={google} className="w-7 h-7 mr-4" />
                        Log in With Google
                    </p>
                  </div>
                </Link>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
