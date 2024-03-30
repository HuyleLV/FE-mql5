import { Col, Image, Row, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjsInstance from "../../utils/dayjs";
import { Link, useParams } from "react-router-dom";
import logo from "../../component/image/logo.png";

export default function MasterDetail() {  
    const params = useParams();
    const [master, setMaster] = useState([]);

    const getTotalByMasterKey = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getTotalByMasterKey/${params?.master_key}`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setMaster(data);
          });
      };

    useEffect(() => { 
        getTotalByMasterKey();
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-[50px]">
                <div>
                    <p className="font-medium px-5">
                        <Link to="/">Trang chủ</Link> / <Link to="/signal">Signals</Link> / <span className="text-blue-600">{params?.master_key}</span>
                    </p>
                </div>
                
                <Row justify={"center"} align={"middle"} className="py-10">
                    <Col xs={24} xl={12}>
                        <div className="flex border-b-2 border-r-2 p-2 h-[200px]">
                        <Image
                            preview={false}
                            src={master?.user?.photos}
                            width={150}
                            height={150}
                        />
                        <div className="pl-5">
                            <p className="text-[20px] font-none">My name: <span className="text-[22px] font-medium">{master?.user?.displayName}</span></p>
                            <p className="text-[20px] font-none">Email: <span className="text-[22px] font-medium">{master?.user?.email}</span></p>
                            <p className="text-[20px] font-none">My master Key: <span className="text-[22px] font-medium">{master?.user?.master_key}</span></p>
                            <p className="text-[20px] font-none">My private key: <span className="text-[22px] font-medium">{master?.user?.private_key}</span></p>
                        </div>
                        </div>
                    </Col>
                    <Col xs={24} xl={12}>
                    <div className="border-b-2 p-2 pl-5 text-black h-[200px]">
                        <p className="text-xl font-bold pb-5">Thống kê giao dịch</p>
                        <div className="text-xl font-semibold flex">
                        <div>
                            <p>Ranking: {master?.rank ? master?.rank : "Chưa có rank!"}</p>
                            <p>Tổng signal: {master?.results?.[0]?.total ? master?.results?.[0]?.total : 0}</p>
                            <p>
                            Win / Lost: {master?.results?.[0]?.win ? master?.results?.[0]?.win : 0} / {master?.results?.[0]?.loss ? master?.results?.[0]?.loss : 0}
                            </p>
                        </div>
                        <div className="pl-10">
                            <p>Win Rate: {master?.results?.[0]?.win_rate ? master?.results?.[0]?.win_rate : 0}</p>
                            <p>Profit: {master?.results?.[0]?.total_profit ? master?.results?.[0]?.total_profit : 0}</p>
                        </div>
                        </div>
                    </div>
                    </Col>
                </Row>
                <div className="flex justify-center pb-10 border-b">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-gray-500 rounded-full text-white font-semibold text-xl">Theo dõi master</button>
                </div>
                <div className="py-10 flex justify-center">
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl">Báo cáo</button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl mx-20">Phân tích</button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-blue-500 rounded-full text-white font-semibold text-xl">Lịch sử</button>
                </div>
            </div>
        </div>
    )
}