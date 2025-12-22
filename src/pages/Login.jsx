import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { Lock, Mail, Sprout } from "lucide-react";
import Input from "../components/ui/Input";
import { Link, useNavigate } from "react-router";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formdata) => {
    try {
      setLoading(true);
      const email = formdata.get("email");
      const password = formdata.get("password");

      if (!email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          return userCredential.user;
        }
      );

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid Email or password");
      }
      // toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="max-w-md h-screen mx-auto flex justify-center items-center flex-col gap-4">
        <header>
          <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="text-center font-display text-foreground">
            <p className="font-semibold text-2xl mt-4 mb-2">
              Welcome back
            </p>
            <p>Sign in to continue your journey</p>
          </div>
        </header>

        <form
          action={handleLogin}
          className="w-full px-5 py-8 rounded-2xl bg-card border border-border/50"
        >
          <div className="mb-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              icon={<Mail />}
              className={"pl-10"}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              icon={<Lock />}
              className={"pl-10"}
              placeholder="*****"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-linear-to-br from-primary to-accent text-center text-primary-foreground font-semibold w-full py-3 rounded-2xl cursor-pointer hover:opacity-95 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-muted-foreground font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
