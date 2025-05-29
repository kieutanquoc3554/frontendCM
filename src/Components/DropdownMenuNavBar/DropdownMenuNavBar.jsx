import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const DropdownMenuNavBar = ({ setMenu }) => {
  return (
    <ul className="dropdown-menu">
      <li
        onClick={() => setMenu("crab")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        <Link to="/crab">
          <Icon icon="noto-v1:crab" />
          Cua Cà Mau
        </Link>
      </li>
      <li
        onClick={() => setMenu("driedFish")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        <Link to="/driedFish">
          <Icon icon="fluent-emoji:fish" />
          Khô cá Cà Mau
        </Link>
      </li>
      <li
        onClick={() => setMenu("driedShrimp")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        {" "}
        <Link to="/driedShrimp">
          <Icon icon="noto:shrimp" />
          Tôm khô
        </Link>
      </li>
      <li
        onClick={() => setMenu("prawnCrackers")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        <Link to="/prawnCrackers">
          <Icon icon="noto-v1:shrimp" />
          Bánh phồng tôm
        </Link>
      </li>
      <li
        onClick={() => setMenu("honey")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        <Link to="/honey">
          <Icon icon="noto:honey-pot" />
          Mật ong rừng Cà Mau
        </Link>
      </li>
      <li
        onClick={() => setMenu("candy")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        <Link to="/candy">
          <Icon icon="fluent-emoji-flat:candy" />
          Bánh Kẹo
        </Link>
      </li>
      <li
        onClick={() => setMenu("fermentedFishSauce")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        {" "}
        <Link to="/fermentedFishSauce">
          <Icon icon="game-icons:canned-fish" />
          Mắm
        </Link>
      </li>
      <li
        onClick={() => setMenu("more")}
        style={{ display: "flex", alignItems: "center", gap: "3%" }}
      >
        {" "}
        <Link to="/more">
          <Icon icon="iconoir:more-horiz-circle" />
          Món ngon khác
        </Link>
      </li>
    </ul>
  );
};

export default DropdownMenuNavBar;
