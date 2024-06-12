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

export default function Footer() {
  const { isMobile } = useDevice();

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-2xl items-center mx-auto pt-10 pb-5" id="footer">
        <p className="py-10 text-center text-white text-xl font-semibold">
          Tipper Trade - Cung cấp những giải pháp tài chính nhanh nhất, hiệu quả nhất, chính xác nhất cho <br/>
          mỗi khách hàng của từng doanh nghiệp
        </p>
        <Row className={isMobile ? "px-[50px]" : "pb-10"}>
          <Col xs={24} xl={6}>
            <img src={logo} width={150}/>
            <div className="text-base text-white">
              <p className="py-1 pt-2"><span className="text-white font-medium">Địa chỉ: <span className="text-[#999999]">Nguyễn Hoàng, Mỹ Đình 2, Nam Từ Liêm,<p> Hà Nội</p></span></span></p>
              <p><span className="text-white font-medium">Điện thoại: <span className="text-[#999999]">0356 496 403</span></span></p>
              <p className="py-1"><span className="text-white font-medium">Email: <span className="text-[#999999]">Support@Netpartner.com.vn</span></span></p>
              <p><span className="text-white font-medium">Website: <Link to={"https://netpartner.com.vn"} className="text-[#999999]">netpartner.com.vn</Link></span></p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[140px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">HOME</p>
            </div>
            <div className="font-medium text-lg">
              <a href="https://netpartner.com.vn/">
                <p className="py-1 pt-4 text-[#999999]"><CaretRightOutlined /> Trang Chủ</p>
              </a>
              <a href="https://netpartner.com.vn/san-pham/">
                <p className="text-[#999999]"><CaretRightOutlined /> Sản Phẩm</p>
              </a>
              <a href="https://netpartner.com.vn/thi-truong/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Thị Trường</p>
              </a>
              <a href="https://netpartner.com.vn/blocks/block-giai-phap/">
                <p className="text-[#999999]"><CaretRightOutlined /> Giải Pháp</p>
              </a>
              <a href="https://netpartner.com.vn/tai-lieu/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Tài Liệu</p>
              </a>
              <a href="https://netpartner.com.vn/blocks/footer-about-us/">
                <p className="text-[#999999]"><CaretRightOutlined /> Về Chúng Tôi</p>
              </a>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[140px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">DỊCH VỤ</p>
            </div>
            <div className="font-medium text-lg">
              <a href="https://netpartner.com.vn/giai-phap-toan-dien/">
                <p className="py-1 pt-4 text-[#999999]"><CaretRightOutlined /> Giải Pháp Giao Dịch</p>
              </a>
              <a href="https://netpartner.com.vn/tai-lieu/zoom-thuc-chien/">
                <p className="text-[#999999]"><CaretRightOutlined /> Zoom Thực Chiến</p>
              </a>
              <a href="https://netpartner.com.vn/dao-tao-nhan-luc/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Đào Tạo Nhân Lực</p>
              </a>
              <a href="https://netpartner.com.vn/co-van-tai-chinh/">
                <p className="text-[#999999]"><CaretRightOutlined /> Cố Vấn Tài Chính</p>
              </a>
              <a href="https://netpartner.com.vn/phan-mem-ket-noi/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Phần Mềm Kết Nối</p>
              </a>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[140px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">THÔNG TIN</p>
            </div>
            <div className="font-medium text-lg">
              <a href="https://netpartner.com.vn/thong-tin/">
                <p className="py-1 pt-4 text-[#999999]"><CaretRightOutlined /> Thông Tin</p>
              </a>
              <a href="https://netpartner.com.vn/co-hoi-hop-tac/">
                <p className="text-[#999999]"><CaretRightOutlined /> Cơ Hội Hợp Tác</p>
              </a>
              <a href="https://netpartner.com.vn/co-hoi-lam-viec/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Cơ Hội Làm Việc</p>
              </a>
              <a href="https://netpartner.com.vn/chinh-sach-bao-mat/">
                <p className="text-[#999999]"><CaretRightOutlined /> Chính Sách Bảo Mật</p>
              </a>
              <a href="https://netpartner.com.vn/ho-tro/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Hỗ Trợ</p>
              </a>
              <a href="https://netpartner.com.vn/cong-dong/">
                <p className="py-1 text-[#999999]"><CaretRightOutlined /> Cộng Đồng</p>
              </a>
            </div>
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
        <p className="text-center border-t border-gray-600 py-2 text-[#999999]">Since 2016 © - Bản Quyền Thuộc Về Net Partner</p>
    </div>
  );
}
