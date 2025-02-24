import React, { useState } from "react";
import { questions } from "../data/questions";

const TestForm = ({ onSubmit }) => {
  // 각 질문에 대한 사용자가 선택한 답변과 타입 저장
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  /**
   * @description 사용자가 라디오 버튼을 선택할 때 호출되는 함수
   * @param {number} index - 질문 인덱스
   * @param {string} answer - 사용자가 선택한 답변
   */
  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  /**
   * @description 폼 제출 시 실행되는 함수 (상위 컴포넌트로 응답 전달)
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg">
      {/* 질문 목록 렌더링 */}
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold text-lg mb-3">{q.question}</p>
          <div className="space-y-2">
            {/* 각 질문의 선택지 렌더링 */}
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                  answers[index]?.answer === option ? "bg-gray-100" : ""
                } hover:bg-gray-100`}
              >
                <input
                  type="radio"
                  name={`question-${index}`} // 질문내에서 답변은 1개만 선택
                  value={option}
                  checked={answers[index]?.answer === option} // 선택 여부 확인
                  onChange={() => handleChange(index, option)}
                  className="mr-2 text-primary-color"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-violet-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
      >
        제출하기
      </button>
    </form>
  );
};

export default TestForm;
