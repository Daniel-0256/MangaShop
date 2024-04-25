import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Link Utili</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Catalogo</a>
            </li>
            <li>
              <a href="#">Contattaci</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Informazioni</h3>
          <p>Via Manga 123, 00123 Tokyo, Giappone</p>
          <p>Email: info@mangashop.com</p>
        </div>
        <div className="footer-section">
          <h3>Social</h3>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MangaShop. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

export default Footer;
