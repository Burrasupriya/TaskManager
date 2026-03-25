import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ background: "#111", color: "white", padding: "10px" }}>
      <h2 style={{ display: "inline" }}>Task Manager</h2>

      <div style={{ float: "right" }}>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </div>
  );
}