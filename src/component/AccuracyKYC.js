import React, { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { Button, Typography, Progress, Select, Option } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";
import { Col, DatePicker, Form, Input, Row, Space } from "antd";
import CustomUpload from "./customUpload";

export default function AccuracyKYC({ handleOpen }) {

    const [form] = Form.useForm();

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [activeStep, setActiveStep] = React.useState(1);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => activeStep >= 1 && activeStep < 4 && !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => activeStep > 1 && activeStep <= 4 && !isFirstStep && setActiveStep((cur) => cur - 1);

    const onSubmit = async (values) => {
        /* code */
    };

    return (
        <div className="w-[1000px] px-24 py-4" style={{ background: '#fff', borderRadius: 10 }}>
            {activeStep === 0 || activeStep === 1 ?
                <div className="w-full pl-20 pr-20 text-center">
                    <p className="py-5 font-bold text-xl text-center">Để có thể nhận thanh toán và nạp rút thuận lợi
                        hãy xác thực tài khoản với chúng tôi tại đây</p>
                </div>
                : <div className="w-full pl-20 pr-20 text-center">
                    <p className="py-5 font-bold text-xl text-center">Chọn loại tài liệu định danh bạn sẽ dùng để xác minh: CMND, Hộ chiếu, Giấy phép lái xe. Chọn “Xác
                        nhận” để hoàn tất quá trình yêu cầu xác thực tài khoản. Net Partner sẽ xác nhận và thông báo cho
                        bạn trong thời gian sớm nhất.</p>
                </div>
            }
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step onClick={() => setActiveStep(0)} style={{ background: activeStep === 0 ? '#1677FF' : "#fff", justifyContent: 'center', alignItems: 'center' }}>
                    {activeStep === 0 ?
                        <Typography
                            variant="h6"
                            color={"white"}
                        >
                            1
                        </Typography>
                        : <div style={{ borderWidth: 3, borderColor: "#1677FF", borderRadius: 100, padding: 4 }}>
                            <FaCheck color="#1677FF" />
                        </div>
                    }
                    <div className="absolute -bottom-[3rem] left-[4.5rem] w-max text-center">
                        <Typography
                            color="black"
                            className="font-semibold"
                        >
                            Xác thực Email
                        </Typography>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(1)} style={{ background: activeStep === 0 ? '#ccc9c9' : activeStep === 1 ? '#1677FF' : "#fff", justifyContent: 'center', alignItems: 'center' }}>
                    {activeStep === 0 || activeStep === 1 ?
                        <Typography
                            variant="h6"
                            color={"white"}
                        >
                            2
                        </Typography>
                        : <div style={{ borderWidth: 3, borderColor: "#1677FF", borderRadius: 100, padding: 4 }}>
                            <FaCheck color="#1677FF" />
                        </div>
                    }
                    <div className="absolute -bottom-[3rem] left-[4.5rem] w-max text-center">
                        <Typography
                            color="black"
                            className="font-semibold"
                        >
                            Xác thực thông tin
                        </Typography>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(2)} style={{ background: activeStep === 0 || activeStep === 1 ? "#ccc9c9" : activeStep === 2 ? '#1677FF' : "#fff", justifyContent: 'center', alignItems: 'center' }}>
                    {activeStep === 0 || activeStep === 1 || activeStep === 2 ?
                        <Typography
                            variant="h6"
                            color={"white"}
                        >
                            3
                        </Typography>
                        : <div style={{ borderWidth: 3, borderColor: "#1677FF", borderRadius: 100, padding: 4 }}>
                            <FaCheck color="#1677FF" />
                        </div>
                    }
                    <div className="absolute -bottom-[3rem] left-[4.5rem] w-max text-center">
                        <Typography
                            color="black"
                            className="font-semibold "
                        >
                            Xác thực tài liệu
                        </Typography>
                    </div>
                </Step>
            </Stepper>
            {activeStep === 1 &&
                <>
                    <Row className="w-full pt-10 pl-20 pr-20 mt-10 justify-center">
                        <Col xs={24} xl={10} style={{ marginRight: 20 }}>
                            <Form
                                name="basic"
                                layout={"vertical"}
                                colon={false}
                                form={form}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="lastname"
                                    label="Tên"
                                    rules={[{ required: true, message: "Enter display last name!" }]}
                                >
                                    <Input
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                        placeholder="A"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Date of birth"
                                    name="Ngày Sinh"
                                    rules={[
                                        { required: true, message: "Enter display Date of birth!" },
                                    ]}
                                >
                                    <Input
                                        type="date"
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: "Enter display phone number!" }]}
                                >
                                    <Input
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                        placeholder="0987654321"
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col xs={24} xl={10} >
                            <Form
                                name="basic"
                                layout={"vertical"}
                                colon={false}
                                form={form}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="firstname"
                                    label="Họ"
                                    rules={[{ required: true, message: "Enter display first name!" }]}
                                >
                                    <Input
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                        placeholder="Tran Van"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Sex"
                                    name="Giới tính"
                                    rules={[
                                        { required: true, message: "Enter display sex!" },
                                    ]}
                                >
                                    <Select className="!rounded-lg" style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}
                                    >
                                        <Option value="Fruit">Nam</Option>
                                        <Option value="Vegetable">Nữ</Option>
                                        <Option value="Poultry">Khác</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="country"
                                    label="Quốc Gia"
                                    rules={[{ required: true, message: "Enter display country!" }]}
                                >
                                    <Input
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                        placeholder="Viet Nam"
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <div className="w-full pl-20 pr-20 text-center">
                        <p className="py-5 font-bold text-base text-center">Vui lòng đảm bảo rằng tất cả thông tin đã nhập phải đồng nhất với giấy tờ tùy thân của bạn</p>
                    </div>
                </>
            }
            {activeStep === 2 &&
                <>
                    <Row className="w-full pt-10 pl-20 pr-20 mt-10 justify-center" >
                        <Col xs={24} xl={10} style={{ marginRight: 20 }}>
                            <Form
                                name="basic"
                                layout={"vertical"}
                                colon={false}
                                form={form}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Loại tài liệu"
                                    name="choosefile"
                                    rules={[
                                        { required: true, message: "Enter display file!" },
                                    ]}
                                >
                                    <Select className="!rounded-lg" style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}>
                                        <Option value="Fruit">CCCD</Option>
                                        <Option value="Vegetable">BLX</Option>
                                        <Option value="Poultry">Hộ Chiếu</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Mặt Trước"
                                    name="front"
                                    rules={[
                                        { required: true, message: "Enter display front!" },
                                    ]}>
                                    <CustomUpload
                                        type="image"
                                        accept=".png, .jpg, .jpeg, .jfif"
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col xs={24} xl={10} >
                            <Form
                                name="basic"
                                layout={"vertical"}
                                colon={false}
                                form={form}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="number"
                                    label="Số Thẻ"
                                    rules={[{ required: true, message: "Enter display number file!" }]}
                                >
                                    <Input
                                        className="!rounded-lg p-[10px]"
                                        size={"large"}
                                        style={{ borderRadius: 20 }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Mặt Sau"
                                    name="back"
                                    rules={[
                                        { required: true, message: "Enter display back!" },
                                    ]}>
                                    <CustomUpload
                                        type="image"
                                        accept=".png, .jpg, .jpeg, .jfif"
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <div className="w-full pl-20 pr-20 text-center">
                        <p className="py-5 font-bold text-base text-center">Vui lòng đảm bảo rằng tất cả thông tin đã nhập phải đồng nhất với giấy tờ tùy thân của bạn</p>
                    </div>
                </>
            }
            <div className="mt-10 flex justify-center">
                {activeStep === 1 ?
                    <Button style={{ background: "#EEEEEE", fontSize: 16, padding: 10, borderRadius: 6, marginRight: 30, color: "#1677FF" }} onClick={handleOpen} disabled={isFirstStep}>
                        Thoát
                    </Button> :
                    <Button style={{ background: "#EEEEEE", fontSize: 16, padding: 10, borderRadius: 6, marginRight: 30, color: "#1677FF" }} onClick={handlePrev} disabled={isFirstStep}>
                        Quay lại
                    </Button>
                }
                {activeStep != 2 ?
                    <Button style={{ background: "#1677FF", fontSize: 16, padding: 10, borderRadius: 6, color: "#fff" }} onClick={handleNext} disabled={isLastStep}>
                        Tiếp tục
                    </Button>
                    : <Button style={{ background: "#1677FF", fontSize: 16, padding: 10, borderRadius: 6, color: "#fff" }} disabled={isLastStep}>
                        Xác nhận
                    </Button>}
            </div>
        </div>
    );
}