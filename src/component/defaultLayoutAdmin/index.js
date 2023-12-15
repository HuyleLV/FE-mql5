import AdminRouter from "../../route/admin.route";
import React from "react";
import { Layout, theme } from "antd";
import CustomeSider from "../customSider";

const { Content } = Layout;
export default function DefaultLayoutAdmin() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className={'relative '} style={{ minHeight: '100vh' }}>
        <CustomeSider />
        <Layout className="site-layout">
          <Content
            className={'relative !-z-0 mt-[10px] p-[20px]'}
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
    </>
  );
}
