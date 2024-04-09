import React, { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { Button, Typography, Progress, Select, Option } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";
import { Col, DatePicker, Form, Input, Row, Space, message } from "antd";
import CustomUpload from "./customUpload";
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie";
import axios from "axios";

export default function AccuracyKYC({ handleOpen }) {

    const [form] = Form.useForm();
    const { register, handleSubmit } = useForm({});
    const identification_front = Form.useWatch('identification_front', form);
    const identification_back = Form.useWatch('identification_back', form);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const [activeStep, setActiveStep] = React.useState(1);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => activeStep >= 1 && activeStep < 4 && !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => activeStep > 1 && activeStep <= 4 && !isFirstStep && setActiveStep((cur) => cur - 1);

    const onSubmit = async (values) => {

        const data = {
            fullname: values?.firstname + " " + values?.lastname,
            phone: values?.phone,
            gender: values?.gender,
            birthday: values?.birthday,
            country: values?.country,
            identification_type: values?.identification_type,
            identification_number: values?.identification_number,
            identification_image: JSON.stringify({
                identification_front: identification_front, 
                identification_back: identification_back
            })
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/user/updateInfoKyc/${cookies?.user?.user_id}`, data)
            .finally(() => {
                message.success("Cập nhập thành công!");
                handleOpen();
            });
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
                <Step style={{ background: activeStep === 0 ? '#1677FF' : "#fff", justifyContent: 'center', alignItems: 'center' }}>
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
            
            <Form
                name="basic"
                layout={"vertical"}
                colon={false}
                form={form}
                onFinish={handleSubmit(onSubmit)}
            >
                {activeStep === 1 &&
                    <>
                        <Row className="w-full pt-10 pl-20 pr-20 mt-10 justify-center">
                            <Col xs={24} xl={10} style={{ marginRight: 20 }}>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="lastname"
                                    label="Tên"
                                    rules={[{ required: true, message: "Enter display last name!" }]}
                                >
                                    <input
                                        {...register("lastname")}
                                        className="!rounded-lg p-[10px] border w-full"
                                        size={"large"}
                                        placeholder="A"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Date of birth"
                                    name="birthday"
                                    rules={[
                                        { required: true, message: "Enter display Date of birth!" },
                                    ]}
                                >
                                    <input
                                        {...register("birthday")}
                                        className="!rounded-lg p-[10px] border w-full"
                                        type="date"
                                        size={"large"}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: "Enter display phone number!" }]}
                                >
                                    <input
                                        {...register("phone")}
                                        className="!rounded-lg p-[10px] border w-full"
                                        size={"large"}
                                        placeholder="0987654321"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={10} >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="firstname"
                                    label="Họ"
                                    rules={[{ required: true, message: "Enter display first name!" }]}
                                >
                                    <input
                                        {...register("firstname")}
                                        className="!rounded-lg p-[10px] border w-full"
                                        size={"large"}
                                        placeholder="Tran Van"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Giới tính"
                                    name="gender"
                                    rules={[
                                        { required: true, message: "Enter display sex!" },
                                    ]}
                                >
                                    <select 
                                        {...register("gender")} 
                                        className="!rounded-lg border w-full py-3" 
                                        style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}
                                    >
                                        <option value="nam">Nam</option>
                                        <option value="nu">Nữ</option>
                                    </select>
                                </Form.Item>

                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="country"
                                    label="Quốc Gia"
                                    rules={[{ required: true, message: "Enter display country!" }]}
                                >
                                    <input
                                        {...register("country")} 
                                        className="!rounded-lg p-[10px] border w-full"
                                        size={"large"}
                                        placeholder="Viet Nam"
                                    />
                                </Form.Item>
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
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Loại tài liệu"
                                    name="identification_type"
                                >
                                    <select
                                        {...register("identification_type")} 
                                        className="!rounded-lg border w-full py-3" style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}>
                                        <option value="1">CCCD</option>
                                        <option value="2">BLX</option>
                                        <option value="3">Hộ Chiếu</option>
                                    </select>
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Mặt Trước"
                                    name="identification_front" 
                                    rules={[
                                        { required: true, message: "Enter display front!" },
                                    ]}>
                                    <CustomUpload
                                        type="image"
                                        accept=".png, .jpg, .jpeg, .jfif"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={10} >
                                <Form.Item
                                    className="font-semibold text-lg"
                                    name="identification_number"
                                    label="Số Thẻ"
                                    rules={[{ required: true, message: "Enter display number file!" }]}
                                >
                                    <input
                                        {...register("identification_number")} 
                                        className="!rounded-lg p-[10px] border w-full"
                                        size={"large"}
                                        style={{ borderRadius: 20 }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="font-semibold text-lg"
                                    label="Mặt Sau"
                                    name="identification_back"
                                    rules={[
                                        { required: true, message: "Enter display back!" },
                                    ]}>
                                    <CustomUpload
                                        type="image"
                                        accept=".png, .jpg, .jpeg, .jfif"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="w-full pl-20 pr-20 text-center">
                            <p className="py-5 font-bold text-base text-center">Vui lòng đảm bảo rằng tất cả thông tin đã nhập phải đồng nhất với giấy tờ tùy thân của bạn</p>
                        </div>
                    </>
                }
                <div className="mt-10 flex justify-center">
                    {activeStep === 1 ?
                        <Button style={{ background: "#EEEEEE", fontSize: 16, padding: 10, borderRadius: 6, marginRight: 30, color: "#1677FF", height: 40 }} onClick={handleOpen} disabled={isFirstStep}>
                            Thoát
                        </Button> :
                        <Button style={{ background: "#EEEEEE", fontSize: 16, padding: 10, borderRadius: 6, marginRight: 30, color: "#1677FF", height: 40 }} onClick={handlePrev} disabled={isFirstStep}>
                            Quay lại
                        </Button>
                    }
                    {activeStep != 2 ?
                        <Button style={{ background: "#1677FF", fontSize: 16, padding: 10, borderRadius: 6, color: "#fff", height: 40 }} onClick={handleNext} disabled={isLastStep}>
                            Tiếp tục
                        </Button>
                        : 
                        <Form.Item>
                            <Button 
                                style={{ background: "#1677FF", fontSize: 16, padding: 10, borderRadius: 6, color: "#fff", height: 40 }}  
                                disabled={isLastStep}
                                type={"primary"} 
                                htmlType={"submit"}>
                                Xác nhận
                            </Button>
                        </Form.Item>
                    }
                </div>
            </Form>
        </div>
    );
}