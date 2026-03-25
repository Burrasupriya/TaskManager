import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input placeholder="Email" onChange={(e) => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password:e.target.value})} />
      <button className="btn btn-blue">Login</button>
    </form>
  );
}