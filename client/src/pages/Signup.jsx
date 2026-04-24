import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/signup", form);
      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 shadow rounded bg-white">
        <h2 className="text-xl mb-4">Signup</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 mb-2 w-full"/>
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 mb-2 w-full"/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 mb-2 w-full"/>

        <button className="bg-green-500 text-white px-4 py-2 w-full">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;