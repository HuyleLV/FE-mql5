import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Image, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDevice } from "../hooks";
import google from "../component/image/google.png"

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadding, setLoadding] = useState(false)
  const { isMobile } = useDevice();

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      photos: "https://cdn-icons-png.flaticon.com/512/848/848006.png",
      role: 1
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/create`, submitValues)
      .then(async (res) => {
        await handleSendMail(values?.email);
      })
      .catch(({ response }) => {
        message.error(response?.data?.message);
      });
  };
  const handleSendMail = async (email) => {
    setLoadding(true)
    await axios
      .get(`${process.env.REACT_APP_API_URL}/auth/send-mail?email=${email}`)
      .then((res) => {
        message.success(res?.data?.message);
        return navigate(`/register/accept?email=${email}`);
      })
      .catch(({ response }) => {
        message.error(response?.data?.message);
      }).finally(() => setLoadding(false))
  };

  return (
    <div className={"bg-[#f5f8fd]"}>
      {isMobile ? 
          <Row className="pb-[100px] pt-[50px] bg-[#f5f8fd]" justify={"center"} align={"middle"}>
            <div>
              <div className="text-[40px] text-[var(--red)] flex justify-center">
                Sign up
              </div>
              <div className="text-[24px] pb-6 flex justify-center text-center">
                and access all services{" "}
              </div>
            </div>
            <Col lg={14} xs={22} style={{ maxWidth: 380 }}>
            <Form
                name="basic"
                layout={"vertical"}
                colon={false}
                form={form}
                onFinish={onSubmit}
                style={{ maxWidth: 380 }} >
                <Form.Item
                  name="displayName"
                  rules={[{ required: true, message: "Enter display name!" }]}
                >
                  <Input
                    className="!rounded-none p-[10px]"
                    size={"large"}
                    placeholder="Display name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  className="mt-[-6px]"
                  rules={[
                    { required: true, message: "Enter a valid email address!" },
                  ]}
                >
                  <Input
                    className="!rounded-none p-[10px]"
                    size={"large"}
                    placeholder="Your email"
                  />
                </Form.Item>
                <Button
                  style={{
                    background: "var(--yellow)",
                    width: "100%",
                    borderRadius: 0,
                    height: 50,
                  }}
                  size={"large"}
                  htmlType="submit"
                  loading={loadding}
                >
                  <span className="font-semibold text-lg">Register</span>
                </Button>
                <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                  <Button
                    style={{
                      width: "100%",
                      height: 50,
                      borderRadius: 0,
                      marginTop: 10,
                      backgroundColor: "rgb(241 245 249)"
                    }}
                    size={"large"}
                  >
                    <p className="flex justify-center w-full">
                      <img src={google} className="w-7 h-7 mr-4"/>
                      <span className="font-semibold text-lg text-[#696969]">Log in With Google</span>
                    </p>
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        :
          <Row gutter={40} className={"p-[40px]"}>
            <Col xs={12} lg={12} justify={"center"} align={"middle"}>
              <div
                className="text-[24px] flex justify-center mb-[10px]"
                style={{ maxWidth: 580 }}
              >
                Register to unlock all the MetaTrader 4/5 features and take your
                trading to a whole new level
              </div>
              <Form
                name="basic"
                layout={"vertical"}
                colon={false}
                form={form}
                onFinish={onSubmit}
                style={{ maxWidth: 380 }}
              >
                <Row gutter={10}>
                  <Col xs={12} lg={12}>
                    <Form.Item
                      name="displayName"
                      rules={[{ required: true, message: "Enter display name!" }]}
                    >
                      <Input
                        className="!rounded-none p-[10px]"
                        size={"large"}
                        placeholder="Display name"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={12}>
                    <Form.Item
                      name="email"
                      className="mt-[-6px]"
                      rules={[
                        { required: true, message: "Enter a valid email address!" },
                      ]}
                    >
                      <Input
                        className="!rounded-none p-[10px]"
                        size={"large"}
                        placeholder="Your email"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  style={{
                    background: "var(--yellow)",
                    width: "100%",
                    borderRadius: 0,
                  }}
                  size={"large"}
                  htmlType="submit"
                  loading={loadding}
                >
                  <span>Register</span>
                </Button>

                <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                  <Button
                    className="bg-blue-500 text-white"
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 0,
                      marginTop: 10,
                    }}
                    loading={loadding}
                  >
                    <span>Log in With Google</span>
                  </Button>
                </Link>
                <div className={"mt-[10px]"}>
                  By registering on MQL5.com, you agree to the{" "}
                  <a target="_blank" href="/en/about/privacy">
                    website policy
                  </a>{" "}
                  and{" "}
                  <a target="_blank" href="/en/about/terms">
                    terms of use
                  </a>
                </div>
              </Form>
            </Col>
            <Col xs={12} lg={12}>
              <Image
                preview={false}
                height={"90%"}
                src="https://c.mql5.com/i/auth/mt/register_2x.png"
              />
            </Col>
          </Row>
      }
 
    </div>
  );
};

export default Register;
