import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api";
import "./ResetPasswordFormPage.css";

const PasswordResetFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    verificationCode: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      notification.error({
        message: "Error",
        description: "The passwords do not match.",
      });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(
        values.verificationCode,
        values.newPassword,
        values.confirmPassword
      );
      notification.success({
        message: "Password Reset Successful",
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      notification.error({
        message: "Password Reset Failed",
        description: "An error occurred while resetting your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <Card className="password-reset-card" hoverable>
        <h1>Password Reset</h1>
        <Form
          name="passwordReset"
          onFinish={onFinish}
          form={form}
          className="password-reset-form"
        >
          <Form.Item
            name="verificationCode"
            rules={[
              {
                required: true,
                message: "Please enter your verification code!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Verification Code" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm New Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="password-reset-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetFormPage;
