import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Icon } from "@iconify/react";
import { ShopContext } from "../../Context/ShopContext";
import notificationSound from "../Assets/notification.mp3";
import useNotification from "../../Hooks/API/useNotification";
import useWebsocket from "../../Hooks/API/useWebsocket";
import useNavbarHandler from "../../Hooks/Handler/useNavbarHandler";
import NavMenu from "../NavMenu/NavMenu";
import LogoNavbar from "../LogoNavbar/LogoNavbar";
import CartNavbar from "../CartNavbar/CartNavbar";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { notifications, fetchNotifications, setNotifications } =
    useNotification();
  const { isLogin } = useContext(ShopContext);
  const [audio] = useState(new Audio(notificationSound));
  const [searchQuery, setSearchQuery] = useState("");
  const { connectWebsocket } = useWebsocket({
    audio,
    isLogin,
    setNotifications,
  });
  const { dropDown_toggle, menuRef } = useNavbarHandler({ searchQuery });

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  useEffect(() => {
    connectWebsocket();
  }, [isLogin, audio]);

  useEffect(() => {
    if (isLogin) {
      fetchNotifications();
    }
  }, [isLogin]);

  return (
    <div className="navbar">
      <LogoNavbar />
      <Icon
        className="nav-dropdown"
        onClick={dropDown_toggle}
        icon="mdi:expand-more"
      />
      <NavMenu setMenu={setMenu} menuRef={menuRef} />
      <CartNavbar
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        isLogin={isLogin}
        notifications={notifications}
      />
    </div>
  );
};

export default Navbar;
