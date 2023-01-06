import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom";

import LocationService from "../../services/location.service";
import AuthService from "../../services/auth.service";
import { required, vusername, validEmail, vpassword } from "../../utils/Validate"

const Register = ({onSetIsRegistered}) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState("");

    const [provinceSelected,setProvinceSelected] = useState("");
    const [districtSelected,setDistrictSelected] = useState("");
    const [wardSelected,setWardSelected] = useState("");

    const [provincesList,setProvincesList] = useState([]);
    const [districtsList,setDistrictsList] = useState([]);
    const [wardsList,setWardLists] = useState([]);

    /* const [provinceLabel,setProvinceLabel] = useState(true);
    const [districtLabel,setDistrictLabel] = useState(true);
    const [wardLabel,setWardLabel] = useState(true); */

    useEffect(() => {
        getAllProvinces();
        return () => {

        }
    }, []);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address);
    };

    const handleSelectProvinces = (e) => {
        setProvinceSelected(e.target.value)
        getDistricts(e.target.value)
    }

    const handleSelectDistrict = (e) => {
        setDistrictSelected(e.target.value)
        getWards(e.target.value)
    }

    const handleSelectWards = (e) => {
        setWardSelected(e.target.value)
       
    }

    const getAllProvinces = async () => {
        LocationService.getAllProvinces().then((res) => {
            setProvincesList(res.data)
        })
    }
     
    const getDistricts = async (province_code) => {
        LocationService.getDistricts(province_code).then((res) => {
            setDistrictsList(res.data)
        })
    }
     
    const getWards = async (district_code) => {
        LocationService.getWards(district_code).then((res) => {
            setWardLists(res.data)
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register({
                username, email, password, firstName, lastName,
                wardCode: wardSelected, districtCode: districtSelected,
                provinceCode: provinceSelected, address
            })
                .then(
                    (response) => {
                        setMessage(response.data.message);
                        setLoading(false);
                        setSuccessful(true);
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
                        setSuccessful(false);
                    }
                );
        }
    };

    return (
        <>
            <h2 className="log-title">Register</h2>
            <Form onSubmit={handleRegister} ref={form}>
                <div className="form-group">	
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
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <div className="form-group half">
                        <Input
                            type="text"
                            className="form-control"
                            name="first"
                            value={firstName}
                            onChange={onChangeFirstName}
                            validations={[required]}
                            placeholder="First name"
                        />
                    </div>
                    <div className="form-group half">
                        <Input
                            type="text"
                            className="form-control"
                            name="last"
                            value={lastName}
                            onChange={onChangeLastName}
                            validations={[required]}
                            placeholder="Last name"
                        />
                    </div>
                </div>
                <div className="form-group">
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
                <div className="form-group">	
                    <select name="province" 
                        value={provinceSelected} 
                        onChange={(e) => handleSelectProvinces(e)}
                        placeholder="Select your province"
                    >
                        {
                            provincesList && provincesList.map((item) =>
                                <option value={item.code} key={item.code}> {item.fullName}</option>
                            )
                        
                        }
                    </select>
                </div>
                {
                    provinceSelected ?
                    <div className="form-group">
                        <select name="district" 
                            value={districtSelected} 
                            onChange={(e) => handleSelectDistrict(e)}
                            placeholder="Select your district"
                        >
                        {
                            districtsList && districtsList.map((item) =>
                                <option value={item.code} key={item.code}> {item.fullName}</option>
                            )
                        }
                        </select>
                    </div>
                    :
                    <div className="form-group">
                        <select name="district" disabled={true}
                            placeholder="Select your district"
                        >
                        </select>
                   </div>
                   
                }
               
               {
                    districtSelected ?
                    <div className="form-group">
                        <select name="ward" 
                            value={wardSelected} 
                            onChange={(e) => handleSelectWards(e)}
                            placeholder="Select your ward"
                        >
                        {
                            wardsList && wardsList.map((item) =>
                                <option value={item.code} key={item.code}> {item.fullName}</option>
                            ) 
                        }
                        </select>
                    </div>
                    :
                    <div className="form-group">
                        <select name="ward" disabled={true}
                        placeholder="Select your ward">
                            
                        </select>
                    </div>
                }
                {
                    wardSelected ? 
                    <div className="form-group">	
                        <Input
                            type="text"
                            className="form-control"
                            name="address"
                            value={address}
                            onChange={onChangeAddress}
                            validations={[required]}
                            placeholder="Address"
                        />
                    </div>
                    :<div></div>
                }
                <Link onClick={()=> onSetIsRegistered(prev =>!prev) }>Already have an account</Link>
                
                <div className="submit-btns">
                    <button className="mtr-btn signup" disabled={loading} type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Register</span>
                    </button>
                </div>
                {
                    message && (
                            <div className="form-group">
                                <div
                                    className={ successful ? "alert alert-success" : "alert alert-danger" }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )
                }
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>    
        </>
    );
};

export default Register;