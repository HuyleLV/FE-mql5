import { Button, List, Modal } from "antd";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FcClock } from "react-icons/fc";
import { useState } from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { IoIosCloseCircle } from "react-icons/io";

const data = [
    {
        id: 1,
        bg: "https://s.yimg.com/ny/api/res/1.2/1MeXBD5_hlfWnSza7kExTA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en-US/smartasset_475/b6c17b22f2cc4933962f5f63487d48ee",
        time: "1 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust"
    },
    {
        id: 2,
        bg: "https://tyretradenews.co.uk/wp-content/uploads/2024/02/Tyre-Trade-News-Premium-Banner-Design.png",
        time: "2 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8"
    },
    {
        id: 3,
        bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx88kxa4SpAiS49jv9yl0C7QcYU6nu5uIMgLydoOvvRjWXKGagkgTPxmcOUDwxgB4IKAQ&usqp=CAU",
        time: "5 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8"
    },
    {
        id: 4,
        bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQykkKixAOE2AU_VFc0PKAIzKKCVuiaYdjphzIWFwlllE5ZRQ-LUdAiih8YoyTPt8dktg&usqp=CAU",
        time: "8 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8"
    },
    {
        id: 5,
        bg: "https://images.squarespace-cdn.com/content/v1/5c5301e87e3c3a8835cb3689/ab2ae5ef-dd93-4f42-977c-2ecb0abd84a9/Mainstream+Media.png",
        time: "22 giờ trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8"
    },
    {
        id: 6,
        bg: "https://pnghausbung.com/wp-content/uploads/2023/05/Marru-china.jpg",
        time: "1 tháng trước",
        title: "Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust",
        video: "https://www.youtube.com/embed/q2iF26_Nf-8"
    },
]

export default function JobTrade() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div className="w-full p-5">
            <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Nghề Trading</p>
            <div className="w-full mt-8">
                <Slide slidesToScroll={1} slidesToShow={data.length} indicators={true} arrows={false}>
                    {data.map(item => (
                        <div onClick={handleOpen} className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(${item.bg})` }}>
                            <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                                <FcClock size={22} />
                                <div className="font-semibold text-xs">{item.time}</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: 10 }}>
                                <div className="font-semibold text-xs textWhite line-clamp-2" >{item.title}</div>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>

            <Dialog open={open} handler={handleOpen} onClick={handleOpen} style={{ background: "#00000099" }}>
                <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <iframe
                        className="pt-10"
                        width="1000"
                        height="600"
                        src="https://www.youtube.com/embed/q2iF26_Nf-8?autoplay=1"
                        title="TakePropips Trading Management Solutions EA Overview"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </DialogBody>
            </Dialog>
        </div>
    )
}