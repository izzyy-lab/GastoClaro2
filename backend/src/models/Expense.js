import mongoose from "mongoose";

const ALLOWED_CATEGORIES = [
  "Comida",
  "Transporte",
  "Hogar",
  "Salud",
  "Educacion",
  "Ocio",
  "Servicios",
  "Otros",
];

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 140,
    },
    amount: {
      type: Number,
      required: true,
      min: 50,
      validate: {
        validator: Number.isInteger,
        message: "El monto debe ser un numero entero.",
      },
    },
    category: {
      type: String,
      required: true,
      enum: ALLOWED_CATEGORIES,
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD."],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ user: 1, date: -1, createdAt: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

export { ALLOWED_CATEGORIES };
export default Expense;
