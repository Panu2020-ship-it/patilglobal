import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute.jsx
 * ──────────────────
 * Guards any route that requires the user to be signed in.
 *
 * How it works:
 *   1. Reads "user" from localStorage and attempts JSON.parse().
 *   2. If the parsed value contains isLogin: true → renders children.
 *   3. Otherwise → redirects to /login, and passes the attempted
 *      URL in location state so Login can redirect back after sign-in.
 *
 * Usage in App.jsx:
 *   <Route
 *     path="/"
 *     element={
 *       <ProtectedRoute>
 *         <Home />
 *       </ProtectedRoute>
 *     }
 *   />
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Safely parse the stored session
  let isAuthenticated = false;
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      isAuthenticated = parsed?.isLogin === true;
    }
  } catch {
    // Corrupted localStorage data → treat as not authenticated
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    // Pass "from" so Login can navigate back after success (optional enhancement)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
