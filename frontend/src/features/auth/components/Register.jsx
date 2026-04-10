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
import CheckCircleIcon          from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useAuth } from "../context/AuthContext.jsx";
import { registerUser } from "../services/authApi.js";
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

// ─── Estilos del TextField ────────────────────────────────────────────────────
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

// ─── Helpers de contraseña ────────────────────────────────────────────────────
const PASSWORD_RULES = [
  { label: "Mínimo 8 caracteres",           test: (p) => p.length >= 8             },
  { label: "Al menos una letra mayúscula",  test: (p) => /[A-Z]/.test(p)           },
  { label: "Al menos un número",            test: (p) => /[0-9]/.test(p)           },
];

const getStrength = (password) => PASSWORD_RULES.filter((r) => r.test(password)).length;

const strengthColor = (s) => {
  if (s === 0) return "rgba(142,182,155,0.15)";
  if (s === 1) return "#e57373";
  if (s === 2) return "#ffb74d";
  return C.sage;
};

const strengthLabel = (s) => {
  if (s === 0) return "";
  if (s === 1) return "Débil";
  if (s === 2) return "Regular";
  return "Segura";
};

// ─── Beneficios del panel izquierdo ──────────────────────────────────────────
const BENEFITS = [
  "Registra gastos en segundos",
  "Reportes visuales semanales",
  "Alertas de presupuesto en tiempo real",
  "Acceso desde cualquier dispositivo",
  "100% gratis para siempre",
];

export default function Register() {
  const navigate  = useNavigate();
  const { isAuthenticated, setSession } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error,   setError]    = useState("");
  const [loading, setLoading]  = useState(false);

  const strength = getStrength(form.password);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (strength < 2) {
      setError("Tu contraseña es muy débil. Mejórala antes de continuar.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      setSession(response);
      navigate("/dashboard", { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "No fue posible crear la cuenta."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setError("El registro con Google estara disponible pronto.");
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
          background: `linear-gradient(160deg, ${C.forest} 0%, ${C.mid} 55%, ${C.dark} 100%)`,
          p: { md: 5, lg: 7 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbs decorativos */}
        <Box sx={{ position: "absolute", top: -100, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(218,241,222,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(142,182,155,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

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
            Empieza a{" "}
            <Box component="span" sx={{ color: C.sage }}>ahorrar</Box>{" "}
            desde hoy
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(218,241,222,0.6)", lineHeight: 1.75, maxWidth: 320, mb: 4 }}>
            Crea tu cuenta gratis y únete a miles de personas que ya controlan sus gastos diarios.
          </Typography>

          {/* Lista de beneficios */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {BENEFITS.map((b) => (
              <Box key={b} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "rgba(142,182,155,0.15)",
                    border: `1px solid ${C.sage}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: C.sage }} />
                </Box>
                <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(218,241,222,0.75)" }}>
                  {b}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Badge inferior */}
        <Box
          sx={{
            position: "relative", zIndex: 1,
            background: "rgba(5,31,32,0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(218,241,222,0.1)",
            borderRadius: "16px",
            p: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ width: 42, height: 42, borderRadius: "12px", background: `linear-gradient(135deg, ${C.mid}, ${C.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
            🎯
          </Box>
          <Box>
            <Typography sx={{ fontFamily: FONT_BODY, color: C.light, fontSize: "0.9rem", fontWeight: 700 }}>
              Sin costo, sin tarjeta
            </Typography>
            <Typography sx={{ fontFamily: FONT_BODY, color: "rgba(218,241,222,0.5)", fontSize: "0.78rem" }}>
              Gratis para siempre en el plan básico
            </Typography>
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
          overflowY: "auto",
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
            Crea tu cuenta
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(142,182,155,0.65)", mb: 4 }}>
            ¿Ya tienes cuenta?{" "}
            <Box component={Link} to="/login" sx={{ color: C.sage, fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Inicia sesión
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
              fontFamily: FONT_BODY, fontWeight: 600, fontSize: "0.9rem",
              borderRadius: "12px", textTransform: "none", py: 1.4, mb: 3,
              "&:hover": { background: "rgba(142,182,155,0.13)", borderColor: "rgba(142,182,155,0.4)" },
              transition: "all 0.2s",
            }}
          >
            Registrarse con Google
          </Button>

          {/* Divisor */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Divider sx={{ flex: 1, borderColor: "rgba(142,182,155,0.15)" }} />
            <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(142,182,155,0.4)" }}>
              o con tus datos
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
                color: "#ff8a80", fontFamily: FONT_BODY, fontSize: "0.85rem",
                "& .MuiAlert-icon": { color: "#ff8a80" },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Nombre */}
            <TextField
              label="Nombre completo"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              sx={inputSx}
            />

            {/* Correo */}
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

            {/* Contraseña */}
            <Box>
              <TextField
                label="Contraseña"
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                autoComplete="new-password"
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

              {/* Barra de fortaleza */}
              {form.password.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <Box sx={{ display: "flex", gap: 0.8, mb: 1 }}>
                    {[1, 2, 3].map((s) => (
                      <Box
                        key={s}
                        sx={{
                          flex: 1, height: 4, borderRadius: 2,
                          background: s <= strength ? strengthColor(strength) : "rgba(142,182,155,0.1)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: strengthColor(strength), fontWeight: 600, mb: 1 }}>
                    {strengthLabel(strength)}
                  </Typography>
                  {/* Reglas */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
                    {PASSWORD_RULES.map((rule) => (
                      <Box key={rule.label} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        {rule.test(form.password)
                          ? <CheckCircleIcon          sx={{ fontSize: 14, color: C.sage }} />
                          : <RadioButtonUncheckedIcon sx={{ fontSize: 14, color: "rgba(142,182,155,0.3)" }} />
                        }
                        <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: rule.test(form.password) ? "rgba(142,182,155,0.8)" : "rgba(142,182,155,0.4)" }}>
                          {rule.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
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
                  ? "rgba(142,182,155,0.15)"
                  : `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
                color: loading ? C.sage : C.darkest,
                fontFamily: FONT_BODY, fontWeight: 700,
                fontSize: "1rem", py: 1.5,
                borderRadius: "12px", textTransform: "none",
                boxShadow: loading ? "none" : "0 8px 24px rgba(142,182,155,0.3)",
                "&:hover": {
                  background: `linear-gradient(135deg, #a0c9ae 0%, #e8f8ec 100%)`,
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 28px rgba(142,182,155,0.45)",
                },
                "&.Mui-disabled": { background: "rgba(142,182,155,0.1)", color: "rgba(142,182,155,0.35)" },
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
            </Button>

            {/* Aviso de términos */}
            <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(142,182,155,0.4)", textAlign: "center", lineHeight: 1.6 }}>
              Al registrarte aceptas nuestros{" "}
              <Box component={Link} to="/terms" sx={{ color: "rgba(142,182,155,0.6)", textDecoration: "none", "&:hover": { color: C.sage } }}>
                Términos de servicio
              </Box>{" "}
              y{" "}
              <Box component={Link} to="/privacy" sx={{ color: "rgba(142,182,155,0.6)", textDecoration: "none", "&:hover": { color: C.sage } }}>
                Política de privacidad
              </Box>
              .
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
