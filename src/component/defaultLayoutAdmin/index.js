import AdminRouter from "../../route/admin.route";
import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import CustomeSider from "../customSider";
import { StyleProvider } from '@ant-design/cssinjs'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axios";

const { Content } = Layout;
export default function DefaultLayoutAdmin() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  const token = localStorage.getItem('token');

  const getInfoAdmin = async () => {
    await axiosInstance
      .get(`/admin/getInfoAdmin`)
      .then((res) => {
        setCookie("admin", res?.data);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getInfoAdmin();
  }, []);

  useEffect(() => {
    if (!token) {
      removeCookie('admin');
      localStorage.removeItem('token');
      navigate("/loginAdmin");
    } else if (cookies?.admin?.role !== 2 && cookies?.admin) {
      removeCookie('admin');
      localStorage.removeItem('token');
      navigate("/loginAdmin");
    }
  }, [cookies?.admin, token]);

  return (
    <>
      <StyleProvider hashPriority="high">
        <Layout className={"relative "} style={{ minHeight: "100vh" }}>
          {cookies?.admin?.role != 2 ? null :
            <CustomeSider />
          }
          <Layout className="site-layout">
            <Content
              className={"relative !-z-0 mt-[10px] p-[20px]"}
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <AdminRouter />
            </Content>
          </Layout>
        </Layout>
      </StyleProvider>
    </>
  );
}
