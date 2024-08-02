import { Button, Col, DatePicker, Pagination, Rate, Row, Space, Table, message } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import dayjs from "dayjs";
import {
    ShareAltOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { Country } from "../../utils/country";
import axiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";

export default function EcoCalendar() {  
    const [economicNewsHot, setEconomicNewsHot] = useState([]);
    const [economicNews, setEconomicNews] = useState([]);
    const [indicatorNews, setIndicatorNews] = useState([]);
    const [follow, setFollow] = useState(0);
    const [cookies] = useCookies(["user"]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5,
    });

    const getAllEconomicNews = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/economicNews/getAll`, {params: pagination})
            .then(({ data }) => {
                setEconomicNews(data?.data);
            });
    }

    const getAllIndicatorNews = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/indicatorNews/getByTime`, {
                params: {
                    create_at: dayjs(new Date()),
                    create_atD: dayjs(new Date()).add(1, 'day').format("YYYY-MM-DD 00:00:00")
                }
            })
            .then(({ data }) => {
                setIndicatorNews(data);
            });
    }

    const getAllHot = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/economicNews/getAllHot`)
            .then(({ data }) => {
                setEconomicNewsHot(data);
            });
    }  

    const checkFollow = async () => {
        const user_id = cookies?.user?.user_id;
        await axiosInstance
            .get(`/economicNews/checkFollow`, {params: {
                user_id: user_id
            }})
            .then(({ data }) => {
                setFollow(data?.status);
            });
    }  
    
    const onFollow = async () => {
        const user_id = cookies?.user?.user_id;
        await axiosInstance
          .post(`/economicNews/follow`, {user_id: user_id})
          .then((res) => {
            checkFollow();
            message.success(String(res?.data?.message));
          })
          .catch(({ response }) => {
            message.error(String(response?.data?.message));
          });
    };
    
    const unFollow = async () => {
        const user_id = cookies?.user?.user_id;
        await axiosInstance
          .post(`/economicNews/unFollow`, {user_id: user_id})
          .then((res) => {
            checkFollow();
            message.success(String(res?.data?.message));
          })
          .catch(({ response }) => {
            message.error(String(response?.data?.message));
          });
    };

    const onChange = async (date) => {
        const create_at = dayjs(date).format("YYYY-MM-DD");
        const create_atD = dayjs(date).add(1, 'day').format("YYYY-MM-DD 00:00:00");
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/indicatorNews/getByTime`, {
                    params: {
                        create_at: create_at,
                        create_atD: create_atD
                    }
                }
            )
            .then(({ data }) => {
                setIndicatorNews(data);
            });
    }

    const columns = [
        {
          title: <p className="text-center">Thời gian</p>,
          dataIndex: 'create_at',
          width: 200,
          key: 'create_at',
          render: (create_at) => <div className="text-center">{dayjsInstance(create_at).format("HH:mm:ss")}</div>,
        },
        {
          title: 'IMP',
          dataIndex: 'indicator_news_imp',
          width: 200,
          key: 'indicator_news_imp',
          render: (indicator_news_imp) => <div><Rate disabled defaultValue={indicator_news_imp}/></div>,
        },
        {
          title: '',
          dataIndex: 'indicator_news_country',
          width: 150,
          key: 'indicator_news_country',
          render: (indicator_news_country) => <div>{Country(indicator_news_country)}</div>,
        },
        {
          title: 'Tên chỉ báo',
          dataIndex: 'indicator_news_title',
          key: 'indicator_news_title',
          render: (indicator_news_title) => <div className="font-semibold">{indicator_news_title}</div>,
        },
        {
          title: <div className="text-center">Thực tế</div>,
          dataIndex: 'indicator_news_real',
          width: 120,
          key: 'indicator_news_real',
          render: (indicator_news_real) => <div className="font-semibold text-center">{indicator_news_real} Tr</div>,
        },
        {
          title: <div className="text-center">Dự báo</div>,
          dataIndex: 'indicator_news_forecast',
          width: 120,
          key: 'indicator_news_forecast',
          render: (indicator_news_forecast) => <div className="text-center">{indicator_news_forecast} Tr</div>,
        },
        {
          title: <div className="text-center">Trước đó</div>,
          dataIndex: 'indicator_news_before',
          width: 120,
          key: 'indicator_news_before',
          render: (indicator_news_before) => <div className="text-center">{indicator_news_before} Tr</div>,
        }
    ];

    useEffect(() => { 
        getAllHot();
        getAllEconomicNews();
        getAllIndicatorNews();
    }, [pagination]);

    useEffect(() => { 
        checkFollow();
    }, [follow]);

    return (
        <div className="max-w-screen-2xl mx-auto py-10">
            <div class="grid grid-cols-3 gap-4 border-2 border-black rounded-2xl p-5">
                <div className="flex justify-center">
                    <img src={image_mk4} className="h-[250px] rounded-2xl"/>
                </div>
                <div className="col-span-2 h-[120px]">
                    <div>
                        <p className="font-bold text-4xl">Lịch Kinh Tế Hàng Ngày</p>
                        <p className="text-2xl pt-4">
                            Để nhanh chóng tìm hiểu động lực thị trường và theo dõi trọng <br></br>
                            tâm thị trường chỉ trong 10-15 phút.
                        </p>
                    </div>
                    <div className="flex items-end h-full">
                        {follow === 0 ? 
                            <button 
                                className="border rounded-full bg-blue-500 px-4 py-1 text-xl font-semibold text-white hover:bg-blue-400"
                                onClick={onFollow}
                            >
                                Theo Dõi
                            </button>
                            :
                            <button 
                                className="border rounded-full bg-blue-500 px-4 py-1 text-xl font-semibold text-white hover:bg-blue-400"
                                onClick={unFollow}
                            >
                                Đã Theo Dõi
                            </button>
                        }
                        <button className="border rounded-full bg-blue-500 px-4 py-1 text-xl font-semibold text-white hover:bg-blue-400 ml-10">Chia Sẻ</button>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="pt-10 pb-5">
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()))} className="mr-4"><p className="font-semibold">Hôm Nay</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(1, 'day'))}><p className="font-semibold">Hôm Qua</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(2, 'day'))} className="mx-4"><p className="font-semibold">Hôm Kia</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(7, 'day'))} className="mr-4"><p className="font-semibold">Tuần Trước</p></Button>
                    <DatePicker 
                        onChange={onChange}
                        format={'DD/MM/YYYY'} 
                    />
                </div>
                <Table columns={columns} dataSource={indicatorNews} pagination={false}/>
            </div>

            <Row>
                <Col xs={24} xl={16} className="pr-10">
                    <p className="font-bold text-2xl pb-5">Bản Tin Tài Chính</p>
                    <div className="border-2 border-black rounded-2xl">

                        {economicNews.map((_, i) => (
                            <a href={"/lich-kinh-te/" + _?.economic_news_slug} style={{color: "black"}}>
                                <div className="grid grid-cols-3 gap-4 p-5">
                                    <div>
                                        <img src={_?.economic_news_image} className="h-[200px] w-full"/>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-bold text-xl">{_?.economic_news_title}</p>
                                        <p className="text-lg pt-5 line-clamp-3">
                                            {parse(String(_?.economic_news_description).replaceAll("ul>","p>"))}
                                        </p>
                                        <div className="flex justify-between pt-10">
                                            <p className="font-normal text-gray-600">{_?.displayName}, {dayjsInstance(_?.create_at).format("DD/MM/YYYY HH:mm:ss")}</p>
                                            <ShareAltOutlined className="text-xl pr-10"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}

                    </div>
                    <div className="py-10">
                        <Pagination
                            className="flex justify-center"
                            current={pagination.page}
                            total={economicNews?.total}
                            pageSize={pagination.pageSize}
                            onChange={(p, ps)=> {
                                setPagination({
                                    page: p,
                                    pageSize: ps
                                })
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} xl={8}>
                    <p className="font-bold text-2xl pb-5">Bài Viết Hot Nhất</p>
                    <div className="border-2 border-black rounded-2xl p-5">

                        {economicNewsHot.map((_, i)=> (
                            <a href={"/lich-kinh-te/" + _?.economic_news_slug} style={{color: "black"}}>
                                <div className="flex py-2">
                                    <p className="px-5 font-bold text-lg">{i + 1}</p>
                                    <p className="px-5 font-semibold text-lg">
                                        {_?.economic_news_title}
                                    </p>
                                </div>
                            </a>
                        ))}

                    </div>
                </Col>
            </Row>
        </div>
    )
}