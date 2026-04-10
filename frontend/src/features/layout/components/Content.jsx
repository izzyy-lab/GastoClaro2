import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import TrendingDownIcon          from "@mui/icons-material/TrendingDown";
import BarChartIcon              from "@mui/icons-material/BarChart";
import NotificationsActiveIcon   from "@mui/icons-material/NotificationsActive";
import CategoryIcon              from "@mui/icons-material/Category";
import PhoneAndroidIcon          from "@mui/icons-material/PhoneAndroid";
import CloudSyncIcon             from "@mui/icons-material/CloudSync";
import ArrowForwardIcon          from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon    from "@mui/icons-material/CheckCircleOutline";
import FormatQuoteIcon           from "@mui/icons-material/FormatQuote";

// ─── Paleta de colores ───────────────────────────────────────────────────────
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
const GITHUB_REPO_URL = "https://github.com/izzyy-lab/GastoClaro";

// ─── Datos de la página ──────────────────────────────────────────────────────
const FEATURES = [
  { icon: <TrendingDownIcon sx={{ fontSize: 28 }} />,        title: "Registro instantáneo",   desc: "Anota cualquier gasto en segundos desde tu celular. Sin complicaciones.",                         bg: C.mid    },
  { icon: <BarChartIcon sx={{ fontSize: 28 }} />,            title: "Reportes visuales",       desc: "Gráficas claras que te muestran en qué se va tu dinero cada semana o mes.",                      bg: C.forest },
  { icon: <CategoryIcon sx={{ fontSize: 28 }} />,            title: "Categorías inteligentes", desc: "Organiza tus gastos por categoría: comida, transporte, ocio y mucho más.",                       bg: C.dark   },
  { icon: <NotificationsActiveIcon sx={{ fontSize: 28 }} />, title: "Alertas de presupuesto",  desc: "Recibe notificaciones cuando estés cerca de superar tu límite diario.",                           bg: C.mid    },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 28 }} />,        title: "App instalable (PWA)",    desc: "Instala GastoClaro en tu teléfono sin pasar por la tienda de apps.",                             bg: C.forest },
  { icon: <CloudSyncIcon sx={{ fontSize: 28 }} />,           title: "Sincronización segura",   desc: "Tus datos siempre seguros y disponibles en todos tus dispositivos.",                              bg: C.dark   },
];

const STEPS = [
  { num: "01", title: "Crea tu cuenta",    desc: "Regístrate gratis en menos de un minuto. Solo necesitas tu correo."                      },
  { num: "02", title: "Agrega tus gastos", desc: "Registra cada gasto al momento con monto, categoría y nota opcional."                    },
  { num: "03", title: "Analiza y mejora",  desc: "Revisa tus reportes, identifica patrones y toma control de tu dinero."                   },
];

const TESTIMONIALS = [
  { name: "Valentina García", role: "Freelancer, Medellín",    quote: "Antes no sabía en qué se me iba la plata. Con GastoClaro ahorro más del 20% cada mes.",              avatar: "V", color: C.mid    },
  { name: "Santiago Reyes",   role: "Estudiante universitario", quote: "Super fácil de usar. Lo tengo instalado en el celular y registro todo al instante.",                  avatar: "S", color: C.forest },
  { name: "Camila Torres",    role: "Emprendedora",             quote: "Los reportes semanales cambiaron cómo manejo mis finanzas personales. 100% recomendado.",             avatar: "C", color: C.dark   },
];

const STATS = [
  { value: "12K+",  label: "Usuarios activos"    },
  { value: "$4.2M", label: "Gastos registrados"  },
  { value: "98%",   label: "Satisfacción"        },
  { value: "0",     label: "Costo para empezar"  },
];

const TRANSACTIONS = [
  { emoji: "🥗", name: "Almuerzo",  cat: "Comida",     amount: "-$18.000" },
  { emoji: "🚌", name: "Metro",     cat: "Transporte", amount: "-$5.500"  },
  { emoji: "☕", name: "Café",      cat: "Ocio",       amount: "-$8.000"  },
  { emoji: "🛒", name: "Mercado",   cat: "Hogar",      amount: "-$16.000" },
];

// ─── Estilos reutilizables ───────────────────────────────────────────────────
const chipSx = {
  background: "rgba(142,182,155,0.1)",
  border: "1px solid rgba(142,182,155,0.22)",
  color: C.sage,
  fontFamily: FONT_BODY,
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  mb: 2,
};

const sectionTitleSx = {
  fontFamily: FONT_DISPLAY,
  fontSize: { xs: "2rem", md: "2.8rem" },
  fontWeight: 800,
  color: C.light,
  lineHeight: 1.15,
};

const gradientTextSx = {
  background: `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const ctaButtonSx = {
  background: `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
  color: C.darkest,
  fontFamily: FONT_BODY,
  fontWeight: 700,
  fontSize: "1rem",
  px: 3.5,
  py: 1.5,
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "0 8px 24px rgba(142,182,155,0.35)",
  "&:hover": {
    background: `linear-gradient(135deg, #a0c9ae 0%, #e8f8ec 100%)`,
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(142,182,155,0.5)",
  },
  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
};

const outlineButtonSx = {
  color: C.sage,
  fontFamily: FONT_BODY,
  fontWeight: 600,
  fontSize: "1rem",
  px: 3.5,
  py: 1.5,
  borderRadius: "12px",
  textTransform: "none",
  border: "1px solid rgba(142,182,155,0.25)",
  "&:hover": {
    background: "rgba(142,182,155,0.08)",
    borderColor: "rgba(142,182,155,0.5)",
    color: C.light,
  },
  transition: "all 0.2s",
};

// ─── Componente principal ────────────────────────────────────────────────────
export default function Content() {
  const heroRef = useRef(null);

  // Animación de entrada del hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
    });
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="main"
      sx={{
        background: `linear-gradient(180deg, ${C.darkest} 0%, ${C.dark} 40%, ${C.forest} 100%)`,
        minHeight: "100vh",
        fontFamily: FONT_BODY,
        overflowX: "hidden",
      }}
    >

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          pt: { xs: 12, md: 10 },
          pb: { xs: 8,  md: 0  },
          overflow: "hidden",
        }}
      >
        {/* Orbs de fondo */}
        <Box sx={{ position: "absolute", top: "15%", right: "-5%", width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 }, borderRadius: "50%", background: "radial-gradient(circle, rgba(142,182,155,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: "10%", left: "-8%", width: { xs: 250, md: 400 }, height: { xs: 250, md: 400 }, borderRadius: "50%", background: "radial-gradient(circle, rgba(35,83,71,0.25) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Grid decorativa */}
        <Box
          sx={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(142,182,155,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(142,182,155,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">

            {/* Texto principal */}
            <Grid size={{ xs: 12, md: 6 }} ref={heroRef}>
              <Chip label="✦ App disponible como PWA" size="small" sx={chipSx} />

              <Typography
                variant="h1"
                sx={{
                  ...sectionTitleSx,
                  fontSize: { xs: "2.6rem", sm: "3.4rem", md: "4rem" },
                  "& span": gradientTextSx,
                }}
              >
                Controla tus <span>gastos diarios</span> con claridad
              </Typography>

              <Typography
                sx={{
                  fontFamily: FONT_BODY, fontSize: { xs: "1rem", md: "1.1rem" },
                  color: C.sage, lineHeight: 1.75, mt: 3, mb: 4, maxWidth: 480,
                }}
              >
                GastoClaro te ayuda a registrar cada peso que gastas, visualizar
                tus hábitos financieros y tomar mejores decisiones — directamente
                desde tu teléfono, sin esfuerzo.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5 }}>
                <Button component={Link} to="/register" variant="contained" endIcon={<ArrowForwardIcon />} sx={ctaButtonSx}>
                  Comenzar gratis
                </Button>
                <Button component="a" href="#how" onClick={(e) => scrollTo(e, "#how")} sx={outlineButtonSx}>
                  Ver cómo funciona
                </Button>
              </Stack>

              <Typography
                component="a"
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "inline-block",
                  fontFamily: FONT_BODY,
                  fontSize: "0.84rem",
                  color: C.sage,
                  textDecoration: "none",
                  borderBottom: "1px dashed rgba(142,182,155,0.45)",
                  pb: 0.25,
                  mb: 2.6,
                  "&:hover": {
                    color: C.light,
                    borderBottomColor: C.light,
                  },
                }}
              >
                Repositorio GitHub
              </Typography>

              {/* Trust badges */}
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {["Sin tarjeta de crédito", "Gratis para siempre", "Datos seguros"].map((txt) => (
                  <Box key={txt} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 15, color: C.sage }} />
                    <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(142,182,155,0.7)" }}>
                      {txt}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Mockup de la app */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <Box
                sx={{
                  width: 360, height: 480, borderRadius: "32px",
                  background: `linear-gradient(145deg, rgba(11,43,38,0.9), rgba(5,31,32,0.95))`,
                  border: "1px solid rgba(142,182,155,0.2)",
                  boxShadow: "0 32px 80px rgba(5,31,32,0.6), 0 0 0 1px rgba(142,182,155,0.08)",
                  p: 3,
                  animation: "float 4s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)"   },
                    "50%":      { transform: "translateY(-12px)" },
                  },
                }}
              >
                <Typography sx={{ fontFamily: FONT_DISPLAY, color: C.light, fontSize: "1rem", fontWeight: 700, mb: 0.5 }}>
                  Resumen de hoy
                </Typography>
                <Typography sx={{ fontFamily: FONT_BODY, color: C.sage, fontSize: "0.75rem", mb: 2.5 }}>
                  lunes, 23 de marzo
                </Typography>

                {/* Tarjeta de resumen */}
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${C.mid}, ${C.forest})`,
                    borderRadius: "20px", p: 2.5, mb: 2,
                    border: "1px solid rgba(142,182,155,0.15)",
                  }}
                >
                  <Typography sx={{ fontFamily: FONT_BODY, color: C.sage, fontSize: "0.75rem", mb: 0.5 }}>Total gastado hoy</Typography>
                  <Typography sx={{ fontFamily: FONT_DISPLAY, color: C.light, fontSize: "2rem", fontWeight: 800 }}>$47.500</Typography>
                  <Typography sx={{ fontFamily: FONT_BODY, color: "rgba(142,182,155,0.6)", fontSize: "0.75rem" }}>de $80.000 presupuestados</Typography>
                  {/* Barra de progreso */}
                  <Box sx={{ mt: 1.5, height: 6, borderRadius: 3, background: "rgba(5,31,32,0.5)" }}>
                    <Box sx={{ width: "59%", height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${C.sage}, ${C.light})` }} />
                  </Box>
                </Box>

                {/* Lista de transacciones */}
                {TRANSACTIONS.map((tx, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      py: 1,
                      borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid rgba(142,182,155,0.08)" : "none",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 34, height: 34, borderRadius: "10px", background: "rgba(142,182,155,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                        {tx.emoji}
                      </Box>
                      <Box>
                        <Typography sx={{ fontFamily: FONT_BODY, color: C.light,  fontSize: "0.8rem",  fontWeight: 600, lineHeight: 1.2 }}>{tx.name}</Typography>
                        <Typography sx={{ fontFamily: FONT_BODY, color: "rgba(142,182,155,0.5)", fontSize: "0.68rem" }}>{tx.cat}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontFamily: FONT_BODY, color: C.sage, fontSize: "0.82rem", fontWeight: 700 }}>{tx.amount}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* ════════════════════════════════════════════════
          ESTADÍSTICAS
      ════════════════════════════════════════════════ */}
      <Box
        sx={{
          background: "rgba(5,31,32,0.7)",
          borderTop:    "1px solid rgba(142,182,155,0.1)",
          borderBottom: "1px solid rgba(142,182,155,0.1)",
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {STATS.map(({ value, label }) => (
              <Grid size={{ xs: 6, md: 3 }} key={label} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: { xs: "2rem", md: "2.8rem" }, fontWeight: 800, color: C.light, lineHeight: 1 }}>
                  {value}
                </Typography>
                <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: C.sage, mt: 0.5 }}>
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ════════════════════════════════════════════════
          CARACTERÍSTICAS
      ════════════════════════════════════════════════ */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="CARACTERÍSTICAS" size="small" sx={chipSx} />
            <Typography sx={sectionTitleSx}>
              Todo lo que necesitas para{" "}
              <Box component="span" sx={gradientTextSx}>manejar tu dinero</Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {FEATURES.map(({ icon, title, desc, bg }, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    background: `linear-gradient(145deg, ${bg}cc 0%, rgba(5,31,32,0.8) 100%)`,
                    border: "1px solid rgba(142,182,155,0.12)",
                    borderRadius: "20px",
                    height: "100%",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      border: "1px solid rgba(142,182,155,0.3)",
                      boxShadow: "0 20px 40px rgba(5,31,32,0.5)",
                    },
                    cursor: "default",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 52, height: 52, borderRadius: "14px",
                        background: "rgba(142,182,155,0.13)",
                        border: "1px solid rgba(142,182,155,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: C.sage, mb: 2.5,
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontWeight: 700, color: C.light, mb: 1 }}>
                      {title}
                    </Typography>
                    <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: C.sage, lineHeight: 1.7 }}>
                      {desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ════════════════════════════════════════════════
          CÓMO FUNCIONA
      ════════════════════════════════════════════════ */}
      <Box
        id="how"
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(180deg, rgba(5,31,32,0.5) 0%, rgba(11,43,38,0.5) 100%)",
          borderTop: "1px solid rgba(142,182,155,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="CÓMO FUNCIONA" size="small" sx={chipSx} />
            <Typography sx={sectionTitleSx}>Tres pasos hacia el control</Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {STEPS.map(({ num, title, desc }, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box sx={{ textAlign: "center", px: { md: 2 } }}>
                  {/* Número decorativo */}
                  <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "5rem", fontWeight: 900, color: "rgba(142,182,155,0.08)", lineHeight: 1, mb: -1 }}>
                    {num}
                  </Typography>
                  {/* Badge de paso */}
                  <Box
                    sx={{
                      width: 56, height: 56, borderRadius: "16px",
                      background: `linear-gradient(135deg, ${C.mid}, ${C.forest})`,
                      border: "1px solid rgba(142,182,155,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      mx: "auto", mb: 2.5,
                      boxShadow: "0 8px 24px rgba(35,83,71,0.4)",
                    }}
                  >
                    <Typography sx={{ fontFamily: FONT_DISPLAY, color: C.light, fontWeight: 800, fontSize: "1rem" }}>
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", fontWeight: 700, color: C.light, mb: 1.5 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: C.sage, lineHeight: 1.7 }}>
                    {desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ════════════════════════════════════════════════
          TESTIMONIOS
      ════════════════════════════════════════════════ */}
      <Box id="testimonials" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="TESTIMONIOS" size="small" sx={chipSx} />
            <Typography sx={sectionTitleSx}>Lo que dicen nuestros usuarios</Typography>
          </Box>

          <Grid container spacing={3}>
            {TESTIMONIALS.map(({ name, role, quote, avatar, color }, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    background: `linear-gradient(145deg, rgba(11,43,38,0.9), rgba(5,31,32,0.95))`,
                    border: "1px solid rgba(142,182,155,0.12)",
                    borderRadius: "20px",
                    height: "100%",
                    transition: "all 0.3s",
                    "&:hover": { border: "1px solid rgba(142,182,155,0.25)", transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <FormatQuoteIcon sx={{ fontSize: 36, color: "rgba(142,182,155,0.2)", mb: 1 }} />
                    <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: C.sage, lineHeight: 1.75, mb: 3, fontStyle: "italic" }}>
                      "{quote}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 42, height: 42, background: `linear-gradient(135deg, ${color}, ${C.sage})`, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "1rem" }}>
                        {avatar}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontFamily: FONT_BODY, fontWeight: 700, color: C.light, fontSize: "0.9rem", lineHeight: 1.2 }}>{name}</Typography>
                        <Typography sx={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(142,182,155,0.6)" }}>{role}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ════════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════════ */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(180deg, rgba(5,31,32,0.3) 0%, rgba(5,31,32,0.8) 100%)",
          borderTop: "1px solid rgba(142,182,155,0.08)",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography sx={{ ...sectionTitleSx, fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
            Empieza hoy, es{" "}
            <Box component="span" sx={gradientTextSx}>gratis</Box>
          </Typography>
          <Typography sx={{ fontFamily: FONT_BODY, fontSize: "1rem", color: C.sage, mb: 5, lineHeight: 1.7 }}>
            Únete a miles de personas que ya controlan sus finanzas con GastoClaro.
            Sin costo, sin complicaciones.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            size="large"
            sx={{
              ...ctaButtonSx,
              fontSize: "1.05rem",
              px: 5,
              py: 1.8,
              borderRadius: "14px",
              boxShadow: "0 12px 32px rgba(142,182,155,0.35)",
              "&:hover": {
                background: `linear-gradient(135deg, #a0c9ae 0%, #e8f8ec 100%)`,
                transform: "translateY(-3px)",
                boxShadow: "0 18px 40px rgba(142,182,155,0.5)",
              },
            }}
          >
            Crear mi cuenta gratis
          </Button>
        </Container>
      </Box>

    </Box>
  );
}
