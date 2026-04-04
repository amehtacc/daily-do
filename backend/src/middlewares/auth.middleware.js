import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(401).send({
      message: "Not authorized",
      success: false,
    });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Invalid token",
      success: false,
    });
  }
}
