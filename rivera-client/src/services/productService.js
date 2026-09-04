import { request } from "./api";

const getProducts = async ({
  search = "",
  category = "",
} = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }

  const query = params.toString();

  return request(
    `/product${query ? `?${query}` : ""}`
  );
};

const getProductById = async (id) => {
  return request(`/product/${id}`);
};

export {
  getProducts,
  getProductById,
};