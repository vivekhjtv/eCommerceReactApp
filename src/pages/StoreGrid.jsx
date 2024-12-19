import React from "react";

const StoreGrid = () => {
  return (
    <main>
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#!">Home</a>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#!">Stores</a>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Store Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-light d-flex justify-content-between ps-md-10 ps-6 rounded">
                <div className="d-flex align-items-center">
                  <h1 className="mb-0 fw-bold">Stores</h1>
                </div>
                <div className="py-6">
                  <img
                    src="../assets/images/svg-graphics/store-graphics.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 mb-lg-14 mb-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <h6>
                  We have
                  <span className="text-primary">36</span>
                  vendors now
                </h6>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 g-4 g-lg-4">
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-1.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      E-Grocery Super Market
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Organic</span>
                    <span className="me-2">Groceries</span>
                    <span>Butcher Shop</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">7.5 mi away</div>

                    <div className="badge text-bg-light border">
                      In-store prices
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-2.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      DealShare Mart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Alcohol</span>
                    <span className="me-2">Groceries</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">7.2 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-3.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      DMart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Bakery</span>
                    <span>Deli</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 10:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">9.3 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-4.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      Blinkit Store
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Meal Kits</span>
                    <span className="me-2">Prepared Meals</span>
                    <span>Organic</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">40.5 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-5.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      StoreFront Super Market
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Bakery</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 11:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">28.1 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-6.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      BigBasket
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Deli</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 10:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">7.5 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-7.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      Swiggy Instamart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Meal Kits</span>
                    <span className="me-2">Prepared Meals</span>
                    <span>Organic</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">40.5 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-8.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      Online Grocery Mart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Bakery</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 11:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">28.1 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-9.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      Spencers
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Deli</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 10:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">7.5 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-2.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      DealShare Mart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Alcohol</span>
                    <span className="me-2">Groceries</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">7.2 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-3.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      DMart
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Groceries</span>
                    <span className="me-2">Bakery</span>
                    <span>Deli</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>
                        <span className="text-primary">Delivery by 10:30pm</span>
                      </li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">9.3 mi away</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card p-6 card-product">
                <div>
                  <img
                    src="../assets/images/stores-logo/stores-logo-4.svg"
                    alt=""
                    className="rounded-circle icon-shape icon-xl"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="mb-1 h5">
                    <a href="#!" className="text-inherit">
                      Blinkit Store
                    </a>
                  </h2>
                  <div className="small text-muted">
                    <span className="me-2">Meal Kits</span>
                    <span className="me-2">Prepared Meals</span>
                    <span>Organic</span>
                  </div>
                  <div className="py-3">
                    <ul className="list-unstyled mb-0 small">
                      <li>Delivery</li>
                      <li>Pickup available</li>
                    </ul>
                  </div>
                  <div>
                    <div className="badge text-bg-light border">40.5 mi away</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StoreGrid;
