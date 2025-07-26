import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import useAuthStore from "../store/useAuth";

const Login = () => {
    const navigate = useNavigate()
    const { loginNow, isSigningIn } = useAuthStore();
    const msgRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const btnTextRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setShow] = useState(false);

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
            passwordRef.current.style.border = ".1px solid #006294";
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
        } else {
            return true;
        }
    };
    const handleLogin = async e => {
        e.preventDefault();
        if (!isValid()) return;
        await loginNow(
            email,
            password,
            msgRef,
            emailRef,
            passwordRef,
            btnTextRef,navigate
        );
    };
    const showPassword = () => {
        setShow(!isShow);
    };

    return (
        <MainContainer>
            <h3>Please Login</h3>
            <span ref={msgRef}></span>
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
                    type={isShow ? "text" : "password"}
                    placeholder="Enter User Password"
                />
                {password !== ""&&<div onClick={showPassword}>{isShow ? "Hide" : "Show"}</div>}
            </div>
            <button onClick={handleLogin} className="submit-btn">
                {isSigningIn && <div className="loading"></div>}
                <div ref={btnTextRef} id="text">
                    Login Now
                </div>
            </button>
            <p>
                Forgot Password
                <NavLink to="/reset-password">Reset Password</NavLink>
            </p>
            <p>
                Don't Have An Account ? <NavLink to="/signup">Signup</NavLink>
            </p>
        </MainContainer>
    );
};

export default Login;
