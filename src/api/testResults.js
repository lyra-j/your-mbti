import axios from "axios";
import { jsonApi } from './apiInstance';

/**
 * @description 테스트 결과 목록을 서버에서 가져오기
 * @returns {Promise<Array>} 테스트 결과 배열
 */
export const getTestResults = async () => {
  const res = await jsonApi.get(`/testResults`);
  return res.data;
};

/**
 * @description 새로운 테스트 결과를 서버에 저장하기
 * @param {Object} resultData - 저장할 테스트 결과 데이터
 * @returns {Promise<Object>} 생성된 테스트 결과 데이터
 */
export const createTestResult = async (resultData) => {
  const res = await jsonApi.post(`/testResults`, resultData);
  return res.data;
};

/**
 * @description 특정 테스트 결과를 삭제
 * @param {string} id - 삭제할 테스트 결과의 id
 * @returns {Promise<Object>} 삭제된 테스트 결과 데이터
 */
export const deleteTestResult = async (id) => {
  const res = await jsonApi.delete(`/testResults/${id}`);
  return res.data;
};

/**
 * @description 테스트 결과의 가시성을 업데이트
 * @param {string} id - 업데이트할 테스트 결과의 id(게시글 id)
 * @param {boolean} visibility - 변경할 공개여부 (true/false)
 * @returns {Promise<Object>} 업데이트된 테스트 결과 데이터
 */
export const updateTestResultVisibility = async (id, visibility) => {
  const res = await jsonApi.patch(`/testResults/${id}`, { visibility });
  return res.data;
};