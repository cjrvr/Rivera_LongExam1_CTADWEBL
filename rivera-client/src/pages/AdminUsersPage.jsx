import { useEffect, useState } from "react";
import { request } from "../services/api";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#C8A437]";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    isActive: true,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setError("");

      const response = await request("/user");
      setUsers(response.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingId(user._id);

    setFormData({
      username: user.username || "",
      email: user.email || "",
      phoneNumber:
        user.phoneNumber ||
        user.contactNumber ||
        "",
      role: user.role || "customer",
      isActive:
        user.isActive === undefined
          ? true
          : user.isActive,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      setError("");

      await request(`/user/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      setMessage("User updated successfully.");
      setEditingId(null);

      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
        role: "",
        isActive: true,
      });

      await loadUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
      role: "",
      isActive: true,
    });
  };

  const toggleStatus = async (user) => {
    try {
      setMessage("");
      setError("");

      await request(`/user/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({
          isActive:
            user.isActive === false
              ? true
              : false,
        }),
      });

      setMessage("User status updated successfully.");

      await loadUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
        Administration
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
        User Management
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        View accounts, edit user information, assign roles, and manage account status.
      </p>

      {message && (
        <div className="mt-6 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {editingId && (
        <section className="mt-8 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Edit Account
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#18244A]">
            Edit User
          </h2>

          <form
            onSubmit={handleUpdate}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Username
              </label>

              <input
                name="username"
                value={formData.username}
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
                value={formData.email}
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
                value={formData.phoneNumber}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="customer">
                  Customer
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#18244A]">
                Account Status
              </label>

              <select
                name="isActive"
                value={String(formData.isActive)}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="rounded-xl border-2 border-[#18244A] bg-[#18244A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243665]"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border-2 border-[#C8A437] bg-white px-5 py-3 text-sm font-semibold text-[#18244A] transition hover:bg-[#FFF8DD]"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="mt-8 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Accounts
        </p>

        <h2 className="mt-2 text-xl font-bold text-[#18244A]">
          Users
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-[#18244A] bg-[#F6F7FB]">
                <th className="p-3 text-[#18244A]">
                  Username
                </th>

                <th className="p-3 text-[#18244A]">
                  Email
                </th>

                <th className="p-3 text-[#18244A]">
                  Phone
                </th>

                <th className="p-3 text-[#18244A]">
                  Role
                </th>

                <th className="p-3 text-[#18244A]">
                  Status
                </th>

                <th className="p-3 text-[#18244A]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-zinc-200 transition hover:bg-[#F6F7FB]"
                >
                  <td className="p-3 font-medium text-[#18244A]">
                    {user.username || "-"}
                  </td>

                  <td className="p-3 text-zinc-600">
                    {user.email || "-"}
                  </td>

                  <td className="p-3 text-zinc-600">
                    {user.phoneNumber ||
                      user.contactNumber ||
                      "-"}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full border border-[#C8A437] bg-[#FFF8DD] px-3 py-1 text-xs font-semibold capitalize text-[#806500]">
                      {user.role || "-"}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isActive === false
                          ? "bg-red-50 text-red-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {user.isActive === false
                        ? "Inactive"
                        : "Active"}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(user)
                        }
                        className="rounded-full border-2 border-[#18244A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#18244A] transition hover:border-[#C8A437] hover:bg-[#FFF8DD]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(user)
                        }
                        className={`rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
                          user.isActive === false
                            ? "border-green-600 text-green-700 hover:bg-green-50"
                            : "border-red-500 text-red-600 hover:bg-red-50"
                        }`}
                      >
                        {user.isActive === false
                          ? "Activate"
                          : "Deactivate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminUsersPage;