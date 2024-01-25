import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");
  window.location.replace("/");
};

const LogoutButton: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="logout-button">
      {isLoggedIn ? (
        <Button
          type="text"
          icon={<UserOutlined />}
          style={{ color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          type="text"
          icon={<UserOutlined />}
          style={{ color: "white" }}
          onClick={() => {
            window.location.replace("/login");
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
