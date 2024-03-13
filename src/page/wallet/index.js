import { Col, Row, message } from "antd";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";


export default function Wallet() { 
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        if(!cookies?.user && currentPath?.includes('/wallet')){ 
            message.warning("Vui lòng đăng nhập!")
            navigate("/login");
        }
    }, [cookies]);
    return (
        <div className="max-w-screen-2xl mx-auto py-10">
            <p className="font-bold text-3xl text-center">Thông tin ví</p>
            <Row>
                <Col xs={24} xl={12}>
                    <div className="py-10">
                        <p className="font-semibold text-xl">Thông tin người dùng: {cookies?.user?.displayName}</p>
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                
                </Col>
            </Row>
        </div>
    )
 }