import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Manga");
  const { nameProduct: encodedNameProduct } = useParams();
  const nameProduct = decodeURIComponent(encodedNameProduct);

  useEffect(() => {
    const url = `https://localhost:44344/api/Products?nameProduct=${encodeURIComponent(
      nameProduct
    )}`;

    // Utilizza fetch per ottenere i dati dall'API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.Category === category
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
      });
  }, [nameProduct, category]);

  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <h2>Prodotti per {nameProduct}</h2>
      <div>
        <button onClick={() => handleChangeCategory("Manga")}>Manga</button>
        <button onClick={() => handleChangeCategory("Action Figure")}>
          Action Figure
        </button>
        <button onClick={() => handleChangeCategory("Funko Pop")}>
          Funko Pop
        </button>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.ProductId} className="product-card">
            <img src={product.Image} alt={product.NameProduct} />
            <h5>{product.NameProduct}</h5>
            <p>
              {product.Price.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
