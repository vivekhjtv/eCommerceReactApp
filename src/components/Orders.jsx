import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrder } from "../services/checkoutService";

const Orders = () => {
  const user = useSelector((state) => state.persistedReducer.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    if (user._id) {
      try {
        const response = await getAllOrder(user._id);

        setOrders(response.order || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching order details", error);
        setOrders([]);
        setLoading(false);
      }
    } else {
      console.log("User ID is missing");
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 p-md-4 p-lg-6">
      <h2 className="mb-4 text-center font-weight-bold">Your Orders</h2>

      <div className="table-responsive border-0 shadow-sm rounded">
        <table className="table mb-0 table-bordered table-striped table-sm table-hover">
          <thead className="bg-light text-center">
            <tr>
              <th>&nbsp;</th>
              <th>Product</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="align-middle w-auto">
                    <a href="#">
                      <img
                        src="../assets/images/products/product-img-1.jpg"
                        alt="Ecommerce"
                        className="icon-shape icon-xl rounded-circle border"
                      />
                    </a>
                  </td>
                  <td className="align-middle">
                    <a href="#" className="fw-semibold text-inherit">
                      <h6
                        className="mb-0"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {order?.product_details?.map((product, idx) => (
                          <span key={product._id}>
                            {idx > 0 && ", "}
                            {product.name}
                          </span>
                        )) || "Unknown Product"}
                      </h6>
                    </a>
                    <span>
                      <small className="text-muted">
                        {order?.product_details?.length || 0} Items
                      </small>
                    </span>
                  </td>
                  <td className="align-middle">
                    <a href="#" className="text-inherit">
                      {order?.orderId || "N/A"}
                    </a>
                  </td>
                  <td className="align-middle">
                    {new Date(order?.createdAt)?.toLocaleDateString() ||
                      "Unknown Date"}
                  </td>
                  <td className="align-middle">
                    {order?.product_details?.length || 0}
                  </td>
                  <td className="align-middle">
                    <span
                      className={`badge ${
                        order?.payment_status === "Done"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {order?.payment_status || "Unknown Status"}
                    </span>
                  </td>
                  <td className="align-middle">
                    ${order?.totalAmt?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
