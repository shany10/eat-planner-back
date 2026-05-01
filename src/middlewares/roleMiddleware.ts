import { Request, Response, NextFunction } from "express";
import { getUserById } from "../models";

export function roleMiddleware(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    try {
      const id = Number(req.user.id);
      if (!Number.isFinite(id)) {
        return res.status(401).json({ error: "Invalid user id" });
      }

      const user = await getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
