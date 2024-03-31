import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function CreateMasterKey() {
    const [cookies] = useCookies(["user"]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
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
                <p className="pt-2 text-base font-normal flex items-center">
                    <CheckOutlined className="bg-green-400 p-1 rounded-full font-bold text-xl text-white mr-2"/>
                    Chính Sách Bảo Mật
                </p> 
                <p className="pt-2 text-base font-normal flex items-center">
                    <CheckOutlined className="bg-green-400 p-1 rounded-full font-bold text-xl text-white mr-2"/>
                    Chính Sách Bảo Vệ Rủi Ro, Chống Lừa Đảo
                </p>
                <p className="pt-2 text-base font-normal flex items-center">
                    <CheckOutlined className="bg-green-400 p-1 rounded-full font-bold text-xl text-white mr-2"/>
                    Quy Tắc Công Bằng
                </p>
                <p className="pt-2 text-base font-normal flex items-center">
                    <CheckOutlined className="bg-green-400 p-1 rounded-full font-bold text-xl text-white mr-2"/>
                    Bản Quyền và Quy Tắc Cộng Đồng
                </p>
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
            <p className="font-semibold text-lg">Đăng ký làm master</p>
        </button>
      <Modal 
        title={steps[currentStep].title}
        visible={isOpen}
        onCancel={handleCancel}
        footer={[
          <div style={{ display: "flex", justifyContent: "right" }}>
            {currentStep !== 0 && (
                <Button key="prev" onClick={handlePrev}>
                Previous
                </Button>
            )}
            <div>
              {currentStep !== steps.length - 1 && (
                <Button
                  key="next"
                  type="primary"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </Button>
              )}
            </div>
            {currentStep === steps.length - 1 && (
                <Button className="ml-2" htmlType="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            )}
          </div>
        ]}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          {steps[currentStep].content}
        </Form>
      </Modal>
    </div>
  );
}