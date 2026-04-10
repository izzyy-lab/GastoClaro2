import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// ─── Paleta de colores ───────────────────────────────────────────────────────
const C = {
  darkest: "#051F20",
  dark: "#0B2B26",
  forest: "#163832",
  mid: "#235347",
  sage: "#8EB69B",
  light: "#DAF1DE",
};

// ─── Tipografías ─────────────────────────────────────────────────────────────
const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'DM Sans', sans-serif";

const FOOTER_LINKS = {
  Producto: [
    { label: "Características", to: "#features" },
    { label: "Cómo funciona", to: "#how" },
    { label: "Precios", to: "/pricing" },
    { label: "Actualizaciones", to: "/updates" },
  ],
  Empresa: [
    { label: "Acerca de", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Contacto", to: "/contact" },
    { label: "Empleos", to: "/jobs" },
  ],
  Legal: [
    { label: "Privacidad", to: "/privacy" },
    { label: "Términos", to: "/terms" },
    { label: "Cookies", to: "/cookies" },
  ],
};

const SOCIALS = [
  { icon: <InstagramIcon fontSize="small" />, href: "#" },
  { icon: <TwitterIcon fontSize="small" />, href: "#" },
  { icon: <FacebookIcon fontSize="small" />, href: "#" },
  { icon: <LinkedInIcon fontSize="small" />, href: "#" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: C.darkest,
        borderTop: `1px solid rgba(142,182,155,0.12)`,
        pt: { xs: 6, md: 10 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
        // Línea de acento superior
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${C.sage}, transparent)`,
        },
      }}
    >
      {/* Glow ambiental */}
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(35,83,71,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Columna de marca */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${C.mid} 0%, ${C.sage} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccountBalanceWalletIcon
                  sx={{ color: C.light, fontSize: 20 }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: C.light,
                }}
              >
                GastoClaro
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: FONT_BODY,
                color: C.sage,
                fontSize: "0.9rem",
                lineHeight: 1.75,
                maxWidth: 280,
                mb: 3,
              }}
            >
              Tu aliado financiero para el día a día. Registra, analiza y
              controla tus gastos con claridad y simplicidad.
            </Typography>

            {/* Redes sociales */}
            <Stack direction="row" spacing={1}>
              {SOCIALS.map((s, i) => (
                <IconButton
                  key={i}
                  href={s.href}
                  target="_blank"
                  size="small"
                  sx={{
                    color: C.sage,
                    border: "1px solid rgba(142,182,155,0.2)",
                    borderRadius: "8px",
                    "&:hover": {
                      color: C.light,
                      background: "rgba(142,182,155,0.1)",
                      borderColor: "rgba(142,182,155,0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Columnas de links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={section}>
              <Typography
                sx={{
                  fontFamily: FONT_BODY,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: C.light,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                {section}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    to={link.to}
                    sx={{
                      fontFamily: FONT_BODY,
                      fontSize: "0.875rem",
                      color: C.sage,
                      textDecoration: "none",
                      "&:hover": { color: C.light, paddingLeft: "4px" },
                      transition: "all 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(142,182,155,0.1)", my: 5 }} />

        {/* Barra inferior */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT_BODY,
              fontSize: "0.8rem",
              color: "rgba(142,182,155,0.6)",
            }}
          >
            © {new Date().getFullYear()} GastoClaro. Todos los derechos
            reservados.
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT_BODY,
              fontSize: "0.8rem",
              color: "rgba(142,182,155,0.35)",
            }}
          >
            Hecho con 💚 para tus finanzas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
