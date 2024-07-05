import {
    Form,
    Row,
    Input,
    Space,
    Button,
    message,
    InputNumber,
    Select,
    Modal,
    Col,
  } from "antd";
  import { Link, useNavigate } from "react-router-dom";
import { plainOptions } from "../../helper";
  
  export default function TradingSystemForm({
    id = "",
    initialValues = {},
    onSubmit = () => {},
  }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    return (
      <div className={"p-[40px] bg-white rounded-[10px]"}>
        <div className={"!text-[#2d2e32] pb-[10px]"}>
          <Link
            to={"/admin/trading-system"}
            className={
              "text-[18px] sm:text-[24px] md:text-[26px] xl:text-[26px] font-[500] cursor-pointer "
            }
          >
            {"Thông tin Trading System"}
          </Link>
        </div>
  
        <Form
          layout={"vertical"}
          colon={false}
          form={form}
          initialValues={initialValues}
          onFinishFailed={(e) => console.log(e)}
          onFinish={onSubmit}
        >
            <Row>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"mt4_acc"}
                        name="mt4_acc"
                        rules={[{ required: true, message: "Vui lòng nhập mt4_acc!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"input_acc"}
                        name="input_acc"
                        rules={[{ required: true, message: "Vui lòng nhập input_acc!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"time_frame"}
                        name="time_frame"
                        rules={[{ required: true, message: "Vui lòng chọn time_frame!" }]}
                    >
                        <Select
                            size="large"
                            placeholder="Select a time frame"
                            optionFilterProp="children"
                            options={[
                                {
                                    label: "M15",
                                    value: "M15"
                                },
                                {
                                    label: "M30",
                                    value: "M30"
                                },
                                {
                                    label: "H1",
                                    value: "H1"
                                },
                                {
                                    label: "H4",
                                    value: "H4"
                                },
                                {
                                    label: "DAILY",
                                    value: "DAILY"
                                }
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"ticket"}
                        name="ticket"
                        rules={[{ required: true, message: "Vui lòng nhập ticket!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"symbol"}
                        name="symbol"
                        rules={[{ required: true, message: "Vui lòng nhập symbol!" }]}
                    >
                        <Select
                            size="large"
                            placeholder="Select a time frame"
                            optionFilterProp="children"
                            options={plainOptions.map((_,i)=>({
                                value: _,
                                label: _,
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"type"}
                        name="type"
                        rules={[{ required: true, message: "Vui lòng chọn type!" }]}
                    >
                        <Select
                            size="large"
                            placeholder="Select a time frame"
                            optionFilterProp="children"
                            options={[
                                {
                                    label: "BUY",
                                    value: "BUY"
                                },
                                {
                                    label: "SELL",
                                    value: "SELL"
                                }
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"price"}
                        name="price"
                        rules={[{ required: true, message: "Vui lòng nhập price!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"sl_show"}
                        name="sl_show"
                        rules={[{ required: true, message: "Vui lòng nhập sl_show!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"tp1"}
                        name="tp1"
                        rules={[{ required: true, message: "Vui lòng nhập tp1!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"tp2"}
                        name="tp2"
                        rules={[{ required: true, message: "Vui lòng nhập tp2!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={8} className="px-2">
                    <Form.Item
                        label={"tp3"}
                        name="tp3"
                        rules={[{ required: true, message: "Vui lòng nhập tp3!" }]}
                    >
                        <Input size="large" placeholder={"Nhập"} />
                    </Form.Item>
                </Col>
            </Row>
  
            <Row gutter={40} className={"my-[40px] pl-[20px]"}>
                <Space align="center">
                <Button type={"primary"} htmlType={"submit"}>
                    {id ? "Cập nhập" : "Tạo"}
                </Button>
                </Space>
            </Row>
        </Form>
      </div>
    );
  }
  