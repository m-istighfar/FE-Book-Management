import { useState } from "react";
import { Layout } from "antd";
import {
  UserProfile,
  SidebarMenu,
  ToggleButton,
  LogoutButton,
} from "../components";
import ContentArea from "../containers/ContentArea";
import "../App.css";

const { Sider } = Layout;

function DashboardPage() {
  const [collapsed, setCollapsed] = useState(true);
  const handleToggle = () => setCollapsed((prevState) => !prevState);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        collapsible
        collapsed={collapsed}
      >
        <UserProfile initials="" />
        <SidebarMenu
          selectedKey={selectedMenuItem}
          onSelect={setSelectedMenuItem}
        />
      </Sider>
      <ToggleButton onClick={handleToggle} />
      <ContentArea isBlurred={!collapsed} selectedMenuItem={selectedMenuItem} />
    </Layout>
  );
}

export default DashboardPage;
