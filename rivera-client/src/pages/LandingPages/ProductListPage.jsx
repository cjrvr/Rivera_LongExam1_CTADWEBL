import { useEffect, useState } from "react";

import Button from "../../components/Button.jsx";
import ProductList from "../../components/ProductList.jsx";
import { getProducts } from "../../services/productService.js";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        search,
        category,
      });

      setProducts(response.data || []);

      if (!search && !category) {
        const uniqueCategories = [];

        (response.data || []).forEach((product) => {
          if (
            product.category &&
            !uniqueCategories.some(
              (item) =>
                item._id === product.category._id
            )
          ) {
            uniqueCategories.push(product.category);
          }
        });

        setCategories(uniqueCategories);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    await loadProducts();
  };

  const handleCategoryChange = async (event) => {
    const value = event.target.value;

    setCategory(value);

    try {
      setLoading(true);

      const response = await getProducts({
        search,
        category: value,
      });

      setProducts(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setSearch("");
    setCategory("");
    setError("");

    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Products
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Shop campus essentials
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Browse products available from Bulldogs Exchange.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Product Catalog
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Available Products
          </h2>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-6 grid gap-3 md:grid-cols-[1fr_240px_auto_auto]"
        >
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="rounded-xl border-2 border-zinc-900 bg-white px-4 py-3 text-sm outline-none"
          />

          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-xl border-2 border-zinc-900 bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-semibold text-zinc-900"
          >
            Clear
          </button>
        </form>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="py-10 text-center text-zinc-500">
            Loading products...
          </p>
        ) : (
          <ProductList products={products} />
        )}
      </section>
    </div>
  );
};

export default ProductListPage;