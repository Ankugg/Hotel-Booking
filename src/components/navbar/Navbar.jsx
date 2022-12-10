import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">KittuBooking</span>
        </Link>
        <div className="navItems">
          <Link to="Register">
            <button className="navButton">Register</button>
          </Link>
          <Link to="Login">
            <button className="navButton">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
