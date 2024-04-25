import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import useAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSearchClick = () => {
    navigate("/searchpage");
  };

  const showSearchBar = location.pathname !== "/searchpage";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-logo">
          <Dropdown>
            <Dropdown.Toggle className="icon" id="icon-menu">
              <i className="fa-solid fa-bars"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/">
                Home
              </Dropdown.Item>
              {isLoggedIn && user?.Role === "Admin" && (
                <>
                  <Dropdown.Item as={Link} to="/addproduct">
                    Aggiungi Prodotto
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/adminorders">
                    Ordini Utenti
                  </Dropdown.Item>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Dropdown.Item as={Link} to="/orders">
                    I Tuoi Ordini
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Link to="/" className="navbar-logo">MangaShop</Link>
        </div>
        <div className="iconSearch-container">
          <div>
            {showSearchBar && (
              <input
                type="text"
                placeholder="Cerca prodotti..."
                onClick={handleSearchClick}
                className="search-input"
              />
            )}
          </div>

          <div className="icon-container">
            <Dropdown>
              <Dropdown.Toggle className="icon">
                <i className="fas fa-user"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isLoggedIn ? (
                  <>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">
                      Accedi
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">
                      Registrati
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/favorites" className="icon">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <Link to="/cart" className="icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
