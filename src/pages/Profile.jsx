import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../api/auth";

const Profile = () => {
  const { isAuthenticated, token, user, setUser } = useContext(AuthContext);
  const [newNickname, setNewNickname] = useState(user?.nickname || "");

  const navigate = useNavigate();

  // 다시 확인해봐야 함 > profile페이지 private router임
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserProfile(token);
          setUser(userProfile);
        } catch (error) {
          console.error("사용자 정보를 가져오는데 실패했습니다.", error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setNewNickname(e.target.value);
  };

  // 닉네임 변경
  const handleSubmit = async (e) => {
    // 새고가 되어서 보니 이녀석이 오타
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nickname", newNickname);

      const data = await updateProfile(formData, token);

      setUser((prev) => ({ ...prev, nickname: data.nickname }));
      alert("닉네임이 변경되었습니다.");
      setNewNickname(data.nickname);
    } catch (error) {
      alert("닉네임 변경에 실패했습니다.");
      console.error("프로필 업데이트중 오류가 발생했습니다.", error.data.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 w-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-5">Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label>닉네임 : {user.nickname}</label>
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
