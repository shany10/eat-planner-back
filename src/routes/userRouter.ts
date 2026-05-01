import { Router } from "express";
import {
  validateMiddleware,
  authMiddleware,
  roleMiddleware,
} from "../middlewares";
import {
  createUserBody,
  CreateUserInput,
  updateUserBody,
  UpdateUserInput,
  authUserBody,
} from "../type";
import {
  createUser,
  getUserById,
  listUsers,
  toggleUserActive,
  verifyUserPasswordByEmail,
} from "../models";
import { signAccessToken } from "../utils/jwt";

const userRouter = Router();

userRouter.get(
  "/getAll",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    const list = await listUsers();
    res.status(200).json(list);
  },
);

userRouter.get(
  "/get/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const user = await getUserById(id);
    res.status(200).json(user);
  },
);

userRouter.post(
  "/register",
  validateMiddleware({ body: createUserBody }),
  async (req, res): Promise<void> => {
    const input = req.body as CreateUserInput;
    await createUser(input);
    res.status(201).json({ ok: true, message: "user created" });
  },
);

userRouter.post(
  "/login",
  validateMiddleware({ body: authUserBody }),
  async (req, res): Promise<void> => {
    const { email, password } = req.body;

    const result = await verifyUserPasswordByEmail({ email, password });
    if (!result.ok) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = signAccessToken({ sub: String(result.user.id) });
    res.json({ ok: true, token, id: result.user.id });
  },
);

userRouter.patch(
  "/toggle-active/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }

      const user = await toggleUserActive(id);
      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }

      res.status(200).json({
        message: user.active ? "Utilisateur activé" : "Utilisateur désactivé",
        user: {
          id: user.id,
          email: user.email,
          active: user.active,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du statut" });
    }
  },
);

userRouter.get(
  "/status/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }

      const user = await getUserById(id);
      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du statut" });
    }
  },
);

userRouter.patch(
  "/update/:id",
  authMiddleware,
  validateMiddleware({ body: updateUserBody }),
  async (req, res): Promise<void> => {
    // TODO: implémenter un update Prisma complet (y compris hash du password)
    // Pour l'instant on évite de casser le build.
    const _updates = req.body as UpdateUserInput;
    res.status(501).json({ error: "Not implemented (Prisma)" });
  },
);

userRouter.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    res.status(501).json({ error: "Not implemented (Prisma)" });
  },
);

userRouter.delete(
  "/deleteAll",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res): Promise<void> => {
    res.status(501).json({ error: "Not implemented (Prisma)" });
  },
);

export { userRouter };
