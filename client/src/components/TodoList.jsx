import { useEffect, useState } from "react";
import API from "../services/api";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todo?id=all");
      setTodos(res.data?.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h2 className="text-xl font-bold mb-2">All Tasks</h2>

      {todos.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {todos.map((todo) => (
            <TodoCard key={todo.taskId || todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;