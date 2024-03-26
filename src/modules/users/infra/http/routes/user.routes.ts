import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUsersController } from "../controllers/ListUsersController";
import { isAuthenticated } from "../../../../../shared/infra/http/middlewares/IsAuthenticated";

const userRoutes = Router();

// Controllers
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

userRoutes.post("/first-access", createUserController.handle);
userRoutes.get("/", isAuthenticated, listUserController.handle);

export { userRoutes };
