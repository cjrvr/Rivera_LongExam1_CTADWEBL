import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/nubdexchange_logo.png";
import {
  getCurrentUser,
  logout,
} from "../services/authService";

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[#18244A] bg-[#18244A] text-white"
      : "border-transparent text-[#18244A] hover:border-[#C8A437] hover:bg-[#F3E9BF]",
  ].join(" ");

const NavBar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
    window.location.reload();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[#C8A437] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="BulldogEx"
            className="h-9 w-9 rounded-full border-2 border-[#18244A] bg-white object-contain"
          />

          <p className="text-xl font-bold text-[#18244A]">
            BulldogEx Shop
          </p>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            end
            className={navLinkClassName}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClassName}
          >
            About
          </NavLink>

          <NavLink
            to="/products"
            className={navLinkClassName}
          >
            Products
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/auth/signin"
                className={navLinkClassName}
              >
                Login
              </NavLink>

              <NavLink
                to="/auth/signup"
                className={navLinkClassName}
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user?.role === "customer" && (
            <>
              <NavLink
                to="/cart"
                className={navLinkClassName}
              >
                Cart
              </NavLink>

              <NavLink
                to="/orders"
                className={navLinkClassName}
              >
                Orders
              </NavLink>

              <NavLink
                to="/profile"
                className={navLinkClassName}
              >
                Profile
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/admin"
                className={navLinkClassName}
              >
                Admin
              </NavLink>

              <NavLink
                to="/admin/products"
                className={navLinkClassName}
              >
                Products
              </NavLink>

              <NavLink
                to="/admin/reviews"
                className={navLinkClassName}
              >
                Reviews
              </NavLink>

              <NavLink
                to="/admin/users"
                className={navLinkClassName}
              >
                Users
              </NavLink>
            </>
          )}

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border-2 border-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#18244A] transition hover:border-[#C8A437] hover:bg-[#F3E9BF]"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;