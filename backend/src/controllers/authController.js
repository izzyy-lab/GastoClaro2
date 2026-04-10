import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { createHttpError } from "../utils/httpError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

function cleanUser(userDocument) {
  return {
    id: userDocument._id,
    name: userDocument.name,
    email: userDocument.email,
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createHttpError(400, "Nombre, correo y contrasena son obligatorios."));
    }

    if (!EMAIL_REGEX.test(email)) {
      return next(createHttpError(400, "El correo no tiene un formato valido."));
    }

    if (!PASSWORD_REGEX.test(password)) {
      return next(
        createHttpError(
          400,
          "La contrasena debe tener minimo 8 caracteres, una mayuscula y un numero."
        )
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return next(createHttpError(409, "Este correo ya esta registrado."));
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id.toString());
    return res.status(201).json({
      token,
      user: cleanUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "Correo y contrasena son obligatorios."));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return next(createHttpError(401, "Credenciales invalidas."));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(createHttpError(401, "Credenciales invalidas."));
    }

    const token = generateToken(user._id.toString());
    return res.status(200).json({
      token,
      user: cleanUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createHttpError(404, "Usuario no encontrado."));
    }

    return res.status(200).json({ user: cleanUser(user) });
  } catch (error) {
    return next(error);
  }
}
