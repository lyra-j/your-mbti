import React from "react";
import { useState } from "react";

const Profile = () => {
  const [nickname, setNickname] = useState();

  const handleNicknameChange = () => {};

  const handleSubmit = () => {};

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
