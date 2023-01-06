import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import AuthService from "../../services/auth.service";

const ConfirmAccount = () => {
    
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    
    useEffect(() => {
        AuthService.readUserByConfirmToken(token)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [token])

    const handleConfirmAccount = () => {
        setLoading(true);
        setSuccessful(false);
        AuthService.confirm(token)
            .then((res) => {
                setLoading(false);
                setMessage(res.data.message);
                setSuccessful(true);
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            })
            .catch((err) => {
                const resMessage =
                    (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message ||
                    err.toString();
                setLoading(false);
                setMessage(resMessage);
                setSuccessful(false);
            })
    }

    return (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h3 className="">Confirm your account with email: </h3>
            <div className="mb-3"><h3 className="font-weight-bold">{ user && user.email }</h3></div>
            <div className="">
                <button 
                    className="mtr-btn signin mr-3" 
                    disabled={loading}
                    onClick={ handleConfirmAccount }
                >
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Confirm</span>
                </button>
            </div>
            {
                message && (
                        <div className="form-group w-25">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default ConfirmAccount;