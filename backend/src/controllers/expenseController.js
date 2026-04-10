import Expense, { ALLOWED_CATEGORIES } from "../models/Expense.js";
import { createHttpError } from "../utils/httpError.js";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeAmount(rawAmount) {
  const amount = Number(rawAmount);
  if (!Number.isInteger(amount) || amount <= 0 || amount % 50 !== 0) {
    return null;
  }
  return amount;
}

function buildSummary(expensesForDay, expensesForMonth) {
  const dailyTotal = expensesForDay.reduce((acc, expense) => acc + expense.amount, 0);
  const monthTotal = expensesForMonth.reduce((acc, expense) => acc + expense.amount, 0);
  const dailyCount = expensesForDay.length;
  const averageExpense = dailyCount > 0 ? Math.round(dailyTotal / dailyCount) : 0;

  const groupedByCategory = expensesForDay.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryBreakdown = Object.entries(groupedByCategory)
    .map(([category, total]) => ({
      category,
      total,
      percentage: dailyTotal ? Math.round((total / dailyTotal) * 100) : 0,
    }))
    .sort((a, b) => b.total - a.total);

  return {
    dailyTotal,
    monthTotal,
    dailyCount,
    averageExpense,
    categoryBreakdown,
  };
}

export async function getExpenses(req, res, next) {
  try {
    const selectedDate = req.query.date || getTodayDateString();

    if (!DATE_REGEX.test(selectedDate)) {
      return next(createHttpError(400, "La fecha debe tener formato YYYY-MM-DD."));
    }

    const monthPrefix = selectedDate.slice(0, 7);
    const [expensesForDay, expensesForMonth] = await Promise.all([
      Expense.find({ user: req.userId, date: selectedDate }).sort({ createdAt: -1 }),
      Expense.find({
        user: req.userId,
        date: { $regex: `^${monthPrefix}` },
      }),
    ]);

    return res.status(200).json({
      date: selectedDate,
      expenses: expensesForDay,
      summary: buildSummary(expensesForDay, expensesForMonth),
    });
  } catch (error) {
    return next(error);
  }
}

export async function createExpense(req, res, next) {
  try {
    const { description, amount, category, date } = req.body;
    const normalizedDescription = description?.trim();
    const normalizedAmount = normalizeAmount(amount);
    const normalizedDate = date || getTodayDateString();

    if (!normalizedDescription) {
      return next(createHttpError(400, "La descripcion es obligatoria."));
    }

    if (!normalizedAmount) {
      return next(createHttpError(400, "El monto debe ser entero, mayor a 0 y multiplo de 50."));
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return next(createHttpError(400, "La categoria no es valida."));
    }

    if (!DATE_REGEX.test(normalizedDate)) {
      return next(createHttpError(400, "La fecha debe tener formato YYYY-MM-DD."));
    }

    const createdExpense = await Expense.create({
      user: req.userId,
      description: normalizedDescription,
      amount: normalizedAmount,
      category,
      date: normalizedDate,
    });

    return res.status(201).json({
      expense: createdExpense,
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findOne({ _id: expenseId, user: req.userId });

    if (!expense) {
      return next(createHttpError(404, "Gasto no encontrado."));
    }

    await expense.deleteOne();
    return res.status(200).json({ message: "Gasto eliminado correctamente." });
  } catch (error) {
    return next(error);
  }
}
