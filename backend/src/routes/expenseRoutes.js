import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expenseController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get("/", getExpenses);
router.post("/", createExpense);
router.delete("/:expenseId", deleteExpense);

export default router;
