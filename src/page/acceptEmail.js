import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Image, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useCookies } from "react-cookie";

const AcceptEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const [form] = Form.useForm();
  const [cookies ,setCookie] = useCookies(['user']);

   useEffect(() => {
      if (Object.keys(queryParams)?.length > 0) {
        form.resetFields();
      }
    }, [form, queryParams]);

  const onSubmit = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, values)
      .then(async ({ data }) => {
        setCookie('user', data.data[0]);
        return navigate(`/`);   
      })
      .catch(({ response }) => {
        message.error(response?.data?.message);
      });
  }

  return (
    <div className="m-[60px]">
      <Row justify={"center"}>
        <Col lg={24} xs={24} align={"middle"} className="mb-[20px]">
          <div className="bg-[#f5f8fd] p-[20px]" style={{ maxWidth: 480 }}>
            <Row gutter={20}>
              <Col xs={4}>
                <Image
                  preview={false}
                  src="https://c.mql5.com/i/auth/mail.png"
                  width="52"
                  height="50"
                />
              </Col>
              <Col xs={20}>
                <div className="text-[18px] text-justify">
                 <div> The password has been sent to</div>
                 <span className={'text-[#3c77bd]'}>{queryParams?.email}</span>
                </div>
               
                <div className="text-[18px] text-justify">
                  Log in using the obtained password and the login specified
                  during the registration
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={14} xs={22} style={{ maxWidth: 380 }}>
          <Form
            name="basic"
            layout={"vertical"}
            form={form}
            colon={false}
            initialValues={queryParams}
            onFinish={onSubmit}
          >
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
            <Button
                className="bg-blue-500 text-white"
                style={{
                  background: "#43b344",
                  width: "100%",
                  height: 50,
                  borderRadius: 0,
                  marginTop: 10,
                }}
                htmlType="submit"
                size={"large"}
              >
                <span className="text-white font-semibold text-[18px]">
                  Activte account
                </span>
              </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AcceptEmail;
