import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { Link, useParams } from "react-router-dom";
import logo from "../../component/image/logo.png";

export default function EducationDetail() {  
    const params = useParams();
    const [education, setEducation] = useState([]);
    const [educationNew, setEducationNew] = useState([]);

    const getByEducationSlug = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/education/getBySlug/${params?.education_slug}`
            )
            .then(({ data }) => {
                setEducation(data[0]);
            });
    }

    const getEducationLimit = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/education/getAll`, {params: {
                    page: 1,
                    pageSize: 6,
                }}
            )
            .then(({ data }) => {
                setEducationNew(data?.data);
            });
    }

    useEffect(() => { 
        getByEducationSlug();
        getEducationLimit();
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-[50px]">
                <div>
                    <p className="font-medium px-5">
                        <Link to="/">Trang chủ</Link> / <Link to="/education">Education</Link> / <span className="text-blue-600">{education?.education_title}</span>
                    </p>
                </div>
                <Row className="pt-10">
                    <Col xs={24} xl={24} className="p-5">
                        <p className="font-bold text-3xl">{education?.education_title}</p>
                        <div className="flex justify-start pt-5 items-center">
                            <p className="flex justify-center items-center font-medium text-gray-600">
                                <img className="rounded-full" src={education?.photos ? education?.photos : logo} style={{width: 30, marginRight: 10, padding: 2}}/>
                                {education?.displayName ? education?.displayName : "Admin"}
                            </p>
                            <p className="pl-10 font-medium text-gray-600">Đã đăng vào: {dayjsInstance(education?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                        </div>
                        <div className="pt-5">
                            {parse(String(education?.education_description).replaceAll("ul>","p>"))}
                        </div>
                        <div className="pt-10">
                            <p className="font-semibold text-2xl">Bài học liên quan</p>
                            <Row>
                                {educationNew?.map((_, index) => (
                                    <Col xs={24} xl={8}>
                                        <a href={"/education/" + _?.education_slug} style={{color: "black"}}>
                                            <div className="flex justify-center m-5">
                                                <div className="h-[480px] border-b-2">
                                                    <img src={_?.education_image} style={{width: 350, height: 300}}/>
                                                    <div className="py-2">
                                                        <p className="py-2 text-sm">
                                                            Tác giả: {_?.displayName ? _?.displayName : "Admin"}
                                                        </p>
                                                        <p className="font-bold text-xl">{_?.education_title}</p>
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
                    {/* <Col xs={24} xl={6} className="p-5">
                        <p className="font-semibold text-2xl text-center border-b mx-10 mb-5">Tin tức hot nhất</p>
                        {educationNew?.map((_, index) => (
                            <a href={"/education/" + _?.education_slug} style={{color: "black"}}>
                                <div className="pt-4 border-b border-slate-300">
                                    <p className="font-semibold text-xl">{_?.education_title}</p>
                                    <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                </div>
                            </a>
                        ))}
                    </Col> */}
                </Row>
            </div>
        </div>
    )
}