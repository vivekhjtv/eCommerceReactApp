import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProduct } from "../services/searchService";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameter from the URL
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query?.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const results = await searchProduct({
          search: query,
          page: 1,
          limit: 10,
        });
        setSearchResults(results.data || []);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  const handleCancelSearch = () => {
    // Clear search results and navigate to home page
    setSearchResults([]);
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 d-flex justify-content-between mt-5">
          <h2>Search Results for: {query}</h2>

          <i
            className="bi bi-x"
            onClick={handleCancelSearch}
            style={{ fontSize: "40px", color: "red" }}
          ></i>
        </div>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex mt-4"
            >
              <div className="card h-100 w-100">
                {/* Product Image */}
                <div
                  onClick={() => {
                    navigate(`/single-product-page/${product._id}`); // Navigate to product page
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center"
                      style={{
                        height: "200px",
                        backgroundColor: "#f8f9fa",
                        fontSize: "14px",
                        color: "#6c757d",
                      }}
                    >
                      No Image Available
                    </div>
                  )}
                </div>

                <div
                  className="card-body text-center"
                  onClick={() => {
                    navigate(`/single-product-page/${product._id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">
                    {product.description || "No description available"}
                  </p>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-bold">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      navigate(`/single-product-page/${product._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
