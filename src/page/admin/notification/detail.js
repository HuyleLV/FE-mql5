import { Button, Input, List, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import CustomReactQuill from "../../../component/customReactQuill";

export default function NotificationDetail() {

  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  const [user, setUser] = useState([]);
  const [userMaster, setUserMaster] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const { Option } = Select;
  const [listUser, setListUser] = useState(null)
  const [listUserRead, setListUserRead] = useState(null)

  const handleChange = (value) => {
    setSelectedItem(value);
    value === "All" &&
      setListUser(user?.data?.map(item =>
        item.user_id
      ));
    value === "All" && setListUserRead(user?.data?.map(item =>
      Number(item.user_id) * 0
    ))

    value === "Master" &&
      setListUser(userMaster?.data?.map(item =>
        item.user_id
      ));

    value === "Master" && setListUserRead(userMaster?.data?.map(item =>
      Number(item.user_id) * 0
    ))
  };

  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayMessageTitle, setDisplayMessageTitle] = useState("");
  const [editorValue, setEditorValue] = useState('');
  const navigate = useNavigate();

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
    pageSize: 1000,
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

  const fetchUserMaster = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAllMaster`)
      .then((res) => {
        const data = res?.data;
        setUserMaster(data);
      })
      .catch(() => message.error("Error server!"));
  };

  useEffect(() => {
    fetchUser();
    fetchUserMaster();
  }, []);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_API_URL_ADMIN));
  }, [cookies])

  useEffect(() => {
    socket?.emit("newUser", cookies?.admin.user_id)
  }, [socket])

  const resetInput = () => {
    // setSelectedItem(null);
    // setListUser(null);
    // setListUserRead(null);
    // setDisplayMessage(null);
    // setDisplayMessageTitle(null);
    // setQuery(null);
    // setTitle(null)
  }

  const createTableNoti = async (user_id, title, messager, read) => {
    const submitValues = {
      notification_title: title,
      notification_description: messager,
      notification_user: user_id,
      check_read: read,
      create_by: cookies.admin?.user_id
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/notification/createUser`, submitValues)
      .then(async (res) => {
        resetInput()
        message.success("Gửi thông báo thành công");
        navigate("/admin/notification")

      })
      .catch(({ response }) => {
        console.log(JSON.stringify(response?.data?.message));
      });
  };

  const handleSend = async (user_id, title, messager, read) => {
    await socket?.emit("sendNotification", {
      receiverName: user_id,
      title: title,
      message: messager
    });
    createTableNoti(user_id, title, messager, read)
  }

  const handleSendAll = async (all, title, messager, read) => {
    await socket?.emit("sendNotificationAll", {
      all,
      title: title,
      message: messager
    });

    createTableNoti(all, title, messager, read);
  }

  const handleSendMaster = async (master, title, messager, read) => {
    await socket?.emit("sendNotificationMaster", {
      master,
      title: title,
      message: messager
    });

    createTableNoti(master, title, messager, read)
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <p className="text-center text-2xl font-semibold py-10">Form gửi thông báo</p>


        {(user?.data === null || user?.data === undefined) ?
          null
          :
          <>
            <div className="py-2 pl-4 pr-4">
              <p>Chọn người gửi:</p>
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
            </div>


            <div className="py-2 pl-4 pr-4">
              <p>Tiêu đề:</p>
              <input
                className="border border-gray-300 rounded-md py-1 w-full"
                onChange={event => setTitle(event.target.value)}
                placeholder=" "
              />
            </div>

            <div className="py-2">
              <p>Nội dung:</p>
              <CustomReactQuill onChange={(e) => setQuery(e)} />
            </div>


            <Button
              type={"primary"}
              disabled={(selectedItem === null || displayMessageTitle === null) && true}
              onClick={() => selectedItem === null || displayMessageTitle === null ? null : selectedItem === "All" ?
                handleSendAll('-1,' + listUser?.toString()
                  , displayMessageTitle, displayMessage, listUserRead?.toString()) : selectedItem === "Master" ?
                  handleSendMaster('-2,' + listUser?.toString(), displayMessageTitle, displayMessage, listUserRead?.toString()) : handleSend(selectedItem, displayMessageTitle, displayMessage, 0)}
            >
              Gửi
            </Button>
          </>
        }
      </div>
    </div>
  )
}