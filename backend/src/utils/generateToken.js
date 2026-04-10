import jwt from "jsonwebtoken";

export function generateToken(userId) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("Falta la variable de entorno JWT_SECRET.");
  }

  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || "7d",
  });
}
