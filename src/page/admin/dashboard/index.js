import { Button, Form, Input, List, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormatDollar, FormatVND } from "../../../utils/format";
import axiosInstance from "../../../utils/axios";


export default function Dashboard() {
    const [form] = Form.useForm();
    const [dollar, setDollar] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMaster, setIsOpenMaster] = useState(false);
    const [priceMaster, setPriceMaster] = useState([]);

    const getAllDollar = async () => {
        await axiosInstance.get(`/dollar/getById`)
            .then((res) => {
                const data = res?.data;
                setDollar(data[0]);
            })
            .catch(() => message.error("Error server!"));
    };

    const getPriceMaster = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/masterPrice/getById/1`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setPriceMaster(data[0]);
            });
    };
    
    const updateMasterPrice = async (values) => {
        await axiosInstance.post(`/masterPrice/updateMasterPrice`, values)
            .then((res) => {
                message.success(String(res?.data?.message));
                getPriceMaster();
                setIsOpenMaster(false);
            })
    }

    const onSubmit = async (values) => {
        await axiosInstance.post(`/dollar/update`, values)
            .then((res) => {
                message.success(String(res?.data?.message));
                getAllDollar();
                setIsOpen(false);
            })
    }

    useEffect(() => {
        getAllDollar();
        getPriceMaster();
    }, []);

    return (
        <div className="pt-10">
            <p className="text-center w-full font-bold text-4xl">TRANG QUẢN TRỊ CỦA TIPPER TRADE</p>
            <div className="flex py-10">
                {isOpen ?
                    <Form                        
                        layout={"vertical"}
                        colon={false}
                        form={form}
                        initialValues={dollar}
                        onFinishFailed={(e) => console.log(e)}
                        onFinish={onSubmit}>

                        <Form.Item
                            name="dollar_vnd"
                            label={"Tỷ giá đô la"}
                            rules={[{ required: true, message: "Vui lòng nhập!" }]}
                        >
                            <Input size="lage" placeholder="Text"/>
                        </Form.Item>

                        <Button htmlType={"submit"}>Xong</Button>
                    </Form>
                    :
                    <>
                        <p className="w-full font-bold text-2xl">Tỷ giá đô la: 1$ = {FormatVND(dollar?.dollar_vnd)}</p>
                        <Button onClick={()=>{setIsOpen(true); setIsOpenMaster(false)}}>Sửa</Button>
                    </>
                }
            </div>

            <div className="flex">
                {isOpenMaster ?
                    <Form                        
                        layout={"vertical"}
                        colon={false}
                        form={form}
                        initialValues={priceMaster}
                        onFinishFailed={(e) => console.log(e)}
                        onFinish={updateMasterPrice}>

                        <Form.Item
                            name="master_price"
                            label={"Giá theo dõi Master"}
                            rules={[{ required: true, message: "Vui lòng nhập!" }]}
                        >
                            <Input size="lage" placeholder="Text"/>
                        </Form.Item>

                        <Button htmlType={"submit"}>Xong</Button>
                    </Form>
                    :
                    <>
                        <p className="w-full font-bold text-2xl">
                            Giá theo dõi Master: {FormatDollar(priceMaster?.master_price)} / 1 tháng = {FormatVND((priceMaster?.master_price * dollar?.dollar_vnd))}
                        </p>
                        <Button onClick={()=>{setIsOpenMaster(true);setIsOpen(false)}}>Sửa</Button>
                    </>
                }
            </div>

        </div>
    )
}