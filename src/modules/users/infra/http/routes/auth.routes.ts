import { Router } from "express";
import { AuthUserController } from "../controllers/AuthUserController";

const authenticateUserRouter = Router();

const authUserController = new AuthUserController();

authenticateUserRouter.post("/login", authUserController.handle);

export { authenticateUserRouter };
