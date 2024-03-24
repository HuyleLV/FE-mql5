import { useLocation, useNavigate, Link } from "react-router-dom";
import { CiSaveDown2 } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { Button, Form, message, Input, Radio, Space, } from "antd";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useCookies } from "react-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import google from "../../component/image/google.png";
import logo from "../../component/image/logo.png";

export default function ReportDetail() {

    const params = useLocation();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const [form] = Form.useForm();
    const email = Form.useWatch("email", form);
    const password = Form.useWatch("password", form);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);
    const [value, setValue] = useState(1);

    const loginUser = async () => {
        const value = {
            email: email,
            password: password,
        };

        await axios
            .post(`${process.env.REACT_APP_API_URL}/user/login`, value)
            .then((res) => {
                console.log(res?.data);
                setCookieToken("accessToken", res?.data);
                message.success("Đăng nhập thành công!");
                navigate("/");
            })
            .catch(() => message.error("Tài khoản hoặc mật khẩu không đúng!"));
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            <div class="grid grid-rows-2 grid-flow-col gap-4">
                <div class="row-span-2 p-2">
                    <img alt={params.state.title} className="w-[550px] h-[550px]" style={{ borderRadius: 10 }} src={params.state.img} />
                </div>
                <div class="row-span-2 col-span-4 justify-start p-4">
                    <div className="w-[50px] p-1 text-center" style={{ background: "#FABF2C33", borderRadius: 4 }}>
                        <div className="text-sm font-semibold textYellow">
                            Free
                        </div>
                    </div>
                    <div className="text-4xl font-bold w-[700px] pt-4 pb-4">
                        {params.state.title}
                    </div>

                    <div className="font-semibold text-xs light-gray pt-4 pb-4">
                        {params.state.report}
                    </div>

                    <div className="text-xl font-semibold w-[700px] pt-4 pb-4">
                        {params.state.description}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 30, width: 700, justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 100, background: "rgb(22, 29, 33)", justifyContent: "center", alignItems: "center" }}>
                            <CiSaveDown2 size={20} color="#fff" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 100, background: "rgb(22, 29, 33)", justifyContent: "center", alignItems: "center" }}>
                                <FaLinkedin size={20} color="#fff" />
                            </div>
                            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 100, background: "rgb(22, 29, 33)", justifyContent: "center", alignItems: "center" }}>
                                <FaXTwitter size={20} color="#fff" />
                            </div>
                            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 100, background: "rgb(22, 29, 33)", justifyContent: "center", alignItems: "center" }}>
                                <FaFacebook size={20} color="#fff" />
                            </div>
                            <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 100, background: "rgb(22, 29, 33)", justifyContent: "center", alignItems: "center" }}>
                                <GoLink size={20} color="#fff" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full text-center p-10" style={{ borderRadius: 20, marginBottom: -70, background: "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)" }}>
                <div className="text-base font-bold">
                    Cung cấp nghiên cứu trên thị trường tài chính
                </div>

                <div className="text-base font-semibold">
                    <a onClick={handleOpen} className="font-bold" style={{ borderBottomWidth: 2, borderBottomColor: "blue", color: 'blue', cursor: 'pointer' }}>Đăng nhập</a> để xem chi tiết
                </div>
                <div className="text-base font-semibold">
                    Nếu chưa có tài khoản
                </div>
                <Button onClick={() => navigate("/register")} type="primary" className="mx-2 mt-1"><p className="font-bold text-base textWhite">Tạo tài khoản</p></Button>
            </div>

            <Dialog open={open} handler={handleOpen} onClick={handleOpen} style={{ background: "#00000099" }}>
                <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <div className="flex justify-center">
                        <div className="w-[500px] border-4 border-cyan-600 rounded-3xl p-10" style={{ background: "#fff" }}>
                            <div className="flex justify-center">
                                <img src={logo} width={200} />
                            </div>
                            <p className="py-5 font-bold text-2xl text-center">Đăng nhập tài khoản</p>
                            <Form form={form} name="basic" layout={"vertical"} colon={false}>
                                <Form.Item name="email">
                                    <Input
                                        className="!rounded-none"
                                        size={"large"}
                                        placeholder="Login"
                                    />
                                </Form.Item>
                                <Form.Item name="password">
                                    <Input.Password
                                        className="!rounded-none"
                                        size={"large"}
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <div className="flex justify-end mt-[-8px]">
                                    <Link href="#" className="text-cyan-500">Quên mật khẩu?</Link>
                                </div>
                                <div className="pb-5 pt-2">
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Space direction="vertical">
                                            <Radio className="font-semibold" value={1}>Đăng nhập thành viên</Radio>
                                            <Radio className="font-semibold" value={2}>Đăng nhập khách hàng</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                                <button
                                    className="border-2 border-cyan-500 bg-cyan-500 hover:bg-white w-full rounded-2xl py-3 font-semibold text-xl text-white hover:text-cyan-500"
                                    size={"large"}
                                    htmlType="submit"
                                    onClick={loginUser}
                                >
                                    Đăng nhập
                                </button>

                                <Link to={`${process.env.REACT_APP_API_URL}/auth/google`}>
                                    <div className="border-2 border-cyan-500 bg-white hover:bg-cyan-500 w-full rounded-2xl py-3 font-bold text-xl text-cyan-600 hover:text-white mt-5">
                                        <p className="flex justify-center w-full">
                                            <img src={google} className="w-7 h-7 mr-4" />
                                            Log in With Google
                                        </p>
                                    </div>
                                </Link>
                            </Form>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>


    )
}