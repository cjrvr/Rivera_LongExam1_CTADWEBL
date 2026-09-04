import { useEffect, useState } from "react";
import { request } from "../services/api";
import getProductImage from "../utils/productImages";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        usersResponse,
        productsResponse,
        ordersResponse,
        reviewsResponse,
      ] = await Promise.all([
        request("/user"),
        request("/product"),
        request("/order"),
        request("/review"),
      ]);

      setUsers(usersResponse.data || []);
      setProducts(productsResponse.data || []);
      setOrders(ordersResponse.data || []);
      setReviews(reviewsResponse.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const toggleUserStatus = async (user) => {
    try {
      setError("");
      setMessage("");

      await request(`/user/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({
          isActive: !user.isActive,
        }),
      });

      setMessage("User status updated successfully.");
      await loadAdminData();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateOrderStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      setError("");
      setMessage("");

      await request(`/order/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({
          orderStatus,
        }),
      });

      setMessage("Order status updated successfully.");
      await loadAdminData();
    } catch (error) {
      setError(error.message);
    }
  };

  const getStatusClasses = (status) => {
    if (status === "Ready for Claiming") {
      return "border-green-600 bg-green-50 text-green-700";
    }

    if (status === "Confirmed") {
      return "border-[#C8A437] bg-[#FFF8DD] text-[#806500]";
    }

    return "border-[#18244A] bg-[#F6F7FB] text-[#18244A]";
  };

  if (loading) {
    return (
      <div className="px-4 py-32 text-center text-zinc-500">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
        Administration
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Manage users, products, orders, and reviews from one dashboard.
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border-2 border-[#18244A] bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Users
          </p>

          <p className="mt-2 text-3xl font-bold text-[#18244A]">
            {users.length}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#18244A] bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Products
          </p>

          <p className="mt-2 text-3xl font-bold text-[#18244A]">
            {products.length}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#18244A] bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-[#18244A]">
            {orders.length}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#18244A] bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
            Reviews
          </p>

          <p className="mt-2 text-3xl font-bold text-[#18244A]">
            {reviews.length}
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          User Management
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#18244A]">
          Manage Users
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-[#18244A] bg-[#F6F7FB]">
                <th className="p-3 text-[#18244A]">
                  Username
                </th>

                <th className="p-3 text-[#18244A]">
                  Email
                </th>

                <th className="p-3 text-[#18244A]">
                  Role
                </th>

                <th className="p-3 text-[#18244A]">
                  Status
                </th>

                <th className="p-3 text-[#18244A]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-zinc-200"
                >
                  <td className="p-3">
                    {user.username || "-"}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3 capitalize">
                    {user.role || "-"}
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
                    <button
                      type="button"
                      onClick={() =>
                        toggleUserStatus(user)
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Catalog
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#18244A]">
          Products
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((product) => {
            const productImage = getProductImage(
              product.name
            );

            return (
              <div
                key={product._id}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-4"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-[#C8A437] bg-white">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.name}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      Item
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-[#18244A]">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    ₱{Number(product.price).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Stock: {product.stockQuantity}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#C8A437]">
                    {product.category?.name ||
                      "No category"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Order Management
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#18244A]">
          Orders
        </h2>

        <div className="mt-6 space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-[#18244A]">
                    Customer:{" "}
                    {order.user?.username ||
                      "Customer"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Total: ₱
                    {Number(
                      order.totalAmount
                    ).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Address: {order.shippingAddress}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] ${getStatusClasses(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order._id,
                      "Confirmed"
                    )
                  }
                  className="rounded-full border-2 border-[#18244A] bg-[#18244A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#243665]"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order._id,
                      "Ready for Claiming"
                    )
                  }
                  className="rounded-full border-2 border-[#C8A437] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#18244A] transition hover:bg-[#FFF8DD]"
                >
                  Ready for Claiming
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Customer Feedback
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#18244A]">
          Reviews
        </h2>

        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-[#18244A]">
                  {review.product?.name}
                </p>

                <span className="w-fit rounded-full border-2 border-[#C8A437] bg-white px-3 py-1 text-xs font-bold text-[#806500]">
                  {review.rating}/5
                </span>
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C8A437]">
                {review.user?.username ||
                  "Customer"}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-700">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminPage;