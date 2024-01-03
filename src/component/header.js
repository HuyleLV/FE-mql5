import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { Image, Dropdown, Space, Select } from "antd";
import { useDevice } from "../hooks";
import { DownOutlined } from "@ant-design/icons";

export default function Header() {
  const { isMobile } = useDevice();
  const [cookies, removeCookie] = useCookies(["user"]);

  const items = [
    {
      key: "profile",
      label: (
        <Link to={'/profile'}>
          <div
            className="flex items-center"
            onClick={() => removeCookie("user")}
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
        <Link to={`${process.env.REACT_APP_API_URL}/auth/logout`}>
          <div
            className="flex items-center"
            onClick={() => removeCookie("user")}
          >
            <FontAwesomeIcon
              icon={icon({ name: "sign-out" })}
              className="w-[18px] h-[18px] mr-[4px] cursor-pointer"
              style={{ color: "rgb(250 204 21 )" }}
            />
            
            <span className="cursor-pointer">Logout</span>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <nav className="sticky top-0 z-10 bg-[#4a76b8] border-gray-200 text-white">
      <div className="flex justify-between">
        <div className="w-full flex flex-wrap items-center mx-auto">
          <div className={"flex max-md:w-full"}>
            <a href="/" className="flex items-center pr-4">
              {/* <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white pl-4">
                MQL<span className="text-yellow-400">5</span>
              </span>
            </a>

            {isMobile ? 
              <div className="flex text-black font-semibold">
                {/* <Select
                  defaultValue="Market"
                  className="w-full text-black"
                  dropdownStyle={{width: 150, color: "yellow"}}
                  options={[
                    { label: (
                      <Link className="text-black" to={"/"}>
                        Forum
                      </Link>
                    ) },
                    { label: (
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Market
                      </Link>
                    ) },
                    { label: (
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Signals
                      </Link>
                    ) },
                    { label: (
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Freelance
                      </Link>
                    ) },
                    { label: (
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Quotes
                      </Link>
                    ) },
                  ]}
                /> */}
                  <Dropdown 
                    className="flex justify-center px-2 rounded-md bg-[#edbd37]" 
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
                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
                    <li className="hover:bg-yellow-400 hover:text-black p-3">
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Forum
                      </Link>
                    </li>
                    <li className="hover:bg-yellow-400 hover:text-black p-3">
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Market
                      </Link>
                    </li>
                    <li className="hover:bg-yellow-400 hover:text-black p-3">
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Signals
                      </Link>
                    </li>
                    <li className="hover:bg-yellow-400 hover:text-black p-3">
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Freelance
                      </Link>
                    </li>
                    <li className="hover:bg-yellow-400 hover:text-black p-3">
                      <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                        Quotes
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
          }
          </div>

        </div>
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
                  <span className="underline cursor-pointer">Login</span>
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
