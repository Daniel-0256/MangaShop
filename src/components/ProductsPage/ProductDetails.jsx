import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const ProductDetails = () => {
  const { productId } = useParams();
  const { isLoggedIn, user } = useAuth();
  const [product, setProduct] = useState(null);

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
    .then(response => {
      if (response.ok) {
        alert("Quantità aggiornata nel carrello");
      } else {
        alert("Errore nell'aggiornamento della quantità");
      }
    })
    .catch(error => console.error("Errore nell'aggiornare la quantità:", error));
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
        <div>
          <h1>Dettagli del Prodotto</h1>
          <div>
            <h2>{product.NameProduct}</h2>
            <img
              src={product.Image}
              alt={product.NameProduct}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <p>
              <strong>Descrizione:</strong> {product.Description}
            </p>
            <p>
              <strong>Prezzo:</strong> €{product.Price}
            </p>
            <p>
              <strong>Disponibilità:</strong>
              {product.Availability ? "Disponibile" : "Non Disponibile"}
            </p>

            <p>
              <strong>Categoria:</strong> {product.Category}
            </p>
            {isLoggedIn && user.Role === "Admin" && (
              <div>
                <Link
                  to={`/product/edit/${productId}`}
                  style={{ marginRight: 10 }}
                >
                  Modifica
                </Link>
                <Link to={`/product/delete/${productId}`}>Elimina</Link>
              </div>
            )}
            {isLoggedIn && (
              <>
                <button onClick={() => addToCart(productId)}>
                  Aggiungi al Carrello
                </button>
                <button onClick={() => addToFavorites(product.ProductId)}>
                  Aggiungi ai Preferiti
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default ProductDetails;
