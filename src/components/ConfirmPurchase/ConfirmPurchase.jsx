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
      .then((response) => response.json())
      .then((data) => setDetails(data.filter(detail => detail.IsActive)))
      .catch((error) =>
        console.error("Errore nel recupero dei dettagli utente:", error)
      );
  };  

  const fetchCartItems = () => {
    fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`)
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) =>
        console.error(
          "Errore nel caricamento degli articoli del carrello:",
          error
        )
      );
  };

  const handleDelete = (userDetailsId) => {
    // Trova il dettaglio utente corrente dallo stato
    const userDetails = details.find(detail => detail.UserDetailsId === userDetailsId);
    if (!userDetails) {
        console.error("User details not found.");
        return;
    }

    // Prepara il corpo della richiesta con tutti i campi necessari
    const updatedDetails = { ...userDetails, IsActive: false };

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDetails)
    };

    fetch(`https://localhost:44344/api/UserDetails/${userDetailsId}`, requestOptions)
        .then(response => {
            if (response.ok) {
                setDetails(details.map(detail =>
                    detail.UserDetailsId === userDetailsId ? { ...detail, IsActive: false } : detail
                ));
                alert("Dettagli disattivati con successo.");
            } else {
                throw new Error("Failed to deactivate the user details.");
            }
        })
        .catch(error => {
            console.error("Errore nella disattivazione dei dettagli utente:", error);
            alert(error.message);
        });
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
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        createOrderDetails(order);
        return clearCart();
      })
      .then(() => {
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Errore nel completare l'acquisto:", error);
        alert("C'è stato un errore nel completamento dell'acquisto.");
      });
  };

  const createOrderDetails = (order) => {
    cartItems.forEach((item) => {
      fetch(`https://localhost:44344/api/OrderDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OrderId: order.OrderId,
          ProductId: item.ProductId,
          UserId: user.UserId,
          UserDetailsId: selectedAddressId,
          Quantity: item.Quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("OrderDetail creato con successo:", data);
        })
        .catch((error) =>
          console.error("Errore nel salvare i dettagli dell'ordine:", error)
        );
    });
  };

  const clearCart = () => {
    return fetch(`https://localhost:44344/api/Carts/User/${user.UserId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to clear cart");
        }
      })
      .catch((error) =>
        console.error("Errore nello svuotamento del carrello:", error)
      );
  };

  return (
    <div>
      <h1>Conferma l'ordine</h1>
      <h2>Prezzo Totale del Carrello: €{cartTotal.toFixed(2)}</h2>
      <h2>Costi di Spedizione: €{shippingCost.toFixed(2)}</h2>
      <h2>
        Totale Comprensivo di Spedizione: €{totalIncludingShipping.toFixed(2)}
      </h2>
      {details.filter(detail => detail.IsActive).length > 0 ? (
        details.filter(detail => detail.IsActive).map((detail) => (
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
      <button
        onClick={() => navigate("/add-user-details", { state: { cartTotal } })}
      >
        Aggiungi Nuovo Indirizzo
      </button>
      <button onClick={handleProceedToPurchase}>Procedi all'Acquisto</button>
      <button onClick={() => navigate(-1)}>Torna Indietro</button>
    </div>
  );

};

export default ConfirmPurchase;
