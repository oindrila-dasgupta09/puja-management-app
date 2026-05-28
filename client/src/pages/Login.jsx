import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login Failed";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Puja Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>
        <p style={{ marginTop: 16, color: "#666" }}>
          Don't have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
