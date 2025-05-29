import axios from "axios";
import { useState } from "react";

export default function useOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "https://backendlvtn.onrender.com/orders/my-orders",
        config
      );

      const sortedData = data.orders.sort(
        (a, b) => new Date(b.order_date) - new Date(a.order_date)
      );

      setOrders(sortedData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchOrders, orders, loading, setOrders };
}
