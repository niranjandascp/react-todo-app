const TodoCard = ({ todo }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-1">{todo.heading}</h3>
      <p className="text-gray-600">{todo.subject}</p>

      <div className="mt-3 text-sm">
        <p>👤 {todo.assignee}</p>
        <p>🧑‍💼 Lead: {todo.Lead}</p>
        <p>📅 {todo.deadline}</p>
      </div>

      <span className="inline-block mt-3 px-3 py-1 text-xs bg-yellow-200 rounded">
        {todo.status}
      </span>
    </div>
  );
};

export default TodoCard;