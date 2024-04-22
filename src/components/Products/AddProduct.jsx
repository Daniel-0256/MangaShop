import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    nameProduct: "",
    image: "",
    description: "",
    price: "",
    availability: 1,
    category: "",
  });

  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || user.Role !== "Admin") {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
    };

    const response = await fetch("https://localhost:44344/api/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedProduct),
    });

    if (response.ok) {
      setProduct({
        nameProduct: "",
        image: "",
        description: "",
        price: "",
        availability: 1,
        category: "",
      });
      alert("Prodotto aggiunto con successo!");
    } else {
      alert("Errore nell'aggiunta del prodotto.");
    }
  };

  return (
    <div className="container-addProduct">
      <h1 className="h1-addproduct">Aggiungi Prodotto</h1>
      <form className="form-addproduct" onSubmit={handleSubmit}>
        <div>
          <label className="label-addproduct">Nome Prodotto:</label>
          <input
            type="text"
            name="nameProduct"
            className="input-addProduct"
            value={product.nameProduct}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label-addproduct">Immagine (URL):</label>
          <input
            type="text"
            name="image"
            className="input-addProduct"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label-addproduct">Descrizione:</label>
          <textarea
            name="description"
            className="textarea-addProduct"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label-addproduct">Prezzo:</label>
          <input
            type="number"
            name="price"
            className="input-addProduct"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label-addproduct">Disponibilità:</label>
          <input
            type="checkbox"
            name="availability"
            className="checkbox-addProduct"
            checked={product.availability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label-addproduct">Categoria:</label>
          <select
            name="category"
            className="input-addProduct"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona una categoria</option>
            <option value="Manga">Manga</option>
            <option value="Action Figure">Action Figure</option>
            <option value="Funko Pop">Funko Pop</option>
          </select>
        </div>
        <button className="btn-aggiungiProdotto" type="submit">Aggiungi Prodotto</button>
        <button className="btn-indietroProdotto" onClick={() => navigate(-1)}>Torna Indietro</button>
      </form>
    </div>
  );
};

export default AddProduct;
