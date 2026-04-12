import { getUserByEmail, createUser } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      return res.status(409).send({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await createUser(name, email, hashedPassword);

    res.status(201).send({
      message: "User successfully registered",
      success: true,
    });
  } catch (error) {
    console.error("ERROR signup:", error);
    return res.status(500).send({
      message: "Server Internal Error",
      success: false,
    });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).send({
        message: "User not registered, please signup first",
        success: false,
      });
    }

    const hashedPassword = user.password;

    const isPassMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPassMatch) {
      return res.status(401).send({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      user: { id: user.id, name: user.name, email: user.email },
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error("ERROR signin:", error);
    return res.status(500).send({
      message: "Server Internal Error",
      success: false,
    });
  }
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    signed: true,
  });

  res.status(200).send({
    message: "Logged out successfully",
    success: true,
  });
}

export async function checkMe(req, res) {
  const user = await getUserByEmail(req.user.email);

  if(!user) {
    return res.status(404).send({
      message: "User not found",
      success: false,
    })
  }

  return res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    message: "User logged in",
    success: true,
  });
}