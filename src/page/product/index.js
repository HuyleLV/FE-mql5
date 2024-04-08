import { Col, List, Rate, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import image_mk4 from "../../component/image/mk4.jpg";
import icon_1 from "../../component/image/icon/6.svg";
import icon_2 from "../../component/image/icon/7.svg";
import icon_3 from "../../component/image/icon/8.svg";
import icon_4 from "../../component/image/icon/9.svg";
import icon_5 from "../../component/image/icon/10.svg";
import icon_6 from "../../component/image/icon/11.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDevice } from "../../hooks";
import Reports from "../home/Report";
import { useCookies } from "react-cookie";

export default function Product() {  
    const { isMobile } = useDevice();
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [tab, setTab] = useState(1);
    const [cookies] = useCookies(["user"]);

    const fetchProducts = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/product/getAllMarket`)
            .then((res) => {
                const data = res?.data;
                setProduct(data || []);
            })
            .catch(() => message.error("Error server!"));
    };

    const renderItem = (item) => {
        if (item?.product?.length > 0) {
            return (
                <>
                    <List.Item
                        key={item?.category_name}
                    >
                        <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">{item?.category_name}</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={item?.product}
                            grid={{ gutter: 20, column: 6 }}
                            renderItem={(i) => (
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
                                                        <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled />
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
                                                                    <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled />
                                                                    <span className="w-[18px] h-[18px] block"></span>
                                                                    <span>{i?.categoryChild_name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="line-clamp-[8]">
                                                            <div dangerouslySetInnerHTML={{ __html: i?.product_description }}></div>
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

        if (item?.product?.length > 0) {
            return (
                <List.Item>
                    <p className="font-semibold p-2 text-2xl">{item?.category_name}</p>
                    <List
                        itemLayout="vertical"
                        dataSource={item?.product}
                        renderItem={(i) => (
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
                                                    <Rate style={{ fontSize: 15 }} allowHalf defaultValue={i?.average !== null ? i?.average : 5} disabled />
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
        if(!cookies?.user && currentPath?.includes('/san-pham')){ 
            message.warning("Vui lòng đăng nhập!")
            navigate("/login");
          } else {
            fetchProducts();
          }
    }, [cookies?.user]);

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
                <div className="border-t-2 border-blue-500 py-10">
                    <div className="flex justify-center">
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 1 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(1)}>
                            <div className="flex justify-center">
                                <img src={icon_1} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Net-AuAI</p>
                        </div>
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 2 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(2)}>
                            <div className="flex justify-center">
                                <img src={icon_2} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Báo cáo</p>
                        </div>
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 3 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(3)}>
                            <div className="flex justify-center">
                                <img src={icon_3} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Data Base</p>
                        </div>
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 4 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(4)}>
                            <div className="flex justify-center">
                                <img src={icon_4} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Đào Tạo</p>
                        </div>
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 5 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(5)}>
                            <div className="flex justify-center">
                                <img src={icon_5} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Cố Vấn</p>
                        </div>
                        <div className={`px-10 mx-5 py-5 rounded-full cursor-pointer ${tab === 6 ? 'bg-gray-200' : ''}`} onClick={()=>setTab(6)}>
                            <div className="flex justify-center">
                                <img src={icon_6} width={80} style={{height: 80}}/>
                            </div>
                            <p className="font-bold text-xl flex justify-center py-2">Hợp Tác</p>
                        </div>
                    </div>
                </div>
                
                {tab === 1 && (
                    <div className="w-full p-5">
                        <List
                            rootClassName="item-cont"
                            itemLayout="vertical"
                            dataSource={product}
                            renderItem={isMobile ? renderItemForMobile : renderItem}
                        />
                    </div>
                )}
                
                {tab === 2 && (
                    <Reports />
                )}
                
                {tab === 3 && (
                    <div className="flex justify-center">
                        <p className="text-5xl font-bold text-center text-white w-1/2 p-5 bg-blue-500">Coming Soon</p>
                    </div>
                )}
                
                {tab === 4 && (
                    <div className="flex justify-center">
                        <p className="text-5xl font-bold text-center text-white w-1/2 p-5 bg-blue-500">Coming Soon</p>
                    </div>
                )}
                
                {tab === 5 && (
                    <div className="flex justify-center">
                        <p className="text-5xl font-bold text-center text-white w-1/2 p-5 bg-blue-500">Coming Soon</p>
                    </div>
                )}
                
                {tab === 6  && (
                    <div>
                        <Row className="bg-gradient-to-r from-cyan-500 to-green-300 my-5">
                            <Col xs={24} xl={12} className="text-center py-10 text-white">
                                <p className="text-2xl font-bold py-5">Giải Pháp Đối Tác</p>
                                <p className="text-xl font-medium py-2 px-10">
                                    Nếu bạn là một trader và cần những giải pháp giao dịch.
                                    Nếu bạn là một master bạn muốn phân phối signals của mình.
                                    Nếu bạn là Investor chuyên nghiệp và cần những sản phẩm đầu tư chất lượng.
                                    Nếu bạn là một coder, bạn cần một môi trường để phát triển.
                                    Giải pháp của chúng tôi đáp ứng đầy đủ tất cả những điều mà bạn quan tâm.
                                </p>
                            </Col>
                            <Col xs={24} xl={12} className="py-10">
                                <div className="flex justify-center items-center h-full">
                                    <img src={image_mk4} width={600} style={{height: 400}}/>
                                </div>
                            </Col>
                        </Row>
                        
                        <Row className="my-5">
                            <Col xs={24} xl={12} className="py-10">
                                <div className="flex justify-center items-center h-full">
                                    <img src={image_mk4} width={600} style={{height: 400}}/>
                                </div>
                            </Col>
                            <Col xs={24} xl={12} className="text-center py-10 text-black">
                                <p className="text-2xl font-bold py-5">Giá trị chúng tôi mang lại cho đối tác</p>
                                <p className="text-xl font-medium py-2 px-10">
                                    Trở thành một trong những đối tác của chúng tôi và nắm giữ chìa khóa đến một thế giới với tràn ngập cơ hội mới. 
                                    Ngay từ ngày đầu tiên, chúng tôi đã tập trung vào việc hiểu rõ doanh nghiệp của bạn.
                                    Để có thể hiểu được chiến lược phát triển của bạn và xây dựng lộ trình phù hợp nhất để tiến tới thành công.
                                    Trở thành những nhà cung cấp chiến lược của chúng tôi, tiếp cận những công nghệ tiên tiến. Và tham gia vào đội 
                                    ngũ trâng đầy khao khát chiến thắng, đột phá và phát triển.
                                </p>
                            </Col>
                        </Row>
                    </div>
                )}

                
            </div>
        </>
    )
}