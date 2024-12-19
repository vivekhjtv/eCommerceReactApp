import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Ensure you have `react-bootstrap` installed

const SearchModal = ({ searchResults, showModal, handleClose }) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    handleClose(); // Close the modal
    navigate(`/single-product-page/${id}`); // Navigate to the product page
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row justify-content-center">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex mt-4"
              >
                <div
                  className="card h-100 w-100"
                  onClick={() => handleItemClick(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Product Image */}
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center"
                      style={{
                        height: "150px",
                        backgroundColor: "#f8f9fa",
                        fontSize: "14px",
                        color: "#6c757d",
                      }}
                    >
                      No Image Available
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">
                      {product.description || "No description available"}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">
                      ${product.price ? product.price.toFixed(2) : "0.00"}
                    </span>
                    <span className="text-muted small">Click for details</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
