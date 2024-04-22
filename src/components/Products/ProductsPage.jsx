import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <div className="container-titleProduct">
        <h2 className="h2-productpage">{nameProduct}</h2>
      </div>
      <div className="container-category">
        <button className="button-category" onClick={() => handleChangeCategory("Manga")}>Manga</button>
        <button className="button-category" onClick={() => handleChangeCategory("Action Figure")}>
          Action Figure
        </button>
        <button className="button-category" onClick={() => handleChangeCategory("Funko Pop")}>
          Funko Pop
        </button>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Link
            to={`/product/details/${product.ProductId}`}
            key={product.ProductId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="product-card">
              <img src={product.Image} alt={product.NameProduct} />
              <h5>{product.NameProduct}</h5>
              <p>
                {product.Price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
              <p>{product.Availability ? "Disponibile" : "Non Disponibile"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
