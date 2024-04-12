import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Image, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useCookies } from "react-cookie";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cookies ,setCookie] = useCookies(['user']);

   useEffect(() => {

    }, [form]);

  const onSubmit = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/forgotPassword`, values)
      .then(async ({ data }) => {
        console.log(data);
        message.success(String(data?.message));
        navigate(`/login`);   
      })
      .catch(({ response }) => {
        message.error(String(response?.data?.message));
      });
  }

  return (
    <div className="mt-[100px] mb-[200px]">
      <Row justify={"center"}>
        <p className="py-10 font-bold text-4xl">Quên mật khẩu</p>
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
                    <div>Vui lòng điền lại email của bạn</div>
                </div>
               
                <div className="text-[18px] text-justify">
                  Mật khẩu sẽ được chúng tôi gửi về lại email đó của bạn. Xin cảm ơn!
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
                onFinish={onSubmit}
            >
                <Form.Item label="Email" name="email">
                    <Input
                        className="!rounded-none p-[10px]"
                        size={"large"}
                        placeholder="Email"
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
                        Xác nhận
                    </span>
                </Button>
            </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
