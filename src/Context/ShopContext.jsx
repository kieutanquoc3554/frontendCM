import { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import useProduct from "../Hooks/API/useProduct";
import useCart from "../Hooks/API/useCart";
import useCartHandler from "../Hooks/Handler/useCartHandler";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const { products } = useProduct(setIsLogin);
  const { cartItems, setCartItems, getCart } = useCart(isLogin);
  const {
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
    updateCartQuantity,
    applyDiscount,
    discountedAmount,
    discountAmount,
    type,
  } = useCartHandler({
    setCartItems,
    cartItems,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("tk");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      getCart();
    }
  }, [isLogin]);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const contextValue = {
    products,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    formatCurrency,
    getTotalCartItem,
    updateCartQuantity,
    isLogin,
    setIsLogin,
    searchQuery,
    setSearchQuery,
    applyDiscount,
    discountedAmount,
    discountAmount,
    type,
    code,
    setCode,
    user,
    setUser,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
