import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cover from "../images/cover-1.jpg";
import profile from "../images/ghs.png";
import useAuthStore from "../store/useAuth";

const Profile = () => {
    const navigate = useNavigate();
    const {
        authUser,
        updateProfilePic,
        logout,
        isLoggingOut,
        deleteAccount,
        isDeletingAccount
    } = useAuthStore();
    const [fileData, setFile] = useState(null);
    const logBtnRef = useRef(null);
    const deleteBtnRef = useRef(null);
    const msgRef = useRef(null);
    document.title = authUser?.name+" Profile - Auth App Created By Ghs Julian"
    
    const handleFile = e => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async result => {
            setFile(reader.result);
            await updateProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <>
            <div ref={msgRef}></div>

            <div className="profile-page">
                <div className="profile-cover">
                    <img src={cover} alt="Profile Cover" />
                    <div className="profile">
                        <label htmlFor="profile-img">
                            <img src="/images/upload.png" />
                        </label>
                        <input
                            onChange={handleFile}
                            id="profile-img"
                            type="file"
                            accept="/image/*"
                            hidden={true}
                            multiple
                        />
                        <img
                            src={fileData ? fileData : authUser?.avatar}
                            alt="User Profile"
                        />
                    </div>
                </div>
                <div className="user-info">
                    <h3>{authUser?.name}</h3>
                    <h4>{authUser?.email}</h4>
                    <h4>Joined Since - 12 November 2025</h4>
                    <div className="btn-area">
                        <button
                            onClick={() => navigate("/edit-profile")}
                            id="edit"
                        >
                            Edit Profile
                        </button>
                        <button
                            disabled={isLoggingOut}
                            ref={logBtnRef}
                            onClick={async () => {
                                await logout(msgRef, logBtnRef, navigate);
                            }}
                            id="log"
                        >
                            Logout
                        </button>
                        <button
                            disabled={isDeletingAccount}
                            ref={deleteBtnRef}
                            onClick={async () => {
                                await deleteAccount(
                                    msgRef,
                                    deleteBtnRef,
                                    navigate
                                );
                            }}
                            id="del"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
