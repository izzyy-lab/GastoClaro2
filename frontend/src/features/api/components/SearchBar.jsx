import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

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

/**
 * Componente SearchBar para buscar personajes por nombre
 * Utiliza axios internamente a través del hook
 */
export const SearchBar = ({
  onSearch,
  isLoading,
  query,
  onClear,
  resultCount = 0,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
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
      {/* Fondo de gradiente sutil */}
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
        {/* Título */}
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

        {/* Campo de búsqueda */}
        <TextField
          fullWidth
          placeholder="ej: Rick, Morty, Beth..."
          value={query}
          onChange={handleChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {isLoading ? (
                    <CircularProgress size={20} sx={{ color: C.sage }} />
                  ) : (
                    <SearchRoundedIcon sx={{ color: C.sage, mr: 1 }} />
                  )}
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment
                  position="end"
                  onClick={onClear}
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

        {/* Información de resultados */}
        {query && resultCount > 0 && (
          <Typography
            sx={{
              fontFamily: FONT_BODY,
              fontSize: "0.9rem",
              color: C.sage,
              fontWeight: 500,
            }}
          >
            📊 Se encontraron {resultCount} personaje{resultCount !== 1 ? "s" : ""}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
