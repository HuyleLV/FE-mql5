import React, { useState } from "react";
import { Form, Input, Button, Image, Row, Col } from "antd";
import { useCookies } from "react-cookie";

export default function ProfilePage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState(false)
  console.log("cookies", cookies.user);
  return (
    <div className="my-[60px]">
      <Row justify={"center"} align={"middle"}>
        <Col
          lg={20}
          xs={24}
          className="p-[20px] border border-[var(--mid-gray)]"
        >
          <Row gutter={20}>
            <Col>
              <Image
                preview={false}
                src={cookies.user?.photos}
                width={120}
                height={120}
              />
            </Col>
            <Col>
              <div className="text-[26px] font-medium">
                {cookies?.user?.displayName}
              </div>
              <div className="text-[18px] font-normal">
                {cookies?.user?.email}
              </div>
            </Col>
          </Row>
          <Form
            className="mt-[10px]"
            layout={"vertical"}
            colon={false}
            form={form}
            onFinishFailed={(e) => console.log(e)}
            //onFinish={onSubmit}
          >
            <Row>
              <Col xs={24} lg={3}>
                <Button onClick={() => setChangePassword(!changePassword)} size="large"> Set password</Button>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="category_name">
                  <Input disabled={!changePassword} size="large" placeholder={"******"} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
