// components/VerifyAccount.jsx
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { MdEmail } from "react-icons/md";
import { useVerifyMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { useResendOTPMutation } from "../redux/api/authApi";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verify, { isError, isLoading }] = useVerifyMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOTPMutation();
  useEffect(() => {
    if (!location.state || location.state.from !== "register") {
      navigate("/not-allowed", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const email = location.state?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      alert("Please enter OTP");
      return;
    }
    try {
      const res = await verify({ email, otp }).unwrap();
      console.log(res);

      dispatch(setUser(res.user));
      navigate("/projects");
    } catch (error) {
      console.log("otp is not valid");
    }
  };

  const handleResend = async () => {
    clearInterval(timerRef.current);
    setTimeLeft(60);
    timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
    try {
      await resendOtp({ email }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100vh] bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <section
        className="bg-[var(--color-primary)] bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-md w-full p-8 shadow-lg"
        aria-label="Login form"
      >
        <h1 className="text-center text-2xl font-extrabold mb-8 text-[var(--color-secondary)]">
          Verify account
        </h1>
        <div className="flex flex-col text-center py-4">
          <h1>OTP Sent to your email:</h1>
          <h1 className="text-indigo-400">{email}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative py-4">
            <MdEmail
              className="absolute left-2 top-10 transform -translate-y-1/2 text-[var(--color-secondary)] text-xl pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 text-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-opacity-30 transition"
              aria-label="Email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-[var(--color-secondary)] hover:to-indigo-700 text-white font-bold text-lg shadow-md transition transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500"
            aria-label="Log in to your account"
          >
            Verify
          </button>
        </form>

        <p className="mt-6 text-center text-[var(--color-secondary)] pt-4 text-sm">
          {formatTime(timeLeft)}
          {"  "}
          <button
            onClick={handleResend}
            disabled={timeLeft <= 0}
            className="font-semibold text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
            tabIndex={0}
            role="link"
            aria-label="Go to registration page"
          >
            Resend
          </button>
        </p>
      </section>
    </div>
  );
};

export default VerifyAccount;
