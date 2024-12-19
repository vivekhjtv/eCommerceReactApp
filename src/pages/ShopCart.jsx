import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { paymentToStripe } from "../services/checkoutService"; // Make sure this service function is correctly implemented

const ShopCart = () => {
  const user = useSelector((state) => state.persistedReducer.user);
  const cartItems =
    useSelector((state) => state.persistedReducer.cart.cart) || [];
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [products, setProducts] = useState({
    products: [],
    subAmount: 0,
    totalAmount: 0,
  });

  const serviceFee = 3;

  useEffect(() => {
    if (!cartItems.length) {
      setSubTotalPrice(0);
      setProducts((prevState) => ({
        ...prevState,
        products: [],
      }));
      return;
    }
    const flattenedCartItems = cartItems.flat();
    const totalPrice = flattenedCartItems.reduce((prev, curr) => {
      const itemPrice = curr.productId.price * curr.quantity;
      return prev + itemPrice;
    }, 0);

    setSubTotalPrice(totalPrice);
    setProducts((prevState) => ({
      ...prevState,
      products: flattenedCartItems,
      subAmount: totalPrice,
      totalAmount: totalPrice + serviceFee,
    }));
  }, [cartItems, serviceFee]);

  const handleCheckout = async () => {
    const userId = user?._id || "testUserId123";

    try {
      const { data } = await paymentToStripe({
        lineItems: products.products.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.productId.name,
            },
            unit_amount: Math.round(product.productId.price * 100), // Price in cents
          },
          quantity: product.quantity,
        })),
        userId: userId,
        domain: window.location.origin,
        metadata: {
          productDetails: JSON.stringify(
            products.products.map((p) => ({
              productId: p.productId._id,
              description: p.productId.description,
              more_details: p.productId.more_details,
            }))
          ),
        },
      });

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error.message);
    }
  };

  return (
    <main>
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-lg-14 mb-8 mt-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card py-1 border-0 mb-8">
                <div>
                  <h1 className="fw-bold">Shop Cart</h1>
                  <p className="mb-0">Shopping in 382480</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="py-3">
                {cartItems.length > 0 ? (
                  <>
                    <div className="alert alert-success p-2" role="alert">
                      You’ve got FREE delivery. Start
                      <Link to="/checkout" className="alert-link">
                        checkout now!
                      </Link>
                    </div>
                    <ul className="list-group list-group-flush">
                      {cartItems.flat().map((cartItem) => (
                        <CartItem key={cartItem._id} cartItem={cartItem} />
                      ))}
                    </ul>

                    <div className="d-flex justify-content-between mt-4">
                      <Link to="/shop-grid-column" className="btn btn-primary">
                        Continue Shopping
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="alert alert-warning p-2" role="alert">
                    Your cart is empty. <Link to="/shop">Start shopping!</Link>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE SUMMARY PART */}
            <div className="col-12 col-lg-4 col-md-5">
              <div className="mb-5 card mt-6">
                <div className="card-body p-6">
                  <h2 className="h5 mb-4">Summary</h2>
                  <div className="card mb-2">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                          <div>Item Subtotal</div>
                        </div>
                        <span>${subTotalPrice.toFixed(2)}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                          <div>Service Fee</div>
                        </div>
                        <span>${serviceFee.toFixed(2)}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                          <div className="fw-bold">Total</div>
                        </div>
                        <span className="fw-bold">
                          ${(subTotalPrice + serviceFee).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <button
                    className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
                    onClick={handleCheckout}
                  >
                    Go to Checkout
                    <span className="fw-bold">
                      ${(subTotalPrice + serviceFee).toFixed(2)}
                    </span>
                  </button>

                  <p>
                    <small>
                      By placing your order, you agree to be bound by the
                      Freshcart <Link to="/terms">Terms of Service</Link> and
                      <Link to="/privacy">Privacy Policy</Link>.
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopCart;
