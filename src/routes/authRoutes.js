import { Router } from "express";
import { createUser, loginUser } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.post('/create',createUser );

authRoutes.post('/login',loginUser );

export default authRoutes;