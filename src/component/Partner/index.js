import { Row, Col, Form, Input, Button } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import bg_doitac from "../../component/image/bg_doitac.png";
import TextArea from "antd/es/input/TextArea";
import logo from "../../component/image/logo_black.png"

export default function Partner() {
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        console.log(values);
    };

    return (
        <div>
            <div className="bg-gradient-to-r from-cyan-500 to-green-300">
                <Row className="max-w-screen-2xl mx-auto py-20">
                    <Col xs={24} xl={12} className="text-center text-white">
                        <p className="text-4xl font-bold py-5">Giải Pháp Đối Tác</p>
                        <p className="text-xl font-medium py-2">
                            Nếu bạn là một trader và cần những giải pháp giao dịch.
                            Nếu bạn là một master bạn muốn phân phối signals của mình.
                            Nếu bạn là Investor chuyên nghiệp và cần những sản phẩm đầu tư chất lượng.
                            Nếu bạn là một coder, bạn cần một môi trường để phát triển.
                            Giải pháp của chúng tôi đáp ứng đầy đủ tất cả những điều mà bạn quan tâm.
                        </p>
                    </Col>
                    <Col xs={24} xl={12}>
                        <div className="flex justify-center items-center h-full">
                            <img src={image_mk4} width={600} style={{height: 400}}/>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div style={{'--image-url': `url(${bg_doitac})`}} className='bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center'>           
                <Row className="max-w-screen-2xl mx-auto py-20">
                    <Col xs={24} xl={12} className=" text-black">
                        <p className="text-3xl font-bold p-5 text-[#004AAD]">Giá trị chúng tôi mang lại cho đối tác</p>
                        <p className="text-xl py-2 px-5">
                            Trở thành một trong những đối tác của chúng tôi và nắm giữ chìa khóa đến một thế giới với tràn ngập cơ hội mới. 
                            Ngay từ ngày đầu tiên, chúng tôi đã tập trung vào việc hiểu rõ doanh nghiệp của bạn.
                            Để có thể hiểu được chiến lược phát triển của bạn và xây dựng lộ trình phù hợp nhất để tiến tới thành công.
                            Trở thành những nhà cung cấp chiến lược của chúng tôi, tiếp cận những công nghệ tiên tiến. Và tham gia vào đội 
                            ngũ trâng đầy khao khát chiến thắng, đột phá và phát triển.
                        </p>
                    </Col>
                    <Col xs={24} xl={12}>
                        <div className="flex justify-center h-full">
                            <img src={image_mk4} className="rounded-xl w-[220px] h-[300px] mx-5"/>
                            <img src={image_mk4} width={200} className="rounded-xl w-[220px] h-[300px] mt-10"/>
                        </div>
                    </Col>
                </Row>
                
                <div className="p-10 max-w-screen-2xl mx-auto">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#004AAD]">Dịch Vụ Mà Chúng</p>
                        <p className="text-3xl font-bold text-[#004AAD] pt-2">Tôi Mang lại</p>
                    </div>
                    <Row className="my-5">
                        <Col xs={24} xl={8} className="py-10 text-black">
                            <img src={image_mk4} className="rounded-xl w-[full] h-[300px] mx-5"/>
                        </Col>
                        <Col xs={24} xl={8} className="py-10 text-black">
                            <img src={image_mk4} className="rounded-xl w-[full] h-[300px] mx-5"/>
                        </Col>
                        <Col xs={24} xl={8} className="py-10 text-black">
                            <img src={image_mk4} className="rounded-xl w-[full] h-[300px] mx-5"/>
                        </Col>
                    </Row>
                </div>
            </div>


            <div className="py-20 max-w-screen-2xl mx-auto">
                <p className="text-3xl font-bold text-[#004AAD] px-5">Câu chuyện thực tế về những người làm việc cùng nhau tốt hơn</p>
                <Row className="my-5">
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                    
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} xl={8} className="p-5">
                        <div className="p-10 text-black bg-gray-200 rounded-xl">
                            <img src={image_mk4} className="w-[120px] h-[80px]"/>
                            <p className="font-semibold text-lg pt-4">
                                Oracle Red Bull Racing dẫn đầu cuộc đua nhờ sự hỗ trợ của chúng tôi. Đọc câu chuyện
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div style={{'--image-url': `url(${bg_doitac})`}} className='bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-20'>  
                <p className="text-3xl font-bold text-[#004AAD] text-center">Kết Nối Cùng Chúng Tôi</p>
                <Row className="pt-10 max-w-screen-2xl mx-auto">
                    <Col xs={24} xl={14} className="px-20">
                        <p className="text-center font-medium text-xl">ĐĂNG KÝ NGAY ĐỂ NHẬN ƯU ĐÃI</p>
                        <p className="p-5">
                            Trở thành khách hàng thân thiết của chúng tôi để nhận thông tin mới nhất về các sản phẩm Uy tín và Chất lượng
                        </p>
                        <Form
                            layout={"vertical"}
                            colon={false}
                            form={form}
                            onFinishFailed={(e) => console.log(e)}
                            onFinish={onSubmit}
                        >
                            <Form.Item
                                // label="Họ và Tên"
                                name="fullname"
                                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                            >
                                <Input size="large" placeholder={"Họ và Tên"} />
                            </Form.Item>

                            <Form.Item
                                // label="Email"
                                name="email"
                                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                            >
                                <Input type="email" size="large" placeholder={"Email"} />
                            </Form.Item>

                            <Form.Item
                                // label="Số Điện Thoại"
                                name="phone"
                                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                            >
                                <Input size="large" placeholder={"Số Điện Thoại"} />
                            </Form.Item>

                            <Form.Item
                                // label="Số Điện Thoại"
                                name="message"
                                rules={[{ required: true, message: "Vui lòng nhập lời nhắn!" }]}
                            >
                                <TextArea size="large" placeholder={"Lời Nhắn"} />
                            </Form.Item>

                            <Button type={"primary"} htmlType={"submit"}>
                               Gửi Yêu Cầu
                            </Button>
                        </Form>

                    </Col>
                    <Col xs={24} xl={10}>
                        <img src={logo} className="w-full px-10"/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}