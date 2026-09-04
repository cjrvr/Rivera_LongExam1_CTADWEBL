import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { register } from "../../services/authService";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition placeholder:text-zinc-400 focus:border-[#C8A437]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(formData);

      setSuccess("Account created successfully.");

      setTimeout(() => {
        navigate("/auth/signin");
      }, 1000);
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
          Sign Up
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Create your BulldogEx customer account and start shopping.
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

        {success && (
          <div className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-[#18244A]"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            className={inputClasses}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-[#18244A]"
          >
            Email
          </label>

          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-[#18244A]"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="09123456789"
            className={inputClasses}
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-[#18244A]"
          >
            Password
          </label>

          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Enter password"
            autoComplete="new-password"
            className={inputClasses}
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <p className="mt-2 text-xs text-zinc-500">
            Minimum of 6 characters.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 border-t border-[#C8A437]/40 pt-6 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#18244A] transition hover:text-[#C8A437]"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;