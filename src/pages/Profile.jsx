import React, { useState } from "react";
// import { updateProfile } from "../api/auth";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefaulet();
  };

  return (
    <div>
      <div>
        <h1>Profile</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" onChange={handleNicknameChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
