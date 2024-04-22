import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./AddUserDetails.css";

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
    IsActive: true,
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
          ? navigate("/confirm-purchase", { state: { cartTotal } })
          : response
              .text()
              .then((text) =>
                alert("Errore durante l'aggiunta dei dettagli: " + text)
              )
      )
      .catch((error) => console.error("Failed to add details:", error));
  };

  return (
    <div className="form-container-addUserDetails">
      <h1 className="form-title-addUserDetails">Aggiungi Dettagli Utente</h1>
      <form onSubmit={handleSubmit}>
        <label className="label-addUserDetails">
          Indirizzo:
          <input
            type="text"
            name="Address"
            className="input-addUserDetails"
            value={details.Address}
            onChange={handleChange}
            required
            placeholder="Inserisci il tuo indirizzo completo"
          />
        </label>
        <label className="label-addUserDetails">
          CAP:
          <input
            type="text"
            name="ZipCode"
            className="input-addUserDetails"
            value={details.ZipCode}
            onChange={handleChange}
            required
            pattern="\d{5}"
            title="Inserire un CAP valido (5 cifre)."
            placeholder="12345"
          />
        </label>
        <label className="label-addUserDetails">
          Città:
          <input
            type="text"
            name="City"
            className="input-addUserDetails"
            value={details.City}
            onChange={handleChange}
            required
            placeholder="Città"
          />
        </label>
        <label className="label-addUserDetails">
          Provincia:
          <input
            type="text"
            name="Province"
            className="input-addUserDetails"
            value={details.Province}
            onChange={handleChange}
            required
            placeholder="Provincia"
          />
        </label>
        <label className="label-addUserDetails">
          Numero di Carta:
          <input
            type="number"
            name="CardNumber"
            className="input-addUserDetails"
            value={details.CardNumber}
            onChange={handleChange}
            required
            pattern="\d{16}"
            title="Inserire un numero di carta di credito valido (16 cifre)."
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label className="label-addUserDetails">
          Scadenza Carta:
          <input
            type="date"
            name="CardExpiryDate"
            className="input-addUserDetails"
            value={details.CardExpiryDate}
            onChange={handleChange}
            required
            placeholder="MM/AAAA"
          />
        </label>
        <label className="label-addUserDetails">
          CVV:
          <input
            type="text"
            name="CardCVV"
            className="input-addUserDetails"
            value={details.CardCVV}
            onChange={handleChange}
            required
            pattern="\d{3,4}"
            title="Inserire un CVV valido (3 o 4 cifre)."
            placeholder="123"
          />
        </label>
        <button type="submit" className="submit-button-addUserDetails">Aggiungi Dettagli</button>
        <button className="btn-indietroUserDetails" onClick={() => navigate(-1)}>Torna Indietro</button>
      </form>
    </div>
  );  
};

export default AddUserDetails;
