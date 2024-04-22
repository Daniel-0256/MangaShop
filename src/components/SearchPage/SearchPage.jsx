import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const fetchSearchResults = () => {
      setLoading(true);
      setError(null);
      const query = encodeURIComponent(input);

      fetch(`https://localhost:44344/api/Products/AdvancedSearch?query=${query}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch products:", error);
          setError("Failed to fetch products. Please try again.");
          setLoading(false);
        });
    };
  
    const handleInputChange = (event) => {
      setInput(event.target.value);
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      navigate(`/searchpage?query=${input}`);
      fetchSearchResults();
    };
  
    return (
      <div className="search-container">
        <h1 className="search-title">Search Results</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="input-search"
            value={input}
            onChange={handleInputChange}
            placeholder="Search products or categories..."
          />
          <button type="submit" className="search-button">Cerca</button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="results-container">
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <Link to={`/product/details/${product.ProductId}`} key={product.ProductId} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-card">
                    <img src={product.Image} alt={product.NameProduct} className="product-image" />
                    <h5 className="product-name">{product.NameProduct}</h5>
                    <p className="product-price">
                      {product.Price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                    <p>{product.Availability ? 'Disponibile' : 'Non disponibile'}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">No results found.</p>
            )}
          </div>
        )}
      </div>
    );
    
};

export default SearchPage;
