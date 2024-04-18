import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const DeleteProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    fetch(`https://localhost:44344/api/Products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!isLoggedIn || user.Role !== "Admin") {
    navigate("/");
    return null;
  }

  const handleDelete = () => {
    fetch(`https://localhost:44344/api/Products/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) =>
        console.error("Errore nell'eliminazione del prodotto:", error)
      );
  };

  return (
    <div>
      {product ? (
        <div>
        <h2>Sei sicuro di voler eliminare il prodotto "{product.NameProduct}"?</h2>
        <div className="product-details">
          <img src={product.Image} alt={product.NameProduct} style={{ maxWidth: "100%", height: "auto" }} />
          <p><strong>Nome:</strong> {product.NameProduct}</p>
          <p><strong>Prezzo:</strong> €{product.Price.toLocaleString("it-IT", {
            style: "currency",
            currency: "EUR",
          })}</p>
        </div>
        <button onClick={handleDelete}>Conferma Eliminazione</button>
        <button onClick={() => navigate(-1)}>Torna Indietro</button>
      </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default DeleteProduct;
