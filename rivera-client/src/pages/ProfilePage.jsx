import { useEffect, useState } from "react";
import { request } from "../services/api";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#C8A437]";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const data = await request("/profile");

      setProfile({
        username: data.data.username || "",
        email: data.data.email || "",
        phoneNumber: data.data.phoneNumber || "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await request("/profile", {
        method: "PUT",
        body: JSON.stringify(profile),
      });

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          username: profile.username,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
        })
      );

      setMessage("Profile updated successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await request("/profile/change-password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password changed successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-zinc-600">
          Manage your personal information and account password.
        </p>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Profile Details
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#18244A]">
            Personal Information
          </h2>

          <form
            onSubmit={handleProfileUpdate}
            className="mt-6 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Username
              </label>

              <input
                name="username"
                value={profile.username}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Phone Number
              </label>

              <input
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl border-2 border-[#18244A] bg-[#18244A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#243665]"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Security
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#18244A]">
            Change Password
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Enter your current password before setting a new password.
          </p>

          <form
            onSubmit={handlePasswordChange}
            className="mt-6 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(event.target.value)
                }
                className={inputClasses}
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#18244A]">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                className={inputClasses}
                placeholder="Enter new password"
                minLength={6}
                required
              />

              <p className="mt-2 text-xs text-zinc-500">
                Minimum of 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl border-2 border-[#C8A437] bg-[#C8A437] px-4 py-3 text-sm font-semibold text-[#18244A] transition hover:bg-[#D7B94D]"
            >
              Change Password
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;