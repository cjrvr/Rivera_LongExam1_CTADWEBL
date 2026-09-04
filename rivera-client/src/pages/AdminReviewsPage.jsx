import { useEffect, useState } from "react";
import { request } from "../services/api";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#C8A437]";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadReviews = async () => {
    try {
      setError("");

      const response = await request("/review");
      setReviews(response.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleEdit = (review) => {
    setEditingId(review._id);
    setRating(review.rating);
    setComment(review.comment);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setRating("");
    setComment("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      setError("");

      await request(`/review/${editingId}`, {
        method: "PUT",
        body: JSON.stringify({
          rating: Number(rating),
          comment,
        }),
      });

      setMessage("Review updated successfully.");
      handleCancel();
      await loadReviews();
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
        Review Management
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        View and update customer product reviews.
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

      <section className="mt-8 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Customer Feedback
        </p>

        <h2 className="mt-2 text-xl font-bold text-[#18244A]">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-8 text-center">
            <p className="text-zinc-500">
              No reviews found.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-5"
              >
                {editingId === review._id ? (
                  <form
                    onSubmit={handleUpdate}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-[#18244A]">
                        Rating
                      </label>

                      <select
                        value={rating}
                        onChange={(event) =>
                          setRating(event.target.value)
                        }
                        className={inputClasses}
                        required
                      >
                        <option value="5">
                          5 - Excellent
                        </option>
                        <option value="4">
                          4 - Very Good
                        </option>
                        <option value="3">
                          3 - Good
                        </option>
                        <option value="2">
                          2 - Fair
                        </option>
                        <option value="1">
                          1 - Poor
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#18244A]">
                        Comment
                      </label>

                      <textarea
                        value={comment}
                        onChange={(event) =>
                          setComment(event.target.value)
                        }
                        className={`${inputClasses} min-h-28 resize-none`}
                        required
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="rounded-xl border-2 border-[#18244A] bg-[#18244A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#243665]"
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-xl border-2 border-[#C8A437] bg-white px-4 py-2 text-sm font-semibold text-[#18244A] transition hover:bg-[#FFF8DD]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C8A437]">
                          Product
                        </p>

                        <p className="mt-1 font-bold text-[#18244A]">
                          {review.product?.name || "Product"}
                        </p>

                        <p className="mt-2 text-sm text-zinc-500">
                          Customer:{" "}
                          {review.user?.username || "Customer"}
                        </p>
                      </div>

                      <span className="w-fit rounded-full border-2 border-[#C8A437] bg-white px-4 py-2 text-xs font-bold text-[#806500]">
                        {review.rating}/5
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
                      <p className="text-sm leading-6 text-zinc-700">
                        {review.comment}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEdit(review)}
                      className="mt-4 rounded-full border-2 border-[#18244A] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#18244A] transition hover:border-[#C8A437] hover:bg-[#FFF8DD]"
                    >
                      Edit Review
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminReviewsPage;