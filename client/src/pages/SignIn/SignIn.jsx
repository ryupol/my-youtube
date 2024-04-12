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
      const response = await axios.post("/api/users/login", Object.fromEntries(formData));
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
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Sign In</h2>
        <p>Username</p>
        <input name="username" type="text" ref={userInput} required />
        <p>Password</p>
        <input name="password" type="password" ref={passInput} required />
        <br />
        <br />
        {signError && <p style={{ color: "red" }}>{signError}</p>}
        <div className="button-container">
          <a href="/sign-up">Register</a>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
