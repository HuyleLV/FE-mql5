import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

export default function LoginAdmin() {
    const [form] = Form.useForm();
    const username = Form.useWatch('username', form);

    console.log(username);

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
                    <Form.Item name="username">
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

                    <Form.Item>
                    <Button
                        className="!rounded-none !w-full !h-[50px] bg-[var(--yellow)]"
                        size={"large"}
                        htmlType="submit"
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