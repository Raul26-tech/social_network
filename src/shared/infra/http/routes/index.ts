import { Router } from "express";
import { userRoutes } from "../../../../modules/users/infra/http/routes/user.routes";
import { authenticateUserRouter } from "../../../../modules/authentication/infra/http/routes/auth.routes";

const router = Router();

router.use("/", authenticateUserRouter);
router.use("/users", userRoutes);

export { router };
