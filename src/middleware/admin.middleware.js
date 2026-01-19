import authMiddleware from "./auth.middleware.js";

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }
    next();
  });
};

export default adminMiddleware;
