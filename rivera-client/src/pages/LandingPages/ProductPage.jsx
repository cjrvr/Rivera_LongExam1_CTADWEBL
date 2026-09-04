import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button.jsx";
import { request } from "../../services/api.js";
import { getProductById } from "../../services/productService.js";
import getProductImage from "../../utils/productImages";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const productResponse = await getProductById(id);
      setProduct(productResponse.data);

      const reviewResponse = await request(
        `/review?product=${id}`
      );

      setReviews(reviewResponse.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setMessage("");
    setError("");

    if (!user) {
      setError("Please log in first.");
      return;
    }

    if (user.role !== "customer") {
      setError("Only customers can add products to cart.");
      return;
    }

    if (Number(quantity) < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (Number(quantity) > product.stockQuantity) {
      setError("Not enough stock available.");
      return;
    }

    try {
      await request("/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: Number(quantity),
        }),
      });

      setMessage("Product added to cart successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    setReviewMessage("");
    setError("");

    if (!user) {
      setError("Please log in first.");
      return;
    }

    if (user.role !== "customer") {
      setError("Only customers can create reviews.");
      return;
    }

    if (!reviewComment.trim()) {
      setError("Please enter a review comment.");
      return;
    }

    try {
      await request("/review", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          rating: Number(reviewRating),
          comment: reviewComment.trim(),
        }),
      });

      setReviewRating(5);
      setReviewComment("");
      setReviewMessage("Review submitted successfully.");

      const reviewResponse = await request(
        `/review?product=${id}`
      );

      setReviews(reviewResponse.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-32 text-center text-zinc-500">
        Loading product...
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="px-4 py-32 text-center">
        <p className="text-red-600">{error}</p>

        <Button to="/products" className="mt-6">
          Back to Products
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">
          Product not found
        </h1>

        <Button to="/products" className="mt-6">
          Back to Products
        </Button>
      </div>
    );
  }

  const productImage = getProductImage(product.name);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#18244A] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Button to="/products">
            Back to Products
          </Button>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
            {product.category?.name || "Product"}
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#18244A] sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-600">
            <span className="font-bold text-[#18244A]">
              ₱{Number(product.price).toLocaleString()}
            </span>

            <span>
              Stock: {product.stockQuantity}
            </span>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#18244A] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
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
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-[#18244A] bg-[#F6F7FB]">
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.name}
                  className="h-full w-full object-contain p-6"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center border-2 border-zinc-300 bg-white text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Item
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#18244A]">
                Product Details
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-700">
                {product.description}
              </p>

              <div className="mt-6">
                <label className="text-sm font-medium text-[#18244A]">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 outline-none focus:border-[#C8A437]"
                />
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="mt-5 w-full rounded-xl border-2 border-[#18244A] bg-[#18244A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243665] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.stockQuantity === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#18244A] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
            Reviews
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#18244A]">
            Customer Reviews
          </h2>

          {user?.role === "customer" && (
            <form
              onSubmit={handleReviewSubmit}
              className="mt-6 rounded-2xl border-2 border-[#18244A] bg-[#F6F7FB] p-5"
            >
              <h3 className="text-lg font-semibold text-[#18244A]">
                Write a Review
              </h3>

              {reviewMessage && (
                <div className="mt-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {reviewMessage}
                </div>
              )}

              <div className="mt-4">
                <label className="text-sm font-medium text-[#18244A]">
                  Rating
                </label>

                <select
                  value={reviewRating}
                  onChange={(event) =>
                    setReviewRating(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 outline-none focus:border-[#C8A437]"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-[#18244A]">
                  Comment
                </label>

                <textarea
                  value={reviewComment}
                  onChange={(event) =>
                    setReviewComment(event.target.value)
                  }
                  rows="4"
                  placeholder="Write your review here..."
                  className="mt-2 w-full resize-none rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 outline-none focus:border-[#C8A437]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-full border-2 border-[#18244A] bg-[#18244A] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#243665]"
              >
                Submit Review
              </button>
            </form>
          )}

          {reviews.length === 0 ? (
            <p className="mt-6 text-zinc-500">
              No reviews yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border-2 border-[#18244A] bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-[#18244A]">
                      {review.user?.username || "Customer"}
                    </p>

                    <p className="text-sm font-bold text-[#C8A437]">
                      {review.rating}/5
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductPage;