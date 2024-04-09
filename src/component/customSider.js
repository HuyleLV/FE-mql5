import { Image, Layout, Menu } from "antd";
import React, { useEffect } from "react";
import {
  MessageOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  TransactionOutlined,
  LogoutOutlined,
  ContainerOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "./image/logo.png"
const { Sider } = Layout;


export default function CustomeSider() {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  const menuItem = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: <Link to={"/admin/users"}>Quản lý người dùng</Link>,
    },    {
      key: "notification",
      icon: <NotificationOutlined />,
      label: <Link to={"/admin/notification"}>Quản lý thông báo</Link>,
    },
    {
      key: "productManage",
      icon: <VideoCameraOutlined />,
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "product",
          label: <Link to={"/admin/products"}>Sản phẩm</Link>,
        },
        {
          key: "productPage",
          label: <Link to={"/admin/product-page"}>Trang sản phẩm</Link>,
        },
      ],
    },
    {
      key: "category",
      icon: <AppstoreOutlined />,
      label: "Danh mục sản phẩm",
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
      key: "identify",
      icon: <VideoCameraOutlined />,
      label: "Quản lý nhận định",
      children: [
        {
          key: "identify-category",
          label: <Link to={"/admin/identify-category"}>Danh mục nhận định</Link>,
        },
        {
          key: "identify",
          label: <Link to={"/admin/identify"}>Quản lý nhận định</Link>,
        },
        {
          key: "news",
          label: <Link to={"/admin/news"}>Quản lý tin tức</Link>,
        },
      ],
    },
    {
      key: "education",
      icon: <VideoCameraOutlined />,
      label: "Quản lý education",
      children: [
        {
          key: "education-category",
          label: <Link to={"/admin/education-category"}>Danh mục edu</Link>,
        },
        {
          key: "education-categorychild",
          label: <Link to={"/admin/education-categorychild"}>Danh mục con edu</Link>,
        },
        {
          key: "education",
          label: <Link to={"/admin/education"}>Quản lý edu</Link>,
        },
      ],
    },
    {
      key: "license",
      icon: <UserOutlined />,
      label: <Link to={"/admin/licenses"}>Quản lý license</Link>,
    },
    {
      key: "signal",
      icon: <UserOutlined />,
      label: <Link to={"/admin/signal"}>Quản lý signal</Link>,
    },
    {
      key: "master",
      icon: <UserOutlined />,
      label: <Link to={"/admin/master"}>Quản lý master</Link>,
    },
    {
      key: "vps",
      icon: <ContainerOutlined />,
      label: <Link to={"/admin/vps"}>Quản lý VPS</Link>,
    },
    {
      key: "comment",
      icon: <MessageOutlined />,
      label: <Link to={"/admin/comments"}>Quản lý comment</Link>,
    },
    {
      key: "payment",
      icon: <TransactionOutlined />,
      label: <Link to={"/admin/transfer"}>Quản lý giao dịch</Link>,
    },
    {
      key: "short",
      icon: <VideoCameraOutlined />,
      label: <Link to={"/admin/short"}>Quản lý link short</Link>,
    },
    {
      key: "follower-draft",
      icon: <ContainerOutlined />,
      label: <Link to={"/admin/follower-draft"}>Quản lý Follower Draft</Link>,
    },
    {
      key: "report",
      icon: <ContainerOutlined />,
      label: "Quản lý report",
      children: [
        {
          key: "report-category",
          label: <Link to={"/admin/report-category"}>Danh mục report</Link>,
        },
        {
          key: "report",
          label: <Link to={"/admin/report"}>Danh sách report</Link>,
        }
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <Link to={"/loginAdmin"} onClick={() => {
        removeCookie("admin");
        localStorage.removeItem('token');
      }}>
        Thoát
      </Link>,
    },
  ];

  return (
    <div className="!bg-white">
      <Sider width={220} className="!w-full !bg-white">
        <div className="flex justify-center py-5">
          <Link to={"/admin"}>
            <Image
              preview={false}
              src={logo}
              width={60}
              height={40}
            />
          </Link>
        </div>
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
      </Sider>
    </div>
  );
}
