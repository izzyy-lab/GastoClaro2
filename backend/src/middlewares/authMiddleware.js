import jwt from "jsonwebtoken";
import { createHttpError } from "../utils/httpError.js";

export function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return next(createHttpError(401, "No autorizado. Token no enviado."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (_error) {
    return next(createHttpError(401, "Token invalido o expirado."));
  }
}
