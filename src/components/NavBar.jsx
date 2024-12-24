import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import searchIcon from "../assets/search.png";
import reloadIcon from "../assets/reload.png";

function NavBar({ onNavbarSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onNavbarSearch) {
            onNavbarSearch(searchQuery);
        }
        setSearchQuery("");
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleReloadClick = () => {
        window.location.reload();
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-brand">
                <Link to="/" className="brand-link">SuFlix</Link>
            </div>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder={searchQuery ? "" : "Search..."}
                    className="search-input"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    <img src={searchIcon} alt="Search" className="icon" />
                </button>
            </form>
            <span className="reload-icon" onClick={handleReloadClick}>
                <img src={reloadIcon} alt="Reload" className="icon" />
            </span>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;
