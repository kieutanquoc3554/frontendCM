import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const LogoNavbar = () => {
  return (
    <div className="nav-logo">
      <img className="logo" src={logo} alt="" />
      <Link to="/">
        <p>CAMAUNIQUE</p>
      </Link>
    </div>
  );
};

export default LogoNavbar;
