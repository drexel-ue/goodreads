import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(({ history, location, user }) => {
  return (
    <div className="friend_tile">
      <img className="profilePhoto" src={user.profilePhoto} alt="profile" />
    </div>
  );
});
