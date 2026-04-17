import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const isLogged = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">🍳 Recipe App</Link>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {isLogged ? (
                    <>
                        <Link to="/add-recipe">Add Recipe</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;