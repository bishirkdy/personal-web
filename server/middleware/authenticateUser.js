import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: " Invalid token" });
  }
};

export const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};
