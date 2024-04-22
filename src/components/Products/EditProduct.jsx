import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./EditProduct.css"

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
    <div className="container-editProduct">
      <h1 className="h1-editProduct">Modifica Prodotto</h1>
      <form className="form-editProduct" onSubmit={handleSubmit}>
        <label className="label-editProduct">
          Nome Prodotto:
          <input
            type="text"
            name="NameProduct"
            className="input-editProduct"
            value={product.NameProduct}
            onChange={handleInputChange}
          />
        </label>
        <label className="label-editProduct">
          Immagine URL:
          <input
            type="text"
            name="Image"
            className="input-editProduct"
            value={product.Image}
            onChange={handleInputChange}
          />
        </label>
        <label className="label-editProduct">
          Descrizione:
          <textarea
            name="Description"
            className="textarea-editProduct"
            value={product.Description}
            onChange={handleInputChange}
          />
        </label>
        <label className="label-editProduct">
          Prezzo:
          <input
            type="number"
            name="Price"
            className="input-editProduct"
            value={product.Price}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-editProduct">
          Disponibilità:
          <input
            type="checkbox"
            name="Availability"
            className="checkbox-editProduct"
            checked={product.Availability}
            onChange={handleInputChange}
          />
        </label>
        <label className="label-editProduct">
          Categoria:
          <select
            name="Category"
            className="input-editProduct"
            value={product.Category}
            onChange={handleInputChange}
          >
            <option value="">Seleziona una categoria</option>
            <option value="Manga">Manga</option>
            <option value="Action Figure">Action Figure</option>
            <option value="Funko Pop">Funko Pop</option>
          </select>
        </label>
        <button className="btn-salvaModifiche" type="submit">Salva Modifiche</button>
      </form>
      <button className="btn-indietroModifiche" onClick={() => navigate(-1)}>Torna Indietro</button>
    </div>
  );
};

export default EditProduct;
