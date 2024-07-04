import { message } from "antd";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import { useCookies } from "react-cookie";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import oclock from "../../component/image/icon/oclock.png"
import user from "../../component/image/icon/user.png"
import verify from "../../component/image/icon/veri.png"

ChartJS.register(
    ArcElement, 
    PointElement,
    LineElement,
    Tooltip, 
    Legend
);

export default function TopMaster({setIsModalOpen}) {
    const [topMaster, setTopMaster] = useState([]);
    const [cookies] = useCookies(["user"]);    

    const getTopMaster = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/signal/getAllTopMaster`)
          .catch(function (error) {
            message.error(error.response.status);
          })
          .then(( res ) => {
            const data = res?.data;
            setTopMaster(data);
          });
    };

    useEffect(() => {
        getTopMaster();
    }, []);
    
    return (
        <div className="py-10">
            <h1 className="font-bold px-4 text-3xl border-blue-500">Các Giao Dịch Thành Công</h1>
            <p className="p-4 border-b-2 text-blue-700 text-xl font-semibold">Theo Dõi và Giao Dịch cùng những Master tại Tipper Trade</p>
            {topMaster?.length > 0 && (
                <Slide slidesToScroll={1} slidesToShow={4} cssClass="py-10 mx-10">
                    {topMaster.map((_, i) => (
                        <div key={i}>
                            {i < 9 &&
                                <div className="border-2 border-black rounded-2xl mx-10 shadow text-black">
                                    <div className="flex items-center justify-center p-2">
                                        <img 
                                            src={_?.user?.photos ? _?.user?.photos : "https://cdn-icons-png.flaticon.com/512/848/848006.png"} 
                                            className="rounded-full" 
                                            style={{width: 50, height: 50}}/>
                                        <div className="pl-5">
                                            <p className="font-semibold text-md"> Name: {_?.user?.displayName ? _?.user?.displayName : "Admin"}</p>
                                            <p className="font-semibold text-md"> ID: {_?.user?.master_key ? _?.user?.master_key : "Admin"}</p>
                                        </div>
                                    </div>   
                                    <div className="flex justify-center">
                                        <Line 
                                            className="w-full"
                                            data={{
                                                labels: _?.chart_profit?.create_at,
                                                datasets: [
                                                {
                                                    label: "",
                                                    data: _?.chart_profit?.profit,
                                                    borderColor: "#C8ECCC",
                                                    backgroundColor: "#F0FAF1",
                                                    pointBorderColor: "#AAA",
                                                    pointBackgroundColor: "#FEF1F1"
                                                }]
                                            }} 
                                        />
                                    </div>     
                                    <div className="bg-gray-200 py-1 px-2 flex justify-between">
                                        <div className="flex items-center">
                                            <img src={user} className="h-5" />
                                            <p className="px-2">
                                                {_?.results[0]?.follow ? _?.results[0]?.follow : 0}
                                            </p>
                                            <img src={oclock} className="h-5 px-2" />
                                            <p>
                                                {_?.results[0]?.hours_diff ? _?.results[0]?.hours_diff : 0}
                                            </p>
                                        </div>
                                        <div>
                                            <img src={verify} className="h-5" />
                                        </div>
                                    </div>        
                                    <div className="grid grid-cols-2 px-2">
                                        <p className="font-semibold text-base p-2">
                                            Tổng Lệnh: <span>{_?.results[0]?.total ? _?.results[0]?.total : 0}</span>
                                        </p>
                                        <p className="font-semibold text-base p-2">
                                            Sinh Lời: <span>{_?.results[0]?.total_profit ? Math.round(_?.results[0]?.total_profit * 100) / 100 : 0}</span>
                                        </p>
                                        <p className="font-semibold text-base p-2">
                                            Hiệu Suất: <span>{_?.results[0]?.win_rate ? Math.round(_?.results[0]?.win_rate * 100) / 100 : 0}</span>
                                        </p>
                                        <p className="font-semibold text-base p-2">
                                            Xếp Hạng: <span>{_?.rank ? _?.rank : 0}</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-center pb-3">
                                        {cookies?.user ? 
                                            <a href={"/master/" + _?.user?.master_key}>
                                                <button className="py-1 px-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-lg font-semibold text-white">
                                                    Theo Dõi Ngay
                                                </button>
                                            </a>
                                            :
                                            <button 
                                                className="py-1 px-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-lg font-semibold text-white" 
                                                onClick={()=>setIsModalOpen(true)}>
                                                Theo Dõi Ngay
                                            </button>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </Slide>
            )}
        </div>
    )
}