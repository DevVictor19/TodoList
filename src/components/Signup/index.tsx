import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextInterface } from "../../interfaces/authContextInterface";
import { Link } from "react-router-dom";
import { Card } from "../Card";

export function Signup() {
  const { signup } = useAuth() as AuthContextInterface;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    if (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined ||
      passwordConfirm === "" ||
      passwordConfirm === undefined
    ) {
      setError("Do not leave empty fields");
      return;
    }

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
    } catch (e) {
      setError("Failed to create an account");
      console.log(e);
    }

    setLoading(false);
  };

  const handleChange = () => {
    if (error === "") return;

    setError("");
  };

  return (
    <Card styleClasses="mt-10 p-5">
      <h1 className="text-lg font-bold">Sign up and start using it!</h1>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mt-6"
        onChange={handleChange}
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-0.5 text-slate-900 dark:text-white">
          <label htmlFor="email">E-mail</label>
          <input
            className="h-10 rounded-[5px] p-2 bg-transparent border-2 border-[#494C6B] 
            outline-none"
            type="text"
            id="email"
            ref={emailRef}
          />
        </div>
        <div className="grid gap-0.5 text-slate-900 dark:text-white">
          <label htmlFor="password">Password</label>
          <input
            className="h-10 rounded-[5px] p-2 bg-transparent border-2 border-[#494C6B] 
            outline-none"
            type="password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <div className="grid gap-0.5 text-slate-900 dark:text-white">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            className="h-10 rounded-[5px] p-2 bg-transparent border-2 border-[#494C6B] 
            outline-none"
            type="password"
            id="confirm-password"
            ref={passwordConfirmRef}
          />
        </div>
        <div>
          <button
            className="h-12 bg-[#4c23d3] hover:bg-[#724deb] active:bg-[#724deb] 
            w-32 rounded text-white font-bold mt-2"
            type="submit"
            disabled={loading}
          >
            Sign up
          </button>
          <Link to="/" className="block underline mt-6">
            Click here to login with your account
          </Link>
        </div>
      </form>
    </Card>
  );
}
