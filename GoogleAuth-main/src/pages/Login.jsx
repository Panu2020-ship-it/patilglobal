import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import "../styles/login.css";

/**
 * Login Page  –  /login
 * ─────────────────────
 * Public page.  Hosts the <GoogleLogin /> component.
 * After a successful sign-in GoogleLogin calls onSuccess(user),
 * and we navigate the user to the protected home route.
 */
export default function Login() {
    const navigate = useNavigate();

    /** Called by <GoogleLogin> once the JWT has been decoded & stored. */
    const handleLoginSuccess = (user) => {
        console.log("✅ Signed in as:", user.name, "<" + user.email + ">");
        navigate("/");
    };

    return (
        <div className="login-container">
            {/* Animated background particles */}
            <span className="login-particle p1" aria-hidden="true" />
            <span className="login-particle p2" aria-hidden="true" />
            <span className="login-particle p3" aria-hidden="true" />

            <div className="login-card">
                {/* ── Brand logo ── */}
                <div className="login-brand">
                    <div className="login-logo-ring">
                        <svg
                            className="login-logo-icon"
                            viewBox="0 0 48 48"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle cx="24" cy="24" r="24" fill="url(#lg)" />
                            <path
                                d="M14 24l8 8 14-16"
                                stroke="#fff"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <defs>
                                <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="100%" stopColor="#f857a6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="login-brand-name">PatilGlobal</span>
                </div>

                {/* ── Headings ── */}
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">
                    Sign in with Google to access your dashboard
                </p>

                {/* ── Google Sign-In ── */}
                <div className="google-btn-container">
                    <GoogleLogin onSuccess={handleLoginSuccess} />
                </div>

                {/* ── Divider ── */}
                <div className="login-divider">
                    <span />
                    <small>Secure · Fast · No password needed</small>
                    <span />
                </div>

                {/* ── Footer ── */}
                <p className="login-footer">
                    By signing in you agree to our&nbsp;
                    <a
                        href="https://www.patilglobal.in/terms"
                        className="login-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Terms
                    </a>
                    &nbsp;and&nbsp;
                    <a
                        href="https://www.patilglobal.in/privacy"
                        className="login-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
