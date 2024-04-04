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
            <p><strong>Disponibilità:</strong>{product.Availability ? 'Disponibile' : 'Non Disponibile'}</p>

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
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default ProductDetails;
