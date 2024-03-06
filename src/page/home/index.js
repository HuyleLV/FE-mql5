import { Col, Row } from "antd"
import banner from "../../component/image/banner_home.jpg"

export default function Home() {
    return (
        <div>
            <div style={{ backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: 800 }}>
                <div className="max-w-screen-2xl items-center mx-auto pt-10 text-white">
                    <p className="font-bold text-xl">Đỉnh Cao Công Nghệ Tài Chính</p>
                    <p className="font-bold text-4xl pt-20">
                        Xây dựng sự giàu có của bạn bằng nền tảng của chúng tôi
                    </p>
                    <p className="font-semibold text-xl">Công cụ tối ưu được cung cấp bởi Netpartner</p>
                </div>
            </div>
            <div className="max-w-screen-2xl items-center mx-auto pt-10 text-black">
                <Row>
                    <Col xs={24} xl={12} className="pb-10">
                        <p>Trade with Confidence</p>
                    </Col>
                    <Col xs={24} xl={12} className="pb-10">
                        123
                    </Col>
                </Row>
            </div>
        </div>
    )
}