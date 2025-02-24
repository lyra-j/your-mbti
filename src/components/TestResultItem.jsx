import React, {  useState } from "react";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import useAuthStore from '../zustand/authStore';

const TestResultItem = ({ result, handleVisibility, removeTestResult }) => {
  const { user } = useAuthStore();
  const currentUserId = user ? user.id : null;
  const { id, userid, nickname, mbti, description, date, visibility } = result;

  const [loading, setLoading] = useState(false);
  const isOwner = currentUserId === userid; // 현재 로그인한 사용자가 작성자인지 확인

  /**
   * ✅ 공개/비공개 상태를 변경하는 함수
   * - API 호출하여 visibility 상태 업데이트
   * - 상태 변경 후 UI 반영
   */
  const toggleVisibility = async () => {
    if (!isOwner) return;
    setLoading(true);

    try {
      const newVisibility = !visibility; // 현재 상태 반전
      await updateTestResultVisibility(id, newVisibility); // API 호출
      handleVisibility(id, newVisibility);
      alert(`${newVisibility ? "공개 " : "비공개"}상태로 변경되었습니다.`);
    } catch (error) {
      console.error("공개/비공개 전환 오류:", error);
      alert("공개/비공개 전환 도중 오류가 발생하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✅ 테스트 결과를 삭제하는 함수
   * - API 호출하여 삭제 요청
   * - 삭제 성공 시 부모 컴포넌트에서 상태 업데이트
   */
  const handleRemove = async () => {
    if (!isOwner) return;
    setLoading(true);
    try {
      await deleteTestResult(id);
      removeTestResult(id);
      alert(`테스트 결과가 삭제되었습니다.`);
    } catch (error) {
      console.error("삭제 오류", error);
      alert(`삭제 중 오류가 발생했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      {/* 닉네임 & 날짜 */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
        <h4 className="text-xl font-semibold">{nickname}</h4>
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      {/* MBTI, 설명 */}
      <div>
        <p className="text-2xl font-bold text-yellow-400 mb-4">{mbti}</p>
        <p className="text-base text-gray-300 mb-4">{description}</p>
      </div>

      {/* 현재 로그인한 유저만 버튼 표시 */}
      {isOwner && (
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={toggleVisibility}
            disabled={loading}
            className="bg-violet-500 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 hover:bg-violet-800"
          >
            {/*  */}
            {loading ? "로딩 중..." : visibility ? "비공개 전환" : "공개 전환"}
          </button>

          <button
            onClick={handleRemove}
            disabled={loading}
            className="bg-red-500 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 hover:bg-red-800"
          >
            {loading ? "로딩 중 ..." : "삭제"}
          </button>
        </div>
      )}
    </li>
  );
};

export default TestResultItem;
