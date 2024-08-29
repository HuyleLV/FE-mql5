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

export default function JobTrade({shorts}) {
    const size = useWindowSize();

    const [open, setOpen] = useState(false);

    const [idVideo, setIdVideo] = useState(0);

    const handleOpen = () => setOpen(!open);

    const handleId = (id) => {
        setIdVideo(id);
    };

    const handleNext = () => (shorts?.data ? idVideo >= 0 && idVideo < (shorts?.data?.length - 1) && setIdVideo((cur) => cur + 1) : idVideo >= 0 && idVideo < (shorts?.length - 1) && setIdVideo((cur) => cur + 1));
    const handlePrev = () => (shorts?.data ? idVideo > 1 && idVideo <= (shorts?.data?.length - 1) && setIdVideo((cur) => cur - 1) : idVideo > 1 && idVideo <= (shorts?.length - 1) && setIdVideo((cur) => cur - 1));


    useEffect(() => {
        TimeAgo.addDefaultLocale(en);
        console.log(shorts?.data)
    }, [])

    return (
        <div className={`w-full ${shorts?.data ? "mt-4" : ""}`}>
            <div className="w-full">
                {shorts?.length < 1 ? null : 
                    shorts?.data ?
                        <Slide slidesToScroll={1} slidesToShow={3} indicators={true} arrows={false}>
                            {shorts?.data?.map((item, index) => (
                                <div 
                                    onClick={() => (handleId(index), handleOpen())} 
                                    className="w-auto h-[400px] p-1 m-1" 
                                    style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(${item.short_image})` }}>
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
                    :   
                    shorts ?
                        <Slide slidesToScroll={1} slidesToShow={3} indicators={true} arrows={false}>
                            {shorts?.map((item, index) => (
                                <div onClick={() => (handleId(index), handleOpen())} className="w-auto h-[490px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(${item?.image})` }}>
                                    <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                                        <FcClock size={22} />
                                        <div className="font-semibold text-[10px]">
                                            {/* <ReactTimeAgo date={item.create_at} locale="en-US" /> */}
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 10 }}>
                                        <div className="font-semibold text-xs textWhite line-clamp-2" >{item?.title}</div>
                                    </div>
                                </div>
                            ))}
                        </Slide>
                    : <></>
                }
            </div>

            {shorts.length < 1 ? null :
                shorts?.data ?
                    <Dialog open={open} handler={handleOpen} className="h-screen" style={{ background: "#00000099" }}>
                        <DialogBody style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }} >
                            <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                                <div class="iframe-wrapper">
                                    <FaCircleChevronLeft 
                                        className="cursor-pointer"
                                        size={30} 
                                        onClick={handlePrev} 
                                        color={idVideo > 1 && idVideo <= (shorts?.data?.length - 1) ? "#fff" : "#828282"} 
                                        style={{ marginRight: 30 }} />
                                    <iframe  
                                        style={{ width: '315px', height: "800px" }}
                                        src={"https://www.youtube.com/embed/" + shorts?.data?.[idVideo]?.short_link + "?autoplay=1&controls=0&loop=1000&playlist=" + shorts?.data?.[idVideo]?.short_link + "&rel=0"}
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen></iframe>
                                    <FaCircleChevronRight 
                                        className="cursor-pointer"
                                        size={30} 
                                        onClick={handleNext} 
                                        color={idVideo >= 0 && idVideo < (shorts?.data?.length - 1) ? "#fff" : "#828282"} 
                                        style={{ marginLeft: 30 }} />
                                </div>
                                <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                            </div>

                        </DialogBody>
                    </Dialog> :
                shorts ? 
                    <Dialog open={open} handler={handleOpen} className="h-screen" style={{ background: "#00000099" }}>
                        <DialogBody style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }} >
                            <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                                <div class="iframe-wrapper">
                                    <FaCircleChevronLeft 
                                        className="cursor-pointer"
                                        size={30} 
                                        onClick={handlePrev} 
                                        color={idVideo > 1 && idVideo <= (shorts?.length - 1) ? "#fff" : "#828282"} 
                                        style={{ marginRight: 30 }} />
                                    <iframe  
                                        style={{ width: '315px', height: "800px" }}
                                        src={"https://www.youtube.com/embed/" + shorts?.[idVideo]?.link + "?autoplay=1&controls=0&loop=1000&playlist=" + shorts?.[idVideo]?.link + "&rel=0"}
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen></iframe>
                                    <FaCircleChevronRight 
                                        className="cursor-pointer"
                                        size={30} 
                                        onClick={handleNext} 
                                        color={idVideo >= 0 && idVideo < (shorts?.length - 1) ? "#fff" : "#828282"} 
                                        style={{ marginLeft: 30 }} />
                                </div>
                                <div onClick={handleOpen} style={{ width: size.width / 2 - 350, height: size.height - 100 }}></div>
                            </div>

                        </DialogBody>
                    </Dialog> : <></>
            }
        </div>
    )
}