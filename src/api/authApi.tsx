const BASE_URL = import.meta.env.VITE_BASE_URL;

const AUTH_URL = `${BASE_URL}/auth`;

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Network response was notz ok " + response.statusText
    );
  }
  return response.json();
};

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExp: string;
  refreshTokenExp: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  verificationToken: string;
  _id: string;
  __v: number;
}

export interface RegisterResponse {
  message: string;
  data: UserData;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await checkResponse(response);
    return data.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (
  registerData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const verifyEmail = async (
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${AUTH_URL}/verify-email/${token}`);
    return await checkResponse(response);
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_URL}/request-password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const resetPassword = async (
  verificationCode: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${AUTH_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationCode, newPassword, confirmPassword }),
    });

    return await checkResponse(response);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
