import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";

export default function News() {  
    const [news, setNews] = useState([]);
    const [tabs, setTabs] = useState(1);
    const [identifyCategory, setIdentifyCategory] = useState([]);
    const [identify, setIdentify] = useState([]);
    const [identifyHot, setIdentifyHot] = useState([]);
    const [identifyHotHover, setIdentifyHotHover] = useState([]);

    const getAllNew = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identifyNew/getAllNew`
            )
            .then(({ data }) => {
                setNews(data);
            });
    }

    const getByIdentify_category = async (identify_category_id) => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identify/getByIdentify_category/${identify_category_id}`,{
                    params: {
                        page: 2
                    }
                }
            )
            .then(({ data }) => {
                setIdentify(data);
            });
    }

    const getAllIdentifyCategory = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identifyCategory/getAllIdentifyCategory`, {params: {
                    page: 1,
                    pageSize: 100,
                }}
            )
            .then(({ data }) => {
                setIdentifyCategory(data?.data);
            });
    }

    const getAllIdentifyHot = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/identifyHot/getAllHotNews`, {params: {
                page: 2
            }})
            .then(({ data }) => {
                setIdentifyHot(data);
            });
    }

    const handleMouseEnter = (value) => {
        setIdentifyHotHover(value);
      };

    useEffect(() => { 
        getAllIdentifyCategory();
        getAllIdentifyHot();
        getAllNew();
        if(identify.length === 0) {
            getByIdentify_category(2);
        }
    }, []);

    return (
        <div className="max-w-screen-2xl items-center mx-auto">
            <div className="mt-[100px]">
                <p className="font-bold text-3xl text-center">---- Tin tức hot nhất ----</p>
                <Row className="mt-10 shadow-md border rounded-xl">
                    <Col xs={24} xl={14}>
                        <div className="flex justify-center p-10 relative">
                            <img 
                                src={identifyHotHover?.length === 0 ? identifyHot[0]?.identify_image : identifyHotHover?.identify_image} 
                                style={{ width: 800, height: 550 }} 
                            />

                            <div className="absolute top-10 left-8 right-8 text-white font-semibold text-lg mx-5 p-2 bg-[#13171BB2]">
                                {identifyHotHover?.length === 0 ? identifyHot[0]?.identify_title : identifyHotHover?.identify_title}
                            </div>
                            <div className="absolute bottom-10 left-8 right-8 text-white font-semibold text-lg flex mx-5 p-2 bg-[#13171BB2]">
                                <p>by {identifyHotHover?.length === 0 ? identifyHot[0]?.displayName : identifyHotHover?.displayName} </p>
                                <p className="pl-5">
                                    {identifyHotHover?.length === 0 ? 
                                        dayjsInstance(identifyHot[0]?.create_at).format("HH:mm:ss DD/MM/YYYY") 
                                        : dayjsInstance(identifyHotHover?.create_at).format("HH:mm:ss DD/MM/YYYY") 
                                    }
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={10}>
                        <div className="px-8 pt-10 pb-2">
                            <button 
                                className={tabs === 1 ? "w-1/2 bg-amber-400 border-b border-amber-400 rounded-t-lg" : "w-1/2 bg-white border-b border-amber-400 rounded-t-lg"}
                                onClick={()=>setTabs(1)}
                            >
                                <p className="text-black font-semibold text-xl py-2">Tin tức hot nhất</p>
                            </button>
                            <button 
                                className={tabs === 2 ? "w-1/2 bg-amber-400 border-b border-amber-400 rounded-t-lg" : "w-1/2 bg-white border-b border-amber-400 rounded-t-lg"}
                                onClick={()=>setTabs(2)}
                            >
                                <p className="text-black font-semibold text-xl py-2">Tin tức mới nhất</p>
                            </button>
                        </div>
                        <div className="px-8">
                            {tabs === 1 ? 
                                identifyHot?.map((_, index) => (
                                    <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}}>
                                        <div className="pt-4 border-b border-black" onMouseEnter={()=>handleMouseEnter(_)}>
                                            <p className="font-semibold text-xl hover:font-bold">{_?.identify_title}</p>
                                            <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                        </div>
                                    </a>
                                ))
                                :
                                news?.map((_, index) => (
                                    <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}}>
                                        <div className="pt-4 border-b border-black" onMouseEnter={()=>handleMouseEnter(_)}>
                                            <p className="font-semibold text-xl hover:font-bold">{_?.identify_title}</p>
                                            <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-[100px]">
                <div className="flex">
                    {identifyCategory?.length> 0 && identifyCategory?.map((e, index) => (
                        <button className="bg-blue-300 rounded-full w-[180px] ml-2 hover:bg-blue-500" onClick={()=>getByIdentify_category(e?.identify_category_id)} key={index}>
                            <p className="px-5 py-4 text-center text-xl font-bold">{e?.identify_category_title}</p>
                        </button>
                    ))}
                </div>
                <div className="p-5 rounded-xl mt-10">
                    <Row>
                        {identify?.length === 0 
                        ?
                            <p className="font-bold text-2xl">Chưa có bài viết mới!</p>
                        :
                        identify?.map((e, index) => (
                            <>
                                <Col xs={24} xl={8}>
                                    <a href={"/tin-tuc/" + e?.identify_slug} style={{color: "black"}}>
                                        <div className="flex justify-center m-5">
                                            <div className="w-[400px] h-[460px] border-b-2">
                                                <img src={e?.identify_image} style={{width: 400, height: 300}}/>
                                                <div className="py-2">
                                                    <p className="py-2 text-sm">
                                                        Tác giả: {e?.displayName ? e?.displayName : "Admin"}
                                                    </p>
                                                    <p className="font-bold text-xl">{e?.identify_title}</p>
                                                    <p className="py-2 text-sm">{dayjsInstance(e?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Col>                                  
                            </>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}