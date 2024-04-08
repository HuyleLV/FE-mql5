import { Button, Col, Form, Image, Input, Pagination, Row, Select, Table, message } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axios";
import { CustomUpload } from "../../../../component";
import { parseSafe } from "../../../../helper";

export default function ProductPageDashboard() {
    const [form] = Form.useForm();
    const [productPage, setProductPage] = useState([]);
    const [short, setShort] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getAllProductPage = async () => {
        await axiosInstance.get(`/productPage/getInfoPage`)
            .then((res) => {
                const data = res?.data;
                setProductPage(data[0]);
                const coverShort = data[0]?.product_page_short
                    ? parseSafe(data[0]?.product_page_short)
                    : undefined;
                setShort(coverShort);
            })
            .catch(() => message.error("Error server!"));
    };

    const onSubmit = async (values) => {
        const short = [
            { id: "short_1", title: values?.shortTitle_1, link: values?.short_1, image: values?.shortLink_1 },
            { id: "short_2", title: values?.shortTitle_2, link: values?.short_2, image: values?.shortLink_2 },
            { id: "short_3", title: values?.shortTitle_3, link: values?.short_3, image: values?.shortLink_3 },
          ];
        const coverString = JSON.stringify(short);
        const merge = {
            product_page_image: values?.product_page_image,
            product_page_text: values?.product_page_text,
            product_page_link: values?.product_page_link,
            product_page_short: coverString
        }
        await axiosInstance.post(`/productPage/updatePage`, merge)
            .then((res) => {
                message.success(String(res?.data?.message));
                setIsOpen(false);
            })
    }
    
    useEffect(() => {
        getAllProductPage();
    }, []);

    return (
        <>
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Quản lý product Page</div>
                    </Col>
                    <Col>
                        <Button type={"primary"} onClick={() => setIsOpen(true)}>
                            Sửa
                        </Button>
                    </Col>
                </Row>
            </div>
            {isOpen ?
                <div className="w-full h-full mt-5 pb-20 relative">
                    <Form
                        layout={"vertical"}
                        colon={false}
                        form={form}
                        initialValues={productPage}
                        onFinishFailed={(e) => console.log(e)}
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            name="product_page_text"
                            label={"Chữ trên ảnh"}
                            rules={[{ required: true, message: "Vui lòng nhập!" }]}
                        >
                            <Input size="lage" placeholder="Text"/>
                        </Form.Item>
  
                        <Form.Item
                            name="product_page_image"
                            label={"Ảnh đầu trang"}
                            rules={[{ required: true, message: "Vui lòng chọn file!" }]}
                        >
                            <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
                        </Form.Item>
  
                        <Form.Item
                            name="product_page_link"
                            label={"Ảnh hoặc Video"}
                            rules={[{ required: true, message: "Vui lòng chọn file!" }]}
                        >
                            <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
                        </Form.Item>

                        <p className="py-5 text-2xl font-bold">Short</p>

                        <Row>
                            <Col xs={24} xl={8} className="px-2">
                                <Form.Item
                                    name="shortTitle_1"
                                    label={"Tiêu đề Short 1"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="short_1"
                                    label={"ID Short 1"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="shortLink_1"
                                    label={"Ảnh short 1"}
                                    rules={[{ required: true, message: "Vui lòng chọn file!" }]}
                                >
                                    <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={8} className="px-2">
                                <Form.Item
                                    name="shortTitle_2"
                                    label={"Tiêu đề Short 2"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="short_2"
                                    label={"ID Short 2"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="shortLink_2"
                                    label={"Ảnh short 2"}
                                    rules={[{ required: true, message: "Vui lòng chọn file!" }]}
                                >
                                    <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={8} className="px-2">
                                <Form.Item
                                    name="shortTitle_3"
                                    label={"Tiêu đề Short 3"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="short_3"
                                    label={"ID Short 3"}
                                    rules={[{ required: true, message: "Vui lòng nhập!" }]}
                                >
                                    <Input size="lage" placeholder="Text"/>
                                </Form.Item>

                                <Form.Item
                                    name="shortLink_3"
                                    label={"Ảnh short 3"}
                                    rules={[{ required: true, message: "Vui lòng chọn file!" }]}
                                >
                                    <CustomUpload type="image" accept=".png, .jpg, .jpeg, .jfif" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Button className="bottom-0" type={"primary"} htmlType={"submit"}>
                            Cập nhật
                        </Button>
                    </Form>
                </div>
            :
                <div className="w-full h-full mt-5 pb-20 relative">
                    <div className="mt-[50px] relative">
                        <img src={productPage?.product_page_image} className="w-full" style={{height: 200}}/>
                        <div className="absolute top-0 px-[5%] text-white">
                            <p className="font-semibold text-2xl top-0 pt-10">
                                {productPage?.product_page_text}
                            </p>
                        </div>
                    </div>
                    <Row className="py-10">
                        <Col xs={24} xl={10}>
                            <img src={productPage?.product_page_image} style={{height: 500}}  className="w-full px-2"/>
                        </Col>
                        <Col xs={24} xl={14}>
                            <div className="flex justify-center">
                                <img src={productPage?.product_page_image} width={300} style={{height: 500}} className="px-2"/>
                                <img src={productPage?.product_page_image} width={300} className="px-2"/>
                                <img src={productPage?.product_page_image} width={300} className="px-2"/>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}