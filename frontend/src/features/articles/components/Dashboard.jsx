import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { useAuth } from "../../auth/context/AuthContext.jsx";
import {
  createExpense,
  deleteExpense,
  getExpensesByDate,
} from "../services/expenseApi.js";
import { getApiErrorMessage } from "../../../shared/api/httpClient.js";

const C = {
  darkest: "#051F20",
  dark: "#0B2B26",
  forest: "#163832",
  mid: "#235347",
  sage: "#8EB69B",
  light: "#DAF1DE",
};

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_BODY = "'DM Sans', sans-serif";

const CATEGORY_OPTIONS = [
  "Comida",
  "Transporte",
  "Hogar",
  "Salud",
  "Educacion",
  "Ocio",
  "Servicios",
  "Otros",
];

const emptySummary = {
  dailyTotal: 0,
  monthTotal: 0,
  dailyCount: 0,
  averageExpense: 0,
  categoryBreakdown: [],
};

const getTodayISO = () => new Date().toISOString().slice(0, 10);

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatDate = (value) => {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  const dateObject = new Date(value);
  if (Number.isNaN(dateObject.getTime())) {
    return "";
  }

  return dateObject.toLocaleDateString("es-CO");
};

export default function Dashboard() {
  const { token, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: CATEGORY_OPTIONS[0],
    date: getTodayISO(),
  });
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadExpenses = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setFetchError("");
      const response = await getExpensesByDate(token, selectedDate);
      setExpenses(response?.expenses || []);
      setSummary(response?.summary || emptySummary);
    } catch (apiError) {
      setFetchError(
        getApiErrorMessage(apiError, "No fue posible cargar los gastos.")
      );
      setExpenses([]);
      setSummary(emptySummary);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, token]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const description = form.description.trim();
    const amount = Number(form.amount);

    if (!description) {
      setError("Escribe una descripcion del gasto.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
      setError("Ingresa un monto entero valido mayor a 0.");
      return;
    }

    if (amount % 50 !== 0) {
      setError("El monto debe ser multiplo de 50.");
      return;
    }

    try {
      setSubmitting(true);
      await createExpense(token, {
        description,
        amount,
        category: form.category,
        date: form.date || getTodayISO(),
      });
      setForm((prev) => ({
        ...prev,
        description: "",
        amount: "",
        category: CATEGORY_OPTIONS[0],
      }));
      setSelectedDate(form.date || getTodayISO());
      await loadExpenses();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "No fue posible guardar el gasto."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      setDeletingId(expenseId);
      await deleteExpense(token, expenseId);
      await loadExpenses();
    } catch (apiError) {
      setFetchError(
        getApiErrorMessage(apiError, "No fue posible eliminar el gasto.")
      );
    } finally {
      setDeletingId("");
    }
  };

  const categoryBreakdown = useMemo(
    () => summary.categoryBreakdown || [],
    [summary.categoryBreakdown]
  );

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${C.darkest} 0%, ${C.dark} 45%, ${C.forest} 100%)`,
        pt: { xs: 12, md: 14 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: "24px",
            background: "linear-gradient(145deg, rgba(11,43,38,0.92), rgba(5,31,32,0.95))",
            border: "1px solid rgba(142,182,155,0.15)",
            boxShadow: "0 18px 42px rgba(5,31,32,0.45)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: { md: "center" } }}
            >
              <Box>
                <Chip
                  label="DASHBOARD"
                  size="small"
                  sx={{
                    mb: 2,
                    color: C.sage,
                    background: "rgba(142,182,155,0.1)",
                    border: "1px solid rgba(142,182,155,0.22)",
                    fontFamily: FONT_BODY,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: "2rem", md: "2.6rem" },
                    fontWeight: 800,
                    color: C.light,
                    lineHeight: 1.15,
                  }}
                >
                  Control diario de gastos
                </Typography>
                <Typography
                  sx={{
                    mt: 1.2,
                    fontFamily: FONT_BODY,
                    color: "rgba(142,182,155,0.82)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    maxWidth: 620,
                  }}
                >
                  {`Hola ${user?.name || "usuario"}, guarda cada gasto del dia y revisa en segundos cuanto has invertido hoy y durante el mes.`}
                </Typography>
              </Box>

              <TextField
                label="Fecha de consulta"
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                sx={{
                  minWidth: { xs: "100%", md: 210 },
                  "& .MuiOutlinedInput-root": {
                    color: C.light,
                    fontFamily: FONT_BODY,
                    borderRadius: "12px",
                    background: "rgba(142,182,155,0.06)",
                    "& fieldset": { borderColor: "rgba(142,182,155,0.22)" },
                    "&:hover fieldset": { borderColor: "rgba(142,182,155,0.4)" },
                    "&.Mui-focused fieldset": { borderColor: C.sage },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: FONT_BODY,
                    color: "rgba(142,182,155,0.62)",
                    "&.Mui-focused": { color: C.sage },
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </CardContent>
        </Card>

        {fetchError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
              background: "rgba(211,47,47,0.12)",
              border: "1px solid rgba(211,47,47,0.3)",
              color: "#ffb4ab",
              fontFamily: FONT_BODY,
              "& .MuiAlert-icon": { color: "#ffb4ab" },
            }}
          >
            {fetchError}
          </Alert>
        )}

        <Grid container spacing={3.2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "20px",
                background: "linear-gradient(145deg, rgba(22,56,50,0.85), rgba(5,31,32,0.95))",
                border: "1px solid rgba(142,182,155,0.14)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.6, md: 3 } }}>
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    color: C.light,
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    mb: 0.8,
                  }}
                >
                  Agregar gasto
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FONT_BODY,
                    color: "rgba(142,182,155,0.74)",
                    fontSize: "0.9rem",
                    mb: 2.4,
                  }}
                >
                  Cada registro se guarda en tu cuenta y aparece en cualquier dispositivo.
                </Typography>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2.2,
                      borderRadius: "10px",
                      background: "rgba(211,47,47,0.12)",
                      border: "1px solid rgba(211,47,47,0.3)",
                      color: "#ffb4ab",
                      fontFamily: FONT_BODY,
                      "& .MuiAlert-icon": { color: "#ffb4ab" },
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}
                >
                  <TextField
                    label="Descripcion"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    fullWidth
                    sx={fieldSx}
                  />

                  <TextField
                    label="Monto"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    inputProps={{ min: 50, step: 50 }}
                    helperText="Solo multiplos de 50"
                    fullWidth
                    sx={{
                      ...fieldSx,
                      "& .MuiFormHelperText-root": {
                        color: "rgba(142,182,155,0.6)",
                        fontFamily: FONT_BODY,
                      },
                    }}
                  />

                  <TextField
                    label="Categoria"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    fullWidth
                    select
                    sx={fieldSx}
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Fecha"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    fullWidth
                    sx={fieldSx}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    startIcon={
                      submitting ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <AddCircleOutlineRoundedIcon />
                      )
                    }
                    sx={{
                      mt: 0.8,
                      background: `linear-gradient(135deg, ${C.sage} 0%, ${C.light} 100%)`,
                      color: C.darkest,
                      fontFamily: FONT_BODY,
                      fontWeight: 700,
                      borderRadius: "12px",
                      py: 1.3,
                      textTransform: "none",
                      boxShadow: "0 10px 24px rgba(142,182,155,0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #a3ccb1 0%, #effcf3 100%)",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-disabled": {
                        background: "rgba(142,182,155,0.35)",
                        color: "rgba(5,31,32,0.7)",
                      },
                    }}
                  >
                    {submitting ? "Guardando..." : "Guardar gasto"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                minHeight: 425,
                borderRadius: "20px",
                background: "linear-gradient(145deg, rgba(11,43,38,0.9), rgba(5,31,32,0.97))",
                border: "1px solid rgba(142,182,155,0.14)",
                boxShadow: "0 16px 35px rgba(5,31,32,0.4)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -130,
                  right: -100,
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(142,182,155,0.16) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <CardContent
                sx={{
                  p: { xs: 2.6, md: 3 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    color: C.light,
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    mb: 0.4,
                  }}
                >
                  Panorama del dia
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FONT_BODY,
                    color: "rgba(142,182,155,0.7)",
                    fontSize: "0.9rem",
                    mb: 2.3,
                  }}
                >
                  Vista rapida para {formatDate(selectedDate)}
                </Typography>

                <Box
                  sx={{
                    p: 2.2,
                    borderRadius: "16px",
                    border: "1px solid rgba(142,182,155,0.16)",
                    background: "linear-gradient(135deg, rgba(35,83,71,0.7), rgba(22,56,50,0.65))",
                    mb: 2.2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: FONT_BODY,
                      color: "rgba(142,182,155,0.75)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Total invertido hoy
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.3,
                      fontFamily: FONT_DISPLAY,
                      color: C.light,
                      fontWeight: 800,
                      fontSize: "2.1rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {formatCurrency(summary.dailyTotal)}
                  </Typography>
                </Box>

                <Grid container spacing={1.2} sx={{ mb: 2.2 }}>
                  <Grid size={6}>
                    <Box sx={quickDataSx}>
                      <Typography sx={quickLabelSx}>Registros</Typography>
                      <Typography sx={quickValueSx}>{summary.dailyCount}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={quickDataSx}>
                      <Typography sx={quickLabelSx}>Ticket promedio</Typography>
                      <Typography sx={quickValueSx}>
                        {formatCurrency(summary.averageExpense)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography
                  sx={{
                    fontFamily: FONT_BODY,
                    color: C.sage,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    mb: 1.1,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Distribucion por categoria
                </Typography>

                {categoryBreakdown.length === 0 ? (
                  <Box
                    sx={{
                      mt: "auto",
                      p: 2.2,
                      borderRadius: "14px",
                      border: "1px dashed rgba(142,182,155,0.22)",
                      background: "rgba(142,182,155,0.04)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT_BODY,
                        color: "rgba(142,182,155,0.72)",
                        fontSize: "0.88rem",
                        textAlign: "center",
                      }}
                    >
                      Agrega gastos para ver la distribucion visual de tu dia.
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={1.1} sx={{ mt: "auto" }}>
                    {categoryBreakdown.slice(0, 5).map((item) => (
                      <Box key={item.category}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.35 }}>
                          <Typography sx={{ fontFamily: FONT_BODY, color: C.light, fontSize: "0.86rem" }}>
                            {item.category}
                          </Typography>
                          <Typography sx={{ fontFamily: FONT_BODY, color: C.sage, fontSize: "0.82rem", fontWeight: 700 }}>
                            {item.percentage}% · {formatCurrency(item.total)}
                          </Typography>
                        </Stack>
                        <Box
                          sx={{
                            height: 8,
                            borderRadius: 999,
                            background: "rgba(142,182,155,0.12)",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${item.percentage}%`,
                              minWidth: item.percentage > 0 ? 6 : 0,
                              height: "100%",
                              borderRadius: 999,
                              background: "linear-gradient(90deg, rgba(142,182,155,0.65), rgba(218,241,222,0.9))",
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0.2 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              icon={<CalendarMonthRoundedIcon sx={{ color: C.light, fontSize: 22 }} />}
              label="Fecha"
              value={formatDate(selectedDate)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              icon={<PaymentsRoundedIcon sx={{ color: C.light, fontSize: 22 }} />}
              label="Total del dia"
              value={formatCurrency(summary.dailyTotal)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              icon={<ReceiptLongRoundedIcon sx={{ color: C.light, fontSize: 22 }} />}
              label="Registros"
              value={String(summary.dailyCount)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              icon={<SavingsRoundedIcon sx={{ color: C.light, fontSize: 22 }} />}
              label="Acumulado del mes"
              value={formatCurrency(summary.monthTotal)}
            />
          </Grid>
        </Grid>

        <Card
          elevation={0}
          sx={{
            mt: 3.2,
            borderRadius: "20px",
            background: "linear-gradient(145deg, rgba(11,43,38,0.92), rgba(5,31,32,0.96))",
            border: "1px solid rgba(142,182,155,0.14)",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                color: C.light,
                fontWeight: 700,
                fontSize: "1.45rem",
                mb: 0.6,
              }}
            >
              Gastos de {formatDate(selectedDate)}
            </Typography>
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                color: "rgba(142,182,155,0.72)",
                fontSize: "0.9rem",
                mb: 2.2,
              }}
            >
              Historial diario con eliminacion rapida de registros.
            </Typography>

            {loading ? (
              <Box sx={{ py: 3, display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ color: C.sage }} />
              </Box>
            ) : expenses.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  borderRadius: "14px",
                  textAlign: "center",
                  background: "rgba(142,182,155,0.05)",
                  border: "1px dashed rgba(142,182,155,0.2)",
                }}
              >
                <Typography sx={{ fontFamily: FONT_BODY, color: C.sage }}>
                  No hay gastos guardados para esta fecha.
                </Typography>
              </Box>
            ) : (
              <Stack divider={<Divider sx={{ borderColor: "rgba(142,182,155,0.1)" }} />}>
                {expenses.map((expense) => (
                  <Box
                    key={expense._id}
                    sx={{
                      py: 1.5,
                      display: "flex",
                      gap: 1.2,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: FONT_BODY,
                          fontWeight: 700,
                          color: C.light,
                          fontSize: "0.95rem",
                        }}
                      >
                        {expense.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.6 }}>
                        <Chip
                          label={expense.category}
                          size="small"
                          sx={{
                            color: C.sage,
                            background: "rgba(142,182,155,0.1)",
                            border: "1px solid rgba(142,182,155,0.2)",
                            fontFamily: FONT_BODY,
                            fontSize: "0.72rem",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: FONT_BODY,
                            color: "rgba(142,182,155,0.62)",
                            fontSize: "0.78rem",
                            alignSelf: "center",
                          }}
                        >
                          {formatDate(expense.date)}
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontFamily: FONT_DISPLAY,
                          color: C.light,
                          fontWeight: 700,
                          fontSize: "1.05rem",
                        }}
                      >
                        {formatCurrency(expense.amount)}
                      </Typography>
                      <IconButton
                        aria-label="eliminar gasto"
                        onClick={() => handleDelete(expense._id)}
                        disabled={deletingId === expense._id}
                        sx={{
                          color: "rgba(255,138,128,0.8)",
                          "&:hover": {
                            color: "#ffb4ab",
                            background: "rgba(211,47,47,0.16)",
                          },
                        }}
                      >
                        {deletingId === expense._id ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    color: C.light,
    fontFamily: FONT_BODY,
    borderRadius: "12px",
    background: "rgba(142,182,155,0.06)",
    "& fieldset": { borderColor: "rgba(142,182,155,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(142,182,155,0.4)" },
    "&.Mui-focused fieldset": { borderColor: C.sage },
  },
  "& .MuiInputLabel-root": {
    fontFamily: FONT_BODY,
    color: "rgba(142,182,155,0.6)",
    "&.Mui-focused": { color: C.sage },
  },
};

const quickDataSx = {
  p: 1.5,
  borderRadius: "12px",
  border: "1px solid rgba(142,182,155,0.16)",
  background: "rgba(142,182,155,0.06)",
  height: "100%",
};

const quickLabelSx = {
  fontFamily: FONT_BODY,
  color: "rgba(142,182,155,0.62)",
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const quickValueSx = {
  mt: 0.3,
  fontFamily: FONT_DISPLAY,
  color: C.light,
  fontSize: "1.22rem",
  fontWeight: 700,
  lineHeight: 1.2,
};

function SummaryCard({ icon, label, value }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        height: "100%",
        background: "linear-gradient(145deg, rgba(22,56,50,0.82), rgba(5,31,32,0.95))",
        border: "1px solid rgba(142,182,155,0.15)",
      }}
    >
      <CardContent
        sx={{
          px: 2,
          py: 2.1,
          "&:last-child": { pb: 2.1 },
        }}
      >
        <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${C.mid} 0%, ${C.forest} 100%)`,
              border: "1px solid rgba(142,182,155,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: FONT_BODY,
                color: "rgba(142,182,155,0.72)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                mt: 0.1,
                fontFamily: FONT_DISPLAY,
                color: C.light,
                fontSize: "1.2rem",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
