const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({
        message: "Invalid token. Authorization denied.",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token. Please log in again.",
    });
  }
};

module.exports = authMiddleware;
