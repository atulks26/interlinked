import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { db } from "../context/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import "../styles/login.css";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");
    const [userCaptchaInput, setUserCaptchaInput] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const auth = getAuth();

    const generateCaptcha = () => {
        const charsArray =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const lengthOtp = 5;
        let captcha = "";
        for (let i = 0; i < lengthOtp; i++) {
            const index = Math.floor(Math.random() * charsArray.length);
            captcha += charsArray[index];
        }
        return captcha;
    };

    const handleCaptchaRefresh = () => {
        setCaptchaValue(generateCaptcha());
    };

    const handleLogin = async () => {
        if (!email || !password || !userCaptchaInput) {
            setError("All fields are required.");
            return;
        }

        try {
            if (userCaptchaInput !== captchaValue) {
                setError("CAPTCHA is incorrect.");
                handleCaptchaRefresh();
                return;
            }

            await setPersistence(auth, browserLocalPersistence);

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userData = await getDoc(userRef);

            if (!userData.exists()) {
                setError("User data not found in database.");
                return;
            }

            const data = userData.data();

            await setUser(data);
            await localStorage.setItem("user", JSON.stringify(data));
            console.log("Logged In");

            if (data.role === "admin") {
                navigate(`/dashboard/admin/${data.department}/${data.userId}`);
            } else {
                navigate(
                    `/dashboard/junior-officer/${data.department}/${data.userId}`
                );
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/invalid-email"
            ) {
                setError("Invalid email or password");
            } else {
                setError("An error occurred. Please try again.");
            }
            handleCaptchaRefresh();
        }
    };

    useEffect(() => {
        handleCaptchaRefresh();
    }, []);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>User Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="captcha-group">
                        <div className="captcha-box">
                            <span className="captcha-value select-none">
                                {captchaValue}
                            </span>
                            <button
                                type="button"
                                className="refresh-captcha"
                                onClick={handleCaptchaRefresh}
                            >
                                ↻
                            </button>
                        </div>
                        <input
                            type="text"
                            id="captcha"
                            placeholder="Enter CAPTCHA"
                            value={userCaptchaInput}
                            onChange={(e) =>
                                setUserCaptchaInput(e.target.value)
                            }
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    {error && (
                        <p className="text-red-500 text-center mt-4">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
