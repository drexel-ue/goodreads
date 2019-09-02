import React from "react";
import { withRouter } from "react-router-dom";
import "./header.scss";

export default withRouter(props => {
  return (
    <div className="friends_header">
      <div className="header_title">Friends</div>
    </div>
  );
});
