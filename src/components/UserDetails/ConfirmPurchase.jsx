import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const ConfirmPurchase = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Prendi il totalPrice dallo stato passato
  const cartTotal = location.state?.cartTotal || 0; // Default a 0 se non definito
  const shippingCost = cartTotal < 50 ? 10 : 0;
  const totalIncludingShipping = cartTotal + shippingCost;

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = () => {
    fetch(`https://localhost:44344/api/UserDetails/User/${user.UserId}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) =>
        console.error("Errore nel recupero dei dettagli utente:", error)
      );
  };

  const handleDelete = (userDetailsId) => {
    if (user) {
      fetch(`https://localhost:44344/api/UserDetails/${userDetailsId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            setDetails(
              details.filter((detail) => detail.UserDetailsId !== userDetailsId)
            );
            alert("Dettagli eliminati con successo.");
          } else {
            throw new Error("Failed to delete the user details.");
          }
        })
        .catch((error) => {
          console.error("Errore nell'eliminazione dei dettagli utente:", error);
          alert("Errore nell'eliminazione dei dettagli.");
        });
    }
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleProceedToPurchase = () => {
    if (!selectedAddressId) {
      alert("Seleziona un indirizzo prima di procedere.");
      return;
    }
    const selectedAddress = details.find(
      (detail) => detail.UserDetailsId === selectedAddressId
    );
    navigate("/", { state: { selectedAddress } });
  };

  return (
    <div>
      <h1>Dettagli Utente</h1>
      <h2>Prezzo Totale del Carrello: €{cartTotal.toFixed(2)}</h2>
      <h2>Costi di Spedizione: €{shippingCost.toFixed(2)}</h2>
      <h2>
        Totale Comprensivo di Spedizione: €{totalIncludingShipping.toFixed(2)}
      </h2>
      {details.length > 0 ? (
        details.map((detail) => (
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
        onClick={() =>
          navigate("/add-user-details", {
            state: { cartTotal: location.state?.cartTotal },
          })
        }
      >
        Aggiungi Nuovo Indirizzo
      </button>
      <button onClick={handleProceedToPurchase}>Procedi all'Acquisto</button>
    </div>
  );
};

export default ConfirmPurchase;
