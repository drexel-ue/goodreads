import React from "react";
import { withRouter } from "react-router-dom";
import Register from '../session/Register';

const AuthHome = (props) => (
    <div className='register'>
        <div className='h2-container'>
            <h2>Meet your next</h2>
            <h2>favorite book.</h2>
        </div>
        <Register />
    </div>
);

export default withRouter(AuthHome);