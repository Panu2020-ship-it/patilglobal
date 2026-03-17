import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

/**
 * Home Page  –  /
 * ───────────────
 * Protected page — only reachable through <ProtectedRoute>.
 * On mount it reads "google_user" from localStorage to display
 * the signed-in user's profile picture, name and email.
 *
 * Logout:
 *   1. Clears both localStorage keys ("google_user" and "user").
 *   2. Calls google.accounts.id.disableAutoSelect() so the One Tap
 *      / auto-sign-in prompt won't fire on the next visit.
 *   3. Navigates to /login.
 */
export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // ── Read user from localStorage ───────────────────────────────────────────
    useEffect(() => {
        try {
            const raw = localStorage.getItem("google_user");
            if (raw) setUser(JSON.parse(raw));
        } catch {
            /* corrupted data — treat as logged out */
        }
    }, []);

    // ── Logout handler ────────────────────────────────────────────────────────
    const handleLogout = () => {
        localStorage.removeItem("google_user");
        localStorage.removeItem("user");

        // Tell Google's SDK to stop auto-selecting this account
        window.google?.accounts?.id?.disableAutoSelect();

        navigate("/login");
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const firstName = user?.name?.split(" ")[0] ?? "there";

    return (
        <div className="home-container">
            {/* Decorative background orbs */}
            <div className="orb orb-1" aria-hidden="true" />
            <div className="orb orb-2" aria-hidden="true" />
            <div className="orb orb-3" aria-hidden="true" />

            <div className="home-card">

                {/* ── Avatar with animated ring ── */}
                {user?.picture ? (
                    <div className="home-avatar-wrap" aria-label="Profile picture">
                        <img
                            className="home-avatar"
                            src={user.picture}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                        />
                        <span className="home-avatar-ring" aria-hidden="true" />
                        {/* Live green dot */}
                        <span className="home-status-dot" aria-label="Online" />
                    </div>
                ) : (
                    /* Fallback initials avatar if picture is missing */
                    <div className="home-avatar-fallback" aria-label="Avatar">
                        {user?.name?.[0] ?? "?"}
                    </div>
                )}

                {/* ── Greeting ── */}
                <h1 className="home-title">
                    Hey, {firstName}!&nbsp;🎉
                </h1>
                <p className="home-email">{user?.email}</p>
                <p className="home-subtitle">You are successfully signed in.</p>

                {/* ── Auth badges ── */}
                <div className="home-chips" role="list" aria-label="Authentication details">
                    <span className="chip chip-green" role="listitem">✔ Google Verified</span>
                    <span className="chip chip-blue" role="listitem">🔐 JWT Session</span>
                    <span className="chip chip-purple" role="listitem">⚡ Vite + React</span>
                </div>

                {/* ── User detail card ── */}
                <div className="home-detail-card">
                    <div className="home-detail-row">
                        <span className="home-detail-label">Name</span>
                        <span className="home-detail-value">{user?.name ?? "—"}</span>
                    </div>
                    <div className="home-detail-row">
                        <span className="home-detail-label">Email</span>
                        <span className="home-detail-value">{user?.email ?? "—"}</span>
                    </div>
                    <div className="home-detail-row">
                        <span className="home-detail-label">Provider</span>
                        <span className="home-detail-value">Google Identity Services</span>
                    </div>
                    <div className="home-detail-row">
                        <span className="home-detail-label">Session</span>
                        <span className="home-detail-value">localStorage (frontend)</span>
                    </div>
                </div>

                {/* ── Logout ── */}
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                    id="logout-btn"
                    aria-label="Sign out of your account"
                >
                    <svg
                        width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
