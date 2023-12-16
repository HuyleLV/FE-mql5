import { Layout, Menu } from "antd";
import React from "react";
import {
  MessageOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const menuItem = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to={'/admin/users'}>Quản lí người dùng</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to={'/admin/products'}>Quản lí sản phẩm</Link>,
  },
  {
    key: "3",
    icon: <AppstoreOutlined />,
    label: <Link to={'/admin/menus'}>Quản lí danh mục</Link>,
  },
  {
    key: "4",
    icon: <MessageOutlined />,
    label: <Link to={'/admin/comments'}>Quản lí comment</Link>,
  },
  {
    key: "5",
    icon: <TransactionOutlined />,
    label: <Link to={'/admin/payments'}>Quản lí giao dịch</Link>,
  },
];
export default function CustomeSider() {

  
  return (
    <div className="!w-[250px]">
      <Sider className={"!h-full !w-full !bg-white"}>
        <div className={"!bg-primary-color h-[68px] px-5 flex justify-center cursor-pointer "}>
          <div
            className={
              "text-[var(--blue)] text-[28px] font-bold cursor-pointer leading-[26px] self-center "
            }
          >
            MQL5
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItem}
        />
      </Sider>
    </div>
  );
}
