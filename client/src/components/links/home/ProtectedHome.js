import React from "react";
import { withRouter } from "react-router-dom";

const ProtectedHome = (props) => (
    <div>
        <h2>Hello</h2>
    </div>
);

export default withRouter(ProtectedHome);