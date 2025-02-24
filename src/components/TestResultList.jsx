import React from "react";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ result, setResult }) => {
  // 결과가 없는 경우
  if (!result || result.length === 0) {
    return <p>테스트 결과가 없습니다.</p>;
  }

  // 공개 비공개 전환
  const handleVisibility = (id, newVisibility) => {
    setResult((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visibility: newVisibility } : item
      )
    );
  };

  // 결과 삭제
  const removeTestResult = (id) => {
    setResult((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ul className="space-y-4">
      {result.map((item) => (
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
