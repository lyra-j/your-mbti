import React, { useContext, useState } from "react";
import TestForm from "../components/TestForm";
import { useNavigate } from "react-router-dom";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { AuthContext } from "../context/AuthContext";

const Test = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null); // MBTI 결과 state
  const { user } = useContext(AuthContext); // AuthStore에서 사용자 정보 가져오기

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다. 이 데이터를 어떻게 API 를 이용해 처리 할 지 고민해주세요. */
    // 테스트 결과를 DB에 보내라

    setResult(mbtiResult);
    try {
      const resultData = {
        nickname: user.nickname,
        mbti: mbtiResult,
        visibility: true,
        date: new Date().toISOString().split("T")[0], // yyyy-mm-dd 형식
        description: mbtiDescriptions[mbtiResult],
        userid: user.id,
      };

      // DB에 테스트 결과 저장
      await createTestResult(resultData);
    } catch (error) {
      console.error("⛔️테스트 결과 저장 중 오류 발생", error.message);
    }
  };

  // 테스트 결과 페이지로 이동
  const handleNavigateToResults = () => {
    navigate("/results");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {/* 사용자가 테스트를 완료하지 않은 경우, 테스트 진행화면 /  완료하면 결과표시 */}
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            {/* 테스트 폼 컴포넌트 */}
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            {/* 테스트 완료 후 결과표시 */}
            <h1 className="text-3xl font-bold mb-6">테스트 결과: {result}</h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-violet-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
