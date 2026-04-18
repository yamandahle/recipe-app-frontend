import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isLogged = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🍳 Recipe App
      </Link>
      <div className="navbar-links">
        {isLogged ? (
          <>
            <Link to="/profile" className="profile-avatar">
              {isLogged ? "👤" : ""}
            </Link>
            <Link to="/">Home</Link>
            <Link to="/add-recipe">Add Recipe</Link>

            <Link to="/favorites">❤️ Favorites</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
