import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🚀 TodoApp</h1>

      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;