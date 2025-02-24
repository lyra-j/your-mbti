import axios from "axios";

const JSON_API = import.meta.env.VITE_JSON_TEST_SERVER_URL;

// 테스트결과 목록 불러오기
export const getTestResults = async () => {
  const res = await axios.get(JSON_API);
  return res.data;
};

// 테스트결과 보내기
export const createTestResult = async (resultData) => {
  const res = await axios.post(JSON_API, resultData);
  return res.data;
};

// 테스트결과 삭제
export const deleteTestResult = async (id) => {
  const res = await axios.delete(`${JSON_API}/${id}`);
  return res.data;
};

// 테스트결과 확인 업데이트
export const updateTestResultVisibility = async (id, visibility) => {
  const res = await axios.patch(`${JSON_API}/${id}`, { visibility });
  return res.data;
};
