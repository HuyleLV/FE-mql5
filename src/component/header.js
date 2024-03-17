import { React, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { Image, Dropdown, Space, Select, message } from "antd";
import { useDevice } from "../hooks";
import { DownOutlined } from "@ant-design/icons";
import logo from "../component/image/logo_white.png"
import axios from "axios";

export default function Header() {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [cookiesToken, setCookieToken, removeCookieToken] = useCookies(["accessToken"]);

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
    message.success("Đăng xuất thành công!")
    navigate("/login");
  }

  useEffect(() => {
    if(cookiesToken.accessToken !== undefined){
      getUser();
    }
  }, [cookiesToken]);

  const items = [
    {
      key: "profile",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
          >
            <FontAwesomeIcon
              icon={icon({ name: "user" })}
              className="w-[18px] h-[18px] mr-[4px] cursor-pointer"
              style={{ color: "rgb(250 204 21 )" }}
            />
            <span className="cursor-pointer">Profile</span>
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
          <FontAwesomeIcon
            icon={icon({ name: "sign-out" })}
            className="w-[18px] h-[18px] mr-[4px] cursor-pointer"
            style={{ color: "rgb(250 204 21 )" }}
          />
          
          <span className="cursor-pointer">Logout</span>
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
              <img src={logo} className="h-16 pl-4" alt="Flowbite Logo" />
            </a>

            {isMobile ? 
              <div className="flex text-black font-semibold">
                  <Dropdown 
                    className="flex justify-center px-2 mt-2 pb-2 pt-1 rounded-t-lg bg-[#edbd37]" 
                    dropdownRender={()=> (
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
                      <DownOutlined className="w-3"/>
                    </Space>
                  </Dropdown>
              </div>
            : 
              <>
                <div
                  className={`hidden w-full md:block md:w-auto`}
                >
                  {cookies?.user && (
                    <ul className="flex flex-col font-medium md:p-0 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0 h-full items-center text-xl">
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
          <div>
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
                  <span className="text-xl underline cursor-pointer">Login</span>
                </div>
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center w-[135px] h-[26px] bg-[#edbd37] rounded-[3px] max-sm:hidden text-black"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center">
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
                        width={30}
                        height={30}
                      />
                    )
                  }
                </Dropdown>

                <div className="ml-[10px] font-bold">
                  {cookies.user?.displayName}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
