import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Image, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadding, setLoadding] = useState(false)

  const onSubmit = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/create`, values)
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
    </div>
  );
};

export default Register;
