import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Image, message, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDevice } from "../hooks";
import google from "../component/image/google.png"
import image_mk4 from "../component/image/mk4.jpg";
import logo from "../component/image/logo.png";
import icon_1 from "../component/image/icon/icon_1.svg";
import icon_2 from "../component/image/icon/icon_2.svg";
import icon_3 from "../component/image/icon/icon_3.svg";
import icon_4 from "../component/image/icon/icon_4.svg";
import icon_5 from "../component/image/icon/icon_5.svg";
import { icon } from "@fortawesome/fontawesome-svg-core";

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
        message.error(JSON.stringify(response?.data?.message));
      });
  };

  const handleSendMail = async (email) => {
    setLoadding(true)
    await axios
      .get(`${process.env.REACT_APP_API_URL}/auth/send-mail?email=${email}`)
      .then((res) => {
        message.success(JSON.stringify(res?.data?.message));
        return navigate(`/register/accept?email=${email}`);
      })
      .catch(({ response }) => {
        message.error(JSON.stringify(response?.data?.message));
      }).finally(() => setLoadding(false))
  };

  return (
    <div className="py-[80px]">
      <Row>
        <Col xs={24} xl={8}>
          <div className="flex justify-center px-10 items-center h-full">
            <img src={image_mk4} width={800} height={700}/>
          </div>
          </Col>
          <Col xs={24} xl={6}>
          <div className="flex items-center h-full">
            <div className="w-[350px]">
              <div className="flex items-center pt-5">
                  <img src={icon_1} width={40} height={40}/>
                  <p className="pl-4 font-semibold text-xl">Tin tức nhanh chóng</p>
              </div>
              <div className="flex items-center pt-5">
                  <img src={icon_2} width={40} height={40}/>
                  <p className="pl-4 font-semibold text-xl">Sản phẩm độc quyền</p>
              </div>
              <div className="flex items-center pt-5">
                  <img src={icon_3} width={40} height={40}/>
                  <p className="pl-4 font-semibold text-xl">Tham gia những lớp học đầu tư và những buổi thực chiến</p>
              </div>
            </div>
            <div className="w-[350px] ml-20">
              <div className="flex items-center pt-5">
                  <img src={icon_4} width={40} height={40}/>
                  <p className="pl-4 font-semibold text-xl">Cơ chế hoàn phí</p>
              </div>
              <div className="flex items-center pt-5">
                  <img src={icon_2} width={40} height={40}/>
                  <p className="pl-4 font-semibold text-xl">Cơ hội trở thành Master Trade</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} xl={10}>
          <div className="flex justify-center">
            <div className="w-[500px] border-4 border-cyan-600 rounded-3xl p-10">
              <div className="flex justify-center">
                <img src={logo} width={200}/>
              </div>
              <p className="py-5 font-bold text-2xl text-center">Đăng ký ngay</p>
              <Form
                name="basic"
                layout={"vertical"}
                colon={false}
                form={form}
                onFinish={onSubmit}
              >
                <Form.Item
                  className="font-semibold text-lg"
                  name="fullname"
                  label="Họ và tên"
                  rules={[{ required: true, message: "Enter display name!" }]}
                >
                  <Input
                    className="!rounded-none p-[10px]"
                    size={"large"}
                    placeholder="Họ và tên"
                  />
                </Form.Item>
                <Form.Item
                  className="font-semibold text-lg"
                  label="Email"
                  name="email"
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
                <Form.Item
                  className="font-semibold text-lg"
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: "Enter display name!" }]}
                >
                  <Input
                    className="!rounded-none p-[10px]"
                    size={"large"}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  className="font-semibold text-lg"
                  name="displayName"
                  label="Tên người dùng"
                  rules={[{ required: true, message: "Enter display name!" }]}
                >
                  <Input
                    className="!rounded-none p-[10px]"
                    size={"large"}
                    placeholder="Tên người dùng"
                  />
                </Form.Item>
                <div className="py-5">
                  <Checkbox>Bằng cách đăng ký, bạn đồng ý với <a href="">Chính sách bảo mật</a> của chúng tôi</Checkbox>
                </div>

                <button
                  className="border-2 border-cyan-500 bg-cyan-500 hover:bg-white w-full rounded-2xl py-3 font-semibold text-xl text-white hover:text-cyan-500"
                  size={"large"}
                  htmlType="submit"
                  loading={loadding}
                >
                  <span>Tạo tài khoản</span>
                </button>
                <div className={"mt-[10px]"}>
                  <p className="font-medium">Bạn đã có tài khoản? <a href="">Đăng nhập</a></p>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
 
    </div>
  );
};

export default Register;
