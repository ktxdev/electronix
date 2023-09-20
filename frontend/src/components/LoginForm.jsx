import { useState } from "react";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
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
