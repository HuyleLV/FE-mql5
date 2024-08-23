import { Button, Image, Input, Modal, Space, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import dayjsInstance from "../../utils/dayjs";
import { DecimalNumber } from "../../utils/format";
import { useForm } from "react-hook-form"


export default function SignalDetail() { 
    const params = useParams();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
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

    const handleOk = (dataMaster) => {
        reset({
            master_key_name: dataMaster.master_key_name,
            description: dataMaster.description,
            server: dataMaster.server,
            master_key: dataMaster.master_key,
            password: dataMaster.password
        })

        const onSubmit = async (data) => {
            if(!data.master_key_name || !data.description || !data.server || !data.master_key || !data.password){
                message.warning("Bạn đang điền thiếu thông tin!");
            } else {
                const merge = {
                    ...data,
                    master_license_id: dataMaster.master_license_id
                }
                await axios
                    .post(`${process.env.REACT_APP_API_URL}/masterLicense/update`, merge)
                    .then((res) => {
                        message.success(String(res?.data?.message));
                        Modal.destroyAll();
                        getAllMaster();
                    })
                    .catch(() => message.error("Error server!"));
            }
        }

        Modal.info({
            title: "Thông báo chi tiết",
            footer: null,
            width: 500,
            content: (
                <div className="py-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-4">
                            <p>Tên chiến lược: </p>
                            <input className="border p-1 rounded-lg ml-2 w-full col-span-3" name="master_key_name" defaultValue={dataMaster.master_key_name} {...register("master_key_name")}/>
                            
                            <p className="my-2">Mô tả:</p>
                            <textarea className="border p-1 rounded-lg ml-2 w-full col-span-3 my-2" name="description" defaultValue={dataMaster.description} {...register("description")}/>
                            
                            <p className="my-2">Server: </p>
                            <input className="border p-1 rounded-lg ml-2 w-full col-span-3 my-2" name="server" defaultValue={dataMaster.server} {...register("server")}/>

                            <p className="my-2">Master key:</p>
                            <input className="border p-1 rounded-lg ml-2 w-full col-span-3 my-2" name="master_key" defaultValue={dataMaster.master_key} {...register("master_key")}/>
                            
                            <p className="my-2">Password:</p>
                            <input className="border p-1 rounded-lg ml-2 w-full col-span-3 my-2" name="password" defaultValue={dataMaster.password} {...register("password")}/>
                        </div>
                        <div className="flex justify-end pt-5">
                            <input type="reset" className="border bg-gray-500 py-1 rounded-lg w-[120px] text-white text-md" value={"Trở về"} onClick={()=> Modal.destroyAll()}/>
                            <input type="submit" className="border bg-blue-500 py-1 rounded-lg w-[120px] text-white text-md ml-2" value={"Cập nhật"} />
                        </div>
                    </form>
                </div>
            ),
        });
    }

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
            render: (profit) => <p>{DecimalNumber(profit, 2)}</p>,
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
            render: (_) => 
            <div className="flex justify-center">
                <Button type="primary" onClick={()=> handleOk(_)}>Chỉnh sửa</Button>
                <a href={`/master/${_?.master_key}`} className="pl-2">
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
            {/* <div className="py-5">
                <p className="text-2xl font-bold">Khu vực Đầu tư</p>
                <Table 
                    className="pt-5"
                    pagination={false}
                    columns={columns} 
                    dataSource={allMaster} 
                />
            </div> */}
        </div>
    )
}