import { create } from "zustand";
import axios from "../libs/axios.js";

const useAuthStore = create((set, get) => ({
    authUser: JSON.parse(localStorage.getItem("auth-user")) || null,
    isSigningIn: false,
    isSigningUp: false,
    issendingOTP: false,
    isReseting: false,
    OTP: 0,
    tempEmail: "",
    isUpdating: false,
    isLoggingOut: false,
    isDeletingAccount: false,

    loginNow: async (
        email,
        password,
        msgRef,
        emailRef,
        passwordRef,
        btnTextRef,
        navigate
    ) => {
        const data = {
            email: email.trim(),
            password: password.trim()
        };
        set({ isSigningIn: true });
        btnTextRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.post("/login", data);
            if (!res?.data.success) throw new Error(res?.data?.message);
            localStorage.setItem("auth-user", JSON.stringify(res?.data?.user));
            set({ authUser: res?.data?.user });
            msgRef.current.classList.add("success");
            msgRef.current.textContent = res?.data?.message;
            setTimeout(() => {
                navigate("/profile");
            }, 2500);
        } catch (error) {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            set({ isSigningIn: false });
            btnTextRef.current.textContent = "Login Now";
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    },
    signupNow: async (
        name,
        email,
        password,
        msgRef,
        nameref,
        emailRef,
        passwordRef,
        btnTextRef,
        navigate
    ) => {
        const data = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim()
        };
        set({ isSigningUp: true });
        btnTextRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.post("/signup", data);
            if (!res?.data.success) throw new Error(res?.data?.message);
            localStorage.setItem("auth-user", JSON.stringify(res?.data?.user));
            set({ authUser: res?.data?.user });
            msgRef.current.classList.add("success");
            msgRef.current.textContent = res?.data?.message;
            setTimeout(() => {
                navigate("/profile");
            }, 2500);
        } catch (error) {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            set({ isSigningUp: false });
            btnTextRef.current.textContent = "Login Now";
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    },

    getUser: async () => {
        set({ isFetching: true });
        try {
            const res = await axios.get("/get-user");
            if (!res?.data?._id) throw new Error(res?.data?.message);
            set({ authUser: res?.data });
            localStorage.setItem("auth-user", JSON.stringify(res?.data));
        } catch (error) {
            console.error(
                "\n[!] Error While Fetching User ---> ",
                error?.response?.data?.message
            );
        } finally {
            set({ isFetching: false });
        }
    },

    sendOTP: async (email, msgRef, btnRef) => {
        set({ issendingOTP: true });
        btnRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.post("/send-otp", { email });
            if (!res?.data?.success) throw new Error(res?.data?.message);
            btnRef.current.textContent = "OTP Sent";
            msgRef.current.classList.add("success");
            msgRef.current.textContent = "OTP Sent To Your Email";
            setTimeout(() => {
                set({ tempEmail: email });
                set({ OTP: res?.data?.otp });
                console.log("\n[+] OTP ---> " + res?.data?.otp);
            }, 2500);
        } catch (error) {
            btnRef.current.textContent = "Send OTP";
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            set({ issendingOTP: false });
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    },
    resetNow: async (newPassword, msgRef, btnRef) => {
        set({ isReseting: true });
        btnRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.post("/reset-password", {
                email: get().tempEmail,
                newPassword
            });
            if (!res?.data?.success) throw new Error(res?.data?.message);
            msgRef.current.classList.add("success");
            msgRef.current.textContent = res?.data?.message;
        } catch (error) {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            btnRef.current.textContent = "Reset Password";
            localStorage.removeItem("OTP");
            set({ isReseting: false });
            set({ tempEmail: "" });
            set({ OTP: 0 });
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    },
    updateProfilePic: async base64Img => {
        try {
            const res = await axios.put("/update-profile-pic", { base64Img });
            if (!res?.data?._id) throw new Error(res?.data?.message);
            localStorage.setItem("auth-user", JSON.stringify(res?.data));
            set({ authUser: res?.data });
        } catch (error) {
            console.error("\n[!] Error While Uploading Photo --> ", error);
        }
    },
    updatePersonalInfo: async (data, msgRef, btnRef, navigate) => {
        set({ isUpdating: true });
        btnRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.put("/update-personal-info", data);
            if (!res?.data?._id) throw new Error(res?.data?.message);
            msgRef.current.classList.add("success");
            msgRef.current.textContent = "User Profile Updated Successfully";
            localStorage.setItem("auth-user", JSON.stringify(res?.data));
            set({ authUser: res?.data });
            setTimeout(() => {
                navigate("/profile");
            }, 2500);
        } catch (error) {
            console.log(error);
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            set({ isUpdating: false });
            btnRef.current.textContent = "Update Profile";
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    },
    changePassword: async (
        newPassword,
        oldPassword,
        msgRef,
        btnRef,
        navigate,
        setIsUpdatingPassword
    ) => {
        set({ isUpdating: true });
        btnRef.current.textContent = "Please Wait...";
        try {
            const res = await axios.put("/change-password", {
                newPassword,
                oldPassword
            });
            if (!res?.data?.success) throw new Error(res?.data?.message);
            msgRef.current.classList.add("success");
            msgRef.current.textContent = "Password Changed Successfully";
            setTimeout(() => {
                setIsUpdatingPassword(false);
                navigate("/profile");
            }, 2500);
        } catch (error) {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = error?.response?.data?.message;
        } finally {
            set({ isUpdating: false });
            btnRef.current.textContent = "Change Password";
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    },
    logout: async (msgRef, btnRef, navigate) => {
        set({ isLoggingOut: true });
        btnRef.current.textContent = "Wait...";
        try {
            const res = await axios.post("/logout");
            if (!res?.data?.success) throw new Error(res?.data?.message);
            msgRef.current.classList.add("msg-box-success");
            msgRef.current.innerHTML = "<h3>User Log Out Successfully</h3>";
            setTimeout(() => {
                localStorage.removeItem("auth-user");
            set({ authUser: null });
                navigate("/login");
            }, 2500);
        } catch (error) {
            msgRef.current.classList.add("msg-box-error");
            msgRef.current.innerHTML =
                "<h3>" + error?.response?.data?.message + "</h3>";
        } finally {
            set({ isLoggingOut: false });
            btnRef.current.textContent = "Logout";
        }
        setTimeout(() => {
            msgRef.current.innerHTML = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    },
    deleteAccount: async (msgRef, btnRef, navigate) => {
        set({ isDeletingAccount: true });
        btnRef.current.textContent = "Wait...";
        try {
            const res = await axios.post("/delete-account");
            if (!res?.data?.success) throw new Error(res?.data?.message);
            msgRef.current.classList.add("msg-box-success");
            msgRef.current.innerHTML = "<h3>Account Deleted Successfully</h3>";
            setTimeout(() => {
                localStorage.removeItem("auth-user");
                set({ authUser: null });
                navigate("/signup");
            }, 2500);
        } catch (error) {
            msgRef.current.classList.add("msg-box-error");
            msgRef.current.innerHTML =
                "<h3>" + error?.response?.data?.message + "</h3>";
        } finally {
            set({ isDeletingAccount: false });
            btnRef.current.textContent = "Delete";
        }
        setTimeout(() => {
            msgRef.current.innerHTML = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    }
}));

export default useAuthStore;
