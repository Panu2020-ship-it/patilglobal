import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ── Pages (full-screen views) ────────────────────────────────────────────────
import Login from "./pages/Login";
import Home  from "./pages/Home";

// ── Components (shared, reusable UI) ────────────────────────────────────────
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * App.jsx  –  Root component / route table
 * ─────────────────────────────────────────
 *
 * Route map
 * ─────────
 *   /login  →  <Login>           Public.  Renders <GoogleLogin> sign-in flow.
 *   /       →  <ProtectedRoute>  Guard.   Redirects to /login if not auth'd.
 *                 <Home>         Protected dashboard.
 *   *       →  redirect to /     Catch-all for unknown paths.
 *
 * Full authentication flow
 * ─────────────────────────
 *   1. User visits  https://www.patilglobal.in/
 *   2. <ProtectedRoute> → reads localStorage["user"]
 *   3. Not found             → Navigate to /login
 *   4. <Login> renders       → <GoogleLogin> initialises GSI SDK
 *   5. <GoogleLogin>         → renders official "Sign in with Google" button
 *   6. User clicks button    → Google account picker opens
 *   7. Google returns signed JWT  in  response.credential
 *   8. decodeJwt(token)      → { name, email, picture, sub }
 *   9. localStorage.setItem("google_user", …)
 *   10. localStorage.setItem("user", { isLogin:true, token })
 *   11. onSuccess(user)      → Login calls navigate("/")
 *   12. <ProtectedRoute>     → isLogin:true  → renders <Home>
 *   13. <Home> reads "google_user"→ displays avatar, name, email
 *   14. User clicks "Sign Out"  → localStorage cleared → navigate /login
 */
export default function App() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/login" element={<Login />} />

      {/* ── Protected ── */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* ── Catch-all ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
