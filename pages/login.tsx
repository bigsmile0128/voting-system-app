// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/vote");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center p-4">
      <div>
        <h1 className="text-xl font-bold mb-2">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 text-black outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-2 text-black outline-none"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
          Sign In
        </button>
        <a href="/signup" className="underline p-2">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;
