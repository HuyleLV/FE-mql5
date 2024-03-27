import AdminRouter from "../../route/admin.route";
import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import CustomeSider from "../customSider";
import { StyleProvider } from '@ant-design/cssinjs'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const { Content } = Layout;
export default function DefaultLayoutAdmin() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);

  useEffect(() => {
    if (cookies?.admin?.role !== 2) {
      navigate("/loginAdmin");
    }
  }, [cookies?.admin?.role]);

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
