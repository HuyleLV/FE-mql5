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
    const [news, setNews] = useState([]);
    const [newsHot, setNewsHot] = useState([]);
    const [comment, setComment] = useState([]);
    const [rateComment, setRateComment] = useState(5);
    const [identifyCategoryId, setIdentifyCategoryId] = useState(0);
    const [hide, setHide] = useState(false);
    const [comment_content, setcomment_content] = useState("");
    const [clickButton, setClickButton] = useState(0);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 9,
    });
    const [paginationComment, setPaginationComment] = useState({
      page: 1,
      pageSize: 6,
      type: 2
    });

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

    const getNewsHot = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/identifyHot/getAllHotNews`, {params: {
                page: 2
            }})
            .then(({ data }) => {
                setNewsHot(data);
            });
    }

    const getByNews_category = async (identify_category_id) => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/identify/getByIdentify_categoryNew/${identify_category_id}`,{
                    params: {
                        ...pagination,
                        pageSite: 2
                    }
                }
            )
            .then(({ data }) => {
                setNews(data?.data);
            });
    }

    const fetchcomment = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/comment/getById/${identify?.identify_id}`, {params: paginationComment})
        .then((res) => {
          const data = res?.data;
          setComment(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const postcomment = async () => {
        const value = {
            comment_content: comment_content.target.value,
            comment_star: rateComment,
            product_id: identify?.identify_id,
            type: 2,
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
                setIdentify(data[0]);
            });
     };

    useEffect(() => { 
        getAllIdentifyCategory();
        getAllIdentifyHot();
        getNewsHot();
        if(identify?.identify_id){
            fetchcomment();
        }
    }, [identify?.identify_id, paginationComment]);

    useEffect(() => { 
        if(news.length === 0) {
            getByNews_category(2);
        }
    }, []);

    useEffect(() => { 
        if(identify?.length === 0 && identifyCategory?.[0]?.identify_category_id) {
            getByIdentify_category(identifyCategory?.[0]?.identify_category_id);
            setIdentifyCategoryId(identifyCategory?.[0]?.identify_category_id);
        }
    }, [identify, identifyCategory]);

    return (
        <>
            <div className="flex justify-center py-10">
                <div>
                    <p className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] font-bold text-3xl py-5 text-center">
                        Biểu Đồ Thị Trường
                    </p>
                    <div className="flex justify-center items-center pt-5">
                        <a href="/lich-kinh-te">
                            <Button type="primary" title="sdwa"><p className="font-bold">Lịch kinh tế</p></Button>
                        </a>
                    </div>
                </div>
            </div>
            <Row>
                <Col xs={24} xl={5}>
                    <p className="text-center text-2xl font-bold">Nhận Định Hot Nhất</p>
                    {identifyHot.map((_, i) => (
                        <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}}>
                            <div className="border p-2 mx-5 my-2 flex">
                                <img src={_?.identify_image} style={{width: 80, height: 80}}/>
                                <div className="pl-2">
                                    <p className="font-semibold text-xl">{_?.identify_title?.slice(0, 25)}...</p>
                                    <p className="pt-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </Col>
                <Col xs={24} xl={14}>
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
                    <img src={image_mk4} className="px-5 h-[700px]"/>
                </Col>
            </Row>
        
            <div className="max-w-screen-2xl items-center mx-auto pt-[100px]">
                <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-10 pl-4 mx-2">
                    <p className="font-bold text-2xl py-5">Tin Tức Hot Nhất</p>
                </div>
                <div className="flex w-full">
                    {newsHot?.map((_, index) => (
                        <div className="flex w-1/5 p-2">
                            <a href={"/tin-tuc/" + _?.identify_slug} style={{color: "black"}} className="border">
                                <div className="flex justify-center">
                                    <div>
                                        <img src={_?.identify_image} style={{width: 400, height: 200}}/>
                                        <div className="p-2">
                                            <p className="py-2 text-sm">
                                                Tác giả: {_?.displayName ? _?.displayName : "Admin"}
                                            </p>
                                            <p className="font-bold text-base">{_?.identify_title}</p>
                                            <p className="py-2 text-sm">{dayjsInstance(_?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <Row className="pt-10">
                    <Col xs={24} xl={14}>
                        <div className="py-10">
                            <Row>
                                <Col xs={24} xl={6} className="pt-20">
                                    {identifyCategory?.length> 0 && identifyCategory?.map((e, index) => (
                                        <>
                                            {clickButton === 0 ?
                                                <button className="bg-blue-300 rounded-full w-[200px] mt-2" onClick={()=>(
                                                        getByIdentify_category(e?.identify_category_id), 
                                                        setClickButton(index + 1),
                                                        getByNews_category(e?.identify_category_id)
                                                    )} 
                                                    key={index}>
                                                    <p className="px-5 py-4 text-center text-xl font-bold">{e?.identify_category_title}</p>
                                                </button>
                                                :
                                                clickButton === (index + 1) ?
                                                    <button className="bg-blue-600 text-white rounded-full w-[200px] mt-2" onClick={()=>(
                                                            getByIdentify_category(e?.identify_category_id), 
                                                            setClickButton(index + 1),
                                                            getByNews_category(e?.identify_category_id)
                                                        )} key={index}>
                                                        <p className="px-5 py-4 text-center text-xl font-bold">{e?.identify_category_title}</p>
                                                    </button>
                                                    :
                                                    <button className="bg-blue-300 rounded-full w-[200px] mt-2" onClick={()=>(
                                                        getByIdentify_category(e?.identify_category_id), 
                                                        setClickButton(index + 1),
                                                        getByNews_category(e?.identify_category_id)
                                                    )} key={index}>
                                                        <p className="px-5 py-4 text-center text-xl font-bold">{e?.identify_category_title}</p>
                                                    </button>
                                            }
                                        </>
                                    ))}
                                    
                                </Col>
                                <Col xs={24} xl={18} className="px-2">
                                    <div>
                                        <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] pl-4">
                                            <p className="font-bold text-2xl py-5">Nhận Định Thị Trường</p>
                                        </div>
                                        <div className="py-10">
                                            <Button type="primary" onClick={()=>onChange(dayjs(new Date()))} className="mr-4"><p className="font-semibold">Hôm Nay</p></Button>
                                            <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(1, 'day'))}><p className="font-semibold">Hôm Qua</p></Button>
                                            <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(2, 'day'))} className="mx-4"><p className="font-semibold">Hôm Kia</p></Button>
                                            <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(7, 'day'))} className="mr-4"><p className="font-semibold">Tuần Trước</p></Button>
                                            <DatePicker 
                                                onChange={onChange}
                                                format={'DD/MM/YYYY'} 
                                            />
                                        </div>
                                    </div>
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
                                                {
                                                    hide === true 
                                                    ?
                                                        <div>
                                                            <div className="h-min">
                                                                <p className="pt-2 text-xl">
                                                                    {parse(String(identify?.identify_description).replaceAll("ul>","p>"))}
                                                                </p>
                                                            </div>
                                                            <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(false)}>Ẩn Bớt</button>
                                                        </div>
                                                    :
                                                        <div>
                                                            <div className="h-[500px] text-ellipsis overflow-hidden">
                                                                <p className="pt-2 text-xl">
                                                                    {parse(String(identify?.identify_description).replaceAll("ul>","p>"))}
                                                                </p>
                                                            </div>
                                                            <button className="bg-blue-500 p-1 rounded text-white w-[100px] mt-4 font-bold" onClick={()=>setHide(true)}>Hiện Thêm</button>
                                                        </div>
                                                }
                                            </>
                                        }
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
                                                            pageSize: paginationComment.pageSize,
                                                            type: 2
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
                                                    <div className="flex justify-center items-center h-[70px] w-full">
                                                        <img
                                                            alt="img"
                                                            src={cookies?.user?.photos}
                                                            className="w-[60px] h-[60px] rounded-tl-lg rounded-br-lg"
                                                        />
                                                    </div>
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
                                </Col>
                            </Row>
                        </div>
                        
                    </Col>
                    <Col xs={24} xl={10} className="px-5 py-10">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] pl-4">
                            <p className="font-bold text-2xl py-5">Tin Tức Mới Nhất</p>
                        </div>
                
                        <div className="rounded-xl mt-10">
                            {news?.length === 0 
                                ?
                                    <p className="font-bold text-2xl">Chưa có bài viết mới!</p>
                                :
                                <div className="w-full h-full mt-5 pb-20 relative">
                                    <Row>
                                        {news?.map((e, index) => (
                                            <Col xs={24} xl={24} className="border-b border-slate-300">
                                                <a href={"/tin-tuc/" + e?.identify_slug} style={{color: "black"}}>
                                                    <div className="flex p-2 my-2">
                                                        <img src={e?.identify_image} style={{width: 100, height: 100}}/>
                                                        <div className="pl-5">
                                                            <p className="text-sm">
                                                                Tác giả: {e?.displayName ? e?.displayName : "Admin"}
                                                            </p>
                                                            <p className="font-bold text-xl">{e?.identify_title}</p>
                                                            <p className="py-2 text-sm">{dayjsInstance(e?.create_at).format("HH:mm:ss DD/MM/YYYY")}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Col>    
                                        ))}
                                    </Row>

                                    <Pagination
                                        className="flex justify-center absolute inset-x-0 bottom-0"
                                        current={pagination.page}
                                        total={identify?.total}
                                        pageSize={pagination.pageSize}
                                        showSizeChanger
                                        onChange={(p, ps)=> {
                                            setPagination({
                                                page: p,
                                                pageSize: ps
                                            })
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}