import { Link } from "react-router-dom";
import { Flex, Tooltip, Image, Row, Col, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import logo from "../component/image/logo.png"
import { useDevice } from "../hooks";
import { CaretRightOutlined } from "@ant-design/icons";

export default function Footer() {
  const { isMobile } = useDevice();

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-2xl items-center mx-auto mt-20 pt-10 pb-5" id="footer">
        <p className="py-5 text-center text-white text-xl font-semibold">
          NETPARTNER - Cung cấp những giải pháp tài chính nhanh nhất, hiệu quả nhất, chính xác nhất cho <br/>
          mỗi khách hàng của từng doanh nghiệp
        </p>
        <Row className={isMobile ? "px-[50px]" : "pb-10"}>
          <Col xs={24} xl={6}>
            <img src={logo} width={150}/>
            <div className="text-base text-white">
              <p className="py-1 pt-2"><span className="text-white font-medium">Địa chỉ: <span className="text-[#999999]">97 Trần Bình, Mỹ Đình 2, Nam Từ Liêm,<p> Hà Nội</p></span></span></p>
              <p><span className="text-white font-medium">Điện thoại: <span className="text-[#999999]">0356496403</span></span></p>
              <p className="py-1"><span className="text-white font-medium">Email: <span className="text-[#999999]">invest.netpartner@gmail.com</span></span></p>
              <p><span className="text-white font-medium">Website: <Link to={"https://netpartner.com.vn"} className="text-[#999999]">netpartner.com.vn</Link></span></p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[100px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">HOME</p>
            </div>
            <div className="text-[#999999] font-medium text-lg text-[#999999]">
              <p className="py-1 pt-4"><CaretRightOutlined /> Home</p>
              <p><CaretRightOutlined /> Trang Chủ</p>
              <p className="py-1"><CaretRightOutlined /> Thị Trường</p>
              <p><CaretRightOutlined /> Giải Pháp</p>
              <p className="py-1"><CaretRightOutlined /> Tài Liệu</p>
              <p><CaretRightOutlined /> Về Chúng Tôi</p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[100px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">DỊCH VỤ</p>
            </div>
            <div className="text-[#999999] font-medium text-lg text-[#999999]">
              <p className="py-1 pt-4"><CaretRightOutlined /> Giải Pháp Giao Dịch</p>
              <p><CaretRightOutlined /> Zoom Thực Chiến</p>
              <p className="py-1"><CaretRightOutlined /> Đào Tạo Nhân Lực</p>
              <p><CaretRightOutlined /> Cố Vấn Tài Chính</p>
              <p className="py-1"><CaretRightOutlined /> Phần Mềm Kết Nối</p>
            </div>
          </Col>
          <Col xs={isMobile ? 12 : 24} xl={4}>
            <div className="border-b-2 w-[140px] border-amber-200">
              <p className="font-medium text-white py-2 text-lg">THÔNG TIN</p>
            </div>
            <div className="text-[#999999] font-medium text-lg text-[#999999]">
              <p className="py-1 pt-4"><CaretRightOutlined /> Thông Tin</p>
              <p><CaretRightOutlined /> Cơ Hội Hợp Tác</p>
              <p className="py-1"><CaretRightOutlined /> Cơ Hội Làm Việc</p>
              <p><CaretRightOutlined />  Chính Sách Bảo Mật</p>
              <p className="py-1"><CaretRightOutlined />  Hỗ Trợ</p>
              <p className="py-1"><CaretRightOutlined />  Cộng Đồng</p>
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
