import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// ═════════════════════════════════════════════════════════════════════════════
// PALETA DE COLORES - Consistente con GastoClaro
// ═════════════════════════════════════════════════════════════════════════════
const C = {
  darkest: "#051F20",
  dark: "#0B2B26",
  forest: "#163832",
  mid: "#235347",
  sage: "#8EB69B",
  light: "#DAF1DE",
};

// ─── TIPOGRAFÍAS ─────────────────────────────────────────────────────────────
const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'DM Sans', sans-serif";

// ─── ESTILOS REUTILIZABLES ───────────────────────────────────────────────────
const CHIP_SX = {
  background: "rgba(142,182,155,0.1)",
  border: "1px solid rgba(142,182,155,0.22)",
  color: C.sage,
  fontFamily: FONT_BODY,
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
};

const gradientTextSx = {
  background: `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const glassCardSx = {
  background: "linear-gradient(160deg, rgba(11,43,38,0.92), rgba(5,31,32,0.96))",
  border: "1px solid rgba(142,182,155,0.14)",
  borderRadius: "22px",
  boxShadow: "0 24px 50px rgba(5,31,32,0.32)",
};

const formatNumber = (value) => new Intl.NumberFormat("es-CO").format(value ?? 0);

/**
 * Obtiene estilos visuales basados en el estado del personaje
 */
const getStatusStyles = (status) => {
  if (status === "Alive") {
    return {
      color: "#d9fbe1",
      background: "rgba(78, 179, 104, 0.16)",
      borderColor: "rgba(78, 179, 104, 0.35)",
      label: "Activo",
    };
  }
  if (status === "Dead") {
    return {
      color: "#ffd1cf",
      background: "rgba(214, 90, 90, 0.16)",
      borderColor: "rgba(214, 90, 90, 0.35)",
      label: "Sin vida",
    };
  }
  return {
    color: C.light,
    background: "rgba(142,182,155,0.12)",
    borderColor: "rgba(142,182,155,0.28)",
    label: "Desconocido",
  };
};

/**
 * COMPONENTE: Tarjeta de Personaje
 * Muestra la información visual de un personaje individual
 */
const CharacterCard = ({ character }) => {
  const statusStyles = getStatusStyles(character.status);

  return (
    <Card
      sx={{
        ...glassCardSx,
        height: "100%",
        overflow: "hidden",
        transition: "transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "rgba(142,182,155,0.3)",
          boxShadow: "0 28px 55px rgba(5,31,32,0.4)",
        },
      }}
    >
      {/* Imagen con overlay */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={character.image}
          alt={character.name}
          sx={{
            width: "100%",
            height: 270,
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,31,32,0.03) 0%, rgba(5,31,32,0.7) 100%)",
          }}
        />
        {/* Badge de estado */}
        <Chip
          label={statusStyles.label}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: statusStyles.color,
            background: statusStyles.background,
            border: `1px solid ${statusStyles.borderColor}`,
            fontFamily: FONT_BODY,
            fontWeight: 700,
            backdropFilter: "blur(8px)",
          }}
        />
      </Box>

      {/* Contenido */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Nombre */}
        <Typography
          sx={{
            fontFamily: FONT_DISPLAY,
            fontSize: "1.28rem",
            fontWeight: 700,
            color: C.light,
            lineHeight: 1.2,
            mb: 0.8,
          }}
        >
          {character.name}
        </Typography>

        {/* Especie y género */}
        <Typography
          sx={{
            fontFamily: FONT_BODY,
            fontSize: "0.9rem",
            color: C.sage,
            mb: 2,
          }}
        >
          {character.species} · {character.gender}
        </Typography>

        {/* Origen y ubicación */}
        <Stack spacing={1.1}>
          <Box
            sx={{
              p: 1.35,
              borderRadius: "14px",
              background: "rgba(142,182,155,0.07)",
              border: "1px solid rgba(142,182,155,0.08)",
            }}
          >
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(142,182,155,0.48)",
                mb: 0.4,
              }}
            >
              Origen
            </Typography>
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                fontSize: "0.86rem",
                color: C.light,
                lineHeight: 1.5,
              }}
            >
              {character.origin?.name || "No disponible"}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.35,
              borderRadius: "14px",
              background: "rgba(142,182,155,0.07)",
              border: "1px solid rgba(142,182,155,0.08)",
            }}
          >
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(142,182,155,0.48)",
                mb: 0.4,
              }}
            >
              Última ubicación
            </Typography>
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                fontSize: "0.86rem",
                color: C.light,
                lineHeight: 1.5,
              }}
            >
              {character.location?.name || "No disponible"}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * COMPONENTE: Grid de Personajes
 * Renderiza las tarjetas en un grid responsive
 */
const CharacterGrid = ({ characters, isLoading }) => {
  return (
    <Grid container spacing={3}>
      {(isLoading ? Array.from({ length: 8 }) : characters).map((character, index) => {
        if (isLoading) {
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={`loading-${index}`}>
              <Card sx={{ ...glassCardSx, height: "100%", overflow: "hidden" }}>
                <Box
                  sx={{
                    height: 270,
                    background:
                      "linear-gradient(135deg, rgba(35,83,71,0.55), rgba(11,43,38,0.9))",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(218,241,222,0.08) 50%, transparent 100%)",
                      animation: "loadingPulse 1.4s ease-in-out infinite",
                      "@keyframes loadingPulse": {
                        "0%": { transform: "translateX(-100%)" },
                        "100%": { transform: "translateX(100%)" },
                      },
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      width: "64%",
                      height: 14,
                      borderRadius: 999,
                      background: "rgba(142,182,155,0.12)",
                      mb: 1.4,
                    }}
                  />
                  <Box
                    sx={{
                      width: "44%",
                      height: 12,
                      borderRadius: 999,
                      background: "rgba(142,182,155,0.1)",
                      mb: 2.2,
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      height: 58,
                      borderRadius: "14px",
                      background: "rgba(142,182,155,0.08)",
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        }

        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        );
      })}
    </Grid>
  );
};

/**
 * COMPONENTE PRINCIPAL: ApiRyM
 * 
 * Integra:
 * ✓ Búsqueda en tiempo real con axios
 * ✓ Listado paginado con fetch
 * ✓ Navegación por pestañas
 * ✓ Diseño responsive y elegante
 * ✓ Estilos consistentes con GastoClaro
 */
export const ApiRyM = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // ESTADO: Listado Paginado (Fetch)
  // ─────────────────────────────────────────────────────────────────────────────
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ─────────────────────────────────────────────────────────────────────────────
  // ESTADO: Búsqueda con Axios
  // ─────────────────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // ─────────────────────────────────────────────────────────────────────────────
  // ESTADO: Pestaña Activa
  // ─────────────────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(0);

  // ═════════════════════════════════════════════════════════════════════════════
  // EFECTO: Cargar personajes por página (FETCH)
  // ═════════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("No fue posible cargar los personajes.");
        }

        const data = await response.json();
        setCharacters(data.results ?? []);
        setInfo(data.info ?? null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No pudimos cargar la API en este momento.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();
    return () => controller.abort();
  }, [page]);

  // ═════════════════════════════════════════════════════════════════════════════
  // FUNCIÓN: Buscar personajes con Axios
  // ═════════════════════════════════════════════════════════════════════════════
  const searchCharacters = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery("");
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");
      setSearchQuery(query);

      const response = await axios.get(
        "https://rickandmortyapi.com/api/character",
        {
          params: { name: query },
          timeout: 8000,
        }
      );

      setSearchResults(response.data.results || []);
    } catch (err) {
      if (err.response?.status === 404) {
        setSearchError(`No se encontraron personajes con "${query}"`);
        setSearchResults([]);
      } else if (err.code === "ECONNABORTED") {
        setSearchError("La búsqueda tardó demasiado. Intenta de nuevo.");
      } else {
        setSearchError("Error al buscar. Verifica tu conexión.");
      }
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // ─── Manejador de búsqueda ────────────────────────────────────────────────────
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length >= 1) {
      searchCharacters(query);
    } else if (query.trim().length === 0) {
      setSearchResults([]);
      setSearchQuery("");
      setSearchError("");
    }
  };

  // ─── Limpiar búsqueda ────────────────────────────────────────────────────────
  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setSearchError("");
  };

  // ─── Cambiar pestaña ─────────────────────────────────────────────────────────
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      handleClearSearch();
    }
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // JSX PRINCIPAL
  // ═════════════════════════════════════════════════════════════════════════════

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        pt: { xs: 14, md: 16 },
        pb: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${C.darkest} 0%, ${C.dark} 45%, ${C.forest} 100%)`,
        fontFamily: FONT_BODY,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════════
          ELEMENTOS DECORATIVOS DE FONDO
          ═══════════════════════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          position: "absolute",
          top: 120,
          right: "-8%",
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(142,182,155,0.14) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "-10%",
          width: { xs: 220, md: 360 },
          height: { xs: 220, md: 360 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(35,83,71,0.24) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(142,182,155,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(142,182,155,0.035) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ═══════════════════════════════════════════════════════════════════════════
            SECCIÓN: Encabezado con presentación
            ═══════════════════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            ...glassCardSx,
            p: { xs: 3, md: 4.5 },
            mb: { xs: 5, md: 6 },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(142,182,155,0.08) 0%, transparent 40%, rgba(35,83,71,0.18) 100%)",
              pointerEvents: "none",
            }}
          />

          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2.2} sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  <SearchRoundedIcon sx={{ color: C.sage, fontSize: 20 }} />
                  <ViewListRoundedIcon sx={{ color: C.sage, fontSize: 20 }} />
                </Box>

                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: "2.25rem", sm: "2.9rem", md: "3.5rem" },
                    fontWeight: 800,
                    color: C.light,
                    lineHeight: 1.1,
                    maxWidth: 640,
                  }}
                >
                  Explora personajes de{" "}
                  <Box component="span" sx={gradientTextSx}>
                    Rick and Morty
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontFamily: FONT_BODY,
                    color: C.sage,
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    maxWidth: 620,
                  }}
                >
                  Busca personajes en tiempo real usando axios, o navega el catálogo
                  completo con paginación fetch. Todo con el mismo estilo elegante de
                  GastoClaro.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackRoundedIcon />}
                    sx={{
                      background: `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
                      color: C.darkest,
                      fontFamily: FONT_BODY,
                      fontWeight: 700,
                      borderRadius: "12px",
                      px: 3.2,
                      py: 1.35,
                      textTransform: "none",
                      boxShadow: "0 10px 28px rgba(142,182,155,0.28)",
                      "&:hover": {
                        background: `linear-gradient(135deg, #a0c9ae 0%, #e8f8ec 100%)`,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Volver al inicio
                  </Button>

                  <Button
                    onClick={() => {
                      setPage(1);
                      setActiveTab(1);
                      handleClearSearch();
                    }}
                    sx={{
                      color: C.sage,
                      fontFamily: FONT_BODY,
                      fontWeight: 600,
                      borderRadius: "12px",
                      px: 3.2,
                      py: 1.35,
                      textTransform: "none",
                      border: "1px solid rgba(142,182,155,0.24)",
                      "&:hover": {
                        color: C.light,
                        background: "rgba(142,182,155,0.08)",
                        borderColor: "rgba(142,182,155,0.45)",
                      },
                    }}
                  >
                    Ver catálogo
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Grid container spacing={2}>
                {[
                  {
                    icon: <PublicRoundedIcon sx={{ color: C.light, fontSize: 22 }} />,
                    label: "Personajes",
                    value: formatNumber(info?.count),
                  },
                  {
                    icon: <TravelExploreRoundedIcon sx={{ color: C.light, fontSize: 22 }} />,
                    label: "Páginas",
                    value: formatNumber(info?.pages),
                  },
                  {
                    icon: <AutoAwesomeRoundedIcon sx={{ color: C.light, fontSize: 22 }} />,
                    label: "Método",
                    value: searchQuery ? "Axios ⚡" : "Fetch",
                  },
                ].map((item) => (
                  <Grid size={{ xs: 12, sm: 4, md: 12 }} key={item.label}>
                    <Box
                      sx={{
                        background: "rgba(5,31,32,0.42)",
                        border: "1px solid rgba(142,182,155,0.12)",
                        borderRadius: "18px",
                        p: 2.2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.6,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: "14px",
                          background: `linear-gradient(135deg, ${C.mid}, ${C.forest})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 10px 24px rgba(35,83,71,0.35)",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: FONT_BODY,
                            fontSize: "0.78rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(142,182,155,0.62)",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: FONT_DISPLAY,
                            fontSize: "1.55rem",
                            fontWeight: 700,
                            color: C.light,
                            lineHeight: 1.2,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* ═══════════════════════════════════════════════════════════════════════════
            SECCIÓN: Pestañas de navegación
            ═══════════════════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            background: "rgba(5,31,32,0.5)",
            border: "1px solid rgba(142,182,155,0.1)",
            borderRadius: "16px",
            mb: 5,
            overflow: "hidden",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="api sections"
            sx={{
              borderBottom: `1px solid rgba(142,182,155,0.15)`,
              "& .MuiTabs-indicator": {
                background: `linear-gradient(90deg, ${C.sage} 0%, ${C.light} 100%)`,
              },
              "& .MuiTab-root": {
                fontFamily: FONT_BODY,
                fontWeight: 600,
                color: "rgba(142,182,155,0.6)",
                textTransform: "none",
                fontSize: "1rem",
                transition: "all 0.3s",
                "&.Mui-selected": {
                  color: C.light,
                },
                "&:hover": {
                  color: C.sage,
                },
              },
            }}
          >
            <Tab
              icon={<SearchRoundedIcon sx={{ mr: 1 }} />}
              label="Buscar con Axios"
              iconPosition="start"
            />
            <Tab
              icon={<ViewListRoundedIcon sx={{ mr: 1 }} />}
              label="Catálogo Paginado"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* ═══════════════════════════════════════════════════════════════════════════
            TAB 0: BÚSQUEDA CON AXIOS
            ═══════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 0 && (
          <Box>
            {/* ─── BUSCADOR ─── */}
            <Box
              sx={{
                background: "linear-gradient(160deg, rgba(11,43,38,0.92), rgba(5,31,32,0.96))",
                border: "1px solid rgba(142,182,155,0.14)",
                borderRadius: "22px",
                p: { xs: 3, md: 4 },
                mb: { xs: 4, md: 5 },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(142,182,155,0.08) 0%, transparent 40%, rgba(35,83,71,0.18) 100%)",
                  pointerEvents: "none",
                }}
              />

              <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: { xs: "1.75rem", md: "2.1rem" },
                      fontWeight: 700,
                      color: C.light,
                      mb: 0.8,
                    }}
                  >
                    Buscar Personajes
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: FONT_BODY,
                      color: "rgba(142,182,155,0.75)",
                      fontSize: "0.95rem",
                    }}
                  >
                    Escribe el nombre para encontrar personajes de Rick and Morty
                  </Typography>
                </Box>

                {/* Input de búsqueda */}
                <TextField
                  fullWidth
                  placeholder="ej: Rick, Morty, Beth..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          {searchLoading ? (
                            <CircularProgress size={20} sx={{ color: C.sage }} />
                          ) : (
                            <SearchRoundedIcon sx={{ color: C.sage, mr: 1 }} />
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment
                          position="end"
                          onClick={handleClearSearch}
                          sx={{ cursor: "pointer" }}
                        >
                          <ClearRoundedIcon
                            sx={{
                              color: C.sage,
                              fontSize: 20,
                              "&:hover": { color: C.light },
                              transition: "color 0.2s",
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: C.light,
                      fontFamily: FONT_BODY,
                      fontSize: "1rem",
                      borderRadius: "14px",
                      backgroundColor: "rgba(142,182,155,0.06)",
                      border: "1px solid rgba(142,182,155,0.16)",
                      transition:
                        "background-color 0.28s, border-color 0.28s, box-shadow 0.28s",
                      "&:hover": {
                        backgroundColor: "rgba(142,182,155,0.09)",
                        borderColor: "rgba(142,182,155,0.24)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(142,182,155,0.12)",
                        borderColor: "rgba(142,182,155,0.35)",
                        boxShadow: "0 0 0 3px rgba(142,182,155,0.12)",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& ::placeholder": {
                      color: "rgba(142,182,155,0.5)",
                      opacity: 1,
                    },
                  }}
                />

                {/* Info de resultados */}
                {searchQuery && searchResults.length > 0 && (
                  <Typography
                    sx={{
                      fontFamily: FONT_BODY,
                      fontSize: "0.9rem",
                      color: C.sage,
                      fontWeight: 500,
                    }}
                  >
                    📊 Se encontraron {searchResults.length} personaje
                    {searchResults.length !== 1 ? "s" : ""}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* ─── ERRORES DE BÚSQUEDA ─── */}
            {searchError && (
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  borderRadius: "14px",
                  background: "rgba(211,47,47,0.12)",
                  border: "1px solid rgba(211,47,47,0.28)",
                  color: "#ffb4ab",
                  fontFamily: FONT_BODY,
                  "& .MuiAlert-icon": { color: "#ffb4ab" },
                }}
              >
                {searchError}
              </Alert>
            )}

            {/* ─── TÍTULO DE RESULTADOS ─── */}
            {searchQuery && (
              <Box sx={{ mb: 4 }}>
                <Stack spacing={1.5}>
                  <Typography
                    sx={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: C.light,
                    }}
                  >
                    Resultados para "{searchQuery}"
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: FONT_BODY,
                      color: C.sage,
                      fontSize: "0.95rem",
                    }}
                  >
                    {searchResults.length} personaje{searchResults.length !== 1 ? "s" : ""}{" "}
                    encontrado{searchResults.length !== 1 ? "s" : ""}
                  </Typography>
                </Stack>
              </Box>
            )}

            {/* ─── GRID DE RESULTADOS ─── */}
            <CharacterGrid characters={searchResults} isLoading={searchLoading} />
          </Box>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            TAB 1: CATÁLOGO PAGINADO CON FETCH
            ═══════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 1 && (
          <Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "stretch", md: "center" },
                mb: 3.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: "1.7rem", md: "2.2rem" },
                    fontWeight: 700,
                    color: C.light,
                    mb: 0.7,
                  }}
                >
                  Catálogo Visual de Personajes
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FONT_BODY,
                    color: "rgba(142,182,155,0.78)",
                    fontSize: "0.95rem",
                  }}
                >
                  Página {formatNumber(page)} de {formatNumber(info?.pages)} • Navegación con fetch
                </Typography>
              </Box>

              <Stack direction="row" spacing={1.2}>
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || loading}
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{
                    color: C.sage,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontFamily: FONT_BODY,
                    fontWeight: 600,
                    px: 2.2,
                    border: "1px solid rgba(142,182,155,0.22)",
                    "&:hover": {
                      background: "rgba(142,182,155,0.08)",
                      borderColor: "rgba(142,182,155,0.4)",
                    },
                    "&.Mui-disabled": {
                      color: "rgba(142,182,155,0.35)",
                      borderColor: "rgba(142,182,155,0.08)",
                    },
                  }}
                >
                  Anterior
                </Button>

                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!info?.next || loading}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    background: `linear-gradient(135deg, ${C.mid}, ${C.forest})`,
                    color: C.light,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontFamily: FONT_BODY,
                    fontWeight: 700,
                    px: 2.4,
                    border: "1px solid rgba(142,182,155,0.18)",
                    boxShadow: "0 10px 24px rgba(35,83,71,0.28)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2e6b5e 0%, #1e4a3f 100%)",
                      transform: "translateY(-1px)",
                    },
                    "&.Mui-disabled": {
                      color: "rgba(218,241,222,0.35)",
                      background: "rgba(35,83,71,0.38)",
                    },
                  }}
                >
                  Siguiente
                </Button>
              </Stack>
            </Stack>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: "14px",
                  background: "rgba(211,47,47,0.12)",
                  border: "1px solid rgba(211,47,47,0.28)",
                  color: "#ffb4ab",
                  fontFamily: FONT_BODY,
                  "& .MuiAlert-icon": { color: "#ffb4ab" },
                }}
              >
                {error}
              </Alert>
            )}

            <CharacterGrid characters={characters} isLoading={loading} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
