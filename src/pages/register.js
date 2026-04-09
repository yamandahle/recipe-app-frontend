import { useState } from "react";
import "./register.css";
import axios from "axios";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      /*save the details and send them to the server */
      const response = await axios.post("http://127.0.0.1:8000/register", {
        full_name: name,
        email: email,
        password: password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <div className="form-box">
        {message && <p>{message}</p>}
        <h2> Create account: </h2>

        <label> Full name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label> Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-light"
          onClick={handleRegister}
        >
          Make a new account
        </button>
      </div>
    </div>
  );
};

export default Register;
