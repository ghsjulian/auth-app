import React, { useState, useEffecr } from "react";
import cover from "../images/cover-1.jpg";
import profile from "../images/ghs.png";
import useAuthStore from "../store/useAuth";

const Profile = () => {
    const { authUser, updateProfilePic } = useAuthStore();
    const [fileData, setFile] = useState(null);

    const handleFile = e => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async result => {
            setFile(reader.result);
            await updateProfilePic(reader.result)
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="profile-page">
            <div className="profile-cover">
                <img src={cover} alt="Profile Cover" />
                <div className="profile">
                    <label htmlFor="profile-img">
                        <img src="/images/upload.png"/>
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
                    <button id="edit">Edit Profile</button>
                    <button id="del">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
