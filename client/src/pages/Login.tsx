import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login(form);
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
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <Input
              type="text"
              id="email"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full p-2 border border-muted-foreground rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border border-primary rounded-md"
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm font-semibold hover:underline hover:text-muted-foreground  inline-block text-blue-800 px-1 mb-1"
          >
            New here?
          </Link>
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-primary-foreground text-gray-700  font-semibold py-2 rounded-md hover:bg-muted-foreground/10 shadow-md transition-colors duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
