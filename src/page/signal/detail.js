import { Button, Image, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import dayjsInstance from "../../utils/dayjs";

export default function SignalDetail() { 
    const params = useParams();
    const [cookies] = useCookies(["user"]);
    const [profile, setProfile] = useState({});
    const [allMaster, setAllMaster] = useState([]);
  
    const fetchProfile = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/user/getByEmail/${cookies.user?.email}`
        )
        .then(({ data }) => {
          if (data) setProfile({ ...data?.[0] });
        });
    };

    const getAllMaster = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAllByUser/${params?.user_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setAllMaster(data);
            });
    };

    const columns = [
        {
            title: 'Tên chiến lược',
            dataIndex: 'master_key_name',
            key: 'master_key_name',
            width: 300,
            render: (master_key_name) => <p>{master_key_name}</p>,
        },
        {
            title: 'Masterkey',
            dataIndex: 'master_key',
            key: 'master_key',
            width: 300,
            render: (master_key) => <p>{master_key}</p>,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            width: 300,
            render: (balance) => <p>{balance}</p>,
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            key: 'profit',
            width: 300,
            render: (profit) => <p>{profit}</p>,
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'exprice_date',
            key: 'exprice_date',
            width: 300,
            render: (exprice_date) => <p>{dayjsInstance(exprice_date).format("DD/MM/YYYY HH:mm:ss")}</p>,
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width: 200,
            render: () => 
            <div className="flex justify-center">
                <a href="" className="pr-2">
                    <Button type="primary">Chỉnh sửa</Button>
                </a>
                <a href="">
                    <Button type="primary">Chi tiết</Button>
                </a>
            </div>,
        },
    ]

    useEffect(() => { 
        if(params?.user_id) {
            getAllMaster();
            fetchProfile();
        }
    }, [params]);

    return (
        <div className="max-w-screen-2xl mx-auto py-10">
            <div className="flex border-y-2 py-5">
                <Image
                  preview={false}
                  src={profile?.photos}
                  width={150}
                  height={150}
                />
                <div className="pl-5">
                  <p className="text-[20px] font-none">My name: <span className="text-[22px] font-medium">{profile?.displayName}</span></p>
                  <p className="text-[20px] font-none">Email: <span className="text-[22px] font-medium">{profile?.email}</span></p>
                </div>
            </div>
            <div className="py-5">
                <p className="text-2xl font-bold">Khu vực Master</p>
                <Table 
                    className="pt-5"
                    pagination={false}
                    columns={columns} 
                    dataSource={allMaster} 
                />
            </div>
            <div className="py-5">
                <p className="text-2xl font-bold">Khu vực Đầu tư</p>
                <Table 
                    className="pt-5"
                    pagination={false}
                    columns={columns} 
                    dataSource={allMaster} 
                />
            </div>
        </div>
    )
}