import { Col, Row } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { useEffect, useState } from "react";
import logo from "../../component/image/logo.png";

export default function EcoNewsDetail() { 
    const params = useParams();
    const [economicNewsHot, setEconomicNewsHot] = useState([]);
    const [economicNews, setEconomicNews] = useState([]);

    const getAllHot = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/economicNews/getAllHot`)
            .then(({ data }) => {
                setEconomicNewsHot(data);
            });
    }

    const getBySlug = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/economicNews/getBySlug/${params?.economic_news_slug}`)
            .then(({ data }) => {
                setEconomicNews(data[0]);
            });
        
    }

    useEffect(() => { 
        getAllHot();
        getBySlug();
    }, []);

    return (
        
        <div className="max-w-screen-2xl mx-auto px-20">
            <div className="mt-[50px]">
                <div>
                    <p className="font-medium px-5">
                        <Link to="/">Trang chủ</Link> / <Link to="/lich-kinh-te">Lịch Kinh Tế</Link> / <span className="text-blue-600">{economicNews?.economic_news_title}</span>
                    </p>
                </div>
                <Row className="pt-10">
                    <Col xs={24} xl={17} className="px-5 mb-10">
                        <div className="border border-gray rounded-2xl rounded-xl p-5">
                            <p className="font-bold text-3xl">{economicNews?.economic_news_title}</p>
                            <div className="flex justify-start pt-5 items-center">
                                <p className="flex justify-center items-center font-medium text-gray-600">
                                    <img className="rounded-full" src={economicNews?.photos ? economicNews?.photos : logo} style={{width: 30, marginRight: 10, padding: 2}}/>
                                    {economicNews?.displayName ? economicNews?.displayName : "Admin"}
                                </p>
                                <p className="pl-10 font-medium text-gray-600">Đã đăng vào: {dayjsInstance(economicNews?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                            </div>
                            <div className="pt-5">
                                {parse(String(economicNews?.economic_news_description).replaceAll('type="disc"',"className='list-disc text-start pl-8'"))}
                            </div>
                        </div>
                        <div className="pt-10">
                            <p className="font-semibold text-2xl">Bài viết liên quan</p>
                            <Row>
                                {economicNewsHot?.map((_, index) => (
                                    <Col xs={24} xl={8}>
                                        <a href={"/lich-kinh-te/" + _?.economic_news_slug} style={{color: "black"}}>
                                            <div className="flex justify-center m-5">
                                                <div className="h-[480px] border-b-2">
                                                    <img src={_?.economic_news_image} style={{width: 250, height: 250}}/>
                                                    <div className="py-2">
                                                        <p className="py-2 text-sm">
                                                            Tác giả: {_?.displayName ? _?.displayName : "Admin"}
                                                        </p>
                                                        <p className="font-bold text-xl">{_?.economic_news_title}</p>
                                                        <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} xl={7} className="p-5 border border-gray rounded-2xl h-min">
                        <p className="font-semibold text-2xl text-center border-b mx-10 mb-5">Tin tức hot nhất</p>
                        {economicNewsHot?.map((_, index) => (
                            <a href={"/lich-kinh-te/" + _?.economic_news_slug} style={{color: "black"}}>
                                <div className="pt-4 border-b border-slate-300">
                                    <p className="font-semibold text-xl">{_?.economic_news_title}</p>
                                    <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                </div>
                            </a>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    )
}