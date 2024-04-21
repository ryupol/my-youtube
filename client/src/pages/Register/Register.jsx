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
      const response = await axios.post("/api/users/create", Object.fromEntries(formData));
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
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Create your account</p>
        <div className="input-container">
          <input name="username" type="text" placeholder="Username" ref={userInput} required />
        </div>
        <div className="input-container">
          <input name="password" type="password" placeholder="Password" ref={passInput} required />
        </div>
        <div className="input-container">
          <input
            name="confirm"
            type="password"
            placeholder="Confirm password"
            ref={confInput}
            required
          />
        </div>
        <span className="error">{signError}</span>
        <button type="submit" className="submit">
          Register
        </button>

        <p className="sign-link">
          <span>Already have account? </span>
          <a href="/sign-in">Sign in</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
