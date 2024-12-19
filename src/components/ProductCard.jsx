import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import ProductModel from "./ProductModel";

const ProductCard = ({ product }) => {
  const [openModel, setOpenModel] = useState(false);
  const [modelData, setModelData] = useState({});
  return (
    <div className="col" key={product._id}>
      {openModel && (
        <ProductModel data={modelData} close={() => setOpenModel(false)} />
      )}
      <div className="card card-product">
        <div className="card-body">
          <div className="text-center position-relative">
            {product.discount > 0 && (
              <div className="position-absolute top-0 start-0">
                <span className="badge bg-danger">Sale</span>
              </div>
            )}
            <Link to={`/single-product-page/${product._id}`}>
              <img
                src={product.image[0]}
                alt={product.name}
                className="mb-3 img-fluid"
              />
            </Link>
            <div className="card-product-action">
              <button
                onClick={() => {
                  setOpenModel(true);
                  setModelData(product);
                }}
                className="btn btn-outline-primary btn-sm align-items-center justify-content-center shadow"
                style={{
                  width: "40px",
                  height: "40px",
                }}
                title="Quick View"
              >
                <i className="bi bi-eye"></i>
              </button>
            </div>
          </div>
          <Link
            to={`/single-product-page/${product._id}`}
            className="text-decoration-none text-inherit"
          >
            <div className="text-small mb-1">
              <a href="#!" className="text-decoration-none text-muted">
                <small>{product.category[0]?.name || "Category"}</small>
              </a>
            </div>
            <h2 className="fs-6">
              <a href="#!" className="text-inherit text-decoration-none">
                {product.name}
              </a>
            </h2>

            <div>
              <small className="text-warning">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </small>
              <span className="text-muted small">{product.rating}</span>
            </div>
          </Link>
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <div className="w-100 w-md-auto mb-2 mb-md-0">
              <span className="text-dark">
                ${product.price - (product.price * product.discount) / 100}
              </span>
            </div>
            <div className="w-100 w-md-auto">
              <AddToCartButton productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
