import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useCartHandler({ setCartItems, cartItems }) {
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [type, setType] = useState("");

  const addToCart = (itemId, selectedWeight, price, discount) => {
    const isLogin = localStorage.getItem("tk");
    if (isLogin) {
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        if (!newCartItems[itemId]) {
          newCartItems[itemId] = [];
        }
        const existingItem = newCartItems[itemId]?.find(
          (item) =>
            item.weight === selectedWeight.weight &&
            item.unit === selectedWeight.unit
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          newCartItems[itemId].push({
            productId: itemId,
            weight: selectedWeight.weight,
            unit: selectedWeight.unit,
            discount: discount,
            price: price,
            quantity: 1,
          });
        }

        axios.post(
          "https://backendlvtn.onrender.com/carts/updateCart",
          {
            cartItems: Object.values(newCartItems).flat(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tk")}`,
            },
          }
        );

        toast.success("Thêm vào giỏ hàng thành công!");
        return newCartItems;
      });
    } else {
      toast.error("Bạn chưa đăng nhập!");
    }
  };

  const removeFromCart = (itemId, selectedWeight) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      const existingItemIndex = newCartItems[itemId].findIndex(
        (item) =>
          item.weight === selectedWeight.weight &&
          item.unit === selectedWeight.unit
      );

      if (existingItemIndex !== -1) {
        newCartItems[itemId].splice(existingItemIndex, 1);
        if (newCartItems[itemId].length === 0) {
          delete newCartItems[itemId];
        }
      }
      axios.post(
        "https://backendlvtn.onrender.com/carts/updateCart",
        {
          cartItems: Object.values(newCartItems).flat(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      toast.info("Xoá khỏi giỏ hàng thành công!");
      return newCartItems;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      cartItems[itemId].forEach((item) => {
        totalAmount += item.price * item.quantity;
      });
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      // eslint-disable-next-line no-loop-func
      cartItems[itemId].forEach((item) => {
        totalItem += item.quantity;
      });
    }
    return totalItem;
  };

  const updateCartQuantity = (itemId, selectedWeight, newQuantity) => {
    if (newQuantity <= 0) return;
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      const existingItem = newCartItems[itemId].find(
        (item) =>
          item.weight === selectedWeight.weight &&
          item.unit === selectedWeight.unit
      );

      if (existingItem) {
        existingItem.quantity = newQuantity;
      }
      axios
        .post(
          "https://backendlvtn.onrender.com/carts/updateCart",
          {
            cartItems: Object.values(newCartItems).flat(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tk")}`,
            },
          }
        )
        .then(() => {
          console.log("Giỏ hàng đã được cập nhật trong CSDL");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật giỏ hàng:", error);
        });

      return newCartItems;
    });
  };

  const applyDiscount = (discountValue, discountType, maxDiscountAmount) => {
    const totalAmount = getTotalCartAmount();
    let finalDiscount = 0;

    if (discountType === "percentage") {
      const halfOfAmount = totalAmount * (discountValue / 100);
      console.log("half: ", halfOfAmount);

      if (halfOfAmount > maxDiscountAmount) {
        finalDiscount = maxDiscountAmount;
        setType("percentage");
      } else {
        finalDiscount = totalAmount * (discountValue / 100);
        setType("percentage");
      }
    } else if (discountType === "fixed") {
      finalDiscount = discountValue;
      setType("fixed");
    }

    const newDiscountedAmount = totalAmount - finalDiscount;
    setDiscountedAmount(newDiscountedAmount);
    setDiscountAmount(discountValue);
  };

  return {
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
    updateCartQuantity,
    applyDiscount,
    discountedAmount,
    discountAmount,
    type,
  };
}
