
import Button from "./Button";
import getProductImage from "../utils/productImages";

const ProductCard = ({ product, index }) => {
  const productImage = product.imageUrl || getProductImage(product.name);

  return (
    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
        {productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center border-2 border-zinc-300 bg-zinc-100 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Item
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {product.category?.name || "Product"}{" "}
        {String(index + 1).padStart(2, "0")}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-zinc-900">
        {product.name}
      </h3>

      <p className="mt-2 text-base font-bold text-zinc-900">
        ₱{Number(product.price).toLocaleString()}
      </p>

      <p className="mt-2 text-xs font-medium text-zinc-500">
        Stock: {product.stockQuantity}
      </p>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {product.description.length > 120
          ? `${product.description.substring(0, 120)}...`
          : product.description}
      </p>

      <Button
        to={`/products/${product._id}`}
        className="mt-4"
      >
        View Product
      </Button>
    </article>
  );
};

export default ProductCard;
