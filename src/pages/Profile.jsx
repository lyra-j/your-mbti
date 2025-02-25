import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/auth";
import { toast } from "react-toastify";

const Profile = () => {
  // 인증 상태 및 사용자 정보
  const { isAuthenticated, token, user, setUser } = useContext(AuthContext);

  // 닉네임 input satae
  const [newNickname, setNewNickname] = useState(user?.nickname || "");

  const navigate = useNavigate();

  // 사용자가 로그인하지 않은경우, 로그인페이지로 이동
  if (!isAuthenticated) {
    toast.info("로그인이 필요합니다.");
    navigate("/login");
    return null;
  }

  // 닉네임 입력 값 핸들러
  const handleChange = (e) => {
    setNewNickname(e.target.value);
  };

  // 닉네임 변경 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const formData = new FormData();
      formData.append("nickname", newNickname);

      // 사용자 닉네임 업데이트 요청 API 호출
      const data = await updateProfile(formData, token);

      // 변경된 닉네임 적용
      setUser((prev) => ({ ...prev, nickname: data.nickname }));
      setNewNickname(data.nickname);
      toast.success("닉네임이 변경되었습니다.");
    } catch (error) {
      toast.error("닉네임 변경에 실패했습니다.");
      console.error("프로필 업데이트중 오류가 발생했습니다.", error.message);
    }
  };

  // 사용자 정보 로딩중일 경우 로딩 메시지 표출
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 w-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-5">Profile</h2>

        {/* 닉네임 변경 폼 */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label>현재 닉네임 : {user.nickname}</label>
            <input
              type="text"
              value={newNickname}
              onChange={handleChange}
              placeholder="새 닉네임을 입력해주세요"
              className="w-full p-4 border border-gray-200 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-800 transition duration-300"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
