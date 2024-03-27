import { React, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { Image, Dropdown, Space, Select, message, Divider, Button } from "antd";
import { useDevice } from "../hooks";
import { DownOutlined } from "@ant-design/icons";
import logo from "../component/image/logo_white.png"
import axios from "axios";
import moment from "moment";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { Dialog, DialogBody } from "@material-tailwind/react";
import AccuracyKYC from "./AccuracyKYC";
import { io } from "socket.io-client";
import { IoIosNotifications } from "react-icons/io";
import NotificationHeader from "./NotificationHeader";

export default function Header() {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);
  const [time, setTime] = useState();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const loadData = () => {
    const dateTime = Date();
    setTime(dateTime)
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   loadData();
    // }, 1000)
    // return () => clearInterval(interval)

    loadData();
  }, []);

  const onCheckOnline = async (values) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/updateOnline/${cookies.user?.user_id}`, {
        "Check_online": values
      }
      )
      .finally(() => {
        message.success("Cập nhật thông tin thành công !");
      });
  };

  useEffect(() => {
    cookies?.user && onCheckOnline(1)
  }, [cookies])

  useEffect(() => {
    cookies?.user && setSocket(io("http://localhost:5000"));
  }, [cookies])

  useEffect(() => {
    socket?.emit("newUser", cookies.user?.user_id)
  }, [socket])

  useEffect(() => {
    cookies?.user && socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket])

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/getById`, {
        headers: {
          'accesstoken': cookiesToken.accessToken
        }
      })
      .then((res) => {
        setCookie("user", res?.data)
      })
      .catch(() => message.error("Error server!"));
  };

  const logout = async () => {
    await onCheckOnline(0);
    removeCookie("user");
    removeCookieToken("accessToken");
    message.success("Đăng xuất thành công!")
    navigate("/login");
  }

  useEffect(() => {
    if (cookiesToken.accessToken !== undefined) {
      getUser();
    }
  }, [cookiesToken]);

  const items = [
    {
      key: "avatar",
      label: (
        <div
          className="flex items-center"
          style={{ flexDirection: 'row', gap: 10, borderBottomWidth: 1, paddingBottom: 4 }}
        >
          <Image
            preview={false}
            src={cookies.user?.photos}
            width={35}
            height={35}
          />
          <div style={{ flexDirection: 'column' }}>

            {cookies.user?.account_balance != null
              ? <BsFillPatchCheckFill color="#74DC2E" size={20} />
              : <div className="flex items-center " style={{ flexDirection: 'row' }}>
                <BiSolidErrorCircle color="#E72929" size={20} />
                <Button onClick={handleOpen} type="primary" className="mx-2"><p className="font-semibold text-sm textWhite">Xác thực ngay</p>
                </Button>
              </div>}
            <span className="text-sm font-semibold light-gray">{cookies.user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "profile",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <span className="cursor-pointer">Thông tin tài khoản</span>
          </div>
        </Link>
      ),
    },
    {
      key: "content",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <span className="cursor-pointer">Quản lý nội dung</span>
          </div>
        </Link>
      ),
    },
    {
      key: "change",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <span className="cursor-pointer">Đổi mật khẩu</span>
          </div>
        </Link>
      ),
    },
    {
      key: "depositOrWithdraw",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <span className="cursor-pointer">Nạp tiền/ Rút tiền </span>
          </div>
        </Link>
      ),
    },
    {
      key: "history",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <span className="cursor-pointer">Lịch sử thanh toán</span>
          </div>
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <div
          className="flex items-center"
          onClick={() => logout()}
        >
          <span className="cursor-pointer">Thoát</span>
        </div>
      ),
    },
  ];

  return (
    <nav className="sticky top-0 z-10 bg-gradient-to-r from-green-800 to-blue-600 text-white">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className={"flex max-md:w-full"}>
            <a href="/" className="flex items-center pr-4">
              <img src={logo} className="h-[100px] pl-4" alt="Flowbite Logo" />
            </a>

            {isMobile ?
              <div className="flex text-black font-semibold">
                <Dropdown
                  className="flex justify-center px-2 mt-2 pb-2 pt-1 rounded-t-lg bg-[#edbd37]"
                  dropdownRender={() => (
                    <div className="bg-white border rounded-md pr-2">
                      <ul className="flex flex-col font-normal px-4 md:p-0 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                            <p className="text-black text-lg">Forum</p>
                          </Link>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                            <p className="text-black text-lg">Market</p>
                          </Link>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                            <p className="text-black text-lg">Signals</p>
                          </Link>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                            <p className="text-black text-lg">Freelance</p>
                          </Link>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                            <p className="text-black text-lg">Quotes</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  trigger={['click']}>
                  <Space>
                    Market
                    <DownOutlined className="w-3" />
                  </Space>
                </Dropdown>
              </div>
              :
              <>
                <div
                  className={`hidden w-full md:block md:w-auto`}
                >
                  {cookies?.user && (
                    <ul className="flex flex-col font-medium md:p-0 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0 h-full items-center text-2xl">
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/san-pham"}>
                          Sản phẩm
                        </Link>
                      </li>
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/signal"}>
                          Signals
                        </Link>
                      </li>
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/nhan-dinh"}>
                          Nhận định
                        </Link>
                      </li>
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/tin-tuc"}>
                          Tin tức
                        </Link>
                      </li>
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/education"}>
                          Edu
                        </Link>
                      </li>
                      <li className="px-4">
                        <Link className="block md:p-0 md:hover:text-blue-400" to={"/wallet"}>
                          Wallet
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            }
          </div>
        </div>

        {!cookies?.user && (
          <div className="flex justify-center items-center">
            <p className="text-4xl font-bold text-white p-3 px-10">
              Giải Pháp Giao Dịch Toàn Diện
            </p>
          </div>
        )}
        <div className="flex items-center min-w-fit gap-x-[20px] pr-[15px] md:pr-[20px] text-[14px] py-2">
          {!cookies?.user ? (
            <>
              <Link to={"/login"}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={icon({ name: "user" })}
                    className="w-[18px] h-[18px] mr-[4px] cursor-pointer"
                    style={{ color: "rgb(250 204 21 )" }}
                  />
                  <span className="text-xl underline cursor-pointer">Đăng nhập</span>
                </div>
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center w-[135px] py-1 bg-[#edbd37] rounded-[3px] max-sm:hidden text-black text-xl font-medium"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <div style={{ marginRight: 10, padding: 4, paddingLeft: 6, paddingRight: 6, background: "rgba(255,255,255,0.3)", borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="text-sm font-semibold">
                    {moment(time).format("HH:mm:ss DD-MM-YYYY")}
                  </div>
                </div>

                {notifications.length < 1
                  ? <IoIosNotifications size={30} style={{ marginRight: 2 }} />
                  : <NotificationHeader notifications={notifications} length={notifications.length} setNotifications={setNotifications} />
                }

                <Dropdown placement="bottomRight" menu={{ items }}>
                  {
                    isMobile ? (
                      <Image
                        preview={false}
                        src={cookies.user?.photos}
                        width={25}
                        height={25}
                      />
                    ) : (
                      <Image
                        preview={false}
                        src={cookies.user?.photos}
                        width={40}
                        height={40}
                      />
                    )
                  }
                </Dropdown>

                {/* <div className="text-xl ml-[10px] font-bold">
                  {cookies.user?.displayName}
                </div> */}
              </div>
            </>
          )}
        </div>
        <Dialog open={open} handler={handleOpen} style={{ background: "#00000099", position: 'relative' }} >
          <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <AccuracyKYC handleOpen={handleOpen} />
          </DialogBody>
        </Dialog>
      </div>
    </nav>
  );
}
