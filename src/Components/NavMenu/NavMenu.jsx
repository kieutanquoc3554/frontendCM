import { Link } from "react-router-dom";
import DropdownMenuNavBar from "../DropdownMenuNavBar/DropdownMenuNavBar";

const NavMenu = ({ setMenu, menuRef }) => {
  return (
    <ul ref={menuRef} className="nav-menu">
      <li className="nav-item">
        <Link to="/">Đặc sản Cà Mau</Link>
        <DropdownMenuNavBar setMenu={setMenu} />
      </li>
      <li>
        <Link to="/cuisine">Tin Ẩm thực</Link>
      </li>
      <li>
        <Link to="/travel">Tin Du Lịch</Link>
      </li>
      <li>
        <Link to="/tutorial">Hướng dẫn mua hàng</Link>
      </li>
      <li>
        <Link to="/help">Liên hệ</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
