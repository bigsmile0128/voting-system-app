// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push("/vote");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSignup} className="bg-blue-500 text-white p-2">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
