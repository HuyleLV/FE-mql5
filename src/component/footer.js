import { Link } from "react-router-dom";
import { Flex, Tooltip, Image, Row, Col, Input, Button } from "antd";
import logo from "../component/image/logo.png"
import { useDevice } from "../hooks";
import { CaretRightOutlined } from "@ant-design/icons";
import facebook from "../component/image/facebook.png"
import twitter from "../component/image/twitter.png"
import youtube from "../component/image/youtube.png"
import instagram from "../component/image/instagram.png"
import telegram from "../component/image/telegram.png"
import bg_footer from "../component/image/bg_footer.jpg"

export default function Footer() {
  const { isMobile } = useDevice();

  return (
    <div style={{'--image-url': `url(${bg_footer})`}} className='bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center'>
      <div className="max-w-screen-2xl items-center mx-auto" id="footer">
        <p className="py-10 text-center text-white text-xl font-semibold">
          Tipper Trade - Cung cấp những giải pháp tài chính nhanh nhất, hiệu quả nhất, chính xác nhất cho <br/>
          mỗi khách hàng của từng doanh nghiệp
        </p>
        <Row className={isMobile ? "px-[50px]" : "pb-10"}>
          <Col xs={24} xl={4}>
            <img src={logo} width={150}/>
            <div className="text-base text-white">
              <p className="py-1 pt-2"><span className="text-white font-medium">Địa chỉ: <span className="text-[#999999]">Hà Nội, Việt Nam</span></span></p>
              <p><span className="text-white font-medium">Điện thoại: <span className="text-[#999999]">0964 412 494</span></span></p>
              <p className="py-1"><span className="text-white font-medium">Email: <span className="text-[#999999]">hello.tipper@gmail.com</span></span></p>
              <p><span className="text-white font-medium">Website: <Link to={"https://tippertrade.com"} className="text-[#999999]">tippertrade.com</Link></span></p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={14}>
            <Row>
              <Col xs={isMobile ? 12 : 24} xl={8}>
                <div className="border-b-2 w-[140px] border-amber-200">
                  <p className="font-medium text-white py-2 text-lg">HOME</p>
                </div>
                <div className="font-medium text-lg">
                  <a href="https://tippertrade.com/san-pham/">
                    <p className="text-[#999999] py-1 pt-4 "><CaretRightOutlined /> Sản Phẩm</p>
                  </a>
                </div>
              </Col>
              <Col xs={isMobile ? 12 : 24} xl={8}>
                <div className="border-b-2 w-[140px] border-amber-200">
                  <p className="font-medium text-white py-2 text-lg">DỊCH VỤ</p>
                </div>
                <div className="font-medium text-lg">
                  <a href="https://tippertrade.com/giai-phap-toan-dien/">
                    <p className="py-1 pt-4 text-[#999999]"><CaretRightOutlined /> Giải Pháp Giao Dịch</p>
                  </a>
                </div>
              </Col>
              <Col xs={isMobile ? 12 : 24} xl={8}>
                <div className="border-b-2 w-[140px] border-amber-200">
                  <p className="font-medium text-white py-2 text-lg">THÔNG TIN</p>
                </div>
                <div className="font-medium text-lg">
                  <a href="https://tippertrade.com/co-hoi-hop-tac/">
                    <p className="text-[#999999] py-1 pt-4"><CaretRightOutlined /> Cơ Hội Hợp Tác</p>
                  </a>
                </div>
              </Col>
              <Col xs={isMobile ? 12 : 24} xl={24}>
                <div className="text-center px-5 pt-16">
                  <p className="font-medium text-white text-lg">Cảnh báo rủi ro và miễn trừ trách nhiệm</p>
                  <p className="font-medium p-2 text-lg text-[#999999]">
                    Thị Trường Tài Chính là lĩnh vực đầu tư rất tiềm năng nhưng cũng tiềm ẩn đầy rủi ro. 
                    Bạn không nên mạo hiểm quá số tiền mà bạn có thể chấp nhận mất mát, bạn không nên giao dịch hay đầu tư trừ khi bạn hiểu thật 
                    sự đầy đủ về thị trường và mức độ rủi ro của nó. Việc giao dịch sử dụng đòn bẩy cao có thể rủi ro đáng kể với số vốn đầu tư của bạn. 
                    Vì vậy, bạn hãy nên tìm hiểu thật kỹ, xây dựng nền tảng giao dịch vững chắc trước khi tham gia và hoàn toàn chịu trách nhiệm với số vốn 
                    của mình.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={6}>
            <div className="border-b-2 w-[200px] border-amber-200">
              <p className="font-medium text-white py-2">ĐĂNG KÝ NHẬN THÔNG TIN</p>
            </div>
            <p className="py-4 text-[#999999] font-medium">Đừng bỏ lỡ các chương trình đào tạo và thông tin bất động sản siêu hấp dẫn</p>
            <div className="flex">
              <Input type="email" style={{width: "50%"}} placeholder="Địa chỉ Email"/>
              <Button type="primary" className="mx-2"><p className="font-semibold">ĐĂNG KÝ</p></Button>
            </div>

            <div className="border-b-2 w-[200px] border-amber-200 pt-5">
              <p className="font-medium text-white py-2">KẾT NỐI VỚI CHÚNG TÔI</p>
            </div>
            <div className="flex pt-5">
              <div className="border border-white rounded-full p-2 hover:bg-blue-500 hover:border-blue-500">
                <a target="_blank" href="https://www.facebook.com/NetAuAi">
                  <img src={facebook} width={20} height={20}/>
                </a>
              </div>
              <div className="border border-white rounded-full p-2 mx-3 hover:bg-black hover:border-black">
                <a target="_blank" href="https://twitter.com/Net_lnvest">
                  <img src={twitter} width={20} height={20}/>
                </a>
              </div>
              <div className="border border-white rounded-full p-2 hover:bg-pink-500 hover:border-pink-500">
                <a target="_blank" href="https://www.facebook.com/NetAuAi">
                  <img src={instagram} width={20} height={20}/>
                </a>
              </div>
              <div className="border border-white rounded-full p-2 mx-3 hover:bg-red-500 hover:border-red-500 flex items-center">
                <a target="_blank" href="https://www.youtube.com/channel/UCbHKyoqNuV8gBrNSdtTt67A">
                  <img src={youtube} width={20} height={20}/>
                </a>
              </div>
              <div className="border border-white rounded-full p-2 hover:bg-blue-500 hover:border-blue-500 flex items-center">
                <a target="_blank" href="https://t.me/Net_lnvest">
                  <img src={telegram} width={20} height={20}/>
                </a>
              </div>
              
            </div>
          </Col>
        </Row>
      </div>
        <p className="text-center border-t border-gray-600 py-2 text-[#999999]">Since 2020 © - Bản Quyền Thuộc Về Tipper Trade</p>
    </div>
  );
}
