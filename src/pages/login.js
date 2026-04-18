import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email: email,
        password: password,
      });

      // check if token exists in response
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setMessage("Wrong email or password!");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <div className="form-box">
        {message && <p>{message}</p>}
        <h2> Login into your account: </h2>

        <label> Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label> Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" className="btn btn-light" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
