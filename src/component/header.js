import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { Image } from "antd";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [cookies] = useCookies(["user"]);

  return (
    <nav className="sticky top-0 z-10 bg-[#4a76b8] border-gray-200 text-white">
      <div class="flex justify-between">
        <div className="w-full flex flex-wrap items-center mx-auto">
          <div className={"flex justify-between max-md:w-full"}>
            <a href="/" className="flex items-center pr-4">
              {/* <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                MQL<span className="text-yellow-400">5</span>
              </span>
            </a>
          </div>

          <div
            className={`${openNav ? "" : "hidden"} w-full md:block md:w-auto`}
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
              <li className="hover:bg-yellow-400 hover:text-black p-3">
                <Link
                  className="block md:p-0 md:hover:text-black"
                  to={"/login"}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center min-w-fit gap-x-[20px] pr-[15px] md:pr-[20px] text-[14px]">
          {!cookies ? (
            <>
              <Link to={"/login"}>
                <div class="flex items-center">
                  <FontAwesomeIcon
                    icon={icon({ name: "user" })}
                    className="w-[18px] h-[18px] mr-[4px] cursor-pointer"
                    style={{ color: "rgb(250 204 21 )" }}
                  />
                  <span className="underline cursor-pointer">Login</span>
                </div>
              </Link>
              <Link
                href=""
                class="flex items-center justify-center w-[135px] h-[26px] bg-[#edbd37] rounded-[3px] max-sm:hidden text-black"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              <div class="flex items-center">
                <Image
                  preview={false}
                  src={cookies?.user?.photos}
                  width={30}
                  height={30}
                />
                <div className="ml-[10px] font-bold">{cookies?.user?.displayName}</div>
              </div>
              <div className={"!flex justify-between"}>
                <button
                  data-collapse-toggle="navbar-dropdown"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-400 rounded-lg md:hidden  dark:focus:ring-gray-600"
                  aria-controls="navbar-dropdown"
                  aria-expanded="false"
                  onClick={() => setOpenNav(!openNav)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
