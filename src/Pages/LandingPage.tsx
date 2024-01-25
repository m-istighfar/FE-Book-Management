import React from "react";
import { Link } from "react-router-dom";
import { Button, List, Typography, Card, Divider } from "antd";
import {
  BookOutlined,
  SlackOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import "./LandingPage.css";

const { Title, Paragraph } = Typography;

interface FeatureItem {
  text: string;
  icon: JSX.Element;
}

const bookManagementFeatures: FeatureItem[] = [
  { text: "Manage Your Book Collection", icon: <BookOutlined /> },
  { text: "Organize Books on Virtual Shelves", icon: <SlackOutlined /> },
];

function LandingPage() {
  return (
    <div className="landing-container">
      <Card className="landing-card">
        <Title className="landing-title">Book Management App</Title>
        <Paragraph className="landing-description">
          A sophisticated tool designed to help you organize and manage your
          book collection efficiently.
        </Paragraph>

        <Divider>Key Features</Divider>

        <div className="feature-section">
          <Title level={3}>
            <UserOutlined style={{ marginRight: 8 }} /> Book Management
          </Title>
          <List
            dataSource={bookManagementFeatures}
            renderItem={({ text, icon }) => (
              <List.Item className="feature-list-item">
                {React.cloneElement(icon, { style: { marginRight: 8 } })} {text}
              </List.Item>
            )}
          />
        </div>

        <Divider />

        <div className="action-buttons">
          <Link to="/login">
            <Button
              type="primary"
              className="login-button"
              icon={<LoginOutlined />}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="register-button" icon={<UserAddOutlined />}>
              Register
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="guest-button" icon={<GlobalOutlined />}>
              Continue as Guest
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LandingPage;
