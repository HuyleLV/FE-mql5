import { Tabs, List, Row, Col, message, Rate, Select, Dropdown, Space, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import banner from "../../component/image/banner_home.jpg"
import image1_home from "../../component/image/img1_home.png"
import video_home from "../../component/image/Video_home.mp4"
import { useEffect, useRef, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useDevice } from "../../hooks";
import axios from "axios";
import { useCookies } from "react-cookie";
import Ecosystem from "./Ecosystem";
import TopMaster from "./TopMaster";
import { Slide } from 'react-slideshow-image';
import JobTrade from "./JobTrade";
import Reports from "./Report";
import { FormatDollar } from "../../utils/format";
import { useSpring, animated } from "react-spring";
import axiosInstance from "../../utils/axios";
import { isImageOrVideo } from "../../utils/isImageOrVideo";

export default function Home() {
    const { isMobile } = useDevice();
    const [products, setProducts] = useState([]);
    const token = useLocation();
    const [topMaster, setTopMaster] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [productPage, setProductPage] = useState([]);
    const [cookies] = useCookies(["user"]);
    const [key, setKey] = useState(1);
    const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);
    

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/product/getAllMarket`)
            .then((res) => {
                const data = res?.data;
                setProducts(data || []);
            })
            .catch(() => message.error("Error server!"));
    };

    const getTopMaster = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/signal/getAllTopMaster`)
        .catch(function (error) {
          message.error(error.response.status);
        })
        .then(( res ) => {
          const data = res?.data;
          setTopMaster(data);
        });
    };

    const fetchShorts = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/short/getAllNoPage`)
            .then((res) => {
                const data = res?.data;
                setShorts(data);
            })
            .catch(() => message.error("Error server!"));
    };

    const getAllProductPage = async () => {
        await axiosInstance.get(`/productPage/getInfoPage`)
            .then((res) => {
                const data = res?.data;
                setProductPage(data[0]);

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
                            grid={{ gutter: 20, column: 3 }}
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
                                                        {FormatDollar(i?.product_price)} <span>USD</span>
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
                                                        {FormatDollar(i?.product_price)} <span>USD</span>
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

    
  const scrolling = useSpring({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-100%,0)" },
    config: { duration: 20000 },
    reset: true,
    onRest: () => {
      setKey(key + 1);
    }
  });

    useEffect(() => {
        fetchProducts();
        getTopMaster();
        fetchShorts()
        getAllProductPage();
        if (new URLSearchParams(token?.search).get('token') !== null) {
            setCookieToken("accessToken", new URLSearchParams(token?.search).get('token'));
            localStorage.setItem("token", new URLSearchParams(token?.search).get('token'));
        }
    }, []);

    return (
        <div>
            <div className="relative">
                <video src={video_home} className="h-screen" style={{ width: '100vw', objectFit: 'cover' }} autoPlay muted controls={false} loop>
                </video>
                <div className="absolute top-0 px-[5%] text-white">
                    <div className="w-full flex justify-center overflow-hidden">
                        <animated.div key={key} style={scrolling} className={"font-none w-full"}>
                            Chào mừng bạn đến với phiên bản beta Net Partner - Hãy trải nghiệm những nội dung mới lạ những giải pháp cách mạng về tài chính. Tất cả hòm thư góp ý vui lòng gửi về support@netpartner.com.vn, Net Partner xin chân thành cám ơn!!
                        </animated.div>
                    </div>
                    <p className="font-bold text-2xl top-0 pt-20 border-b w-[350px] py-2">Giải Pháp Đầu Tư An Toàn</p>
                    <p className="font-bold text-6xl w-[800px] pt-[120px]">
                        <p className="text-[70px] pb-4">Xây Dựng Sự Giàu Có </p>
                        Của Bạn Bằng
                        <p className="text-yellow-500 py-3">Nền Tảng</p>
                        <p className="text-green-500">Của Chúng Tôi</p>
                    </p>
                    <p className="font-semibold text-xl pt-10">Công cụ tối ưu được cung cấp bởi Netpartner</p>
                    <Link to={"/home-detail"}>
                        <button className="text-xl border px-4 py-2 rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-20">
                            Trải nghiệm ngay
                        </button>
                    </Link>
                </div>
            </div>
            <div className="max-w-screen-2xl items-center mx-auto pt-10">
                <Row>
                    <Col xs={24} xl={12} className="px-10 py-16">
                        <p className="font-bold text-4xl">Kiếm Tiền Tự Động Cùng Net_AuAi</p>
                        <p className="pt-5 font-medium text-lg pr-20">
                            Xác định xu hướng thị trường một cách tự động trên nền tảng Meta Trader bằng sản phẩm của chúng tôi. 
                            Sử dụng dữ liệu toàn cầu để có cái nhìn tổng quan và đưa ra gợi ý giao dịch đến khách hàng một cách chính xác nhất ngay trên nền tảng giao dịch.
                        </p>
                        <div className="pt-5 flex">
                            <div>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Giao dịch tự đông nâng cao
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Tín hiệu giao dịch chính xác
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Quản lý hiệu xuất giao dịch mạnh mẽ
                                </p>
                            </div>
                            <div className="pl-10">
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Quản lý rủi ro chuyên nghiệp
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Công cụ Ai độc quyền
                                </p>
                                <p className="font-semibold text-lg pt-2">
                                    <CheckOutlined className="text-green-600 text-xl pr-2" />
                                    Kết nối cùng Master Trade
                                </p>
                            </div>
                        </div>
                        <Link to={"/home-detail"}>
                            <button className="text-xl border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-10">
                                Quan Tâm
                            </button>
                        </Link>
                    </Col>
                    <Col xs={24} xl={12} className="px-10 pt-10">
                        <div className="flex justify-center">
                            <img src={image1_home} width={600} height={400} />
                        </div>
                    </Col>
                </Row>
            </div>


            <div className="h-[250px] bg-[#031340] my-10">
                <div className="max-w-screen-2xl mx-auto">
                    <Slide slidesToScroll={1} slidesToShow={1} cssClass="mx-[100px] -mt-6">
                        <div>
                            <div className="flex items-center">
                                <img src={banner} className="w-[300px] h-[300px] rounded-full" />
                                <div className="px-5 w-full">
                                    <h3 className="text-white text-3xl font-bold bg-[#004AAD] p-5">Anh Minh</h3>
                                    <p className="text-white text-xl font-semibold= p-5">Feeb back Feeb backFeeb back </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-10">
                                <img src={banner} className="w-[300px] h-[300px] rounded-full" />
                                <div className="px-5 w-full">
                                    <h3 className="text-white text-3xl font-bold bg-[#004AAD] p-5">Anh Minh</h3>
                                    <p className="text-white text-xl font-semibold p-5">Feeb back Feeb back Feeb back </p>
                                </div>
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>

            <div className="max-w-screen-2xl items-center mx-auto pt-10">

                <div className="w-full p-5">
                    <List
                        grid={{
                            gutter: 16,
                            column: isMobile? 1 : 2
                        }}
                        rootClassName="item-cont"
                        itemLayout="vertical"
                        dataSource={products}
                        renderItem={isMobile ? renderItemForMobile : renderItem}
                    />
                </div>

                <div className="py-10">
                    <h1 className="font-bold px-4 text-3xl border-blue-500">Các Giao Dịch Thành Công</h1>
                    <p className="p-4 border-b-2 text-blue-700 text-xl font-semibold">Theo dõi, kết nối với những Master Trade Tại Net Partner</p>
                    {topMaster?.length > 0 && (
                        <Slide slidesToScroll={1} slidesToShow={4} cssClass="py-10 mx-10">
                            {topMaster.map((_, i) => (
                                <div key={i}>
                                    {i < 9 &&
                                        <div className="border-2 border-black rounded-2xl mx-10 p-3 shadow text-black">
                                            <p className="font-semibold text-xl text-center pb-5">Rank: {_?.rank}</p>
                                            <div className="flex items-center justify-center py-2">
                                                <img 
                                                    src={_?.user?.photos ? _?.user?.photos : "https://cdn-icons-png.flaticon.com/512/848/848006.png"} 
                                                    className="rounded-full" 
                                                    style={{width: 50, height: 50}}/>
                                                <div className="pl-5">
                                                    <p className="font-semibold text-md"> Name: {_?.user?.displayName ? _?.user?.displayName : "Admin"}</p>
                                                    <p className="font-semibold text-md"> ID: {_?.user?.master_key}</p>
                                                </div>
                                            </div>                
                                            <div>
                                                <p className="font-semibold text-lg p-1 flex justify-between">Tổng lệnh: <span>{_?.results[0]?.total ? _?.results[0]?.total : 0}</span></p>
                                                <p className="font-semibold text-lg p-1 flex justify-between">Win rate: <span>{_?.results[0]?.win_rate ? Math.round(_?.results[0]?.win_rate * 100) / 100 : 0}</span></p>
                                                <p className="font-semibold text-lg p-1 flex justify-between">Win: <span>{_?.results[0]?.win ? Math.round(_?.results[0]?.win * 100) / 100 : 0}</span></p>
                                                <p className="font-semibold text-lg p-1 flex justify-between">Loss: <span>{_?.results[0]?.loss ? Math.round(_?.results[0]?.loss * 100) / 100 : 0}</span></p>
                                                <p className="font-semibold text-lg p-1 flex justify-between">Tổng profit: <span>{_?.results[0]?.total_profit ? Math.round(_?.results[0]?.total_profit * 100) / 100 : 0}</span></p>
                                            </div>
                                            <div className="flex justify-center py-1">
                                                {cookies?.user ? 
                                                    <a href={"/master/" + _?.user?.master_key}>
                                                        <button className="py-1 px-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-lg font-semibold text-white">
                                                            Chi tiết
                                                        </button>
                                                    </a>
                                                    :
                                                    <button 
                                                        className="py-1 px-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-lg font-semibold text-white" 
                                                        onClick={()=>setIsModalOpen(true)}>
                                                        Chi tiết
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </Slide>
                    )}
                </div>

                <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Tin Thị Trường</p>
                <Row>
                    <Col xs={24} xl={10} className="py-4 w-full">
                        {
                            isImageOrVideo(productPage?.product_page_link) === "image" ?
                                <div className="flex justify-center">
                                    <img src={productPage?.product_page_link} style={{height: 400}}  className="w-content px-2"/>
                                </div> :
                            isImageOrVideo(productPage?.product_page_link) === "video" ?
                                <div className="flex justify-center">
                                    <video controls>
                                        <source src={productPage?.product_page_link} type="video/mp4" style={{height: 400}}  className="w-content px-2"/>
                                    </video>
                                </div>
                            : <p>No Image and video</p>
                        }  
                    </Col>
                    <Col xs={24} xl={14}>
                        <JobTrade shorts={shorts}/>
                    </Col>
                </Row>

                <Reports />
                
                <div className="p-5 mb-10">
                    <Row className="flex items-center">
                        <Col xs={24} xl={13}>
                            <p className="text-2xl font-semibold">
                                Hỗ trợ cho các tổ chức trong nhiều ngành<br></br>
                                và khu vực địa lý
                            </p>
                            <p className="text-lg pt-4">
                                NET PARTNER giúp hợp nhất giao tiếp, kết nối con người và cộng tác tốt hơn trong<br></br>
                                phòng họp, lớp học và mọi nơi khác.
                            </p>
                            <Link to={""}>
                                <button className="text-xl border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-5">
                                    Khám Phá Giải Pháp Của NET
                                </button>
                            </Link>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div className="flex">
                                <div className="border border-blue-200 w-1/2 p-5 m-2 rounded-2xl">
                                    <div className="flex justify-center pb-2">
                                        <img src={banner} className="w-[80px] h-[60px]" />
                                    </div>
                                    <p className="text-xl text-center font-semibold">Giải Pháp Giao Dịch</p>
                                </div>
                                <div className="border border-blue-200 w-1/2 p-5 m-2 rounded-2xl">
                                    <div className="flex justify-center pb-2">
                                        <img src={banner} className="w-[80px] h-[60px]" />
                                    </div>
                                    <p className="text-xl text-center font-semibold">Giải Pháp Đầu Tư</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="border border-blue-200 w-1/2 p-5 m-2 rounded-2xl">
                                    <div className="flex justify-center pb-2">
                                        <img src={banner} className="w-[80px] h-[60px]" />
                                    </div>
                                    <p className="text-xl text-center font-semibold">Giải Pháp Dữ Liệu</p>
                                </div>
                                <div className="border border-blue-200 w-1/2 p-5 m-2 rounded-2xl">
                                    <div className="flex justify-center pb-2">
                                        <img src={banner} className="w-[80px] h-[60px]" />
                                    </div>
                                    <p className="text-xl text-center font-semibold">Giải Pháp Đối Tác</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <Row>
                <Col xs={24} xl={8} className="px-10 py-20 text-white bg-[#031340]">
                    <p className="font-bold text-xl">Có Gì Mới Tại NET PARTNER</p>
                    <p className="text-lg py-5">Cập nhật tin tức, tìm hiểu các phương pháp tốt nhất và hơn thế nữa.</p>
                    <Link to={""}>
                        <button className="text-xl border px-4 py-2 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800 mt-5">
                            Đọc Blog Của Chúng Tôi
                        </button>
                    </Link>
                </Col>
                <Col xs={24} xl={16} className="px-10 py-10 text-white bg-blue-600">
                    <Slide slidesToScroll={1} slidesToShow={2} cssClass="mx-[50px]">
                        <div>
                            <img src={banner} className="h-[400px] rounded-xl px-2" />
                        </div>
                        <div>
                            <img src={banner} className="h-[400px] rounded-xl px-2" />
                        </div>
                        <div>
                            <img src={banner} className="h-[400px] rounded-xl px-2" />
                        </div>
                        <div>
                            <img src={banner} className="h-[400px] rounded-xl px-2" />
                        </div>
                    </Slide>
                </Col>
            </Row>

            <div className="max-w-screen-2xl items-center mx-auto pt-10">
                <Ecosystem setIsModalOpen={setIsModalOpen} />
            </div>

            {cookies?.user ? 
                <Modal
                    title="Bạn chưa đăng nhập?"
                    className="flex justify-center"
                    open={isModalOpen}
                    onOk={() => (setIsModalOpen(false), navigate('/home-detail'))}
                    onCancel={() => setIsModalOpen(false)}
                    okButtonProps={{ className: "bg-blue-500" }}
                >
                    <p className="p-5">Chào mừng bạn đến với hệ sinh thái của Netpartner!</p>
                </Modal>
                :
                <Modal
                    title="Bạn chưa đăng nhập?"
                    className="flex justify-center"
                    open={isModalOpen}
                    onOk={() => (setIsModalOpen(false), navigate('/login'))}
                    onCancel={() => setIsModalOpen(false)}
                    okButtonProps={{ className: "bg-blue-500" }}
                >
                    <p className="p-5">Vui lòng đăng nhập để được sử dụng chức năng này!</p>
                </Modal>
            }

        </div>
    )
}