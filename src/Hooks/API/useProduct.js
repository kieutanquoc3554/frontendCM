import axios from "axios";
import { useEffect, useState } from "react";

export default function useProduct(setIsLogin) {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    const response = await axios.get(
      "https://backendlvtn.onrender.com/products/allProduct"
    );
    setProducts(response.data.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { products };
}
