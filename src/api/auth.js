import axios from "axios";

// 환경변수에서 AUTH API 서버 URL 가져오기
const API_URL = import.meta.env.VITE_AUTH_SERVER_URL;

/**
 * ✅ 회원가입 API 호출
 * @param {Object} userData - 회원가입 정보 (id, password, nickname)
 * @returns {Object} - 서버 응답 데이터
 */

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

/**
 * ✅ 로그인 API 호출
 * @param {Object} userData - 로그인 정보 (id, password)
 * @returns {Object} - {accessToken, avatar, nickname, success, userId,}
 */

export const apilogin = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

/**
 * ✅ 사용자 프로필 정보 가져오기
 * @param {string} token - 인증 토큰 (Bearer Token)
 * @returns {Object} - {avatar, id, nickname, success,}
 */

export const getUserProfile = async (token) => {
  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

/**
 * ✅ 사용자 프로필 정보 업데이트
 * @param {FormData} formData - (닉네임,)
 * @param {string} token - 인증 토큰
 * @returns {Object} - {업데이트된 닉네임, message, success}
 */
export const updateProfile = async (formData, token) => {
  const res = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
