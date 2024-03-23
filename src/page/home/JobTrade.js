import { Button, List } from "antd";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FcClock } from "react-icons/fc";

const data = [
    {
        id: 1,
        avatar: null,
        name: "xxMasterxx",
        idUser: "541",
        Profit: "10000",
        WinRate: "97%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone X"
    },
    {
        id: 2,
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png",
        name: "SasumRR",
        idUser: "133",
        Profit: "78000",
        WinRate: "98%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone Y"
    },
    {
        id: 3,
        avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        name: "DA SUN KID",
        idUser: "12",
        Profit: "38000",
        WinRate: "95%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone Z"
    },
    {
        id: 4,
        avatar: "https://www.shareicon.net/data/2016/09/01/822739_user_512x512.png",
        name: "Women Dark",
        idUser: "841",
        Profit: "12000",
        WinRate: "87%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone N"
    },
]

export default function JobTrade() {

    return (
        <div className="w-full p-5">
            <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Nghề Trading</p>
            <div className="w-full mt-8">
                <Slide slidesToScroll={1} slidesToShow={6} indicators={true} arrows={false}>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://s.yimg.com/ny/api/res/1.2/1MeXBD5_hlfWnSza7kExTA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en-US/smartasset_475/b6c17b22f2cc4933962f5f63487d48ee)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">1 giờ trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust</div>
                        </div>
                    </div>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://tyretradenews.co.uk/wp-content/uploads/2024/02/Tyre-Trade-News-Premium-Banner-Design.png)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">2 giờ trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust</div>
                        </div>
                    </div>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx88kxa4SpAiS49jv9yl0C7QcYU6nu5uIMgLydoOvvRjWXKGagkgTPxmcOUDwxgB4IKAQ&usqp=CAU)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">5 giờ trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust</div>
                        </div>
                    </div>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQykkKixAOE2AU_VFc0PKAIzKKCVuiaYdjphzIWFwlllE5ZRQ-LUdAiih8YoyTPt8dktg&usqp=CAU)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">8 giờ trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust</div>
                        </div>
                    </div>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://images.squarespace-cdn.com/content/v1/5c5301e87e3c3a8835cb3689/ab2ae5ef-dd93-4f42-977c-2ecb0abd84a9/Mainstream+Media.png)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">22 giờ trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust Papasww</div>
                        </div>
                    </div>
                    <div className="w-auto h-[200px] p-1 m-1" style={{ position: "relative", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url(https://pnghausbung.com/wp-content/uploads/2023/05/Marru-china.jpg)` }}>
                        <div style={{ width: 100, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, background: "rgba(255, 255, 255, 0.7)" }}>
                            <FcClock size={22}/>
                            <div className="font-semibold text-xs">2 tháng trước</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 10 }}>
                        <div className="font-semibold text-xs textWhite line-clamp-2" >Treasury's Yellen Says Funding Bill Allows Lending of $21 Billion to IMF Trust</div>
                        </div>
                    </div>
                </Slide>
            </div>

        </div>
    )
}