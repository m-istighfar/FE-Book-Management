import React from "react";
import { Menu } from "antd";
import { BookOutlined, TagsOutlined } from "@ant-design/icons";
import LogoutButton from "./LogoutButton";

interface SidebarMenuProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ selectedKey, onSelect }) => {
  const items = [
    {
      key: "1",
      icon: <BookOutlined />,
      label: "Books",
    },
    {
      key: "2",
      icon: <TagsOutlined />,
      label: "Categories",
    },
  ];

  return (
    <div className="sidebar-container">
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        onSelect={({ key }) => onSelect(key)}
      />
      <div className="logout-button-container">
        <LogoutButton />
      </div>
    </div>
  );
};

export default SidebarMenu;
