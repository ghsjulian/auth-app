import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import profile from "../images/ghs.png";
import useAuthStore from "../store/useAuth";

const EditProfile = () => {
    document.title = "Edit Profile - Auth App Created By Ghs Julian";
    const navigate = useNavigate();
    const { authUser, updatePersonalInfo, isUpdating, changePassword } =
        useAuthStore();
    const headerRef = useRef(null);
    const msgRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const btnTextRef = useRef(null);

    const [avatar, setAvatar] = useState(authUser?.avatar);
    const [name, setName] = useState(authUser?.name);
    const [email, setEmail] = useState(authUser?.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [showOld, setShowOldPassword] = useState(false);
    const [showNew, setShowNewPassword] = useState(false);

    const handleFileChange = e => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = result => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };
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
    const handleClick = async e => {
        e.preventDefault();
        if (isUpdatingPassword) {
            // password updating here...
            if (oldPassword?.trim() === "") {
                showMsg(false, "Please Enter Old Password");
                return;
            } else if (newPassword?.trim() === "") {
                showMsg(false, "Please Enter New Password");
                return;
            } else {
                // console.log("Change Password Will be call here...");
                await changePassword(
                    newPassword,
                    oldPassword,
                    msgRef,
                    btnTextRef,
                    navigate,
                    setIsUpdatingPassword
                );
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
            } else {
                const data = {
                    name: name.trim(),
                    email: email.trim(),
                    avatar: avatar
                };
                await updatePersonalInfo(data, msgRef, btnTextRef, navigate);
            }
        }
    };

    return (
        <MainContainer>
            <h3 ref={headerRef}>
                {isUpdatingPassword ? "Change Password" : "Edit Profile"}
            </h3>
            {!isUpdatingPassword && <img src={avatar} alt="User Profile" />}
            <span ref={msgRef}></span>
            {!isUpdatingPassword && (
                <>
                    <label htmlFor="user-avatar">Select A Photo</label>
                    <input
                        type="file"
                        id="user-avatar"
                        hidden={true}
                        accept="/images/*"
                        onChange={handleFileChange}
                    />
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

            <button disabled={isUpdating} onClick={handleClick}>
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
                        document.title = "Change Password - Auth App Created By Ghs Julian"
                    }}
                >
                    Click Here
                </a>
            </p>
            {isUpdatingPassword && (
                <p>
                    Forgot Password
                    <NavLink to="/reset-password">Reset Password</NavLink>
                </p>
            )}
        </MainContainer>
    );
};

export default EditProfile;
