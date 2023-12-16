import { Form, Row, Col, Input, Space, Button } from "antd";
import { Link } from "react-router-dom";
export default function UserDetail() {
  const [form] = Form.useForm();
  return (
    <div className={"p-[40px] bg-white rounded-[10px]"}>
      <div className={"!text-[#2d2e32] pb-[10px]"}>
        <Link
          to={"/admin/users"}
          className={
            "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
          }
        >
          {"User Information"}
        </Link>
      </div>

      <Form
        layout={"vertical"}
        colon={false}
        form={form}
        //initialValues={initialValues}
        onFinishFailed={(e) => console.log(e)}
        //onFinish={onSubmit}
      >
        <Row gutter={20}>
          <Col xs={24} lg={12}>
            <Form.Item
              label={"Họ và tên"}
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ va tên!" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Số điện thoại"}
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>

            <Form.Item
              label={"Email"}
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input size="large" placeholder={"Nhập"} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={40} className={"py-[20px] pl-[20px]"}>
          <Space align="center">
            <Button type={"primary"} htmlType={"submit"}>
              {"Create"}
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  );
}
