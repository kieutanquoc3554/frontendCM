import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const MenuHamburgerNavbar = ({ toggleMenu, isMenuOpen, handleLogout }) => {
  return (
    <div className="user-info">
      <Icon
        className="hamburger-icon"
        onClick={toggleMenu}
        icon="mdi:menu"
        fontSize="30px"
      />
      {isMenuOpen && (
        <div className="hamburger-menu">
          <ul>
            <li>
              <Link to="/profile/information">Thông tin cá nhân</Link>
            </li>
            <li>
              <Link to="/profile/orders">Quản lý đơn hàng</Link>
            </li>
            <li onClick={handleLogout}>
              <Link style={{ color: "red", fontWeight: 700 }} to="/">
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuHamburgerNavbar;
