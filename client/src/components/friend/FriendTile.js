import React from "react";
import { withRouter } from "react-router-dom";
import "./FriendTile.scss";

export default withRouter(({ history, location, user }) => {
  console.log(user)
  return (
    <div className="friend_tile">
      <img className="profile" src={user.profilePhoto} alt="profile" />
      <div className="user_info">
        <div className="name">{user.name}</div>
        <div className="books_and_friends">
          <div className="books"></div>
          <div className="friends"></div>
        </div>
      </div>
    </div>
  );
});
