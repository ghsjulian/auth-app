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
            const res = axios.get("/get-user");
            console.log(res.data);
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            set({ isReseting: false });
            set({ tempEmail: "" });
            set({ OTP: 0 });
        }
        setTimeout(() => {
            msgRef.current.textContent = "";
            msgRef.current.removeAttribute("class");
        }, 2500);
    }
}));

export default useAuthStore;
