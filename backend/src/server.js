import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT) || 4000;

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.info(`GastoClaro backend activo en http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("No se pudo iniciar el backend:", error.message);
  process.exit(1);
});
