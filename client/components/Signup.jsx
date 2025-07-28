import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import useAuthStore from "../store/useAuth";

const Signup = () => {
    document.title = "User Signup Create New Account - Auth App Created By Ghs Julian"
    const navigate = useNavigate()
    const { signupNow, isSigningUp } = useAuthStore();
    const msgRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const btnTextRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ishowPassword, setShowPassword] = useState(false);
    const [isShowConfirmPassword, setShowConfirm] = useState(false);

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
            nameRef.current.style.border = ".1px solid #006294";
            emailRef.current.style.border = ".1px solid #006294";
            passwordRef.current.style.border = ".1px solid #006294";
            confirmPasswordRef.current.style.border = ".1px solid #006294";
        }, 2500);
    };
    const isValid = () => {
        if (name.trim() === "") {
            showMsg(false, "User Name Is Required");
            nameRef.current.style.border = ".1px solid #f40000";
            nameRef.current.focus();
            return false;
        } else if (email.trim() === "") {
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
        } else if (password.trim() === "") {
            showMsg(false, "User Password Is Required");
            passwordRef.current.style.border = ".1px solid #f40000";
            passwordRef.current.focus();
            return false;
        } else if (password?.trim()?.length <= 5) {
            showMsg(false, "Password Must Be At 6 Charecter");
            passwordRef.current.style.border = ".1px solid #f40000";
            passwordRef.current.focus();
            return false;
        } else if (confirmPassword?.trim() === "") {
            showMsg(false, "Confirm Password Is Required");
            confirmPasswordRef.current.style.border = ".1px solid #f40000";
            confirmPasswordRef.current.focus();
            return false;
        } else if (confirmPassword?.trim() !== password) {
            showMsg(false, "Confirm Password Must Be Same");
            confirmPasswordRef.current.style.border = ".1px solid #f40000";
            confirmPasswordRef.current.focus();
            return false;
        } else {
            return true;
        }
    };
    const handleSignup = async e => {
        e.preventDefault();
        if (!isValid()) return;
        await signupNow(
            name,
            email,
            password,
            msgRef,
            nameRef,
            emailRef,
            passwordRef,
            btnTextRef,navigate
        );
    };

    return (
        <MainContainer>
            <h3>Create An Account</h3>
            <span ref={msgRef}></span>
            <input
                ref={nameRef}
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter User Name"
            />
            <input
                ref={emailRef}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter User Email"
            />
            <div className="password-feild">
                <input
                    ref={passwordRef}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type={ishowPassword ? "text" : "password"}
                    placeholder="Enter User Password"
                />
                {password !== "" && (
                    <div onClick={() => setShowPassword(!ishowPassword)}>
                        {ishowPassword ? "Hide" : "Show"}
                    </div>
                )}
            </div>
            <div className="password-feild">
                <input
                    ref={confirmPasswordRef}
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={isShowConfirmPassword ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                />
                {confirmPassword !== "" && (
                    <div onClick={() => setShowConfirm(!isShowConfirmPassword)}>
                        {isShowConfirmPassword ? "Hide" : "Show"}
                    </div>
                )}
            </div>
            <button disabled={isSigningUp} onClick={handleSignup} className="submit-btn">
                {isSigningUp && <div className="loading"></div>}
                <div ref={btnTextRef} id="text">
                    Create Now
                </div>
            </button>
            <p>
                Forgot Password
                <NavLink to="/reset-password">Reset Password</NavLink>
            </p>
            <p>
                Already Have An Account ? <NavLink to="/login">Login</NavLink>
            </p>
        </MainContainer>
    );
};

export default Signup;
