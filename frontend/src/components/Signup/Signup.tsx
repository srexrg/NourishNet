import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useSignup from "@/hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {loading,signup} = useSignup()

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 from-primary/40 to-primary/20">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-green-0">
        <h1 className="text-3xl font-bold text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
               Username
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <Input
              type="password"
              placeholder=""
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="w-full md:h-1/3"
            >
               {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign-Up"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
