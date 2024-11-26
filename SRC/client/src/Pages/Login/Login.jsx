import Container from "../Container";
import "../Page.css";
import "./Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("owner0");
  const [password, setPassword] = useState("password0");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.type === "owner") {
        return navigate("/owner");
      } else if (user.type === "technician") {
        return navigate("/technician");
      }
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/api/login", { username, password })
      .then((res) => {
        if (res.data.type === "owner") {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/owner");
        } else if (res.data.type === "technician") {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/technician");
        }
      })
      .catch((err) => {
        return setError(err.response.data.error);
      });
  }

  return (
    <div className="login page">
      <Container>
        <div className="login-frame">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <label>
              <h4>Username:</h4>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <h4>Password:</h4>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Login</button>
            <p className="login-error">{error}</p>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
