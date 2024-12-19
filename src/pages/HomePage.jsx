import React from "react";
import FeaturedCategories from "../components/FeaturedCategories";
import PopularProducts from "../components/PopularProducts";
import DailyBestSeller from "../components/DailyBestSeller";

const HomePage = () => {
  return (
    <main>
      <section className="mt-8">
        <div className="container">
          <div
            id="heroSlider"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div
                  className="d-flex align-items-center"
                  style={{
                    backgroundImage: "url('assets/images/slider/slide-1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "470px",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 text-start text-white m-9">
                        <span className="badge bg-warning">
                          Opening Sale Discount 50%
                        </span>
                        <h1 className="mt-4 fw-bold">
                          SuperMarket For Fresh Grocery
                        </h1>
                        <p className="lead">
                          Introduced a new model for online grocery shopping and
                          convenient home delivery.
                        </p>
                        <a
                          href="/shop-grid-column"
                          className="btn btn-dark mt-3"
                        >
                          Shop Now
                          <i className="ms-1 bi bi-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div
                  className="d-flex align-items-center"
                  style={{
                    backgroundImage: "url('assets/images/slider/slider-2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "470px",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 text-start text-white m-9">
                        <span className="badge bg-warning">
                          Free Shipping - orders over $100
                        </span>
                        <h1 className="mt-4 fw-bold">
                          Free Shipping on orders over{" "}
                          <span className="text-primary">$100</span>
                        </h1>
                        <p className="lead">
                          Free Shipping to First-Time Customers Only, After
                          promotions and discounts are applied.
                        </p>
                        <a
                          href="/shop-grid-column"
                          className="btn btn-dark mt-3"
                        >
                          Shop Now
                          <i className="ms-1 bi bi-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Category Section Start--> */}
      <FeaturedCategories />
      {/* <!-- Category Section End--> */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mb-lg-0">
              <div>
                <div
                  className="py-10 px-8 rounded"
                  style={{
                    backgroundImage:
                      "url('assets/images/banner/grocery-banner.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div>
                    <h3 className="fw-bold mb-1">Fruits & Vegetables</h3>
                    <p className="mb-4">
                      Get Upto
                      <span className="fw-bold">30%</span>
                      Off
                    </p>
                    <a href="/shop-grid-column" className="btn btn-dark">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <div
                  className="py-10 px-8 rounded"
                  style={{
                    backgroundImage:
                      "url('assets/images/banner/grocery-banner-2.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div>
                    <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
                    <p className="mb-4">
                      Get Upto
                      <span className="fw-bold">25%</span>
                      Off
                    </p>
                    <a href="/shop-grid-column" className="btn btn-dark">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Popular Products Start--> */}
      <PopularProducts />
      {/* <!-- Daily Best Seller --> */}
      <DailyBestSeller />
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="mb-8 mb-xl-0">
                <div className="mb-6">
                  <img src="assets/images/icons/clock.svg" alt="" />
                </div>
                <h3 className="h5 mb-3">10 minute grocery now</h3>
                <p>
                  Get your order delivered to your doorstep at the earliest from
                  FreshCart pickup stores near you.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="mb-8 mb-xl-0">
                <div className="mb-6">
                  <img src="assets/images/icons/gift.svg" alt="" />
                </div>
                <h3 className="h5 mb-3">Best Prices & Offers</h3>
                <p>
                  Cheaper prices than your local supermarket, great cashback
                  offers to top it off. Get best pricess & offers.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="mb-8 mb-xl-0">
                <div className="mb-6">
                  <img src="assets/images/icons/package.svg" alt="" />
                </div>
                <h3 className="h5 mb-3">Wide Assortment</h3>
                <p>
                  Choose from 5000+ products across food, personal care,
                  household, bakery, veg and non-veg & other categories.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="mb-8 mb-xl-0">
                <div className="mb-6">
                  <img src="assets/images/icons/refresh-cw.svg" alt="" />
                </div>
                <h3 className="h5 mb-3">Easy Returns</h3>
                <p>
                  Not satisfied with a product? Return it at the doorstep & get
                  a refund within hours. No questions asked
                  <a href="#!">policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
