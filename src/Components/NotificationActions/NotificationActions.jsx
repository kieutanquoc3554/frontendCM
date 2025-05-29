import { Icon } from "@iconify/react/dist/iconify.js";

const NotificationActions = ({
  markAllAsUnread,
  markAllAsRead,
  deleteAllNotifications,
  setDeleteMode,
}) => {
  return (
    <div className="notification-actions">
      <button
        onClick={markAllAsUnread}
        aria-label="Mark all as read"
        title="Đánh dấu tất cả là chưa đọc"
      >
        <Icon icon="ion:mail-unread-outline" width="24" color="#4CAF50" />{" "}
      </button>
      <button
        onClick={markAllAsRead}
        aria-label="Mark all as read"
        title="Đánh dấu tất cả là đã đọc"
      >
        <Icon icon="fluent-mdl2:read" width="24" color="#4CAF50" />{" "}
      </button>
      <button
        onClick={() => setDeleteMode((prev) => !prev)}
        aria-label="Toggle delete mode"
        title="Xoá thông báo"
      >
        <Icon icon="mdi:trash-can-outline" width="24" color="#FF9800" />{" "}
      </button>
      <button
        onClick={deleteAllNotifications}
        aria-label="Delete all notifications"
        title="Xoá tất cả thông báo"
      >
        <Icon icon="mdi:delete-forever" width="24" color="#F44336" />{" "}
      </button>
    </div>
  );
};

export default NotificationActions;
