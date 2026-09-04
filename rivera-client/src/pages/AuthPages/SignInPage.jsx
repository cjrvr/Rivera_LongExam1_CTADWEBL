import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import {
  login,
  saveSession,
} from "../../services/authService";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition placeholder:text-zinc-400 focus:border-[#C8A437]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      saveSession(data);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
          Bulldogs Exchange
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#18244A] sm:text-4xl">
          Log In
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Access your BulldogEx account to manage your cart,
          orders, reviews, and profile.
        </p>
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#18244A]"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#18244A]"
          >
            Password
          </label>

          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>

      <div className="mt-8 border-t border-[#C8A437]/40 pt-6 text-sm text-zinc-600">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#18244A] transition hover:text-[#C8A437]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;