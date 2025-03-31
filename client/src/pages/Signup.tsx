import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useSignup from "@/hooks/useSignup";

import { motion } from "motion/react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signup(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex flex-col justify-center items-center mx-auto min-w-96 shadow-2xl"
    >
      <div className="w-full p-6 rounded-lg shadow-md bg-muted bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h2 className="text-4xl text-gray-700 font-semibold mb-4 text-center">
          Signup
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block  text-sm mb-1 sm:mb-2">
              Full name
            </label>
            <Input
              type="text"
              id="fullname"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 border border-muted-foreground rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block  text-sm mb-1 sm:mb-2">
              Username
            </label>
            <Input
              type="text"
              id="username"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full p-2 border border-muted-foreground rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block  text-sm mb-1 sm:mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full p-2 border border-primary rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block  text-sm mb-1 sm:mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirm-password"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full p-2 border border-primary rounded-md"
            />
          </div>
          <div className="mb-4 w-[120px]">
            <label htmlFor="fullname" className="block  text-sm mb-1 sm:mb-2">
              Gender
            </label>
            <select
              className="w-full p-2 border border-primary rounded-md"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              defaultValue={""}
            >
              <option value="">Select </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-muted-foreground  inline-block text-primary px-1 mb-1"
          >
            Already have an account?
          </Link>
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-primary-foreground text-gray-700  font-semibold hover:bg-muted-foreground/10 shadow-md transition-colors duration-300"
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
export default Signup;
