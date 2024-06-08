import { Button, Col, DatePicker, Rate, Row, Space, Table } from "antd";
import image_mk4 from "../../component/image/mk4.jpg";
import dayjs from "dayjs";
import {
    ShareAltOutlined
} from '@ant-design/icons';

export default function EcoCalendar() {  

    const onChange = () => {

    }

    const data = [
        {
          key: '1',
          time: '03:30',
          IMP: 3,
          indicator: 'New York No. 1 Lake Park',
          real: "213 Tr",
          forecast: "2134 Tr",
          before: "123 Tr"
        },
        {
          key: '2',
          time: '04:30',
          IMP: 5,
          indicator: 'Mỹ tồn trữ dầu thô hàng tuần',
          real: "213 Tr",
          forecast: "2134 Tr",
          before: "123 Tr"
        },
        {
          key: '3',
          time: '05:30',
          IMP: 2,
          indicator: 'New York No. 1 Lake Park',
          real: "213 Tr",
          forecast: "2134 Tr",
          before: "123 Tr"
        },
    ];

    const columns = [
        {
          title: 'Thời gian',
          dataIndex: 'time',
          width: 100,
          key: 'time',
          render: (time) => <div>{time}</div>,
        },
        {
          title: 'IMP',
          dataIndex: 'IMP',
          width: 200,
          key: 'IMP',
          render: (IMP) => <div><Rate disabled defaultValue={IMP}/></div>,
        },
        {
          title: 'Tên chỉ báo',
          dataIndex: 'indicator',
          key: 'indicator',
          render: (indicator) => <div className="font-semibold">{indicator}</div>,
        },
        {
          title: <div className="text-center">Thực tế</div>,
          dataIndex: 'real',
          width: 120,
          key: 'real',
          render: (real) => <div className="font-semibold text-center">{real}</div>,
        },
        {
          title: <div className="text-center">Dự báo</div>,
          dataIndex: 'forecast',
          width: 120,
          key: 'forecast',
          render: (forecast) => <div className="text-center">{forecast}</div>,
        },
        {
          title: <div className="text-center">Trước đó</div>,
          dataIndex: 'before',
          width: 120,
          key: 'before',
          render: (before) => <div className="text-center">{before}</div>,
        }
    ];


    return (
        <div className="max-w-screen-2xl mx-auto py-10">
            <div class="grid grid-cols-3 gap-4 border-2 border-black rounded-2xl p-5">
                <div className="flex justify-center">
                    <img src={image_mk4} className="h-[250px] rounded-2xl"/>
                </div>
                <div className="col-span-2 h-[120px]">
                    <div>
                        <p className="font-bold text-4xl">Lịch Kinh Tế Hàng Ngày</p>
                        <p className="text-2xl pt-4">
                            Để nhanh chóng tìm hiểu động lực thị trường và theo dõi trọng <br></br>
                            tâm thị trường chỉ trong 10-15 phút.
                        </p>
                    </div>
                    <div className="flex items-end h-full">
                        <button className="border rounded-full bg-blue-500 px-4 py-1 text-xl font-semibold text-white hover:bg-blue-400">Theo Dõi</button>
                        <button className="border rounded-full bg-blue-500 px-4 py-1 text-xl font-semibold text-white hover:bg-blue-400 ml-10">Chia Sẻ</button>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="pt-10 pb-5">
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()))} className="mr-4"><p className="font-semibold">Hôm Nay</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(1, 'day'))}><p className="font-semibold">Hôm Qua</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(2, 'day'))} className="mx-4"><p className="font-semibold">Hôm Kia</p></Button>
                    <Button type="primary" onClick={()=>onChange(dayjs(new Date()).subtract(7, 'day'))} className="mr-4"><p className="font-semibold">Tuần Trước</p></Button>
                    <DatePicker 
                        onChange={onChange}
                        format={'DD/MM/YYYY'} 
                    />
                </div>
                <Table columns={columns} dataSource={data} pagination={false}/>
            </div>

            <Row>
                <Col xs={24} xl={16} className="pr-10">
                    <p className="font-bold text-2xl pb-5">Bản Tin Tài Chính</p>
                    <div className="border-2 border-black rounded-2xl">
                        <div className="grid grid-cols-3 gap-4 p-5">
                            <div>
                                <img src={image_mk4} className="h-[200px] w-full"/>
                            </div>
                            <div className="col-span-2">
                                <p className="font-bold text-xl">Bản tin tài chính ngày 23/4</p>
                                <p className="text-lg py-5">
                                    Đồng USD không biến động đáng kể, 
                                    vẫn giữ nguyên mốc 106,12. Nó đã 
                                    trượt khỏi mức cao nhất trong 5...
                                </p>
                                <div className="flex justify-between pt-10">
                                    <p className="font-normal text-gray-600">Luxer, 10:02-23/04</p>
                                    <ShareAltOutlined className="text-xl pr-10"/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-5">
                            <div>
                                <img src={image_mk4} className="h-[200px] w-full"/>
                            </div>
                            <div className="col-span-2">
                                <p className="font-bold text-xl">Bản tin tài chính ngày 23/4</p>
                                <p className="text-lg py-5">
                                    Đồng USD không biến động đáng kể, 
                                    vẫn giữ nguyên mốc 106,12. Nó đã 
                                    trượt khỏi mức cao nhất trong 5...
                                </p>
                                <div className="flex justify-between pt-10">
                                    <p className="font-normal text-gray-600">Luxer, 10:02-23/04</p>
                                    <ShareAltOutlined className="text-xl pr-10"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} xl={8}>
                    <p className="font-bold text-2xl pb-5">Bài Viết Hot Nhất</p>
                    <div className="border-2 border-black rounded-2xl p-5">
                        <div className="flex py-2">
                            <p className="px-5 font-bold text-lg">1</p>
                            <p className="px-5 font-semibold text-lg">
                                Đồng USD không biến động đáng kể, 
                                vẫn giữ nguyên mốc 106,12. Nó đã 
                                trượt khỏi mức cao nhất trong 5...
                            </p>
                        </div>
                        <div className="flex py-2">
                            <p className="px-5 font-bold text-lg">2</p>
                            <p className="px-5 font-semibold text-lg">
                                Đồng USD không biến động đáng kể, 
                                vẫn giữ nguyên mốc 106,12. Nó đã 
                                trượt khỏi mức cao nhất trong 5...
                            </p>
                        </div>
                        <div className="flex py-2">
                            <p className="px-5 font-bold text-lg">3</p>
                            <p className="px-5 font-semibold text-lg">
                                Đồng USD không biến động đáng kể, 
                                vẫn giữ nguyên mốc 106,12. Nó đã 
                                trượt khỏi mức cao nhất trong 5...
                            </p>
                        </div>
                        <div className="flex py-2">
                            <p className="px-5 font-bold text-lg">4</p>
                            <p className="px-5 font-semibold text-lg">
                                Đồng USD không biến động đáng kể, 
                                vẫn giữ nguyên mốc 106,12. Nó đã 
                                trượt khỏi mức cao nhất trong 5...
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}