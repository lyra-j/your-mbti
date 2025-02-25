import axios from "axios";

// 환경변수에서 API 서버 URL 가져오기
const API_URL = import.meta.env.VITE_AUTH_SERVER_URL;
const JSON_API = import.meta.env.VITE_JSON_TEST_SERVER_URL;

// ✅ Auth 서버 API axios 인스턴스
export const authApi = axios.create({
  baseURL: API_URL,
});

// ✅ JSON 테스트 서버 API axios 인스턴스
export const jsonApi = axios.create({
  baseURL: JSON_API,
});
