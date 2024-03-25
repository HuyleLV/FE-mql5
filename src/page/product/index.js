import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import image_mk4 from "../../component/image/mk4.jpg";

export default function Product() {  
    const [product, setProduct] = useState([]);

    const getAllProduct = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/pro/getAllHotNews`, {params: {
                page: 1
            }})
            .then(({ data }) => {
                setProduct(data);
            });
    }

    useEffect(() => { 
        // getAllProduct();
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl items-center mx-auto">
                <div className="mt-[50px] relative">
                    <img src={image_mk4} className="w-full" style={{height: 200}}/>
                    <div className="absolute top-0 px-[5%] text-white">
                        <p className="font-semibold text-2xl top-0 pt-10">
                            Cung cấp sản phẩm tài <br/>
                            chính số mang tính cách <br/>
                            mạng
                        </p>
                    </div>
                </div>
                <Row className="py-10">
                    <Col xs={24} xl={10}>
                        <img src={image_mk4} style={{height: 500}}  className="w-full px-2"/>
                    </Col>
                    <Col xs={24} xl={14}>
                        <div className="flex justify-center">
                            <img src={image_mk4} width={300} style={{height: 500}} className="px-2"/>
                            <img src={image_mk4} width={300} className="px-2"/>
                            <img src={image_mk4} width={300} className="px-2"/>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}