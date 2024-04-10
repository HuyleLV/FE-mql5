import { Row, Col, Button } from "antd";
import icon_4 from "../../component/image/icon/18.svg"
import icon_5 from "../../component/image/icon/19.svg"
import icon_6 from "../../component/image/icon/20.svg"
import icon_7 from "../../component/image/icon/21.svg"
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaHandHolding } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { TbSettingsCog } from "react-icons/tb";
import { GrUserSettings } from "react-icons/gr";
import { PiUserSwitch } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";
import { AiOutlineGlobal } from "react-icons/ai";
import { TiGroup } from "react-icons/ti";

export default function Ecosystem({ setIsModalOpen }) {

    let textWhite = "#ffffff";
    let colorBlue = "#ffffff"

    return (
        <div className="py-5 bg-slate-50 rounded-3xl bg-gradient-to-r from-green-800 to-blue-600">
            <div className="max-w-screen-2xl items-center mx-auto text-center" >
                <p className="font-bold text-3xl textWhite pb-10"> Hệ Sinh Thái Net Partner</p>

                <Row style={{ flex: 1, justifyContent: "space-between" }}>
                    <Col xs={24} xl={4} className="px-4 justify-center">
                        <div className="flex justify-center items-center pb-16">
                            <HiMiniUserGroup size={60} color={colorBlue} />
                            <FaHandHolding size={100} color={colorBlue} style={{ position: "absolute", marginTop: 50 }} />
                        </div>
                        <p className="font-semibold text-xl textWhite">5.000+</p>
                        <p className="text-xl font-semibold textWhite">
                            Khách Hàng
                        </p>
                    </Col>
                    <Col xs={24} xl={4} className="px-4">
                        <div className="flex justify-center items-center pb-5">
                            <HiOutlineLightBulb size={100} color={colorBlue} />
                            <TbSettingsCog size={30} color={colorBlue} style={{ position: "absolute", marginTop: -40 }} />
                        </div>
                        <p className="font-semibold text-xl textWhite">6 Năm</p>
                        <p className="text-xl font-semibold textWhite">
                            Phát Triển Mạnh Mẽ
                        </p>
                    </Col>
                    <Col xs={24} xl={4} className="px-4">
                        <div className="flex justify-center items-center pb-5">
                            <GrUserSettings size={100} color={colorBlue} />
                        </div>
                        <p className="font-semibold text-xl textWhite">10+</p>
                        <p className="text-xl font-semibold textWhite">
                            Master Trade
                        </p>
                    </Col>
                    <Col xs={24} xl={4} className="px-4">
                        <div className="flex justify-center items-center">
                            <PiUserSwitch size={120} color={colorBlue} />
                            <LuPackage size={20} color={colorBlue} style={{ position: "absolute" }} />
                        </div>
                        <p className="font-semibold text-xl textWhite">50+</p>
                        <p className="text-xl font-semibold textWhite">
                            Giải Pháp Giao Dịch
                        </p>
                    </Col>
                    <Col xs={24} xl={4} className="px-4">
                        <div className="flex justify-center items-center pb-5">
                            <AiOutlineGlobal size={100} color={colorBlue} />
                            <TiGroup size={80} color={colorBlue} style={{ position: "absolute", marginTop: 70 }} />
                        </div>
                        <p className="font-semibold text-xl textWhite">Cộng Đồng</p>
                        <p className="text-xl font-semibold textWhite">
                            Giao Dịch Chuyên Nghiệp
                        </p>
                    </Col>
                </Row>

                <Button onClick={() => setIsModalOpen(true)} type="primary" className="mx-2"><p className="font-bold text-base" style={{ color: colorBlue }}>Tham Gia Ngay</p></Button>
            </div>
        </div>
    )
}