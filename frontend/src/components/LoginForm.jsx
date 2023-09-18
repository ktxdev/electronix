import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    });

    const data = await response.json();

    localStorage.setItem("accessToken", data.accessToken);

    navigate("/admin")
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Email <span className="text-red-600">*</span>
        </p>
        <input
          className="input w-full h-12 rounded-md border px-6 text-base"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Password <span className="text-red-600">*</span>
        </p>
        <input
          className="input w-full h-12 rounded-md border px-6 text-base"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end">
        <div className="mb-4">
          <a
            href="forgot.html"
            className="text-sm font-medium text-blue-500 border-b border-transparent hover:border-blue-500 transition-all "
          >
            Forgot Password ?
          </a>
        </div>
      </div>
      <Button className="w-full">Sign In</Button>
    </form>
  );
}

export default LoginForm;
