import { Button, List, Modal, message } from "antd";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FcClock } from "react-icons/fc";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { calc } from "antd/es/theme/internal";
import { useWindowSize } from "@uidotdev/usehooks";
import axios from "axios";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from "react-time-ago";

import en from 'javascript-time-ago/locale/en'

const data = [
    {
        id: 1,
        bg: "https://s.yimg.com/ny/api/res/1.2/1MeXBD5_hlfWnSza7kExTA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en-US/smartasset_475/b6c17b22f2cc4933962f5f63487d48ee",
        time: "1 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        short: "YJAWDpUpDwg"
    },
    {
        id: 2,
        bg: "https://tyretradenews.co.uk/wp-content/uploads/2024/02/Tyre-Trade-News-Premium-Banner-Design.png",
        time: "2 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8",
        short: "SZO3q3mHY5k"
    },
    {
        id: 3,
        bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx88kxa4SpAiS49jv9yl0C7QcYU6nu5uIMgLydoOvvRjWXKGagkgTPxmcOUDwxgB4IKAQ&usqp=CAU",
        time: "5 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8",
        short: "CBuxuLtvMv4"
    },
    {
        id: 4,
        bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQykkKixAOE2AU_VFc0PKAIzKKCVuiaYdjphzIWFwlllE5ZRQ-LUdAiih8YoyTPt8dktg&usqp=CAU",
        time: "8 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8",
        short: "07-yoRLfYeo"
    },
    {
        id: 5,
        bg: "https://images.squarespace-cdn.com/content/v1/5c5301e87e3c3a8835cb3689/ab2ae5ef-dd93-4f42-977c-2ecb0abd84a9/Mainstream+Media.png",
        time: "22 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8",
        short: "AR5xIzPK-1M"
    },
    {
        id: 6,
        bg: "https://pnghausbung.com/wp-content/uploads/2023/05/Marru-china.jpg",
        time: "1 tháng trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8",
        short: "Ewpfxu7s_Uk"
    },
]

export default function JobTrade() {
    const size = useWindowSize();

    const [open, setOpen] = useState(false);

    const [idVideo, setIdVideo] = useState(0);

    const [shorts, setShorts] = useState([]);

    const handleOpen = () => setOpen(!open);

    const handleId = (id) => {
        setIdVideo(id);
    };

    const handleNext = () => (idVideo >= 0 && idVideo < (shorts?.data?.length - 1) && setIdVideo((cur) => cur + 1));
    const handlePrev = () => (idVideo > 1 && idVideo <= (shorts?.data?.length - 1) && setIdVideo((cur) => cur - 1));

    const fetchShorts = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/short/getAllNoPage`)
            .then((res) => {
                const data = res?.data;
                setShorts(data);
            })
            .catch(() => message.error("Error server!"));
    };

    useEffect(() => {
        fetchShorts()
    }, [])

    useEffect(() => {
        TimeAgo.addDefaultLocale(en)
    }, [])

    return (
        <div className="w-full p-5">
            <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Nghề Trading</p>
            <div className="w-full mt-8">
                {shorts?.length < 1 ? null :
                    <Slide slidesToScroll={1} slidesToShow={shorts?.data?.length} indicators={true} arrows={false}>
                        {shorts?.data?.map((item, index) => (
                            <div onClick={() => (handleId(index), handleOpen())} className="w-auto h-[350px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(${item.img})` }}>
                                <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                                    <FcClock size={22} />
                                    <div className="font-semibold text-[10px]">
                                        <ReactTimeAgo date={item.create_at} locale="en-US" />
                                    </div>
                                </div>
                                <div style={{ position: 'absolute', bottom: 10 }}>
                                    <div className="font-semibold text-xs textWhite line-clamp-2" >{item.short_title}</div>
                                </div>
                            </div>
                        ))}
                    </Slide>
                }
            </div>

            {shorts.length < 1 ? null :
                <Dialog open={open} handler={handleOpen} style={{ background: "#00000099" }}>
                    <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }} >
                        <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                            <div class="iframe-wrapper">
                                <FaCircleChevronLeft size={30} onClick={handlePrev} color={idVideo > 1 && idVideo <= (shorts?.data?.length - 1) ? "#fff" : "#828282"} style={{ marginRight: 30 }} />
                                <iframe width="315" height="560"
                                    src={"https://www.youtube.com/embed/" + shorts?.data[idVideo]?.short_link + "?autoplay=1&controls=0&loop=1000&playlist=" + shorts?.data[idVideo]?.short_link + "&rel=0"}
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                                <FaCircleChevronRight size={30} onClick={handleNext} color={idVideo >= 0 && idVideo < (shorts?.data?.length - 1) ? "#fff" : "#828282"} style={{ marginLeft: 30 }} />
                            </div>
                            <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                        </div>

                    </DialogBody>
                </Dialog>
            }
        </div>
    )
}