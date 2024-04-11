import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [product, setProduct] = useState({
    NameProduct: "",
    Image: "",
    Description: "",
    Price: 0,
    Availability: 1,
    Category: "",
  });

  useEffect(() => {
    fetch(`https://localhost:44344/api/Products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!isLoggedIn || user.Role !== "Admin") {
    navigate("/");
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://localhost:44344/api/Products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) =>
        console.error("Errore nella modifica del prodotto:", error)
      );
  };

  return (
    <div>
      <h1>Modifica Prodotto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Prodotto:
          <input
            type="text"
            name="NameProduct"
            value={product.NameProduct}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Immagine URL:
          <input
            type="text"
            name="Image"
            value={product.Image}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descrizione:
          <textarea
            name="Description"
            value={product.Description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Prezzo:
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Disponibilità:
          <input
            type="checkbox"
            name="Availability"
            checked={product.Availability}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Categoria:
          <select
            name="Category"
            value={product.Category}
            onChange={handleInputChange}
          >
            <option value="">Seleziona una categoria</option>
            <option value="Manga">Manga</option>
            <option value="Action Figure">Action Figure</option>
            <option value="Funko Pop">Funko Pop</option>
          </select>
        </label>
        <button type="submit">Salva Modifiche</button>
        <Link to="/">Annulla</Link>
      </form>
    </div>
  );
};

export default EditProduct;
