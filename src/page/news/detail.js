import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { useParams } from "react-router-dom";

export default function NewsDetail() {  
    const params = useParams();
    const [identify, setIdentify] = useState([]);
    const [identifyHot, setIdentifyHot] = useState([]);

    const getByIdentifySlug = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identify/getBySlug/${params?.identify_slug}`
            )
            .then(({ data }) => {
                setIdentify(data[0]);
            });
    }

    const getAllIdentifyHot = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/identifyHot/getAllHotNews`)
            .then(({ data }) => {
                setIdentifyHot(data);
            });
    }

    useEffect(() => { 
        getByIdentifySlug();
        getAllIdentifyHot();
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-[50px]">
                <Row>
                    <Col xs={24} xl={18} className="p-5 px-10">
                        <p className="font-bold text-3xl">{identify?.identify_title}</p>
                        <div className="flex justify-between pt-5">
                            <p className="flex justify-center items-center">
                                <img src={identify?.photos} style={{width: 30, marginRight: 10, padding: 2}}/>
                                {identify?.displayName ? identify?.displayName : "Admin"}
                            </p>
                            <p>{dayjsInstance(identify?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                        </div>
                        <div className="pt-10">
                            {parse(String(identify?.identify_description).replaceAll("ul>","p>"))}
                        </div>
                        <div className="pt-10">
                            <p className="font-semibold text-2xl">Bài viết liên quan</p>
                            <Row>
                                {identifyHot?.map((_, index) => (
                                    <Col xs={24} xl={8}>
                                        <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}}>
                                            <div className="flex justify-center m-5">
                                                <div className="h-[480px] border-b-2">
                                                    <img src={_?.identify_image} style={{width: 350, height: 300}}/>
                                                    <div className="py-2">
                                                        <p className="py-2 text-sm">
                                                            Tác giả: {_?.displayName ? _?.displayName : "Admin"}
                                                        </p>
                                                        <p className="font-bold text-xl">{_?.identify_title}</p>
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
                    <Col xs={24} xl={6} className="p-5">
                        <p className="font-semibold text-2xl text-center border-b mx-10 mb-5">Tin tức hot nhất</p>
                        {identifyHot?.map((_, index) => (
                            <a href="" style={{color: "black"}}>
                                <div className="pt-4 border-b border-slate-300">
                                    <p className="font-semibold text-xl">{_?.identify_title}</p>
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