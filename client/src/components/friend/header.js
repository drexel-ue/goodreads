import React from "react";
import { withRouter } from "react-router-dom";
import "./header.scss";

export default withRouter(({ match, location }) => {
  const borderStyle = path =>
    match.path === path ? { borderBottom: "2px solid black" } : {};

  return (
    <div className="friends_header">
      <div className="header_title">Friends</div>
      <div className="make_show_buttons">
        <div className="make_show_button" style={borderStyle("/friend")}>
          Friends
        </div>
        <div className="make_show_button" style={borderStyle("/friend/invite")}>
          Add Friends
        </div>
      </div>
    </div>
  );
});
