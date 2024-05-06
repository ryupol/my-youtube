import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const [signError, setSignError] = useState("");
  const userInput = useRef();
  const passInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("username", userInput.current.value);
    formData.set("password", passInput.current.value);

    try {
      const response = await axios.post("/api/users/signin", Object.fromEntries(formData));
      const { message, user } = response.data;
      if (user) {
        navigate("/", { replace: true });
      }
      setSignError(message);
    } catch (error) {
      setSignError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit} method="POST">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input name="username" type="text" placeholder="Username" ref={userInput} required />
        </div>
        <div className="input-container">
          <input name="password" type="password" placeholder="Password" ref={passInput} required />
        </div>
        <span className="error">{signError}</span>
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="sign-link">
          <span>No account? </span>
          <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
