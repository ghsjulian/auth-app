import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import useAuthStore from "./store/useAuth";
import Auth from "./auth/Auth";

const App = () => {
    const { authUser, getUser } = useAuthStore();
    useEffect(() => {
        getUser();
    }, [getUser]);
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route
                    path="/login"
                    element={
                        !authUser || !authUser?._id ? (
                            <Login />
                        ) : (
                            <Navigate to="/profile" />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !authUser || !authUser?._id ? (
                            <Signup />
                        ) : (
                            <Navigate to="/profile" />
                        )
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <Auth>
                            <PasswordReset />
                        </Auth>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Auth>
                            <Profile />
                        </Auth>
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <Auth>
                            <EditProfile />
                        </Auth>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
