import { useEffect, useState } from "react";
import { request } from "../services/api";
import getProductImage from "../utils/productImages";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await request("/order/my-orders");
      setOrders(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
        Loading orders...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
        Orders
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
        My Orders
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        View your order history and check the current status of each order.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border-2 border-[#18244A] bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C8A437] bg-[#F6F7FB] text-2xl">
            📦
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#18244A]">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Your placed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl border-2 border-[#18244A] bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b-2 border-[#18244A] bg-[#F6F7FB] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
                    Order Number
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#18244A]">
                    {order._id}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] ${getStatusClasses(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
                  Ordered Items
                </p>

                <div className="mt-4 space-y-4">
                  {order.items.map((item) => {
                    const productImage = getProductImage(
                      item.product?.name
                    );

                    return (
                      <div
                        key={item._id}
                        className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-[#C8A437] bg-[#F6F7FB]">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={item.product?.name}
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                              Item
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-[#18244A]">
                            {item.product?.name}
                          </p>

                          <p className="mt-1 text-sm text-zinc-500">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#18244A]">
                            ₱
                            {Number(
                              item.product?.price * item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t-2 border-[#18244A] pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
                    Shipping Address
                  </p>

                  <p className="mt-2 font-medium text-[#18244A]">
                    {order.shippingAddress}
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F6F7FB] p-4">
                    <span className="font-semibold text-[#18244A]">
                      Order Total
                    </span>

                    <span className="text-xl font-bold text-[#18244A]">
                      ₱{Number(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrdersPage;