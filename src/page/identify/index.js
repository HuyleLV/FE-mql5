import { Button, Col, DatePicker, Pagination, Rate, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import image_mk4 from "../../component/image/mk4.jpg";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

export default function Identify() {  
    const [cookies] = useCookies(["user"]);
    const [identifyCategory, setIdentifyCategory] = useState([]);
    const [identify, setIdentify] = useState([]);
    const [identifyHot, setIdentifyHot] = useState([]);
    const [comment, setComment] = useState([]);
    const [rateComment, setRateComment] = useState(5);
    const [identifyCategoryId, setIdentifyCategoryId] = useState(0);
    const [comment_content, setcomment_content] = useState("");
    const [paginationComment, setPaginationComment] = useState({
      page: 1,
      pageSize: 6,
    });

    const getByIdentify_category = async (identify_category_id) => {
        console.log(identify_category_id)
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
            
        setIdentifyCategoryId(identify_category_id);
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

    const fetchcomment = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/comment/getById/0`, {params: paginationComment})
        .then((res) => {
          const data = res?.data;
          console.log(data)
          setComment(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const postcomment = async () => {
        const value = {
            comment_content: comment_content.target.value,
            comment_star: rateComment,
            product_id: 0,
            create_by: cookies?.user.user_id,
        };

        await axios
        .post(`${process.env.REACT_APP_API_URL}/comment/create`, value)
        .then((res) => {
            message.success("Bình luận thành công");
            fetchcomment();
        });
    };

    const onChange = async (date) => {
        const create_at = dayjs(date).format("YYYY-MM-DD");
        const create_atD = dayjs(date).add(1, 'day').format("YYYY-MM-DD 00:00:00");
        
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identify/getByTime/${identifyCategoryId}`, {
                    params: {
                        page: 1,
                        create_at: create_at,
                        create_atD: create_atD
                    }
                }
            )
            .then(({ data }) => {
                console.log(data)
                setIdentify(data[0]);
            });
     };

    useEffect(() => { 
        getAllIdentifyCategory();
        getAllIdentifyHot();
        fetchcomment();
    }, []);

    useEffect(() => { 
        if(identify?.length === 0 && identifyCategory?.[0]?.identify_category_id) {
            getByIdentify_category(identifyCategory?.[0]?.identify_category_id);
            setIdentifyCategoryId(identifyCategory?.[0]?.identify_category_id);
        }
    }, [identify, identifyCategory]);

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
                    <div className="flex justify-between items-center">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-10 pl-4">
                            <p className="font-bold text-2xl py-5">Nhận định thị trường</p>
                        </div>
                        <DatePicker 
                            onChange={onChange}
                            format={'DD/MM/YYYY'} 
                        />
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
                
                <div className="py-10">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[200px] my-10 pl-4">
                        <p className="font-bold text-2xl py-5">Comment</p>
                    </div>
                    {comment?.data !== undefined ? 
                        <>
                        {comment.data?.map((i) => {
                            return (
                            <>
                                <div className="flex border">
                                <div className="w-1/3 md:w-1/6 p-4">
                                    <p className="flex justify-center">
                                        <img
                                            alt="img"
                                            src={i.photos}
                                            className="w-[80px] h-[80px] rounded-tl-lg rounded-br-lg"
                                        />
                                    </p>
                                </div>
                                <div className="w-2/3 md:w-5/6">
                                    <div className="flex py-5 max-md:flex-col">
                                    <p className="font-bold text-[#42639c]">
                                        {i.displayName}
                                    </p>
                                    <p className="text-[10px] pt-1 px-2">
                                        {dayjs(i.create_at).format("DD/MM/YYYY hh:mm")}
                                    </p>
                                    <Rate allowHalf value={i.comment_star} disabled />
                                    </div>
                                    <p>{i.comment_content}</p>
                                </div>
                                </div>
                            </>
                            );
                        })}
                        <div className="py-6">
                            <Pagination
                            className="flex justify-center"
                            current={paginationComment.page}
                            total={comment?.total}
                            pageSize={paginationComment.pageSize}
                            onChange={(p)=> {
                                setPaginationComment({
                                page: p,
                                pageSize: paginationComment.pageSize
                                })
                            }}
                            />
                        </div>
                        </>
                    : <></>
                    }

                    {cookies?.user && (
                        <div className="p-[10px] flex ">
                            <div className="px-10">
                                <img
                                    alt="img"
                                    src={cookies?.user?.photos}
                                    className="w-[120px] h-[120px] rounded-tl-lg rounded-br-lg"
                                />
                                <p className="text-center font-bold text-xl text-[#42639c]">{cookies?.user?.displayName}</p>
                            </div>
                            <div className="w-full">
                                <div className="mb-[10px] w-full">
                                    <textarea
                                    id="comment_content"
                                    name="comment_content"
                                    rows="4"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Gửi nhận xét về sản phẩm"
                                    onChange={setcomment_content}
                                    ></textarea>
                                </div>
                                <p>
                                    <Rate
                                    allowHalf
                                    onChange={setRateComment}
                                    value={rateComment}
                                    />
                                </p>
                                <Button className="my-5 w-[200px] h-10" onClick={postcomment}>
                                    Gửi
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}