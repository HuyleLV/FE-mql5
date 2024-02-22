import { Link } from "react-router-dom";
import { Flex, Tooltip, Image, Row, Col, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import logo from "../component/image/logo.png"
import { useDevice } from "../hooks";

export default function Footer() {
  const { isMobile } = useDevice();

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-2xl items-center mx-auto mt-20 pt-10 pb-5" id="footer">
        <Row className={isMobile ? "px-[50px]" : "pb-10"}>
          <Col xs={24} xl={6}>
            <img src={logo} width={150}/>
            <p className="py-1 pt-2"><span className="text-white font-medium">Địa chỉ: <span className="text-[#999999]">97 Trần Bình, Mỹ Đình 2, Nam Từ Liêm,<p> Hà Nội</p></span></span></p>
            <p><span className="text-white font-medium">Điện thoại: <span className="text-[#999999]">0356496403</span></span></p>
            <p className="py-1"><span className="text-white font-medium">Email: <span className="text-[#999999]">invest.netpartner@gmail.com</span></span></p>
            <p><span className="text-white font-medium">Website: <Link to={"https://netpartner.com.vn"} className="text-[#999999]">netpartner.com.vn</Link></span></p>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={6}>
            <div className="border-b-2 w-[70px] border-amber-200">
              <p className="font-medium text-white py-2">DỊCH VỤ</p>
            </div>
            <div className="text-[#999999] font-medium">
              <p className="py-1 pt-4">Trang chủ</p>
              <p>Giới thiệu</p>
              <p className="py-1">Sản phẩm</p>
              <p>Tin Tức</p>
              <p className="py-1">Sự kiện</p>
              <p>Cơ hội hợp tác</p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={6}>
            <div className="border-b-2 w-[110px] border-amber-200">
              <p className="font-medium text-white py-2">DỊCH VỤ KHÁC</p>
            </div>
            <div className="text-[#999999] font-medium">
              <p className="py-1 pt-4">Tuyển Dụng</p>
              <p>Chính Sách</p>
              <p className="py-1">Đối Tác</p>
              <p>Hỗ Trợ</p>
              <p className="py-1">Cộng Đồng</p>
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

          </Col>
        </Row>
      </div>
        <p className="text-center border-t border-gray-600 py-2 text-[#999999]">© 2018-2023 Bản quyền thuộc về Netpartner</p>
    </div>
  );
}
