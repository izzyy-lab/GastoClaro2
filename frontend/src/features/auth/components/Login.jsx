import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VisibilityIcon           from "@mui/icons-material/Visibility";
import VisibilityOffIcon        from "@mui/icons-material/VisibilityOff";
import GoogleIcon               from "@mui/icons-material/Google";
import ArrowForwardIcon         from "@mui/icons-material/ArrowForward";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser } from "../services/authApi.js";
import { getApiErrorMessage } from "../../../shared/api/httpClient.js";

// ─── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  darkest: "#051F20",
  dark:    "#0B2B26",
  forest:  "#163832",
  mid:     "#235347",
  sage:    "#8EB69B",
  light:   "#DAF1DE",
};

// ─── Tipografías ─────────────────────────────────────────────────────────────
const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY    = "'DM Sans', sans-serif";

// ─── Estilos del TextField ───────────────────────────────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontFamily: FONT_BODY,
    color: C.light,
    borderRadius: "12px",
    background: "rgba(142,182,155,0.05)",
    "& fieldset": { borderColor: "rgba(142,182,155,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(142,182,155,0.4)" },
    "&.Mui-focused fieldset": { borderColor: C.sage, borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: FONT_BODY,
    color: "rgba(142,182,155,0.6)",
    "&.Mui-focused": { color: C.sage },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: "rgba(142,182,155,0.5)" },
};

// ─── Datos del panel izquierdo ────────────────────────────────────────────────
const PANEL_STATS = [
  { value: "12K+",  label: "usuarios activos"   },
  { value: "98%",   label: "satisfacción"       },
  { value: "$4.2M", label: "gastos registrados" },
];

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setSession } = useAuth();
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      setSession(response);
      navigate("/dashboard", { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "No fue posible iniciar sesion."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setError("El inicio de sesion con Google estara disponible pronto.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: FONT_BODY,
        background: C.darkest,
      }}
    >

      {/* ══════════════════════════════════════════
          PANEL IZQUIERDO — Visual decorativo
      ══════════════════════════════════════════ */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          width: "48%",
          minHeight: "100vh",
          background: `linear-gradient(160deg, ${C.dark} 0%, ${C.mid} 60%, ${C.forest} 100%)`,
          p: { md: 5, lg: 7 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbs decorativos */}
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(218,241,222,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(142,182,155,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Grid decorativa */}
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(218,241,222,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(218,241,222,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, position: "relative", zIndex: 1 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "11px", background: "rgba(218,241,222,0.15)", border: "1px solid rgba(218,241,222,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AccountBalanceWalletIcon sx={{ color: C.light, fontSize: 22 }} />
          </Box>
          <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", fontWeight: 700, color: C.light }}>
            GastoClaro
          </Typography>
        </Box>

        {/* Contenido central */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontFamily: FONT_DISPLAY,
              fontSize: { md: "2.4rem", lg: "3rem" },
              fontWeight: 800,
              color: C.light,
              lineHeight: 1.15,
              mb: 2.5,
            }}
          >
            Bienvenido de{" "}
            <Box component="span" sx={{ color: C.sage }}>nuevo</Box>
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(218,241,222,0.65)", lineHeight: 1.75, maxWidth: 340 }}>
            Accede a tu cuenta y retoma el control de tus finanzas diarias. Tu historial te espera.
          </Typography>

          {/* Stats */}
          <Box sx={{ display: "flex", gap: 3, mt: 5, flexWrap: "wrap" }}>
            {PANEL_STATS.map(({ value, label }) => (
              <Box key={label}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", fontWeight: 800, color: C.light, lineHeight: 1 }}>
                  {value}
                </Typography>
                <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(218,241,222,0.5)", mt: 0.3 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Tarjeta decorativa */}
        <Box
          sx={{
            position: "relative", zIndex: 1,
            background: "rgba(5,31,32,0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(218,241,222,0.12)",
            borderRadius: "20px",
            p: 2.5,
          }}
        >
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(218,241,222,0.45)", mb: 1.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Último movimiento
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(142,182,155,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🛒</Box>
              <Box>
                <Typography sx={{ fontFamily: FONT_BODY, color: C.light, fontSize: "0.85rem", fontWeight: 600 }}>Mercado</Typography>
                <Typography sx={{ fontFamily: FONT_BODY, color: "rgba(142,182,155,0.5)", fontSize: "0.7rem" }}>Hogar · hace 2h</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: FONT_DISPLAY, color: C.sage, fontSize: "1rem", fontWeight: 700 }}>-$32.000</Typography>
          </Box>
        </Box>
      </Box>

      {/* ══════════════════════════════════════════
          PANEL DERECHO — Formulario
      ══════════════════════════════════════════ */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 6, lg: 8 },
          py: 6,
          position: "relative",
        }}
      >


        <Box sx={{ width: "100%", maxWidth: 420 }}>

          {/* Logo móvil */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, mb: 4 }}>
            <Box sx={{ width: 34, height: 34, borderRadius: "9px", background: `linear-gradient(135deg, ${C.mid}, ${C.sage})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AccountBalanceWalletIcon sx={{ color: C.light, fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", fontWeight: 700, color: C.light }}>GastoClaro</Typography>
          </Box>

          {/* Encabezado */}
          <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: { xs: "1.9rem", md: "2.2rem" }, fontWeight: 800, color: C.light, mb: 0.5 }}>
            Inicia sesión
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(142,182,155,0.65)", mb: 4 }}>
            ¿No tienes cuenta?{" "}
            <Box component={Link} to="/register" sx={{ color: C.sage, fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Regístrate gratis
            </Box>
          </Typography>

          {/* Botón Google */}
          <Button
            fullWidth
            onClick={handleGoogle}
            startIcon={<GoogleIcon sx={{ fontSize: "1.1rem !important" }} />}
            sx={{
              background: "rgba(142,182,155,0.07)",
              border: "1px solid rgba(142,182,155,0.22)",
              color: C.light,
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: "0.9rem",
              borderRadius: "12px",
              textTransform: "none",
              py: 1.4,
              mb: 3,
              "&:hover": {
                background: "rgba(142,182,155,0.13)",
                borderColor: "rgba(142,182,155,0.4)",
              },
              transition: "all 0.2s",
            }}
          >
            Continuar con Google
          </Button>

          {/* Divisor */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Divider sx={{ flex: 1, borderColor: "rgba(142,182,155,0.15)" }} />
            <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(142,182,155,0.4)" }}>
              o con tu correo
            </Typography>
            <Divider sx={{ flex: 1, borderColor: "rgba(142,182,155,0.15)" }} />
          </Box>

          {/* Error */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5, borderRadius: "10px",
                background: "rgba(211,47,47,0.12)",
                border: "1px solid rgba(211,47,47,0.3)",
                color: "#ff8a80",
                fontFamily: FONT_BODY, fontSize: "0.85rem",
                "& .MuiAlert-icon": { color: "#ff8a80" },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              autoComplete="email"
              sx={inputSx}
            />

            <TextField
              label="Contraseña"
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              autoComplete="current-password"
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass((p) => !p)} edge="end" sx={{ color: "rgba(142,182,155,0.5)", "&:hover": { color: C.sage } }}>
                      {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Recuperacion de contrasena */}
            <Box sx={{ textAlign: "right", mt: -1.5 }}>
              <Box
                component={Link}
                to="/login"
                sx={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(142,182,155,0.55)", textDecoration: "none", "&:hover": { color: C.sage } }}
              >
                Recuperacion de contrasena (proximamente)
              </Box>
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon />}
              sx={{
                mt: 0.5,
                background: loading
                  ? "rgba(142,182,155,0.2)"
                  : `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
                color: loading ? C.sage : C.darkest,
                fontFamily: FONT_BODY,
                fontWeight: 700,
                fontSize: "1rem",
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: loading ? "none" : "0 8px 24px rgba(142,182,155,0.3)",
                "&:hover": {
                  background: `linear-gradient(135deg, #a0c9ae 0%, #e8f8ec 100%)`,
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 28px rgba(142,182,155,0.45)",
                },
                "&.Mui-disabled": { background: "rgba(142,182,155,0.12)", color: "rgba(142,182,155,0.4)" },
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
