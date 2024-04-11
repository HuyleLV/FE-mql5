import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import chinhsbm from "../component/image/PDF/chinh-sach-bao-mat.pdf"

export default function CreateMasterKey({allMaster}) {
    const [form] = Form.useForm();
    const master_key_name = Form.useWatch('master_key_name', form);
    const description = Form.useWatch('description', form);
    const [cookies] = useCookies(["user"]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [csbm, setCsbm] = useState(false);
    const [csbv, setCsbv] = useState(false);
    const [qtcb, setQtcb] = useState(false);
    const [bqvqt, setBqvqt] = useState(false);

    const [formData, setFormData] = useState({
        master_key_name: "",
        description: "",
        server: "",
        master_key: "",
        password: "",
    });

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleCancel = () => {
        setCurrentStep(0);
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const data = {
            ...formData,
            user_id: cookies.user?.user_id
        }

        await axios
            .post(`${process.env.REACT_APP_API_URL}/masterLicense/create`, data)
            .then((res) => {
                message.success(String(res?.data?.message));
            })
            .catch(() => message.error("Error server!"));
        handleCancel();
    };

    const steps = [
    {
      title: "Tạo một chiến lược mới",
      content: (
        <>
            <Form.Item
                label="Tên chiến lược"
                name="master_key_name"
                rules={[{ required: true, message: "Vui lòng nhập tên chiến lược!" }]}
            >
                <Input
                    name="master_key_name"
                    value={formData.master_key_name}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item 
                label="Mô tả" 
                name="description"
                required 
                rules={[{ required: true, message: "Vui lòng nhập tên mô tả!" }]}
                >
                <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mô tả"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </Form.Item>
            <div>
                <p className="font-bold text-lg">Bằng việc trở thành Master bạn đồng ý với:</p>
                <div className="my-2 flex items-center">
                    <Radio value={csbm} onChange={()=>setCsbm(true)} className="flex items-center"></Radio>
                    <a className="text-xl font-normal" href={chinhsbm} target="_blank">
                        Chính Sách Bảo Mật
                    </a> 
                </div>
                <div className="my-2 flex items-center">
                    <Radio value={csbv} onChange={()=>setCsbv(true)} className="flex items-center">
                    </Radio>
                    <a className="text-xl font-normal" href={chinhsbm} target="_blank">
                        Chính Sách Bảo Vệ Rủi Ro, Chống Lừa Đảo
                    </a> 
                </div>
                <div className="my-2 flex items-center">
                    <Radio value={qtcb} onChange={()=>setQtcb(true)} className="flex items-center">
                    </Radio>
                    <a className="text-xl font-normal" href={chinhsbm} target="_blank">
                        Quy Tắc Công Bằng
                    </a> 
                </div>
                <div className="my-2 flex items-center">
                    <Radio value={bqvqt} onChange={()=>setBqvqt(true)} className="flex items-center">
                    </Radio>
                    <a className="text-xl font-normal" href={chinhsbm} target="_blank">
                        Bản Quyền và Quy Tắc Cộng Đồng
                    </a> 
                </div>
            </div>
        </>
      ),
    },
    {
      title: "Nhập Thông Tin Để Trở Thành Master",
      content: (
        <>
            <p className="text-red-600 p-2 font-medium">
                Lưu ý:  Chỉ điền tài khoản chỉ xem( Passview), Trong
                trường hợp bạn cố ý cài đặt tài khoản trade chúng tôi
                không chịu trách nhiệm về rủi ro tài khoản
            </p>
            <Form.Item
                label="server"
                name="server"
                rules={[{ required: true, message: "Vui lòng chọn server!" }]}
            >
                <Input
                    name="server"
                    value={formData.server}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item
                label="MT4 ID"
                name="master_key"
                rules={[{ required: true, message: "Vui lòng nhập MT4 ID!" }]}
            >
                <Input
                    name="master_key"
                    value={formData.master_key}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item 
                label="password" 
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập password!" }]}
            >
                <Input.Password
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div>
        <button
            className="bg-yellow-500 px-5 py-2 rounded-xl hover:bg-yellow-600"
            onClick={() => setIsOpen(true)}
        >
            {allMaster?.length > 0 ? 
                <p className="font-semibold text-lg">Tạo chiến dịch mới</p>
                :
                <p className="font-semibold text-lg">Đăng ký làm master</p>
            }
        </button>
      <Modal 
        title={steps[currentStep].title}
        visible={isOpen}
        onCancel={handleCancel}
        footer={[
          <div style={{ display: "flex", justifyContent: "right" }}>
            {currentStep !== 0 && (
                <Button key="prev" onClick={handlePrev}>
                    Quay lại
                </Button>
            )}
            <div>
              {currentStep !== steps.length - 1 && (
                <>
                    {csbm === true && csbv === true && qtcb === true && bqvqt === true && master_key_name?.length > 0 && description?.length > 0 ? 
                        <Button
                            key="next"
                            type="primary"
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                        >
                            Tiếp tục
                        </Button>
                    :
                        <Button
                            key="next"
                            type="primary"
                            onClick={handleNext}
                            disabled={true}
                        >
                            Tiếp tục
                        </Button>
                    }

                </>
              )}
            </div>
            {currentStep === steps.length - 1 && (
                <Button className="ml-2" htmlType="submit" type="primary" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            )}
          </div>
        ]}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {steps[currentStep].content}
        </Form>
      </Modal>
    </div>
  );
}