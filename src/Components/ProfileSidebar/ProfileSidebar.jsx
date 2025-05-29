import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Icon width={30} icon="solar:user-bold-duotone" />
          <Link to="/profile/information">Thông tin cá nhân</Link>
        </li>
        <li
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Icon width={30} icon="solar:delivery-bold-duotone" />
          <Link to="/profile/orders">Thông tin giao hàng</Link>
        </li>
        <li
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Icon width={30} icon="solar:eye-line-duotone" />
          <Link to="/profile/viewed">Sản phẩm đã xem</Link>
        </li>
        <li
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Icon width={30} icon="solar:logout-3-bold-duotone" />
          <Link style={{ color: "red" }} to="/profile/delivery">
            Đăng xuất
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
