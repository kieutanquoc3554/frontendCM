import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import useNotificationHandler from "../../Hooks/Handler/useNotificationHandler";
import useNavbarHandler from "../../Hooks/Handler/useNavbarHandler";
import MenuHamburgerNavbar from "../MenuHamburgerNavbar/MenuHamburgerNavbar";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

const CartNavbar = ({
  setSearchQuery,
  searchQuery,
  isLogin,
  notifications,
}) => {
  const { getTotalCartItem } = useContext(ShopContext);
  const [deleteMode, setDeleteMode] = useState(false);
  const {
    markNotificationAsRead,
    markAllAsUnread,
    markAllAsRead,
    markNotificationAsUnread,
    deleteNotification,
    deleteAllNotifications,
    getStatusText,
    unreadCount,
  } = useNotificationHandler({ notifications });
  const {
    handleSearch,
    toggleMenu,
    toggleNotifications,
    isMenuOpen,
    isNotificationOpen,
    handleLogout,
  } = useNavbarHandler({ searchQuery });
  return (
    <div className="nav-login-cart">
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
      {isLogin ? (
        <MenuHamburgerNavbar
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          handleLogout={handleLogout}
        />
      ) : (
        <Link to="/login">
          <button>Đăng nhập</button>
        </Link>
      )}
      <Link to="/cart">
        <Icon fontSize="40px" icon="solar:cart-3-bold-duotone" />
      </Link>
      <div className="nav-cart-count">{getTotalCartItem()}</div>
      <div className="notification-icon" onClick={toggleNotifications}>
        <Icon fontSize="40px" icon="solar:bell-bold-duotone" />
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </div>
      {isNotificationOpen && (
        <NotificationDropdown
          notifications={notifications}
          deleteMode={deleteMode}
          markAllAsUnread={markAllAsUnread}
          markAllAsRead={markAllAsRead}
          deleteAllNotifications={deleteAllNotifications}
          setDeleteMode={setDeleteMode}
          deleteNotification={deleteNotification}
          markNotificationAsRead={markNotificationAsRead}
          markNotificationAsUnread={markNotificationAsUnread}
          getStatusText={getStatusText}
          isNotificationOpen={isNotificationOpen}
        />
      )}
    </div>
  );
};

export default CartNavbar;
