import { useEffect, useState } from "react";
import { request } from "../services/api";
import getProductImage from "../utils/productImages";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await request("/cart");
      setCart(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      setError("");
      setMessage("");

      await request(`/cart/${productId}`, {
        method: "DELETE",
      });

      setMessage("Product removed from cart.");
      await loadCart();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      setError("");
      setMessage("");

      if (!shippingAddress.trim()) {
        setError("Shipping address is required.");
        return;
      }

      const response = await request("/order", {
        method: "POST",
        body: JSON.stringify({
          shippingAddress,
        }),
      });

      setMessage(
        `Order created successfully. Status: ${response.data.orderStatus}`
      );

      setShippingAddress("");
      await loadCart();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-32 text-center text-zinc-500">
        Loading cart...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
        Shopping Cart
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
        My Cart
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Review your selected products before placing your order.
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

      {!cart || cart.items.length === 0 ? (
        <div className="mt-8 rounded-3xl border-2 border-[#18244A] bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C8A437] bg-[#F6F7FB] text-2xl">
            🛒
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#18244A]">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Add products from the BulldogEx catalog to start your order.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {cart.items.map((item) => {
              const productImage = getProductImage(
                item.product?.name
              );

              return (
                <div
                  key={item._id}
                  className="flex flex-col gap-5 rounded-3xl border-2 border-[#18244A] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#C8A437] bg-[#F6F7FB]">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={item.product?.name}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                          Item
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
                        Cart Item
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-[#18244A]">
                        {item.product?.name}
                      </h2>

                      <p className="mt-2 text-sm text-zinc-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 font-semibold text-[#18244A]">
                        ₱
                        {Number(
                          item.product?.price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.product?._id)
                    }
                    className="rounded-full border-2 border-red-500 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border-2 border-[#18244A] bg-[#F6F7FB] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8A437]">
              Order Summary
            </p>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-lg font-semibold text-[#18244A]">
                Total
              </span>

              <span className="text-2xl font-bold text-[#18244A]">
                ₱{Number(cart.totalPrice).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8A437]">
              Checkout
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#18244A]">
              Order Information
            </h2>

            <label className="mt-5 block text-sm font-medium text-[#18244A]">
              Shipping Address
            </label>

            <input
              type="text"
              value={shippingAddress}
              onChange={(event) =>
                setShippingAddress(event.target.value)
              }
              placeholder="Enter shipping address"
              className="mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#C8A437]"
            />

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 w-full rounded-xl border-2 border-[#18244A] bg-[#18244A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243665]"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;