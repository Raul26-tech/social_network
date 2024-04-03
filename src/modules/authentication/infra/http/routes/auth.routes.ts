import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const authenticateUserRouter = Router();

const authUserController = new AuthenticationController();

authenticateUserRouter.post("/login", authUserController.handle);

export { authenticateUserRouter };
