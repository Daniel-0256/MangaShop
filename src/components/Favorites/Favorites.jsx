import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { useNavigate, Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://localhost:44344/api/Favorites/User/${user.UserId}`)
        .then((response) => {
          if (!response.ok) {
            setFavorites([]);
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setFavorites(data);
          }
        })
        .catch((error) => {
          console.error("Errore nel caricamento dei preferiti:", error);
        });
    }
  }, [user]);

  const removeFromFavorites = (favoriteId) => {
    fetch(`https://localhost:44344/api/Favorites/${favoriteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFavorites(
            favorites.filter((fav) => fav.FavoriteId !== favoriteId)
          );
          alert("Prodotto rimosso dai preferiti");
        } else {
          alert("Si è verificato un errore");
        }
      })
      .catch((error) => {
        console.error(
          "Errore nella rimozione del prodotto dai preferiti:",
          error
        );
        alert("Si è verificato un errore");
      });
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">I tuoi preferiti</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <div key={fav.FavoriteId} className="favorite-item">
              <Link
                to={`/product/details/${fav.Products.ProductId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="favorite-image"
                  src={fav.Products.Image}
                  alt={fav.Products.NameProduct}
                />
                <h2 className="favorite-name">{fav.Products.NameProduct}</h2>
              </Link>
              <button
                className="action-button"
                onClick={() => removeFromFavorites(fav.FavoriteId)}
              >
                Rimuovi dai Preferiti
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p>Non hai prodotti nei preferiti.</p>
        </>
      )}
    </div>
  );
  

};

export default Favorites;
