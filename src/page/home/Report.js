import { Button, List, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjsInstance from "../../utils/dayjs";

export default function Reports() {
    const [report, setReport] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 4,
    });

    const getAllReport = async () => {
        await axios
        .get(`${process.env.REACT_APP_API_URL}/report/getAll/`, {params: pagination})
        .then((res) => {
            const data = res?.data;
            setReport(data);
        })
        .catch(() => message.error("Error server!"));
    };

    const renderItem = (item) => {
        return (

            <List.Item
                key={item?.report_id}
            >
                <Link
                    to={`/report/${item?.report_slug}`}
                >
                    <div className="w-full my-8 px-2">
                        <img alt={item?.report_title} className="w-full h-[200px]" style={{ borderRadius: 6 }} src={item?.report_img} />
                        <div className="font-semibold text-xl line-clamp-2 my-3 text-black">{item?.report_title}</div>
                        <div className="font-semibold text-md light-gray flex justify-between">
                            <p>by {item?.displayName}</p>
                            <p>{dayjsInstance(item?.create_at).format("DD/MM/YYYY")}</p>
                        </div>
                    </div>
                </Link>
            </List.Item>
        );
    }
    
    useEffect(() => {
        getAllReport();
    }, []);

    return (
        <div className="w-full py-10">
            <div className="border-b-2 border-blue-500 flex justify-between items-center">
                <p className="font-bold p-4 text-3xl">Phân Tích - Nghiên Cứu</p>
                <Link to={"/san-pham"}>
                    <button className="text-xl border px-4 py-1 text-white rounded-[10px] bg-blue-600 border-blue-600 font-semibold hover:bg-blue-800">Xem thêm</button>
                </Link>
            </div>
            {report.data?.length > 0 &&
                <List
                    itemLayout="horizontal"
                    grid={{ gutter: 20, column: 4 }}
                    dataSource={report?.data}
                    renderItem={renderItem}
                />
            }
        </div>
    )
}