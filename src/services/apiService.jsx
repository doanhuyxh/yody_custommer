import axios from "../utils/axios";

export const postLogin = async (username, password) => {
  return axios.post("api/auth/login", {
    user_name: username,
    password,
  });
};

export const postRegister = async ({ email, fullName, password }) => {
  return axios.post("api/auth/register", {
    email,
    full_name: fullName,
    password,
  });
};

export const refreshAccessToken = async (refreshToken) => {
  return axios.post(
    "api/auth/refresh",
    {},
    {
      headers: {
        "Refresh-Token": refreshToken,
      },
    }
  );
};

export const updateProfile = async ({ id, field, value }) => {
  return axios.post("api/auth/userInfo/update", {
    id,
    field,
    value,
  });
};

export const getUserInfo = async (id) => {
  return axios.get(`api/auth/userInfo/${id}`);
};

export const getProductsByCategoryId = async (categoryId) => {
  return axios.get(`api/category/product/${categoryId}?page=1&pageSize=8`);
};

export const getCategories = async () => {
  return axios.get(`api/category`);
};
export const getProducts = async (page, pageSize) => {
  return axios.get(`api/product?page=${page}&pageSize=${pageSize}`);
};

export const getImgUrlBySlug = async (slug) => {
  return axios.get(`api/product/image/slug/${slug}`);
};

export const getProductById = async (productId) => {
  return axios.get(`api/product/${productId}`);
};

export const getSize = async () => {
  return axios.get("api/size");
};

export const getColor = async () => {
  return axios.get("api/color");
};

export const postAddToCart = async (product_variant_id) => {
  return await axios.post("/api/shopping_card/add_to_card", {
    product_variant_id,
  });
};
export const updateProductInCart = async ({ id, quantity }) => {
  return await axios.post("/api/shopping_card/update_card", {
    id,
    quantity,
  });
};
export const deleteProductInCart = async (id) => {
  return await axios.get(`api/shopping_card/delete?id=${id}`);
};

export const getShoppingCart = async () => {
  return await axios.get("api/shopping_card");
};

export const getVariant = async (id) => {
  return await axios.get(`api/product/variant/${id}`);
};

export const searchProduct = async (term) => {
  return await axios.get(`api/product/search/${term}?page=1&pageSize=5`);
};
