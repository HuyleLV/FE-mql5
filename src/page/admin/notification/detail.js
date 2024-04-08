import { Button, Input, List, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function NotificationDetail() {

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
    setSocket(io(process.env.REACT_APP_API_URL));
  }, [cookies])

  useEffect(() => {
    socket?.emit("newUser", cookies?.admin.user_id)
  }, [socket])

  const createTableNoti = async (user_id, title, message) => {
    const submitValues = {
      notification_title: title,
      notification_description: message,
      notification_user: user_id,
      create_by: cookies.admin?.user_id
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

  const handleSendMaster = async (master, title, message) => {
    await socket?.emit("sendNotificationMaster", {
      master,
      title: title,
      message: message
    });

    createTableNoti(master, title, message)
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <p className="text-center text-2xl font-semibold py-10">Form gửi thông báo</p>

        <p>Chọn người gửi:</p>
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
              {[
                <Option value={"All"}>All</Option>,
                <Option value={"Master"}>Master</Option>,
                ...user?.data?.map(item => (
                  <Option value={item.user_id}>{item.user_id}</Option>
                ))
              ]}

            </Select>

            <div className="py-2">
              <p>Tiêu đề:</p>
              <input
                className="border border-gray-300 rounded-md py-1 w-full"
                onChange={event => setTitle(event.target.value)}
                placeholder=" "
              />
            </div>

            <div className="py-2">
              <p>Tiêu đề:</p>
              <textarea
                className="border border-gray-300 rounded-md py-2 w-full"
                onChange={event => setQuery(event.target.value)}
                placeholder=" "></textarea>
            </div>

            <Button
              type={"primary"}
              disabled={(selectedItem === null || displayMessageTitle === null) && true}
              onClick={() => selectedItem === null || displayMessageTitle === null ? null : selectedItem === "All" ?
                handleSendAll("-1", displayMessageTitle, displayMessage) : selectedItem === "Master" ?
                  handleSendMaster("-2", displayMessageTitle, displayMessage) : handleSend(selectedItem, displayMessageTitle, displayMessage)}
            >
              Gửi
            </Button>
          </>
        }
      </div>
    </div>
  )
}