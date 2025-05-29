import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useNavbarHandler({ searchQuery }) {
  const navigate = useNavigate();
  const menuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  const dropDown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("tk");
    localStorage.removeItem("lfl");
    window.location.reload();
  };

  return {
    handleSearch,
    dropDown_toggle,
    toggleMenu,
    toggleNotifications,
    menuRef,
    isMenuOpen,
    isNotificationOpen,
    handleLogout,
  };
}
