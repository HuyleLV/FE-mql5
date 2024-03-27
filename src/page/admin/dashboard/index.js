import { Button, List, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const data = [
    {
        id: 1,
        displayName: "Aaaa"
    },
    {
        id: 2,
        displayName: "bbbb"
    },
    {
        id: 3,
        displayName: "cccAaaa"
    }
]

export default function Dashboard() {

    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    const [user, setUser] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null)
    const { Option } = Select;

    const handleChange = (value) => {
        setSelectedItem(value)
    };

    const [query, setQuery] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const fetchUser = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/user/getAll`, { params: pagination })
            .then((res) => {
                const data = res?.data;
                setUser(data);
            })
            .catch(() => message.error("Error server!"));
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        setSocket(io("http://localhost:5000"));
    }, [cookies])

    useEffect(() => {
        socket?.emit("newUser", cookies?.admin.user_id)
    }, [socket])

    const handleSend = (user_id, message) => {
        socket?.emit("sendNotification", {
            senderName: cookies?.admin.user_id,
            receiverName: user_id,
            message: message
        })
    }

    const handleSendAll = (message) => {
        socket?.emit("sendNotificationAll", {
            senderName: cookies?.admin.user_id,
            message: message
        })
    }

    return (
        <div className="w-[200px]">
            {(user?.data === null || user?.data === undefined) ?
                null
                :
                <>
                    <Select optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        } onChange={handleChange} showSearch label="Select Version" className="!rounded-lg" style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}
                    >
                        {
                            [<Option value={"All"}>All</Option>,

                            ...user?.data?.map(item => (
                                item.Check_online === 1 && <Option value={item.user_id}>{item.displayName}</Option>
                            ))
                            ]
                        }

                    </Select>

                    {/* <Select
                        style={{
                            width: 200,
                        }}
                        onChange={handleChange}
                        placeholder="Search to Select"

                        options={[
                            {
                                value: "All",
                                label: "Gửi tất cả",
                            },
                            // {
                            //     value: "MASTER",
                            //     label: "Gửi master",
                            // },
                            ...user?.data?.map((value) => (
                                {
                                    value: value.user_id,
                                    label: value.displayName
                                }
                            ))
                        ]}
                    /> */}
                    <div class="relative w-full min-w-[200px] mt-4 mb-4">
                        <textarea
                            onChange={event => setQuery(event.target.value)}
                            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "></textarea>
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Message
                        </label>
                    </div>

                    <Button type={"primary"} disabled={selectedItem === null && true} onClick={() => selectedItem === null ? null : selectedItem === "All" ? handleSendAll(displayMessage) : handleSend(selectedItem, displayMessage)}>
                        Gửi
                    </Button>
                </>


            }
        </div>
    )
}