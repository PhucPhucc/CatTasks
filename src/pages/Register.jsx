import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { Lock, Mail, Sprout, User } from "lucide-react";
import Input from "../components/ui/Input";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "sonner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (formdata) => {
    try {
      setLoading(true);
      const email = formdata.get("email");
      const password = formdata.get("password");
      const confirm = formdata.get("confirm-password");
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (password !== confirm) {
        toast.error("Password and Confirm password is not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          userCredential.user;
        }
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed");
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
              Join Bloom Tasks
            </p>
            <p>Start cultivating your productivity</p>
          </div>
        </header>

        <form
          action={handleRegister}
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
          <div className="mb-6">
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              label="Confirm Password"
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-muted-foreground font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
