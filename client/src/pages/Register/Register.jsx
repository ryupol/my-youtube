import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Register.scss";

function Register() {
  const navigate = useNavigate();
  const [signError, setSignError] = useState("");
  const userInput = useRef();
  const passInput = useRef();
  const confInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", userInput.current.value);
    formData.append("password", passInput.current.value);
    formData.append("confirm", confInput.current.value);

    try {
      const response = await axios.post("/api/users", Object.fromEntries(formData));
      const { message, user } = response.data;
      if (user) {
        navigate("/", { replace: true });
      }
      setSignError(message);
    } catch (error) {
      setSignError("Failed to sign up. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Register</h2>
        <p>Username</p>
        <input name="username" type="text" required ref={userInput} />
        <p>Password</p>
        <input name="password" type="password" required ref={passInput} />
        <p>Confirm Password</p>
        <input name="confirm" type="password" required ref={confInput} />
        <br />
        <br />
        {signError && <p style={{ color: "red" }}>{signError}</p>}
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
