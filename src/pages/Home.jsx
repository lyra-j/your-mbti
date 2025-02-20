import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-5xl font-bold mb-6">Your MBTI</h1>
        <h2 className="text-3xl font-semibold mb-5">무료 성격 테스트</h2>
        <p className="text-lg mb-8">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해주세요.
        </p>
      </div>
      <ul className="flex gap-8">
        <li className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">성격 유형 검사</h3>
          <p className="text-gray-600">
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </li>
        <li className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">성격 유형 이해</h3>
          <p className="text-gray-600">
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </li>
        <li className="bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">팀 평가</h3>
          <p className="text-gray-600">
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </li>
      </ul>
      <Link to="/login">로그인하기</Link>
    </div>
  );
};

export default Home;
