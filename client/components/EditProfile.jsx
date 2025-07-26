import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../layouts/MainContainer";
import profile from "../images/ghs.png";

const EditProfile = () => {
    const headerRef = useRef(null);
    const msgRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const btnTextRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [showOld, setShowOldPassword] = useState(false);
    const [showNew, setShowNewPassword] = useState(false);

    const showMsg = (type, msg) => {
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = msg;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = msg;
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    };
    const handleClick = e => {
        e.preventDefault();
        if (isUpdatingPassword) {
            // password updating here...
            if (oldPassword?.trim() === "") {
                showMsg(false, "Please Enter Old Password");
                return;
            }else if (newPassword?.trim() === "") {
                showMsg(false, "Please Enter New Password");
                return;
            }else {
                console.log("Change Password Will be call here...");
            }
        } else {
            if (name?.trim() === "") {
                showMsg(false, "Please Enter User Name");
                return;
            } else if (email?.trim() === "") {
                showMsg(false, "Email Is Required");
                return;
            } else if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    email.trim()
                )
            ) {
                showMsg(false, "Invalid Email Address");
                return;
            }
        }
    };

    return (
        <MainContainer>
            <h3 ref={headerRef}>
                {isUpdatingPassword ? "Change Password" : "Edit Profile"}
            </h3>
            {!isUpdatingPassword && <img src={profile} alt="User Profile" />}
            <span ref={msgRef}></span>
            {!isUpdatingPassword && (
                <>
                    <label htmlFor="user-avatar">Select A Photo</label>
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
                </>
            )}

            {isUpdatingPassword && (
                <>
                    <div className="password-feild">
                        <input
                            ref={oldPasswordRef}
                            onChange={e => setOldPassword(e.target.value)}
                            value={oldPassword}
                            type={showOld ? "text" : "password"}
                            placeholder="Enter Old Password"
                        />
                        {oldPassword !== "" && (
                            <div onClick={() => setShowOldPassword(!showOld)}>
                                {showOld ? "Hide" : "Show"}
                            </div>
                        )}
                    </div>
                    <div className="password-feild">
                        <input
                            ref={newPasswordRef}
                            onChange={e => setNewPassword(e.target.value)}
                            value={newPassword}
                            type={showNew ? "text" : "password"}
                            placeholder="Enter New Password"
                        />
                        {newPassword !== "" && (
                            <div onClick={() => setShowNewPassword(!showNew)}>
                                {showNew ? "Hide" : "Show"}
                            </div>
                        )}
                    </div>
                </>
            )}

            <button onClick={handleClick}>
                <div ref={btnTextRef}>Update Now</div>
            </button>
            <p>
                {isUpdatingPassword
                    ? "Update Personal Info ? "
                    : "Change Password ? "}
                <a
                    onClick={e => {
                        e.preventDefault();
                        setIsUpdatingPassword(!isUpdatingPassword);
                    }}
                >
                    Click Here
                </a>
            </p>
        </MainContainer>
    );
};

export default EditProfile;
