import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

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
    <div>
      <h2>Aggiungi Prodotto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Prodotto:</label>
          <input
            type="text"
            name="nameProduct"
            value={product.nameProduct}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Immagine (URL):</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrizione:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prezzo:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Disponibilità:</label>
          <input
            type="checkbox"
            name="availability"
            checked={product.availability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
            name="category"
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
        <button type="submit">Aggiungi Prodotto</button>
        <button onClick={() => navigate(-1)}>Torna Indietro</button>
      </form>
    </div>
  );
};

export default AddProduct;