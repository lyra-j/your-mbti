import axios from "axios";

// TODO : API_URL 숨기기
const API_URL = import.meta.env.VITE_AUTH_SERVER_URL;

// 회원가입
export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

// 로그인
export const apilogin = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

// 회원정보 가져오기
export const getUserProfile = async (token) => {
  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 회원정보 변경
export const updateProfile = async (formData, token) => {
  const res = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
