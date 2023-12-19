import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="mb-[10px]">
        <div className="pt-[20px] text-[40px] text-[var(--red)] flex justify-center">
          Sing in
        </div>
        <div className="text-[24px] flex justify-center">
          and access all MetaTrader 4 and MetaTrader 5 services{" "}
        </div>
        <div className="flex justify-center">
          If you do not have an account, please &nbsp;
          <Link href="#" className="text-[var(--blue)] underline">
            register
          </Link>
        </div>
      </div>
      <Row justify={"center"} align={"middle"} style={{ height: "300px" }}>
        <Col lg={14} xs={22} style={{ maxWidth: 380 }}>
          <Form name="basic" layout={"vertical"} colon={false}>
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
            <div className="text-[#42639c] mt-[-12px] mb-[10px]">
              <Link href="#">Forgot your login/password?</Link>
            </div>

            <Form.Item>
              <Button
                className="!rounded-none !w-full !h-[50px] bg-[var(--yellow)]"
                size={"large"}
                htmlType="submit"
              >
                <span>Login</span>
              </Button>

              <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                <Button
                  className="!rounded-none !w-full !h-[50px] bg-[var(--content)] mt-[20px] before:bg-[var(--yellow)]"
                  size={"large"}
                >
                  <span>Log in With Google</span>
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
