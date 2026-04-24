import { Router } from "express";
import { createTask, deleteTask, editTask, getTodos } from "../controllers/todoController.js";

const todoRoutes = Router();

todoRoutes.route("/").get(getTodos).post(createTask);

// todoRoutes.patch('/:taskId', editTask)
todoRoutes.route("/:taskId")
.patch(editTask)
.put(editTask)
.delete(deleteTask)


export default todoRoutes;
