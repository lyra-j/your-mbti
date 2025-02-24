import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  // AuthContext에서 로그인 인증 상태 가져오기
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Test페이지로 이동하는 함수
  const handleTestNavigation = () => {
    // 로그인되어 있다면 Test페이지로 이동
    if (isAuthenticated) {
      return navigate("/test");
    }

    // 로그인 상태가 아니라면 사용자에게 확인창 표출
    const confirmLogin = window.confirm(
      "로그인 후 이용가능합니다. 로그인페이지로 이동하시겠습니까?"
    );

    if (!isAuthenticated) {
      if (confirmLogin) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div>
        <h2 className="text-3xl font-semibold mb-5">무료 성격 테스트</h2>
        <p className="text-lg mb-8">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해주세요.
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

      <button
        onClick={handleTestNavigation}
        className="inline-block bg-violet-500 text-white py-2 px-6 rounded-full transition mb-4 hover:bg-violet-800"
      >
        내 성격 알아보러 가기
      </button>
    </div>
  );
};

export default Home;
