import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import banner from "../../component/image/banner_home.jpg"
import image1_home from "../../component/image/image1_home.png"
import video_home from "../../component/image/Video_home.mp4"
import { useEffect, useRef, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useDevice } from "../../hooks";
import axios from "axios";

export default function Home() {  
    const { isMobile } = useDevice();
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/product/getAllMarket`)
        .then((res) => {
            const data = res?.data;
            setProducts(data || []);
        })
        .catch(() => message.error("Error server!"));
    };
    
    const renderItem = (item) => {
        if(item?.product?.length > 0){
        return (
            <>
                <List.Item
                    key={item?.category_name}
                >
                    <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">{item?.category_name}</p>
                    <List 
                        itemLayout="horizontal"
                        dataSource={item?.product} 
                        grid={{ gutter: 20, column: 6 } }
                        renderItem={(i)=> (
                            <List.Item className="mt-8">
                            <>
                                <div className="relative group overflow-hidden hover:overflow-visible item-container">
                                <Link
                                    to={`/market/${i?.product_id}`}
                                    className="item-product group-hover:relative group-hover:opacity-0 group-hover:z-[3]"
                                >
                                    <div className="text-center border">
                                        <div className="flex justify-center w-full">
                                            <img alt="avata-product" className="w-full h-[220px]" src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null} />
                                        </div>
                                        <p className="p-1 h-10 font-bold text-black">{i?.product_name}</p>
                                        <div className="flex items-center justify-center py-[16px]">
                                            <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                                        </div>
                                        <p className="border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                                            ${i?.product_price} <span>USD</span>
                                        </p>
                                    </div>
                                </Link>
                                <div
                                    className="absolute z-[2] duration-200 info-item
                                        top-0 left-0 w-0
                                        bg-white p-0
                                        pb-0 max-w-[calc(200%_+_20px)] h-full 
                                        overflow-y-hidden transition-all"
                                >
                                    <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex relative z-[1]">
                                        <img
                                            src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                                            alt={i?.product_name}
                                            className="w-[50px] h-[50px] object-cover"
                                        />
                                        <div className="px-4">
                                            <p className="font-bold">{i?.product_name}</p>
                                            <div className="flex items-center">
                                            <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                                            <span className="w-[18px] h-[18px] block"></span>
                                            <span>{i?.categoryChild_name}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="line-clamp-[8]">
                                        <div dangerouslySetInnerHTML={{ __html: i?.product_description}}></div>
                                        </div>
                                    </div>
                                    <p className="border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white">
                                        ${i?.product_price} <span>USD</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </>
                            </List.Item>
                        )}
                    />
                </List.Item>
            </>
        );
        }
    };

    const renderItemForMobile = (item) => {
        
        if(item?.product?.length > 0){
        return (
            <List.Item>
            <p className="font-semibold p-2 text-2xl">{item?.category_name}</p>
            <List
                itemLayout="vertical"
                dataSource={item?.product} 
                renderItem={(i)=> (
                    <List.Item>
                    <>
                        <div className="relative">
                        <div className="absolute right-0 bottom-2 flex items-center justify-center w-[103px] h-[35px] border border-[#ccc] font-bold text-[#0873bc] text-[15px]">
                            <span>{i?.product_price} USD</span>
                        </div>
                        <Link
                            to={`/market/${i?.product_id}`}
                            className="flex items-center"
                        >
                            <img
                            alt="avata-product"
                            src={i?.product_image ? JSON.parse(i?.product_image)?.filter((i) => i?.type === "logo")?.[0]?.data : null}
                            width={80}
                            height={80}
                            className="mr-[10px]"
                            />
                            <div className="">
                            <p className="text-[18px] font-bold text-[var(--black)]">
                                {i?.product_name}
                            </p>
                            <div className="flex items-center pt-[8px] pb-[10px]">
                                <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled/>
                            </div>
                            </div>
                        </Link>
                        </div>
                    </>
                    </List.Item>
                )}
            />
            </List.Item>
        );
        }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    return (
        <div>
            <div className="relative">
                <video src={video_home} autoPlay muted controls={false} loop>
                </video>
                <div className="absolute top-0 px-[5%] text-white">
                    <p className="font-bold text-xl top-0 pt-20">Đỉnh Cao Công Nghệ Tài Chính</p>
                    <p className="font-bold text-6xl w-[700px] pt-[150px]">
                        Xây dựng sự giàu có của bạn bằng nền tảng của chúng tôi
                    </p>
                    <p className="font-semibold text-xl pt-10">Công cụ tối ưu được cung cấp bởi Netpartner</p>
                    <button className="border px-4 py-2 rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-20">
                        Trải nghiệm ngay
                    </button>
                </div>
            </div>
            <div className="max-w-screen-2xl items-center mx-auto pt-10">
                <Row>
                    <Col xs={24} xl={12} className="px-10 pt-16">
                        <p className="font-bold text-4xl">Trade with Confidence</p>
                        <p className="pt-5 font-medium text-lg pr-20">
                            Giải pháp giao dịch Net-AuAi, hệ thống giao dịch tiên tiến nhất từng được tạo ra. 
                            Hãy là một phần của cuộc cách mạng tài chính này để trở thành những nhà đầu tư có lợi nhuận và trở nên giàu có!
                        </p>
                        <div className="pt-5 flex">
                            <div>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Giao dịch tự đông nâng cao
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Tín hiệu giao dịch chính xác
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Quản lý hiệu xuất giao dịch mạnh mẽ
                                </p>
                            </div>
                            <div className="pl-10">
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Công nghệ Ai độc quyền
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2"/>
                                    Quản lý rủi ro chuyên nghiệp
                                </p>
                            </div>
                        </div>
                        <button className="border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                            Trải nghiệm ngay
                        </button>
                    </Col>
                    <Col xs={24} xl={12} className="px-10 pt-10">
                        <div className="flex justify-center">
                            <img src={image1_home} width={600} height={400}/>
                        </div>
                    </Col>
                </Row>
                <div className="w-full p-5">
                    <List
                        rootClassName="item-cont"
                        itemLayout="vertical"
                        dataSource={products}
                        renderItem={isMobile ? renderItemForMobile : renderItem}
                    />
                </div>
            </div>
        </div>
    )
}