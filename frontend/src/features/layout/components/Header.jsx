import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAuth } from "../../auth/context/AuthContext.jsx";

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

const PUBLIC_NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Api RyM", to: "/api-rym" },
];

const PRIVATE_NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Api RyM", to: "/api-rym" },
];

export default function Header() {
  const navigate = useNavigate();
  const { clearSession, isAuthenticated, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = isAuthenticated ? PRIVATE_NAV_LINKS : PUBLIC_NAV_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, to) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      document.querySelector(to)?.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
      return;
    }
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    clearSession();
    setDrawerOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ── AppBar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(5,31,32,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(142,182,155,0.15)` : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${C.mid} 0%, ${C.sage} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(142,182,155,0.3)",
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: C.light, fontSize: 20 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                fontWeight: 700,
                color: C.light,
                letterSpacing: "-0.02em",
              }}
            >
              GastoClaro
            </Typography>
          </Box>

          {/* Desktop links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={link.to.startsWith("#") ? "a" : Link}
                  href={link.to.startsWith("#") ? link.to : undefined}
                  to={!link.to.startsWith("#") ? link.to : undefined}
                  onClick={(e) => scrollTo(e, link.to)}
                  sx={{
                    color: C.sage,
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      color: C.light,
                      background: "rgba(142,182,155,0.1)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {link.label}
                </Button>
              ))}
              {isAuthenticated ? (
                <>
                  <Typography
                    sx={{
                      ml: 1.2,
                      mr: 0.6,
                      fontFamily: FONT_BODY,
                      fontSize: "0.82rem",
                      color: "rgba(142,182,155,0.85)",
                    }}
                  >
                    {user?.name || "Sesion activa"}
                  </Typography>
                  <Button
                    onClick={handleLogout}
                    sx={{
                      background: "rgba(142,182,155,0.08)",
                      color: C.sage,
                      fontFamily: FONT_BODY,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      px: 2.5,
                      py: 1,
                      borderRadius: "10px",
                      textTransform: "none",
                      border: "1px solid rgba(142,182,155,0.3)",
                      "&:hover": {
                        color: C.light,
                        background: "rgba(142,182,155,0.16)",
                        borderColor: "rgba(142,182,155,0.45)",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    Cerrar sesion
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    ml: 1.5,
                    background: `linear-gradient(135deg, ${C.mid} 0%, ${C.forest} 100%)`,
                    color: C.light,
                    fontFamily: FONT_BODY,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 2.5,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    border: "1px solid rgba(142,182,155,0.3)",
                    boxShadow: "0 4px 14px rgba(35,83,71,0.4)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2e6b5e 0%, #1e4a3f 100%)",
                      boxShadow: "0 6px 20px rgba(35,83,71,0.6)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  Comenzar gratis
                </Button>
              )}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: C.sage }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: C.darkest,
            borderLeft: "1px solid rgba(142,182,155,0.15)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: C.sage }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={link.to.startsWith("#") ? "a" : Link}
                href={link.to.startsWith("#") ? link.to : undefined}
                to={!link.to.startsWith("#") ? link.to : undefined}
                onClick={(e) => scrollTo(e, link.to)}
                sx={{
                  borderRadius: "10px",
                  "&:hover": { background: "rgba(142,182,155,0.1)" },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: FONT_BODY,
                    color: C.sage,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            {isAuthenticated ? (
              <Button
                fullWidth
                onClick={handleLogout}
                sx={{
                  background: "rgba(142,182,155,0.08)",
                  color: C.sage,
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                  py: 1.5,
                  border: "1px solid rgba(142,182,155,0.2)",
                }}
              >
                Cerrar sesion
              </Button>
            ) : (
              <Button
                fullWidth
                component={Link}
                to="/register"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  background: `linear-gradient(135deg, ${C.mid}, ${C.forest})`,
                  color: C.light,
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                  py: 1.5,
                  border: "1px solid rgba(142,182,155,0.2)",
                }}
              >
                Comenzar gratis
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
