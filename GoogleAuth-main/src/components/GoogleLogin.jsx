import React, { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  GoogleLogin.jsx
//  ───────────────
//  Reusable Google Identity Services sign-in component.
//
//  Props
//  ─────
//  onSuccess(user)  – fired after a successful login with the decoded user.
//
//  What this component does
//  ─────────────────────────
//  1. Waits for the GSI <script> to finish loading (polling fallback).
//  2. Calls window.google.accounts.id.initialize() with the Client ID.
//  3. Renders the official Google Sign-In button via renderButton().
//  4. On sign-in, receives a signed JWT (response.credential).
//  5. Decodes the JWT payload with atob() — no backend required.
//  6. Saves user object to localStorage under both "google_user" and "user"
//     (the latter is read by ProtectedRoute).
//  7. Calls props.onSuccess(user) so the parent page can navigate.
//  8. If already logged in, renders a compact user card instead.
// ─────────────────────────────────────────────────────────────────────────────

const CLIENT_ID =
    "854529898090-7lfb358gha6u0v9ef2o1g03p27bvjmdb.apps.googleusercontent.com";

// ── JWT decoder ──────────────────────────────────────────────────────────────
/**
 * Decodes the PUBLIC claims in a Google JWT without any library.
 * This reads the base64url-encoded payload section (the middle part).
 *
 * ⚠️  This does NOT verify the signature.  For production apps that need
 *     server-side trust, verify the JWT at https://oauth2.googleapis.com/tokeninfo
 *     or using a Google server-side library.
 *
 * @param {string} token  –  raw JWT from response.credential
 * @returns {{ name, email, picture, sub, email_verified, ... } | null}
 */
export function decodeJwt(token) {
    try {
        const [, payload] = token.split(".");
        // base64url → base64 → binary string → UTF-8 text → JSON
        const json = decodeURIComponent(
            atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(json);
    } catch (err) {
        console.error("[GoogleLogin] JWT decode failed:", err);
        return null;
    }
}

// ── Helper: wait for window.google to be ready ───────────────────────────────
function waitForGoogle(timeout = 10_000) {
    return new Promise((resolve, reject) => {
        if (window.google?.accounts?.id) return resolve();
        const start = Date.now();
        const check = setInterval(() => {
            if (window.google?.accounts?.id) {
                clearInterval(check);
                resolve();
            } else if (Date.now() - start > timeout) {
                clearInterval(check);
                reject(new Error("Google Identity Services script did not load in time."));
            }
        }, 100);
    });
}

// ── Component ────────────────────────────────────────────────────────────────
export default function GoogleLogin({ onSuccess }) {
    const buttonRef = useRef(null);

    // Restore user from localStorage on first render
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("google_user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const [error, setError] = useState(null);

    // ── Initialize GSI and render the button ──────────────────────────────────
    useEffect(() => {
        // If user is already logged in, skip initialization
        if (user) return;

        let cancelled = false;

        waitForGoogle()
            .then(() => {
                if (cancelled) return;

                window.google.accounts.id.initialize({
                    client_id: CLIENT_ID,
                    callback: handleCredentialResponse,
                    // Disable One-Tap auto-sign-in to give the user full control
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                if (buttonRef.current) {
                    window.google.accounts.id.renderButton(buttonRef.current, {
                        theme: "outline",       // "outline" | "filled_blue" | "filled_black"
                        size: "large",          // "small" | "medium" | "large"
                        shape: "pill",          // "rectangular" | "pill"
                        text: "signin_with",    // label text variant
                        logo_alignment: "left",
                        width: 300,
                    });
                }
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            });

        return () => {
            cancelled = true;
        };
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Credential response callback ──────────────────────────────────────────
    const handleCredentialResponse = (response) => {
        if (!response?.credential) {
            setError("No credential received from Google. Please try again.");
            return;
        }

        const payload = decodeJwt(response.credential);

        if (!payload) {
            setError("Failed to decode Google credential. Please try again.");
            return;
        }

        const userData = {
            isLogin: true,
            token: response.credential,   // raw JWT (send to backend for verification)
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            sub: payload.sub,              // unique, stable Google user ID
            email_verified: payload.email_verified,
        };

        // ── Persist to localStorage ──
        // "google_user"  →  full profile (name, email, picture, …)
        // "user"         →  minimal record for ProtectedRoute ( { isLogin, token } )
        localStorage.setItem("google_user", JSON.stringify(userData));
        localStorage.setItem(
            "user",
            JSON.stringify({ isLogin: true, token: response.credential })
        );

        setUser(userData);

        // Notify parent page so it can navigate
        onSuccess?.(userData);
    };

    // ── Logout (used when component renders the user card) ────────────────────
    const handleLogout = () => {
        localStorage.removeItem("google_user");
        localStorage.removeItem("user");
        window.google?.accounts?.id?.disableAutoSelect();
        setUser(null);
    };

    // ── Render: error state ───────────────────────────────────────────────────
    if (error) {
        return (
            <div className="gl-error" role="alert">
                <span>⚠️ {error}</span>
                <button onClick={() => setError(null)} className="gl-error-retry">
                    Retry
                </button>
            </div>
        );
    }

    // ── Render: already signed in (compact user card) ─────────────────────────
    if (user) {
        return (
            <div className="gl-user-card" role="status" aria-label="Signed-in user">
                <div className="gl-user-avatar-wrap">
                    <img
                        className="gl-user-avatar"
                        src={user.picture}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                    />
                    <span className="gl-status-dot" aria-label="Active session" />
                </div>
                <div className="gl-user-info">
                    <p className="gl-user-name">{user.name}</p>
                    <p className="gl-user-email">{user.email}</p>
                </div>
                <button
                    className="gl-logout-btn"
                    onClick={handleLogout}
                    id="gl-logout-btn"
                    aria-label="Sign out"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    // ── Render: sign-in button (default) ─────────────────────────────────────
    return (
        <div className="gl-signin-wrap">
            {/* Google renders its iframe into this div */}
            <div ref={buttonRef} id="googleSignInDiv" aria-label="Sign in with Google" />
        </div>
    );
}
