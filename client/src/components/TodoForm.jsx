import { useState } from "react";
import API from "../services/api";

const TodoForm = () => {
  const [form, setForm] = useState({
    heading: "",
    subject: "",
    assignee: "",
    Lead: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/todo", form);
      alert("Todo Created ✅");

      setForm({
        heading: "",
        subject: "",
        assignee: "",
        Lead: "",
        deadline: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <input
        name="heading"
        value={form.heading}
        onChange={handleChange}
        placeholder="Heading"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
        placeholder="Assignee"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="Lead"
        value={form.Lead}
        onChange={handleChange}
        placeholder="Lead"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;