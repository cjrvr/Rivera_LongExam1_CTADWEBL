import { Outlet } from "react-router-dom";
import logo from "../assets/img/nubdexchange_logo.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#F6F7FB] text-[#18244A]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-[#C8A437] bg-[#18244A] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-[#C8A437] lg:p-16">
          <div className="flex h-64 w-64 items-center justify-center rounded-full border-4 border-[#C8A437] bg-white p-5 shadow-lg sm:h-72 sm:w-72">
            <img
              src={logo}
              alt="BulldogEx"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;