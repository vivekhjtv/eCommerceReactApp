import React from "react";

const ProductModel = ({ data, close }) => {
  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">{data.name}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={close}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="row">
              {/* Product Image */}
              <div className="col-md-6 text-center">
                <img
                  src={data.image[0]}
                  alt={data.name}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "600px", objectFit: "contain" }}
                />
              </div>

              {/* Product Details */}
              <div className="col-md-6">
                <p className="text-muted">
                  {data.description || "No description available."}
                </p>
                <h4 className="text-danger">
                  ${data.price - (data.price * data.discount) / 100}
                </h4>
                {data.discount > 0 && (
                  <span className="badge bg-success">{data.discount}% Off</span>
                )}
                <div className="mt-3">
                  <p>
                    <strong>Category:</strong>{" "}
                    {data.category[0]?.name || "Uncategorized"}
                  </p>
                  <p>
                    <strong>Rating:</strong> 4.5 ⭐ (149 Reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
