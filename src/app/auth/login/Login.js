"use client";
import React, { useEffect, useState, useTransition } from "react";
import "./login.scss";
import Image from "next/image";
import white_line from "../../../../public/assets/images/LineWhite.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "@/app/Services/Apis";
import { setDataToLocalStorage } from "@/app/Components/Helper/Helper";
import { clear_login_error, clear_login_message } from "@/app/Context/Auth";
import { getToken } from "firebase/messaging";
import { useSession, signIn } from "next-auth/react";
import { messaging } from "@/firebaseinit";
const Login = () => {
  const dispatch = useDispatch();
  const { data, status } = useSession();
  console.log(data, status, "data, status ");
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified_message = searchParams.get("message");
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const { login_data, login_loading, login_error, login_message } = useSelector(
    (state) => state.login
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are present
    if (!formData.emailOrUsername || !formData.password) {
      toast.error("Email/Username and Password are required!");
      return;
    }

    try {
      // Always run login logic
      startTransition(async () => {
        // Request permission for notifications
        let currentToken = null;
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          // Request notification permission from the user
          if (window?.Notification) {
            const permission = await window.Notification.requestPermission();

            // Only attempt to get the token if permission is granted
            if (permission === "granted") {
              console.log("Notification permission granted.");

              // Ensure messaging is initialized
              if (messaging) {
                try {
                  // Get the token (this will work after service worker is registered)
                  currentToken = await getToken(messaging, {
                    vapidKey:
                      "BB8lpx2bQAmgs3n4oZuF9rCtW-ZI_h0H734dakx5HJ7R8lmyvHP0QkiRfokWzWTf2GRrHmMQSazfcBHyLvjhFY8",
                  });

                  if (currentToken) {
                    console.log("FCM Token:", currentToken);
                    // Send the token to your server or use it as needed
                  } else {
                    console.log("No registration token available.");
                  }
                } catch (error) {
                  console.warn("Error getting FCM token:", error);
                }
              }
            }
          }
        }

        // Run the login regardless of token status
        let response = await handleLogin(
          dispatch,
          formData.emailOrUsername,
          formData.password,
          currentToken || null // Pass token if available, or null if not
        );

        // Store user data and redirect
        setDataToLocalStorage("user_info", response?.data);

        setTimeout(() => {
          if (response?.data?.token) {
            router.push("/"); // Redirect on successful login
          }
        }, 1000);

        // Clear form data
        setFormData({ emailOrUsername: "", password: "" });
      });
    } catch (error) {
      console.error(
        "Error during login or fetching notification token:",
        error
      );
      toast.error("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    toast.success(verified_message);
  }, [verified_message]);
  useEffect(() => {
    if (login_message) {
      toast.success(login_message);
      dispatch(clear_login_message());
    }
    if (login_error) {
      toast.error(login_error);
      dispatch(clear_login_error());
    }
  }, [dispatch, login_error, login_message]);

  return (
    <>
    <div className="login-container">
      <div className="login-left-section">
        <h1 className="login-heading">Welcome Back!</h1>
      </div>
      <div className="login-divider-line">
        <Image src={white_line} alt="Divider" priority />
      </div>
      <div className="login-right-section">
        <h2 className="login-right-heading">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label>Email or Username</label>
            <input
              type="text"
              name="emailOrUsername"
              required
              placeholder="Email or Username"
              value={formData.emailOrUsername}
              onChange={handleChange}
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="login-con">
            {/* <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I have read and agree to all the terms and conditions
              </label>
            </div> */}
            <button
              className="login-btn"
              type="submit"
              disabled={isPending || login_loading}
            >
              {isPending ? "Logging in..." : "SIGN IN"}
            </button>
            <div>Or</div>
            <div className="google-sign-in">
              <button
                className="google-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault(), signIn("google");
                }}
              >
                <img
                  src="https://w7.pngwing.com/pngs/937/156/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-service-thumbnail.png"
                  alt="Google Logo"
                  className="google-logo"
                />
                Sign in with Google
              </button>
            </div>
            <p className="signup-link">
              Don't have an account? <Link href="/auth/sign-up">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
