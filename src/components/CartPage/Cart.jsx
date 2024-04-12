import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = () => {
    fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        calculateTotalPrice(data);
      });
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.Products.Price * item.Quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeItemFromCart(cartId);
    } else {
      fetch(`https://localhost:44344/api/Carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CartId: cartId, Quantity: newQuantity }),
      })
        .then((response) => {
          if (response.ok) {
            fetchCartItems();
          } else {
            alert("Errore nell'aggiornamento della quantità");
          }
        })
        .catch((error) => console.error("Failed to update quantity:", error));
    }
  };

  const removeItemFromCart = (cartId) => {
    fetch(`https://localhost:44344/api/Carts/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const updatedCartItems = cartItems.filter(
            (item) => item.CartId !== cartId
          );
          setCartItems(updatedCartItems);
          calculateTotalPrice(updatedCartItems);
          alert("Prodotto rimosso dal carrello");
        }
      })
      .catch((error) =>
        console.error(
          "Errore nella rimozione del prodotto dal carrello:",
          error
        )
      );
  };

  return (
    <div>
      <h1>Il Tuo Carrello</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.CartId}>
              <h2>{item.Products.NameProduct}</h2>
              <img
                src={item.Products.Image}
                alt={item.Products.NameProduct}
                style={{ maxWidth: "100px", height: "auto" }}
              />
              <p>Prezzo: €{item.Products.Price}</p>
              <p>
                Quantità:
                <button
                  onClick={() => updateQuantity(item.CartId, item.Quantity - 1)}
                >
                  -
                </button>
                {item.Quantity}
                <button
                  onClick={() => updateQuantity(item.CartId, item.Quantity + 1)}
                >
                  +
                </button>
              </p>
              <button onClick={() => removeItemFromCart(item.CartId)}>
                Rimuovi
              </button>
            </div>
          ))}
          <h3>Prezzo Totale: €{totalPrice.toFixed(2)}</h3>
          <button
            onClick={() =>
              navigate("/confirm-purchase", { state: { cartTotal: totalPrice } })
            }
          >
            Procedi all'Ordine
          </button>
        </div>
      ) : (
        <p>Il tuo carrello è vuoto.</p>
      )}
    </div>
  );
};

export default Cart;
