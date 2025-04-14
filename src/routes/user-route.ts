import express from "express";
import { UserControllers } from "../controllers/user-controller";
const router = express.Router();

router.get("/users", UserControllers.getAllUsers);
router.post("/users", UserControllers.createUser);
router.get("/users/:id", UserControllers.getUserById);
router.put("/users/:id", UserControllers.updateUser);
router.delete("/users/:id", UserControllers.deleteUser);

export { router as userRoutes };
