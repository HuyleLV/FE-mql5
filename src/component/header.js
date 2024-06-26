import { React, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { Image, Dropdown, Space, Select, message, Divider, Button } from "antd";
import { useDevice } from "../hooks";
import { DownOutlined } from "@ant-design/icons";
import logo from "../component/image/logo_white.png"
import icon_hot from "../component/image/icon/Hot.svg"
import axios from "axios";
import moment from "moment";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { Dialog, DialogBody } from "@material-tailwind/react";
import AccuracyKYC from "./AccuracyKYC";
import { io } from "socket.io-client";
import { IoIosNotifications } from "react-icons/io";
import NotificationHeader from "./NotificationHeader";
import SearchHeader from "./SearchHeader";

export default function Header() {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);
  const [time, setTime] = useState();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationData, setNotificationData] = useState();
  const [saveNoti, setSaveNoti] = useState();
  const [refresh, setRefresh] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const loadData = () => {
    const dateTime = Date();
    setTime(dateTime)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 1000)
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    cookies?.user && setSocket(io(process.env.REACT_APP_API_URL_ADMIN));
  }, [cookies])

  useEffect(() => {
    socket?.emit("newUser", cookies.user?.user_id)
  }, [socket])

  useEffect(() => {
    cookies?.user && socket?.on("getNotification", (data) => {
      message.warning("Có 1 tin nhắn mới !!");
      setNotifications((prev) => [prev, data]);
      setCheckUpdate(!checkUpdate)
    })
  }, [socket, refresh, checkUpdate])

  useEffect(() => {
    cookies?.user && socket?.on("getNotificationAll", (data) => {
      message.warning("Có 1 tin nhắn mới !!");
      setNotifications((prev) => [prev, data]);
      setCheckUpdate(!checkUpdate)
    })
  }, [socket, refresh, checkUpdate])

  useEffect(() => {
    cookies?.user && cookies?.user?.active_status === 1 && socket?.on("getNotificationMaster", (data) => {
      message.warning("Có 1 tin nhắn mới !!");
      setNotifications((prev) => [...prev, data]);
      setCheckUpdate(!checkUpdate)
    })
  }, [socket, refresh, checkUpdate])

  useEffect(() => {
    cookies?.user && getAllNotification(cookies?.user?.user_id, cookies?.user?.active_status === 1 ? -2 : 0);
  }, [socket, refresh, checkUpdate])

  const getAllNotification = async (id, status) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/notification/getAllUser/${id}`, {
        params: {
          master: status,
        }
      })
      .then((res) => {
        const data = res?.data;
        setNotificationData(data);
      });
  };



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

  const logout = () => {
    removeCookie("user");
    removeCookieToken("accessToken");
    localStorage.removeItem('token');
    message.success("Đăng xuất thành công!");
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

            {cookies.user?.kyc != 0
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
              <img src={logo} className="h-[60px] py-2 pl-4" alt="Flowbite Logo" />
            </a>

            {isMobile ?
              <div className="flex text-black font-semibold">
                <Dropdown
                  className="flex justify-center px-2 mt-2 pb-2 pt-1 rounded-t-lg bg-[#edbd37]"
                  dropdownRender={() => (
                    <div className="bg-white border rounded-md pr-2">
                      <ul className="flex flex-col font-normal px-4 md:p-0 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/san-pham"}>
                            Sản Phẩm
                          </a>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/signal"}>
                            Tín Hiệu
                          </a>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/nhan-dinh"}>
                            Nhận Định
                          </a>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/tin-tuc"}>
                            Tin Tức
                          </a>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/education"}>
                            Kiến Thức
                          </a>
                        </li>
                        <li className="hover:bg-yellow-400 hover:text-black p-1">
                          <a className="block md:p-0 md:hover:text-blue-400" href={"/wallet"}>
                            Ví
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  trigger={['click']}>
                  <Space>
                    Sản Phẩm
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
                        <a className="block md:p-0 md:hover:text-blue-400" href={"/san-pham"}>
                          Sản Phẩm
                        </a>
                      </li>
                      <li className="px-4">
                        <a className="block md:p-0 md:hover:text-blue-400 flex items-center" href={"/signal"}>
                          Tín Hiệu
                          <img src={icon_hot} className="h-10"/>
                        </a>
                      </li>
                      <li className="px-4">
                        <a className="block md:p-0 md:hover:text-blue-400" href={"/nhan-dinh"}>
                          Nhận Định
                        </a>
                      </li>
                      {/* <li className="px-4">
                        <a className="block md:p-0 md:hover:text-blue-400" href={"/tin-tuc"}>
                          Tin Tức
                        </a>
                      </li> */}
                      <li className="px-4">
                        <Dropdown
                          dropdownRender={() => (
                            <div className="flex justify-center">
                              <div className="grid grid-cols-4 gap-4 bg-white w-2/3 mt-3 p-5 rounded-xl drop-shadow-md">
                                <div>
                                  <div className="border-b h-[140px]">
                                    <a href={"/tin-tuc"}>
                                      <p className="text-black block md:p-0 hover:text-blue-400 font-bold text-base">Khám Phá</p>
                                    </a>
                                    <p className="font-medium">
                                      Khám phá phương thức mới trong việc sử dụng 
                                      các giải pháp Tipper nhằm nâng cao năng suất cho 
                                      lực lượng lao động hiện đại.
                                    </p>
                                  </div>
                                  <div className="list-disc pt-4">
                                    <li>
                                      <a href={"/tin-tuc"}>Blog của Tipper</a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>Câu Chuyện Khách Hàng</a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>Zoom Thực Chiến</a>
                                    </li>
                                  </div>
                                </div>
                                <div>
                                  <div className="border-b h-[140px]">
                                    <a href={"/education"}>
                                      <p className="text-black block md:p-0 hover:text-blue-400 font-bold text-base">Học Tập</p>
                                    </a>
                                    <p className="font-medium">
                                      Khám phá phương thức mới trong việc sử 
                                      dụng các giải pháp Tipper nhằm nâng cao năng 
                                      suất cho lực lượng lao động hiện đại.
                                    </p>
                                  </div>
                                  <div className="list-disc pt-4">
                                    <li>
                                      <a href={"/tin-tuc"}>Giáo Trình</a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>Video Hướng Dẫn</a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>Bằng Chứng Thành Công</a>
                                    </li>
                                  </div>
                                </div>
                                <div>
                                  <div className="border-b h-[140px]">
                                    <a href={"/tin-tuc"}>
                                      <p className="text-black block md:p-0 hover:text-blue-400 font-bold text-base">Kết Nối</p>
                                    </a>
                                    <p className="font-medium">
                                      Kết nối với những người dùng Tipper khác, 
                                      đồng thời chia sẻ hiểu biết của riêng 
                                      bạn về ngành và sản phẩm.
                                    </p>
                                  </div>
                                  <div className="list-disc pt-4">
                                    <li>
                                      <a href={"/tin-tuc"}>Tipper Community</a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>Cổng Thông Tin Đối Tác</a>
                                    </li>
                                  </div>
                                </div>
                                <div>
                                  <div className="border-b h-[140px]">
                                    <a href={"/tin-tuc"}>
                                      <p className="text-black block md:p-0 hover:text-blue-400 font-bold text-base">Hỗ Trợ</p>
                                    </a>
                                    <p className="font-medium">
                                      Nhận tài liệu về việc triển khai, 
                                      quản lý và sử dụng nền tảng Tipper.
                                    </p>
                                  </div>
                                  <div className="list-disc pt-4">
                                    <li>
                                      <a href={"/tin-tuc"}>
                                        Hỗ Trợ Khách Hàng <br></br>
                                        Chúng tôi hỗ trợ khách hàng mọi thắc mắc về thông tin thị trường 24/7 
                                      </a>
                                    </li>
                                    <li>
                                      <a href={"/tin-tuc"}>
                                        Hỗ Trợ Đối Tác <br></br>
                                        Liên hệ với Hotline: 0356 496 403 /  <br></br>
                                        Email : invest.Tipperpartner@gmail.com để làm đối tác toàn diện của chúng tôi
                                      </a>
                                    </li>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          placement="bottom"
                          trigger={['hover']}
                        >
                          <div className="flex items-end">
                            <p className="block md:p-0 md:hover:text-blue-400 hover:cursor-pointer">Tài Liệu</p>
                            <DownOutlined className="w-3 ml-2" />
                          </div>
                        </Dropdown>
                      </li>
                      <li className="px-4">
                        <a className="block md:p-0 md:hover:text-blue-400" href={"/quy"}>
                          Quỹ
                        </a>
                      </li>
                      <li className="px-4">
                        <a className="block md:p-0 md:hover:text-blue-400" href={"/wallet"}>
                          Ví
                        </a>
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

                <SearchHeader />

                {notificationData == null ? null : notificationData?.data.length < 1
                  ? <IoIosNotifications size={30} style={{ marginRight: 2 }} />
                  : <NotificationHeader
                      notifications={notificationData?.data}
                      lengthSocket={notifications?.length}
                      length={notificationData?.data.length}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      user_id={cookies?.user?.user_id}
                    />
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
