import { Button, Input, List, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

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
    const [title, setTitle] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const [displayMessageTitle, setDisplayMessageTitle] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        const timeOutId = setTimeout(() => setDisplayMessageTitle(title), 500);
        return () => clearTimeout(timeOutId);
    }, [title]);

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

    const createTableNoti = async (user_id, title, message) => {
        const submitValues = {
            notification_title: title,
            notification_description: message,
            notification_user: user_id
        };
        await axios
            .post(`${process.env.REACT_APP_API_URL}/notification/createUser`, submitValues)
            .then(async (res) => {
                console.log("Success!")
            })
            .catch(({ response }) => {
                console.log(JSON.stringify(response?.data?.message));
            });
    };

    const handleSend = async (user_id, title, message) => {
        await socket?.emit("sendNotification", {
            receiverName: user_id,
            title: title,
            message: message
        });
        createTableNoti(user_id, title, message)
    }

    const handleSendAll = async (all, title, message) => {
        await socket?.emit("sendNotificationAll", {
            all,
            title: title,
            message: message
        });

        createTableNoti(all, title, message)
    }

    return (
        <div className="w-[200px]">
            {(user?.data === null || user?.data === undefined) ?
                null
                :
                <>
                    <Select
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                        onChange={handleChange} showSearch allowClear label="Select Version" className="!rounded-lg" style={{ display: 'flex', justifyContent: "start", alignItems: 'center' }}
                    >
                        {
                            [<Option value={"All"}>All</Option>,
                            // <Option value={"Master"}>Master</Option>,

                            ...user?.data?.map(item => (
                                <Option value={item.user_id}>{item.user_id}</Option>
                            ))
                            ]
                        }

                    </Select>

                    <div class="w-[auto] mt-4">
                        <div class="relative w-full min-w-[200px] h-10">
                            <input
                                onChange={event => setTitle(event.target.value)}
                                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " /><label
                                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                Title
                            </label>
                        </div>
                    </div>

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

                    <Button type={"primary"} disabled={(selectedItem === null || displayMessageTitle === null) && true} onClick={() => selectedItem === null || displayMessageTitle === null ? null : selectedItem === "All" ? handleSendAll("-1", displayMessageTitle, displayMessage) : handleSend(selectedItem, displayMessageTitle, displayMessage)}>
                        Gửi
                    </Button>
                </>


            }
        </div>
    )
}