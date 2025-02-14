import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigation

export function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook for React Router navigation

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form reload
    if (!email) {
      alert("Please enter an email!");
      return;
    }
    navigate(`/generate?username=${encodeURIComponent(email)}`); // Use React Router navigation
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div>
          <span>📧</span>
          <input
            type="text"
            name="username"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" required />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}

