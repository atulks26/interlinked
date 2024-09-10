import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { db } from "../context/firebase";
import { doc, getDoc } from "@firebase/firestore";
import "../styles/login.css";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const [uId, setUId] = useState("");
    const [password, setPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");
    const [userCaptchaInput, setUserCaptchaInput] = useState("");
    const [error, setError] = useState("");
    const { setUser, setUserId } = useContext(UserContext);
    const navigate = useNavigate();

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
        if (!uId) return;

        const userRef = doc(db, "users", uId);

        try {
            if (userCaptchaInput !== captchaValue) {
                setError("CAPTCHA is incorrect.");
                return;
            }

            const userData = await getDoc(userRef);

            if (!userData.exists()) {
                console.log("User doesn't exist");
                return;
            }

            const data = userData.data();

            if (password == data.password) {
                await setUser(data);
                await setUserId(uId);
                console.log("Logged In");

                if (data.role) {
                    navigate(`/dashboard/admin/${data.department}`);
                } else {
                    navigate(`/dashboard/employee/${data.department}`);
                }
            } else {
                setError("Invalid password");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        handleCaptchaRefresh();
    }, []);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Employee Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="userId">User Id</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={uId}
                            onChange={(e) => setUId(e.target.value)}
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
                        <label htmlFor="captcha">CAPTCHA</label>
                        <div className="captcha-box">
                            <span className="captcha-value">
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

                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
