/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { postAddToCart, getShoppingCart } from "../services/apiService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCartCount = async () => {
      const data = await getShoppingCart();
      if (data.code === 20001) {
        setCartCount(data.data.length);
      }
    };

    getCartCount();
  }, []);

  const addToCart = async (variantId) => {
    const addData = await postAddToCart(variantId);
    if (addData.code === 20001) {
      const cartData = await getShoppingCart();
      if (cartData.code === 20001) {
        setCartCount(cartData.data.length);
      }
      return true;
    }
    return false;
  };

  const updateCartCountWhenDelete = (check) => {
    if (check) {
      setCartCount(cartCount - 1);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartCount, addToCart, updateCartCountWhenDelete }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
