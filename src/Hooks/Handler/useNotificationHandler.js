import axios from "axios";

export default function useNotificationHandler({
  notifications,
  setNotifications,
}) {
  const markNotificationAsRead = async (notiId) => {
    try {
      await axios.patch(
        `https://backendlvtn.onrender.com/users/notification/${notiId}`,
        {
          read: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notiId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo là đã đọc:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsUnread = async () => {
    try {
      await axios.patch(
        "https://backendlvtn.onrender.com/users/notifications/update/markAllUnread",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, read: false }))
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu tất cả thông báo là chưa đọc:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(
        "https://backendlvtn.onrender.com/users/notifications/markAllRead",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu tất cả thông báo là đã đọc:", error);
    }
  };

  const markNotificationAsUnread = async (id) => {
    try {
      await axios.patch(
        `https://backendlvtn.onrender.com/users/notification/update/unread/${id}`,
        {
          read: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: false }
            : notification
        )
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo là chưa đọc:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await axios.delete(
        `https://backendlvtn.onrender.com/users/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      console.log(response);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      await axios.delete(
        "https://backendlvtn.onrender.com/users/notifications/delete/deleteAll",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setNotifications([]);
    } catch (error) {
      console.error("Lỗi khi xóa tất cả thông báo:", error);
    }
  };

  const getStatusText = (message) => {
    const orderIdPattern = /([a-f0-9]{24})/;
    const highlightedMessage = message.replace(
      orderIdPattern,
      "<strong class='highlighted-order-id'>$1</strong>"
    );
    let formattedMessage = highlightedMessage
      .replace(
        "shipping",
        "<strong class='highlighted-status'>Đang vận chuyển</strong>"
      )
      .replace(
        "pending",
        "<strong class='highlighted-status'>Đang chờ xử lý</strong>"
      )
      .replace(
        "completed",
        "<strong class='highlighted-status'>Đã hoàn thành</strong>"
      )
      .replace(
        "cancelled",
        "<strong class='highlighted-status'>Đã hủy</strong>"
      );

    return { __html: formattedMessage };
  };

  return {
    markNotificationAsRead,
    markAllAsUnread,
    markAllAsRead,
    markNotificationAsUnread,
    deleteNotification,
    deleteAllNotifications,
    getStatusText,
    unreadCount,
  };
}
