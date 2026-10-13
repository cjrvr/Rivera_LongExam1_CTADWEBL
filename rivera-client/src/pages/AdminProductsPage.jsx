import { useEffect, useState } from "react";

import { request } from "../services/api";
import getProductImage from "../utils/productImages";

const inputClasses =
  "mt-2 w-full rounded-xl border-2 border-[#18244A] bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#C8A437]";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
  });

  const loadProducts = async () => {
    try {
      setError("");

      const response = await request("/product");

      setProducts(response.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setError("");

    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageFile(null);
      setImagePreview("");
      event.target.value = "";
      setError("Only JPG, JPEG, PNG, and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageFile(null);
      setImagePreview("");
      event.target.value = "";
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      category: "",
    });

    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("stockQuantity", formData.stockQuantity);
      payload.append("category", formData.category);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      if (editingId) {
        await request(`/product/${editingId}`, {
          method: "PUT",
          body: payload,
        });

        setMessage("Product updated successfully.");
      } else {
        await request("/product", {
          method: "POST",
          body: payload,
        });

        setMessage("Product created successfully.");
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stockQuantity: product.stockQuantity || "",
      category: product.category?._id || "",
    });

    setImageFile(null);
    setImagePreview(
      product.imageUrl || getProductImage(product.name) || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A437]">
        Administration
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#18244A]">
        Product Management
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Create new products and update existing product information.
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
          Product Form
        </p>

        <h2 className="mt-2 text-xl font-bold text-[#18244A]">
          {editingId ? "Edit Product" : "Create Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          <div>
            <label className="text-sm font-medium text-[#18244A]">
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#18244A]">
              Price
            </label>

            <input
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#18244A]">
              Stock Quantity
            </label>

            <input
              name="stockQuantity"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#18244A]">
              Category ID
            </label>

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClasses}
              placeholder="MongoDB category ID"
              required
            />

            <p className="mt-2 text-xs text-zinc-500">
              Enter the existing category ID assigned to the product.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-[#18244A]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClasses} min-h-28 resize-none`}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-[#18244A]">
              Product Image
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className={inputClasses}
            />

            <p className="mt-2 text-xs text-zinc-500">
              JPG, JPEG, PNG, or WEBP only. Maximum size: 5 MB.
            </p>
          </div>

          {imagePreview && (
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium text-[#18244A]">
                Image Preview
              </p>

              <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#C8A437] bg-white">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-xl border-2 border-[#18244A] bg-[#18244A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243665]"
            >
              {editingId ? "Update Product" : "Create Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border-2 border-[#C8A437] bg-white px-5 py-3 text-sm font-semibold text-[#18244A] transition hover:bg-[#FFF8DD]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-10 rounded-3xl border-2 border-[#18244A] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A437]">
          Product Catalog
        </p>

        <h2 className="mt-2 text-xl font-bold text-[#18244A]">
          Existing Products
        </h2>

        <div className="mt-6 space-y-4">
          {products.map((product) => {
            const productImage =
              product.imageUrl || getProductImage(product.name);

            return (
              <div
                key={product._id}
                className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-[#F6F7FB] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#C8A437] bg-white">
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

                  <div>
                    <p className="font-bold text-[#18244A]">
                      {product.name}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#18244A]">
                      ₱{Number(product.price).toLocaleString()}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Stock: {product.stockQuantity}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#C8A437]">
                      {product.category?.name || "No category"}
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                      {product.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  className="shrink-0 rounded-full border-2 border-[#18244A] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#18244A] transition hover:border-[#C8A437] hover:bg-[#FFF8DD]"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AdminProductsPage;