import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await api.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p style={{ marginTop: 16, color: "#666" }}>
          Already have an account?{' '}
          <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
