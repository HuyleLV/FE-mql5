import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-sky-800 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-2xl flex flex-wrap items-center mx-auto">
        <a href="/" className="flex items-center pr-4">
          {/* <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            MQL<span className="text-yellow-400">5</span>
          </span>
        </a>
        <div className={"!flex justify-between"}>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div className={`${openNav ? "" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
              <Link className="block md:p-0 md:hover:text-black" to={"/"}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
