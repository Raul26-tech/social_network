import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUsersController } from "../controllers/ListUsersController";
import { isAuthenticated } from "../../../../../shared/infra/http/middlewares/IsAuthenticated";

const userRoutes = Router();

// Controllers
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

/**
 * @swagger
 * /first-access:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRoutes.post("/first-access", createUserController.handle);

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     tags:
//  *       - Users
//  *     summary: List all users
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: string
//  *                   username:
//  *                     type: string
//  */
userRoutes.get("/", isAuthenticated, listUserController.handle);

export { userRoutes };
