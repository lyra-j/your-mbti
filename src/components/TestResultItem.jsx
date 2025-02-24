import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";

const TestResultItem = ({ result, handleVisibility, removeTestResult }) => {
  const { user } = useContext(AuthContext);
  const currentUserId = user ? user.id : null;
  const { id, userid, nickname, mbti, description, date, visibility } = result;

  const [loading, setLoading] = useState(false);

  // 🔴 로직 재검토 필요!!!
  const toggleVisibility = async () => {
    setLoading(true);

    try {
      const newVisibility = !visibility;
      await updateTestResultVisibility(id, newVisibility);
      handleVisibility(id, newVisibility);
      alert(
        `${newVisibility ? "공개 짠! " : "비공개 쇽~ "}으로 변경되었습니다.`
      );
    } catch (error) {
      console.error("공개 전환 오>>:", error);
      alert("공개/비공개 전환 도중 오류가 발생하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevome = async () => {
    setLoading(true);
    try {
      await deleteTestResult(id);
      removeTestResult(id);
      alert(`테스트  결과가 삭제되었습니다.`);
    } catch (error) {
      console.error("삭제 오류", error.res ? error.res.data : error.message);
      alert(`삭제 중 오류가 발생했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
        <h4 className="text-xl font-semibold">{nickname}</h4>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-yellow-400 mb-4">{mbti}</p>
        <p className="text-base text-gray-300 mb-4">{description}</p>
      </div>
      {currentUserId === userid && (
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={toggleVisibility}
            disabled={loading}
            className="bg-violet-500 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 hover:bg-violet-800"
          >
            {loading ? "로딩 중..." : visibility ? "비공개 전환" : "공개 전환"}
          </button>

          <button
            onClick={handleRevome}
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
