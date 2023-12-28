import { Image, Layout, Menu } from "antd";
import React from "react";
import {
  MessageOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  TransactionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const { Sider } = Layout;


export default function CustomeSider() {

  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  console.log(cookies);
  

  const menuItem = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: <Link to={"/admin/users"}>Quản lí người dùng</Link>,
    },
    {
      key: "product",
      icon: <VideoCameraOutlined />,
      label: <Link to={"/admin/products"}>Quản lí sản phẩm</Link>,
    },
    {
      key: "category",
      icon: <AppstoreOutlined />,
      label: <Link to={"/admin/categories"}>Danh mục</Link>,
      children: [
        {
          key: "category",
          label: <Link to={"/admin/categories"}>Danh mục cha</Link>,
        },
        {
          key: "categoryChild",
          label: <Link to={"/admin/categoryChild"}>Danh mục con</Link>,
        },
      ],
    },
    {
      key: "comment",
      icon: <MessageOutlined />,
      label: <Link to={"/admin/comments"}>Quản lí comment</Link>,
    },
    {
      key: "payment",
      icon: <TransactionOutlined />,
      label: <Link to={"/admin/transfer"}>Quản lí giao dịch</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <Link to={"/loginAdmin"} onClick={()=>removeCookie("admin")}>Thoát</Link>,
    },
  ];
  
  return (
    <div className="!w-[250px]">
      <Sider className={"!h-full !w-full !bg-white"}>
        <div
          className={
            "!bg-primary-color h-[68px] px-5 flex justify-center cursor-pointer "
          }
        >
          <div
            className={
              "text-[var(--blue)] text-[28px] font-bold cursor-pointer leading-[26px] self-center "
            }
          >
            MQL5
          </div>
        </div>
        {cookies.admin ?
          <>
            <div className="flex items-center px-5 border">
              <Image
                preview={false}
                src={cookies.admin?.photos}
                width={30}
                height={30}
              />
              <div className="ml-[10px] font-bold">
                {cookies.admin?.displayName}
              </div>
            </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItem}
          />
        </>
        : <></>
      }
      </Sider>
    </div>
  );
}
