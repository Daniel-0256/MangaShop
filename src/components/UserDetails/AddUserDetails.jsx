import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const AddUserDetails = () => {
  const { user } = useAuth();
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;
  const [details, setDetails] = useState({
    Address: "",
    ZipCode: "",
    City: "",
    Province: "",
    CardNumber: "",
    CardExpiryDate: "",
    CardCVV: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.UserId) {
      setDetails((d) => ({ ...d, UserId: user.UserId }));
    }
  }, [user]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.UserId) {
      alert("Utente non autenticato o ID utente non valido.");
      return;
    }

    fetch("https://localhost:44344/api/UserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) =>
        response.ok
          ? navigate("/user-details", { state: { cartTotal } })
          : response
              .text()
              .then((text) =>
                alert("Errore durante l'aggiunta dei dettagli: " + text)
              )
      )
      .catch((error) => console.error("Failed to add details:", error));
  };

  return (
    <div>
      <h1>Aggiungi Dettagli Utente</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Indirizzo:
          <input
            type="text"
            name="Address"
            value={details.Address}
            onChange={handleChange}
            required
            placeholder="Inserisci il tuo indirizzo completo"
          />
        </label>
        <label>
          CAP:
          <input
            type="text"
            name="ZipCode"
            value={details.ZipCode}
            onChange={handleChange}
            required
            pattern="\d{5}"
            title="Inserire un CAP valido (5 cifre)."
            placeholder="12345"
          />
        </label>
        <label>
          Città:
          <input
            type="text"
            name="City"
            value={details.City}
            onChange={handleChange}
            required
            placeholder="Città"
          />
        </label>
        <label>
          Provincia:
          <input
            type="text"
            name="Province"
            value={details.Province}
            onChange={handleChange}
            required
            placeholder="Provincia"
          />
        </label>
        <label>
          Numero di Carta:
          <input
            type="number"
            name="CardNumber"
            value={details.CardNumber}
            onChange={handleChange}
            required
            pattern="\d{16}"
            title="Inserire un numero di carta di credito valido (16 cifre)."
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label>
          Scadenza Carta:
          <input
            type="date"
            name="CardExpiryDate"
            value={details.CardExpiryDate}
            onChange={handleChange}
            required
            placeholder="MM/AAAA"
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="CardCVV"
            value={details.CardCVV}
            onChange={handleChange}
            required
            pattern="\d{3,4}"
            title="Inserire un CVV valido (3 o 4 cifre)."
            placeholder="123"
          />
        </label>
        <button type="submit">Aggiungi Dettagli</button>
      </form>
    </div>
  );
};

export default AddUserDetails;
