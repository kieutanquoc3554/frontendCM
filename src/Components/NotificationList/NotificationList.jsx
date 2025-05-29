import { Icon } from "@iconify/react/dist/iconify.js";

const NotificationList = ({
  notification,
  deleteMode,
  deleteNotification,
  markNotificationAsRead,
  getStatusText,
  markNotificationAsUnread,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {deleteMode && (
        <Icon
          fontSize="28px"
          icon="ep:remove-filled"
          onClick={() => deleteNotification(notification._id)}
          style={{
            cursor: "pointer",
            marginRight: "8px",
            color: "red",
          }}
        />
      )}
      <li
        key={notification._id}
        style={{
          fontWeight: notification.read ? "normal" : "bold",
          cursor: "pointer",
        }}
        onClick={() => markNotificationAsRead(notification._id)}
      >
        <span dangerouslySetInnerHTML={getStatusText(notification.message)} />
      </li>
      {notification.read && (
        <button
          className="read"
          onClick={() => markNotificationAsUnread(notification._id)}
          aria-label="Mark as unread"
          title="Đánh dấu là chưa đọc"
          style={{ marginLeft: "8px", cursor: "pointer" }}
        >
          <Icon icon="ion:mail-unread-outline" width="20" color="#4CAF50" />
        </button>
      )}
    </div>
  );
};

export default NotificationList;
