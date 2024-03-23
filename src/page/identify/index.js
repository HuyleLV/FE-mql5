import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import image_mk4 from "../../component/image/mk4.jpg";

export default function Identify() {  
    const [identifyCategory, setIdentifyCategory] = useState([]);
    const [identify, setIdentify] = useState([]);
    const [identifyHot, setIdentifyHot] = useState([]);

    const getByIdentify_category = async (identify_category_id) => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identify/getByIdentify_category/${identify_category_id}`, {
                    params: {
                        page: 1
                    }
                }
            )
            .then(({ data }) => {
                setIdentify(data[0]);
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
                page: 1
            }})
            .then(({ data }) => {
                setIdentifyHot(data);
            });
    }

    useEffect(() => { 
        getAllIdentifyCategory();
        getAllIdentifyHot();
    }, []);

    return (
        <>
            <Row>
                <Col xs={24} xl={5}>
                    <p className="pt-20 text-center text-2xl font-bold">Nhận định hot nhất</p>
                    {identifyHot.map((_, i) => (
                        <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}}>
                            <div className="border p-2 mx-5 my-2 flex">
                                <img src={_?.identify_image} style={{width: 80, height: 60}}/>
                                <div className="pl-2">
                                    <p className="font-semibold text-xl">{_?.identify_title?.slice(0, 25)}...</p>
                                    <p className="pt-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </Col>
                <Col xs={24} xl={14}>
                    <div className="flex justify-center py-10">
                        <p className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] font-bold text-3xl py-5 text-center">
                            Biểu đồ thị trường
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <iframe
                            src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A700%2C%22symbol%22%3A%22FX%3AGBPUSD%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22enable_publishing%22%3Atrue%2C%22withdateranges%22%3Atrue%2C%22range%22%3A%22YTD%22%2C%22hide_side_toolbar%22%3Afalse%2C%22allow_symbol_change%22%3Atrue%2C%22details%22%3Atrue%2C%22hotlist%22%3Atrue%2C%22calendar%22%3Afalse%2C%22show_popup_button%22%3Atrue%2C%22popup_width%22%3A%221000%22%2C%22popup_height%22%3A%22650%22%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22utm_source%22%3A%22netpartner.com.vn%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%22netpartner.com.vn%2Fmarkets-chart%2F%22%7D"
                            width="1300"
                            height="700"
                            frameBorder="0"
                            allowFullScreen=""
                        />
                    </div>
                </Col>
                <Col xs={24} xl={5}>
                    <img src={image_mk4} className="px-5 pt-20 h-full"/>
                </Col>
            </Row>
        
            <div className="max-w-screen-2xl items-center mx-auto">
                <div className="mt-[100px]">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-10 pl-4">
                        <p className="font-bold text-2xl py-5">Nhận định thị trường</p>
                    </div>
                    <Row>
                        <Col xs={24} xl={4}>
                            {identifyCategory?.length> 0 && identifyCategory?.map((e, index) => (
                                <button className="bg-blue-300 rounded-full w-[200px] mt-2" onClick={()=>getByIdentify_category(e?.identify_category_id)} key={index}>
                                    <p className="px-5 py-4 text-center text-xl font-bold">{e?.identify_category_title}</p>
                                </button>
                            ))}
                            
                        </Col>
                        <Col xs={24} xl={20}>
                            <div className="bg-blue-100 p-5 rounded-xl">
                                {identify === undefined
                                ?
                                    <p className="font-bold text-2xl">Chưa có bài viết mới!</p>
                                :
                                    <>
                                        <p className="font-bold text-2xl">{identify?.identify_title}</p>
                                        <p className="py-2 text-lg">
                                            Tác giả: {identify?.displayName} - Ngày đăng: {dayjsInstance(identify?.create_at).format("DD/MM/YYYY HH:mm:ss")}
                                        </p>
                                        <p className="pt-2 text-xl">
                                            {parse(String(identify?.identify_description).replaceAll("ul>","p>"))}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}