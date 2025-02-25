import axios from "axios";
import { authApi } from './apiInstance';


/**
 * ✅ 회원가입 API 호출
 * @param {Object} userData - 회원가입 정보 (id, password, nickname)
 * @returns {Object} - 서버 응답 데이터
 */

export const register = async (userData) => {
  const res = await authApi.post(`/register`, userData);
  return res.data;
};

/**
 * ✅ 로그인 API 호출
 * @param {Object} userData - 로그인 정보 (id, password)
 * @returns {Object} - {accessToken, avatar, nickname, success, userId,}
 */

export const apilogin = async (userData) => {
  const res = await authApi.post(`/login`, userData);
  return res.data;
};

/**
 * ✅ 사용자 프로필 정보 가져오기
 * @param {string} token - 인증 토큰 (Bearer Token)
 * @returns {Object} - {avatar, id, nickname, success,}
 */

export const getUserProfile = async (token) => {
  const res = await authApi.get(`/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

/**
 * ✅ 사용자 프로필 정보 업데이트
 * @param {FormData} formData - (닉네임, avatar)
 * @param {string} token - 인증 토큰
 * @returns {Object} - {업데이트된 닉네임, message, success}
 */
export const updateProfile = async (formData, token) => {
  const res = await authApi.patch(`/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};