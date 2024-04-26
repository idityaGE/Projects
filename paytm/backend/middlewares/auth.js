import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token> => [Bearer, <token>] => <token>

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.userId = decoded.userId;  // Add userId to req object
        next();
    });
};

