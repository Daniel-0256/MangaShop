import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./DeleteProduct.css";

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
    <div className="confirmation-container">
      {product ? (
        <div>
          <h2 className="confirmation-title">
            Sei sicuro di voler eliminare il prodotto "{product.NameProduct}"?
          </h2>
          <div className="product-details">
            <img src={product.Image} alt={product.NameProduct} />
          </div>
          <button
            className="button-delete delete-button"
            onClick={handleDelete}
          >
            Conferma Eliminazione
          </button>
          <button
            className="button-delete back-button"
            onClick={() => navigate(-1)}
          >
            Torna Indietro
          </button>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default DeleteProduct;
