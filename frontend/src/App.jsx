import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import { useAuth } from "./features/auth/context/AuthContext.jsx";

const Header = lazy(() => import("./features/layout/components/Header.jsx"));
const Footer = lazy(() => import("./features/layout/components/Footer.jsx"));
const Content = lazy(() => import("./features/layout/components/Content.jsx"));
const Login = lazy(() => import("./features/auth/components/Login.jsx"));
const Register = lazy(() => import("./features/auth/components/Register.jsx"));
const ApiRyM = lazy(() =>
  import("./features/api/components/ApiRyM.jsx").then((module) => ({
    default: module.ApiRyM,
  }))
);
const Dashboard = lazy(() =>
  import("./features/articles/components/Dashboard.jsx")
);


const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#051F20" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background-color: #051F20; }
        ::-webkit-scrollbar              { width: 5px; }
        ::-webkit-scrollbar-track        { background: #051F20; }
        ::-webkit-scrollbar-thumb        { background: #235347; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover  { background: #8EB69B; }
      `,
    },
  },
});

export default function App() {
  const { isAuthenticated } = useAuth();

  const renderPublicOnly = (component) =>
    isAuthenticated ? <Navigate to="/dashboard" replace /> : component;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense
          fallback={
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#051F20",
              }}
            >
              <CircularProgress sx={{ color: "#8EB69B" }} />
            </Box>
          }
        >
          <Header />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/login" element={renderPublicOnly(<Login />)} />
            <Route path="/register" element={renderPublicOnly(<Register />)} />
            <Route path="/api-rym" element={<ApiRyM />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Content />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
