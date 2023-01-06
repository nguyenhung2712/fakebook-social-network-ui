import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import { required, vusername, vpassword } from "../../utils/Validate";

const Login = ({ onSetIsRegistered }) => {

    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    };

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleLogin = (event) => {
        event.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
			AuthService.login(username, password).then(
				() => {
					navigate("/");
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response &&
						error.response.data &&
						error.response.data.message) ||
						error.message ||
						error.toString();
		
					setLoading(false);
					setMessage(resMessage);
				}
			);
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="log-title">Login</h2>
            <Form onSubmit={handleLogin} ref={form}>

                <div className="form-group">
                    <label className="control-label" htmlFor="username"></label>
                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                        placeholder="Username"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="password"></label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                        placeholder="Password"
                    />
                </div>
                {
                    message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )
                }
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            
                <div className="submit-btns">

                        <button className="mtr-btn signin mr-3" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    <button className="mtr-btn signup" type="button" onClick={() =>onSetIsRegistered(prev => !prev)}><span>Register</span></button>
                </div>
            </Form>
        </>
    )
}

export default Login