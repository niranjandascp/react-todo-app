import { ObjectId } from "mongodb";
import connectToDatabase from "../config/db.js";
import { v7 as uuidv7 } from "uuid";
import { response } from "express";

export const getTodos = async (req, res) => {
  console.log("getTodos???", req.query);
  try {
    const { id } = req.query;

    if (id === "all") {
      const db = await connectToDatabase();
      const tasks = await db.collection("todos").find({}).toArray();
      res.json({ message: "Todos fetched successfully", tasks });
    } else {
      const db = await connectToDatabase();
      const tasks = await db
        .collection("todos")
        .find({ _id: new ObjectId(id) })
        .toArray();
      res.json({ message: "Todos fetched successfully", tasks });
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }
};

export const createTask = async (req, res) => {
  console.log("triger postdoto>>>>>", req.body);

  try {
    // const { taskData } = req.body;
    const { heading, subject, assignee, Lead, deadline } = req.body;

    if (!heading || !subject || !assignee || !Lead || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const todo = {
      taskId: uuidv7(),
      heading,
      subject,
      assignee,
      Lead,
      deadline,
      status: "pending",
      comments: [],
      reference: req.body?.reference || {},
      cratedAt: new Date(),
      completedAt: new Date(),
    };

    const db = await connectToDatabase();
    const result = await db.collection("todos").insertOne(todo);
    res.json({ message: "Todo created successfully", todo: result });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Error creating todo" });
  }
};

export const editTask = async (req, res) => {
  console.log("editTask body >>>>>", req.body);
  console.log("editTask params >>>>>", req.params);

  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const db = await connectToDatabase();

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await db.collection("todos").updateOne(
      { taskId: taskId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      result,
    });

  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTask = async (req, res) => {
  console.log("deleteTask body >>>>>", req.body);
  console.log("deleteTask params >>>>>", req.params);

  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const db = await connectToDatabase();

    const result = await db.collection("todos").deleteOne({ taskId: taskId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      result,
    });      
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Error deleting todo" });
  }
};      
