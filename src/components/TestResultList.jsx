import React from "react";
import TestResultItem from "./TestResultItem";
import useAuthStore from "../zustand/authStore";

const TestResultList = ({ results, setResults }) => {
  const { user } = useAuthStore();
  const currentUserId = user ? user.id : null;
  /**
   * 🔹 결과 필터링:
   *  - 공개(visibility: true)된 결과
   *  - 현재 사용자가 작성한 결과 (본인 글은 비공개라도 보이도록)
   */
  const filteredResults = results.filter(
    (item) => item.visibility || item.userid === currentUserId
  );

  // 결과가 없는 경우
  if (!results || filteredResults.length === 0) {
    return <p>테스트 결과가 없습니다.</p>;
  }

  /**
   * 공개/비공개 전환
   * id: 테스트 결과 고유 id
   * newVisibility : 공개상태 전환
   */
  const handleVisibility = (id, newVisibility) => {
    setResults((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visibility: newVisibility } : item
      )
    );
  };

  /**
   * 결과 삭제
   * id: 삭제할 테스트 결과 항목의 고유 id
   */
  const removeTestResult = (id) => {
    setResults((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ul className="space-y-4">
      {filteredResults.map((item) => (
        <TestResultItem
          key={item.id}
          result={item}
          handleVisibility={handleVisibility}
          removeTestResult={removeTestResult}
        />
      ))}
    </ul>
  );
};

export default TestResultList;
