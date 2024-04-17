import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const ConfirmPurchase = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const cartTotal = location.state?.cartTotal || 0;
  const shippingCost = cartTotal < 50 ? 10 : 0;
  const totalIncludingShipping = cartTotal + shippingCost;

  useEffect(() => {
    if (user) {
      fetchUserDetails();
      fetchCartItems();
    }
  }, [user]);

  const fetchUserDetails = () => {
    fetch(`https://localhost:44344/api/UserDetails/User/${user.UserId}`)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error("Errore nel recupero dei dettagli utente:", error));
  };

  const fetchCartItems = () => {
    fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`)
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error("Errore nel caricamento degli articoli del carrello:", error));
  };

  const handleDelete = (userDetailsId) => {
    fetch(`https://localhost:44344/api/UserDetails/${userDetailsId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (response.ok) {
        setDetails(details.filter(detail => detail.UserDetailsId !== userDetailsId));
        alert("Dettagli eliminati con successo.");
      } else {
        throw new Error("Failed to delete the user details.");
      }
    })
    .catch(error => console.error("Errore nell'eliminazione dei dettagli utente:", error));
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleProceedToPurchase = () => {
    if (!selectedAddressId) {
      alert("Seleziona un indirizzo prima di procedere.");
      return;
    }
    handleCompletePurchase();
  };

  const handleCompletePurchase = () => {
    fetch(`https://localhost:44344/api/Orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserId: user.UserId,
        OrderDate: new Date().toISOString(),
        Status: "Ordinato",
        TotalPrice: totalIncludingShipping,
      })
    })
    .then(response => response.json())
    .then(order => {
      createOrderDetails(order);
      return clearCart();
    })
    .then(() => {
      navigate("/orders");
    })
    .catch(error => {
      console.error("Errore nel completare l'acquisto:", error);
      alert("C'è stato un errore nel completamento dell'acquisto.");
    });
  };

  const createOrderDetails = (order) => {
    cartItems.forEach(item => {
      fetch(`https://localhost:44344/api/OrderDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OrderId: order.OrderId,
          ProductId: item.ProductId,
          UserId: user.UserId,
          UserDetailsId: selectedAddressId,
          Quantity: item.Quantity,
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("OrderDetail creato con successo:", data);
      })
      .catch(error => console.error("Errore nel salvare i dettagli dell'ordine:", error));
    });
  };

  const clearCart = () => {
    return fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
    })
    .catch(error => console.error("Errore nello svuotamento del carrello:", error));
  };

  return (
    <div>
      <h1>Dettagli Utente</h1>
      <h2>Prezzo Totale del Carrello: €{cartTotal.toFixed(2)}</h2>
      <h2>Costi di Spedizione: €{shippingCost.toFixed(2)}</h2>
      <h2>Totale Comprensivo di Spedizione: €{totalIncludingShipping.toFixed(2)}</h2>
      {details.length > 0 ? (
        details.map(detail => (
          <div key={detail.UserDetailsId}>
            <input
              type="checkbox"
              checked={selectedAddressId === detail.UserDetailsId}
              onChange={() => handleSelectAddress(detail.UserDetailsId)}
            />
            <p>Indirizzo: {detail.Address}</p>
            <p>CAP: {detail.ZipCode}</p>
            <p>Città: {detail.City}</p>
            <p>Provincia: {detail.Province}</p>
            <p>Numero di Carta: {detail.CardNumber}</p>
            <p>Scadenza Carta: {detail.CardExpiryDate}</p>
            <button onClick={() => handleDelete(detail.UserDetailsId)}>
              Elimina
            </button>
          </div>
        ))
      ) : (
        <p>Nessun dettaglio disponibile.</p>
      )}
      <button onClick={() => navigate("/add-user-details", { state: { cartTotal } })}>Aggiungi Nuovo Indirizzo</button>
      <button onClick={handleProceedToPurchase}>Procedi all'Acquisto</button>
    </div>
  );
};

export default ConfirmPurchase;
