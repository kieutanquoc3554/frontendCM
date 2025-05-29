import axios from "axios";
import { useState } from "react";

export default function useCart({ isLogin }) {
  const [cartItems, setCartItems] = useState({});

  const getCart = async () => {
    const response = await axios.get(
      `https://backendlvtn.onrender.com/carts/getCart`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tk")}`,
        },
      }
    );
    const itemsObject = {};
    response.data.items.forEach((item) => {
      if (!itemsObject[item.productId]) {
        itemsObject[item.productId] = [];
      }
      itemsObject[item.productId].push(item);
    });
    setCartItems(itemsObject);
  };

  return { cartItems, setCartItems, getCart };
}
