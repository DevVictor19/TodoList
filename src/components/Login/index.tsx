import { useRef, useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Card } from "../Card";
import { toast } from "react-toastify";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    ) {
      setError("Do not leave empty fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      toast.info(`Logged as ${email}`);
    } catch (e) {
      setError("Failed to Log in");
      toast.error("Invalid email or password");
      console.log(e);
    }

    setLoading(false);
  };
  return (
    <Card styleClasses="mt-10 p-5">
      <h1 className="text-lg font-bold">Log In with your account</h1>
      <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
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
        <div>
          <button
            className="h-12 bg-[#4c23d3] hover:bg-[#724deb] active:bg-[#724deb] 
            w-32 rounded text-white font-bold mt-2"
            type="submit"
            disabled={loading}
          >
            Log In
          </button>
          <Link to="signup" className="block underline mt-6">
            Click here to create an account
          </Link>
        </div>
      </form>
    </Card>
  );
}
