import axios from "axios";
import { useState } from "react";

export default function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://backendlvtn.onrender.com/users/notification",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      const sortedNotifications = response.data.notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Lỗi khi lấy thông báo:", error);
    }
  };

  return { notifications, fetchNotifications, setNotifications };
}
