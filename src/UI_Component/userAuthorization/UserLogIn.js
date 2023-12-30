import React, { useState } from 'react'
import LoaderCompo from '../LoaderCompo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function UserLogIn() {
    const navigateTO = useNavigate();
    const [IsUserLoading, setIsUserLoading] = useState(false)
    const [IsShowPass, setIsShowPass] = useState(false);
    const [Message, setMessage] = useState({ "IsPassMsgActive": false, "IsNameMsgActive": false, "msgVal": "" });

    const [userDetails, setUserDetails] = useState({
        "username": "",
        "password": "",
    });
    const handleClickShowPassword = (e) => {
        setIsShowPass(!IsShowPass);
    }

    const handleOnChangeInput = (e) => {
        setMessage({ "msgVal": "", "IsNameMsgActive": false, "IsPassMsgActive": false })
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        });
    }


    const handleSingInClick = (e) => {
        e.preventDefault();
        if (userDetails.username.length === 0) {
            setMessage({ "msgVal": "Enter Your User Name", "IsNameMsgActive": true, "IsPassMsgActive": false })
        } else if (userDetails.password.length === 0) {
            setMessage({ "msgVal": "Password Can't be Empty.", "IsPassMsgActive": true, "IsNameMsgActive": false })
        } else {
            setIsUserLoading(true);
            axios.post('https://dummyjson.com/auth/login', userDetails).then((response) => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    toast.success('Login Successfully');
                    setTimeout(() => {
                        navigateTO("/")
                        setIsUserLoading(false)
                    }, 1500);
                }
            }).catch((err) => {
                console.log(err.code)
                if (err.code === "ERR_NETWORK") {
                    toast.error('Something Went Wrong, Please Try Again !');
                }
                else {
                    toast.error('Wrong UserName and Password');
                    setUserDetails({
                        "username": "",
                        "password": "",
                    })
                    setIsUserLoading(false)
                }

            })
        }
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                className="toasterContainer"
            />
            {IsUserLoading && <LoaderCompo />}
            <div className="formContainer">
                
                <form className='userForm userLOGIN__form'>
                    <h2 className='userForm--heading'>Get access to your Orders</h2>
                    <div className="inputBox">
                        <input type="text" name='username' id='username' placeholder='Enter Your User Name' className='inputFilelds' value={userDetails.username} onChange={handleOnChangeInput} />

                        {Message.IsNameMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
                    </div>

                    <div className="inputBox">
                        <input type={IsShowPass ? "text" : "password"} name='password' id='password' placeholder='Enter Your Password' className='inputFilelds' value={userDetails.password} onChange={handleOnChangeInput} autoComplete='password' />

                        <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickShowPassword}></i>
                        {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
                    </div>
                    <button className='userForm--Buttons' onClick={handleSingInClick}>Sign In</button>

                </form>
            </div>

        </>
    )
}

export default UserLogIn
