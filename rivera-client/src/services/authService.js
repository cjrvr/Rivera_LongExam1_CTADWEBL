import { request } from "./api";

const login = async (email, password) => {
  return request("/user/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

const register = async ({
  username,
  email,
  password,
  phoneNumber,
}) => {
  return request("/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      phoneNumber,
    }),
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const saveSession = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};

export {
  login,
  register,
  logout,
  saveSession,
  getCurrentUser,
  getToken,
};