/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "gastoclaro-session";

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return { token: "", user: null };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      token: parsedValue?.token || "",
      user: parsedValue?.user || null,
    };
  } catch {
    return { token: "", user: null };
  }
}

function saveSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(readStoredSession);

  const setSession = ({ token, user }) => {
    const nextSession = { token: token || "", user: user || null };
    setSessionState(nextSession);
    saveSession(nextSession);
  };

  const clearSession = () => {
    setSessionState({ token: "", user: null });
    clearStoredSession();
  };

  const value = useMemo(
    () => ({
      token: session.token,
      user: session.user,
      isAuthenticated: Boolean(session.token),
      setSession,
      clearSession,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }
  return context;
}
