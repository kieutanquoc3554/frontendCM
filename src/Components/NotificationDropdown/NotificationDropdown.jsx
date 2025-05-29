import NotificationActions from "../NotificationActions/NotificationActions";
import NotificationList from "../NotificationList/NotificationList";
import empty_notification from "../Assets/empty_notification.webp";

const NotificationDropdown = ({
  notifications,
  deleteMode,
  markAllAsUnread,
  markAllAsRead,
  deleteAllNotifications,
  setDeleteMode,
  deleteNotification,
  markNotificationAsRead,
  markNotificationAsUnread,
  getStatusText,
  isNotificationOpen,
}) => {
  return (
    <div
      className={`notification-dropdown ${isNotificationOpen ? "active" : ""}`}
    >
      <NotificationActions
        markAllAsUnread={markAllAsUnread}
        markAllAsRead={markAllAsRead}
        deleteAllNotifications={deleteAllNotifications}
        setDeleteMode={setDeleteMode}
      />
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <NotificationList
              notification={notification}
              deleteMode={deleteMode}
              deleteNotification={deleteNotification}
              markNotificationAsRead={markNotificationAsRead}
              getStatusText={getStatusText}
              markNotificationAsUnread={markNotificationAsUnread}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-notification">
          <img src={empty_notification} alt="Không có thông báo" />
          <p>Không có thông báo nào</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
