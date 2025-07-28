import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import useAuthStore from "../store/useAuth";

const PasswordReset = () => {
    document.title = "Reset Your Password - Auth App Created By Ghs Julian";
    const navigate = useNavigate();
    const { OTP, resetNow, sendOTP, issendingOTP, isReseting } = useAuthStore();
    const headerRef = useRef(null);
    const msgRef = useRef(null);
    const emailRef = useRef(null);
    const otpRef = useRef(null);
    const newPasswordRef = useRef(null);
    const btnTextRef = useRef(null);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isNewPassword, setisNewPassword] = useState(false);

    const showMsg = (type, msg) => {
        msgRef.current.removeAttribute("class");
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = msg;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = msg;
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
            emailRef.current.style.border = ".1px solid #006294";
        }, 2500);
    };
    const isValid = () => {
        if (email.trim() === "") {
            showMsg(false, "User Email Is Required");
            emailRef.current.style.border = ".1px solid #f40000";
            emailRef.current.focus();
            return false;
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email.trim()
            )
        ) {
            showMsg(false, "Invalid User Email Address");
            emailRef.current.style.border = ".1px solid #f40000";
            emailRef.current.focus();
            return false;
        } else {
            return true;
        }
    };
    const handleClick = async e => {
        e.preventDefault();
        if (OTP !== 0) {
            if (otp === "") {
                msgRef.current.textContent = "Enter OTP From Your Email";
                msgRef.current.classList.add("error");
            } else if (OTP !== parseInt(otp?.trim())) {
                msgRef.current.textContent = "Invalid OTP Didn't Match";
                msgRef.current.classList.add("error");
            } else {
                otpRef.current.setAttribute("hidden", true);
                headerRef.current.textContent = "Create New Password";
                newPasswordRef.current.removeAttribute("hidden");
                setisNewPassword(true);
                
            }
        } else {
            if (!isValid()) return;
            sendOTP(email.trim(), msgRef, btnTextRef);
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    };
    const resetPassword = async e => {
        e.preventDefault();
        if (newPassword?.trim() === "") {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = "Please Enter New Password";
            return;
        } else if (newPassword?.trim()?.length <= 5) {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = "New Password Must Be At 6 Charecter";
            return;
        } else {
            // TODO : API Logic will be applied here...
            // alert("New Password Can Be Changed");
            await resetNow(newPassword, msgRef, btnTextRef);
            setisNewPassword(true);
            navigate("/profile");
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    };

    return (
        <MainContainer>
            <h3 ref={headerRef}>
                {OTP !== 0 ? "Verify Received OTP" : "Reset Your Password"}
            </h3>
            <span ref={msgRef}></span>
            {OTP === 0 ? (
                <input
                    ref={emailRef}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter Email Associated Account"
                />
            ) : (
                <input
                    ref={otpRef}
                    onChange={e => setOtp(e.target.value)}
                    value={otp}
                    type="number"
                    placeholder="Enter Received OTP(6)"
                />
            )}
            <input
                ref={newPasswordRef}
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                type="text"
                hidden={true}
                placeholder="Enter New Password(6)"
            />
            <button
                disabled={issendingOTP || isReseting}
                onClick={isNewPassword ? resetPassword : handleClick}
                className="submit-btn"
            >
                {issendingOTP ||
                    (isReseting && <div className="loading"></div>)}
                <div ref={btnTextRef} id="text">
                    {OTP !== 0 ? "Reset Now" : "Send OTP"}
                </div>
            </button>

            <p>
                Create An Account ? <NavLink to="/signup">Signup</NavLink>
            </p>
        </MainContainer>
    );
};

export default PasswordReset;
