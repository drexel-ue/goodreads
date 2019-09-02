import React from "react";
import { withRouter } from "react-router-dom";
import Register from '../session/Register';

const ProtectedHome = (props) => (
    <div>
        <h2>Hello</h2>
    </div>
);

export default withRouter(ProtectedHome);