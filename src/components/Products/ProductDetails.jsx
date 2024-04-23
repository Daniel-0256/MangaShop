import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const { isLoggedIn, user } = useAuth();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:44344/api/Products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const updateQuantity = (cartId, quantity) => {
    fetch(`https://localhost:44344/api/Carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Quantity: quantity }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Quantità aggiornata nel carrello");
        } else {
          alert("Errore nell'aggiornamento della quantità");
        }
      })
      .catch((error) =>
        console.error("Errore nell'aggiornare la quantità:", error)
      );
  };

  const addToCart = (productId) => {
    fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`)
      .then((response) => response.json())
      .then((cartItems) => {
        const existingItem = cartItems.find(
          (item) => item.ProductId === productId
        );

        if (existingItem) {
          updateQuantity(existingItem.CartId, existingItem.Quantity + 1);
        } else {
          const newItem = {
            UserId: user.UserId,
            ProductId: productId,
            Quantity: 1,
          };

          fetch("https://localhost:44344/api/Carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          })
            .then((response) => {
              if (response.ok) {
                alert("Prodotto aggiunto al carrello");
              }
            })
            .catch((error) =>
              console.error("Errore nell'aggiungere al carrello:", error)
            );
        }
      });
  };

  const addToFavorites = () => {
    if (user && product) {
      fetch("https://localhost:44344/api/Favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: user.UserId,
          ProductId: product.ProductId,
        }),
      }).then((response) => {
        if (response.ok) {
          alert("Prodotto aggiunto ai preferiti");
        }
      });
    }
  };

  return (
    <div>
      {product ? (
        <div className="container-ProductDetails">
          <div className="img-delete-edit">
            <img
              src={product.Image}
              alt={product.NameProduct}
            />
            {isLoggedIn && user.Role === "Admin" && (
            <div className="container-link-ProductDetails">
              <Link
                to={`/product/edit/${productId}`}
                className="link edit-button"
              >
                Modifica
              </Link>
              <Link to={`/product/delete/${productId}`}
              className="link delete-button">Elimina</Link>
            </div>
          )}
          </div>
          <div className="info-container-ProductDetails">
          <h2 className="h2-productDetails">{product.NameProduct}</h2>
            <p>
              <strong>Descrizione:</strong> {product.Description}
            </p>
            <p>
              {" "}
              <strong>Prezzo:</strong>
              {product.Price.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
            <p>
              <strong>Disponibilità:</strong>{" "}
              {product.Availability ? "Disponibile" : "Non Disponibile"}
            </p>
            <p>
              <strong>Categoria:</strong> {product.Category}
            </p>

            <div className="container-btn-ProductDetails">
              {isLoggedIn && (
                <>
                  <button
                    className="btn-ProductDetails"
                    onClick={() => addToCart(productId)}
                  >
                    Aggiungi al Carrello
                  </button>
                  <button
                    className="btn-ProductDetails"
                    onClick={() => addToFavorites(product.ProductId)}
                  >
                    Aggiungi ai Preferiti
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default ProductDetails;
