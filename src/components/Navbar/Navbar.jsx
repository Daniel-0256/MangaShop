import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import useAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="" className="navbar-logo">
          MangaShop
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          {isLoggedIn && user?.Role === "Admin" && (
            <>
            <li className="nav-item">
              <Link to="/addproduct" className="nav-links">
                Aggiungi Prodotto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adminorders" className="nav-links">
                Ordini Utenti
              </Link>
            </li>
          </>
          )}
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fas fa-user"></i>{" "}
                {isLoggedIn && user
                  ? `Ciao, ${user.Name + " " + user.Surname}`
                  : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isLoggedIn ? (
                  <>
                    <Dropdown.Item as={Link} to="/favorites">
                      Preferiti
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      I Tuoi Ordini
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">
                      Register
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Link to="/cart">Carrello</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
