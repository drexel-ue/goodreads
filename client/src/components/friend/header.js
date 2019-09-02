import React from "react";
import { withRouter } from "react-router-dom";
import "./header.scss";

export default withRouter(props => {
  return (
    <div className="friends_header">
          <div className="header_title">Friends</div>
          <div className='make_show_buttons'>
              <div className='make_show_button'>Friends</div>
              <div className='make_show_button'>Add Friends</div>
          </div>
    </div>
  );
});
