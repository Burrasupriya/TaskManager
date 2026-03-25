import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input placeholder="Name" onChange={(e) => setForm({...form, name:e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password:e.target.value})} />
      <button className="btn btn-blue">Register</button>
    </form>
  );
}