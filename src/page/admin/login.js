import React from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginAdmin() {
    const [form] = Form.useForm();
    const email = Form.useWatch('email', form);
    const password = Form.useWatch('password', form);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    
    const loginAd = async () => {
        const value = {
            email: email,
            password: password
        };

        await axios
            .post(`${process.env.REACT_APP_API_URL}/admin/login`, value)
            .then((res) => {
                setCookie("admin", res?.data[0]);
                message.success("Đăng nhập thành công!");
                navigate("/admin");
            })
            .catch(() => message.error("Tài khoản hoặc mật khẩu không đúng!"));
    };

    return (
        <div className="py-20">
            <div className="mb-[10px]">
                <div className="pt-[20px] text-[40px] text-[var(--red)] flex justify-center">
                    Đăng nhập Admin
                </div>
            </div>
            <Row justify={"center"} align={"middle"} style={{ height: "300px" }}>
                <Col lg={14} xs={22} style={{ maxWidth: 380 }}>
                <Form form={form} name="basic" layout={"vertical"} colon={false}>
                    <Form.Item name="email">
                        <Input
                            className="!rounded-none p-[10px]"
                            size={"large"}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item name="password" className="mt-[-6px]">
                        <Input.Password
                            className="!rounded-none p-[10px]"
                            size={"large"}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ background: 'var(--yellow)', width: '100%', height: 50, borderRadius: 0 }}
                            size={"large"}
                            htmlType="submit"
                            onClick={loginAd}
                        >
                            <span>Login</span>
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        </div>
    )
}