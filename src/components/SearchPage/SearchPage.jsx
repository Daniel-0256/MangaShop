import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div>
        <h1>Search Results</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search products or categories..."
          />
          <button type="submit">Search</button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <div key={product.ProductId} style={{ margin: "20px", padding: "10px"}}>
                  <img src={product.Image} alt={product.NameProduct} />
                  <h5>{product.NameProduct}</h5>
                  <p>
                    {product.Price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                  <p>{product.Availability ? 'Available' : 'Not Available'}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    );
};

export default SearchPage;
