import { useState, useEffect } from "react";
import { getOrderDetails } from "../services/checkoutService";

const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      try {
        const response = await getOrderDetails(sessionId);
        setOrder(response);
        setLoading(false);
      } catch (error) {
        setError("Error fetching order details");
        setLoading(false);
      }
    } else {
      setError("Session ID is missing");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container py-5">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          {/* Success Message */}
          <div className="alert alert-success text-center">
            <h1 className="display-4 text-success">
              Order Placed Successfully!
            </h1>
            <p className="lead">
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>
          </div>

          {/* Single Table for Order and Product Details */}
          <div className="card shadow-lg border-primary mb-5">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Order and Product Details</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Field</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Order Details */}
                    <tr>
                      <td>
                        <strong>Order ID</strong>
                      </td>
                      <td>{order?.orderId || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Payment ID</strong>
                      </td>
                      <td>{order?.paymentId || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Payment Status</strong>
                      </td>
                      <td>{order?.payment_status || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Amount</strong>
                      </td>
                      <td>₹{order?.totalAmt || 0}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Invoice Receipt</strong>
                      </td>
                      <td>
                        {order?.invoice_receipt ? (
                          <a
                            href={order?.invoice_receipt}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fas fa-download"></i> View Receipt
                          </a>
                        ) : (
                          "Not available"
                        )}
                      </td>
                    </tr>

                    {/* Product Details */}
                    {order?.product_details?.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <strong>Product {index + 1}</strong>
                        </td>
                        <td>{product?.name || "Unnamed Product"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center mt-5">
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ width: "200px" }}
              onClick={() => (window.location.href = "/account/orders")}
            >
              View My Orders
            </button>
            <button
              className="btn btn-secondary btn-lg"
              style={{ width: "200px" }}
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSuccessPage;
