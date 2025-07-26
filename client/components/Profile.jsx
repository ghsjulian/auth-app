import React, { useState, useEffecr } from "react";
import cover from "../images/cover-1.jpg";
import profile from "../images/ghs.png";

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-cover">
                <img src={cover} alt="Profile Cover" />
                <div className="profile">
                    <img src={profile} alt="User Profile" />
                </div>
            </div>
            <div className="user-info">
                <h3>Ghs Julian</h3>
                <h4>ghsjulian@gmail.com</h4>
                <h4>Joined Since - 12 November 2025</h4>
                <div className="btn-area">
                    <button id="edit">Edit Profile</button>
                    <button id="del">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
