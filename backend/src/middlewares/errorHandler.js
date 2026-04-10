import { createHttpError } from "../utils/httpError.js";

export function notFound(req, _res, next) {
  return next(
    createHttpError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`)
  );
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    message:
      error.message || "Ocurrio un error interno en el servidor.",
  });
}
