import React, { useEffect, useState } from "react";
import RelatedItems from "../components/RelatedItems";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import AddToCartButton from "../components/AddToCartButton";
import WishlistButton from "../components/WishlistButton";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // fetch cart items
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseProducts = await getProductById({ id });
        setProduct(responseProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const discountedPrice = (
    product?.price -
    (product?.price * product?.discount) / 100
  ).toFixed(2);

  return (
    <main>
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                    <span className="mx-3"> / </span>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Bakery Biscuits</Link>
                    <span className="mx-3"> / </span>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Napolitanke Ljesnjak
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
            {/* Left Side Product Images */}
            <div className="col-md-5 col-xl-6">
              <div className="product" id="product">
                <div
                  className="zoom"
                  style={{
                    backgroundImage: `url('${product?.image?.[0]}')`,
                  }}
                >
                  <img
                    src={product?.image?.[0]}
                    alt={product?.name || "Product"}
                  />
                </div>
              </div>

              <div className="product-tools">
                <div className="thumbnails row g-3" id="productThumbnails">
                  {product?.image?.map((img, index) => (
                    <div className="col-3" key={index}>
                      <div className="thumbnails-img">
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Product Details */}
            <div className="col-md-7 col-xl-6">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <Link to="#!" className="mb-4 d-block">
                  {product?.category[0]?.name || "Category"}
                </Link>

                <h1 className="mb-1">{product?.name || "Product Name"}</h1>
                <div className="mb-4">
                  <small className="text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </small>
                  <Link to="#" className="ms-2">
                    (30 reviews)
                  </Link>
                </div>
                <div className="fs-4">
                  <span className="fw-bold text-dark">${discountedPrice}</span>
                  <span className="text-decoration-line-through text-muted ms-1">
                    ${product?.price?.toFixed(2) || "0.00"}
                  </span>
                  <span>
                    <small className="fs-6 ms-2 text-danger">
                      {product?.discount || 0}% Off
                    </small>
                  </span>
                </div>

                <hr className="my-6" />
                <p>{product?.description || "No description available."}</p>
                <div>
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td>Product Code:</td>
                        <td>{product?._id || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Availability:</td>
                        <td>
                          {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td>Unit:</td>
                        <td>{product?.unit || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Shipping:</td>
                        <td>
                          <small>
                            01 day shipping.
                            <span className="text-muted">
                              (Free pickup today)
                            </span>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>Details:</td>
                        <td>
                          Color: {product?.more_details?.color || "N/A"}, Size:{" "}
                          {product?.more_details?.size || "N/A"}, Weight:{" "}
                          {product?.more_details?.weight || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <AddToCartButton productId={product._id} />
                  <WishlistButton productId={product._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ----- Product Details section ------ */}
      <section className="mt-lg-14 mt-8">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul
                className="nav nav-pills nav-lb-tab"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="product-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#product-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="product-tab-pane"
                    aria-selected="true"
                  >
                    Product Details
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#details-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="details-tab-pane"
                    aria-selected="false"
                  >
                    Information
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="reviews-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#reviews-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="reviews-tab-pane"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="sellerInfo-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#sellerInfo-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="sellerInfo-tab-pane"
                    aria-selected="false"
                    disabled
                  >
                    Seller Info
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="product-tab-pane"
                  role="tabpanel"
                  aria-labelledby="product-tab"
                  tabIndex="0"
                >
                  <div className="my-8">
                    <div className="mb-5">
                      <h4 className="mb-1">Nutrient Value & Benefits</h4>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nisi, tellus iaculis urna bibendum in lacus, integer. Id
                        imperdiet vitae varius sed magnis eu nisi nunc sit. Vel,
                        varius habitant ornare ac rhoncus. Consequat risus
                        facilisis ante ipsum netus risus adipiscing sagittis
                        sed. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </p>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-1">Storage Tips</h5>
                      <p className="mb-0">
                        Nisi, tellus iaculis urna bibendum in lacus, integer. Id
                        imperdiet vitae varius sed magnis eu nisi nunc sit. Vel,
                        varius habitant ornare ac rhoncus. Consequat risus
                        facilisis ante ipsum netus risus adipiscing sagittis
                        sed.Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </p>
                    </div>

                    <div className="mb-5">
                      <h5 className="mb-1">Unit</h5>
                      <p className="mb-0">3 units</p>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-1">Seller</h5>
                      <p className="mb-0">DMart Pvt. LTD</p>
                    </div>
                    <div>
                      <h5 className="mb-1">Disclaimer</h5>
                      <p className="mb-0">
                        Image shown is Link representation and may slightly vary
                        from the actual product. Every effort is made to
                        maintain accuracy of all information displayed.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="details-tab-pane"
                  role="tabpanel"
                  aria-labelledby="details-tab"
                  tabIndex="0"
                >
                  <div className="my-8">
                    <div className="row">
                      <div className="col-12">
                        <h4 className="mb-4">Details</h4>
                      </div>
                      <div className="col-12 col-lg-6">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <th>Weight</th>
                              <td>1000 Grams</td>
                            </tr>
                            <tr>
                              <th>Ingredient Type</th>
                              <td>Vegetarian</td>
                            </tr>
                            <tr>
                              <th>Brand</th>
                              <td>Dmart</td>
                            </tr>
                            <tr>
                              <th>Item Package Quantity</th>
                              <td>1</td>
                            </tr>
                            <tr>
                              <th>Form</th>
                              <td>Larry the Bird</td>
                            </tr>
                            <tr>
                              <th>Manufacturer</th>
                              <td>Dmart</td>
                            </tr>
                            <tr>
                              <th>Net Quantity</th>
                              <td>340.0 Gram</td>
                            </tr>
                            <tr>
                              <th>Product Dimensions</th>
                              <td>9.6 x 7.49 x 18.49 cm</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-lg-6">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <th>ASIN</th>
                              <td>SB0025UJ75W</td>
                            </tr>
                            <tr>
                              <th>Best Sellers Rank</th>
                              <td>#2 in Fruits</td>
                            </tr>
                            <tr>
                              <th>Date First Available</th>
                              <td>30 April 2022</td>
                            </tr>
                            <tr>
                              <th>Item Weight</th>
                              <td>500g</td>
                            </tr>
                            <tr>
                              <th>Generic Name</th>
                              <td>Banana Robusta</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="reviews-tab-pane"
                  role="tabpanel"
                  aria-labelledby="reviews-tab"
                  tabIndex="0"
                >
                  <div className="my-8">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="me-lg-12 mb-6 mb-md-0">
                          <div className="mb-5">
                            <h4 className="mb-3">Customer reviews</h4>
                            <span>
                              <small className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                              </small>
                              <span className="ms-3">4.1 out of 5</span>
                              <small className="ms-3">
                                11,130 global ratings
                              </small>
                            </span>
                          </div>
                          <div className="mb-8">
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted">
                                <span className="d-inline-block align-middle text-muted">
                                  5
                                </span>
                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                              </div>
                              <div className="w-100">
                                <div
                                  className="progress"
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "60%" }}
                                    aria-valuenow="60"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-muted ms-3">53%</span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted">
                                <span className="d-inline-block align-middle text-muted">
                                  4
                                </span>
                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                              </div>
                              <div className="w-100">
                                <div
                                  className="progress"
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "50%" }}
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="50"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-muted ms-3">22%</span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted">
                                <span className="d-inline-block align-middle text-muted">
                                  3
                                </span>
                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                              </div>
                              <div className="w-100">
                                <div
                                  className="progress"
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "35%" }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="35"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-muted ms-3">14%</span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted">
                                <span className="d-inline-block align-middle text-muted">
                                  2
                                </span>
                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                              </div>
                              <div className="w-100">
                                <div
                                  className="progress"
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "22%" }}
                                    aria-valuenow="22"
                                    aria-valuemin="0"
                                    aria-valuemax="22"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-muted ms-3">5%</span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                              <div className="text-nowrap me-3 text-muted">
                                <span className="d-inline-block align-middle text-muted">
                                  1
                                </span>
                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                              </div>
                              <div className="w-100">
                                <div
                                  className="progress"
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "14%" }}
                                    aria-valuenow="14"
                                    aria-valuemin="0"
                                    aria-valuemax="14"
                                  ></div>
                                </div>
                              </div>
                              <span className="text-muted ms-3">7%</span>
                            </div>
                          </div>
                          <div className="d-grid">
                            <h4>Review this product</h4>
                            <p className="mb-0">
                              Share your thoughts with other customers.
                            </p>
                            <Link
                              to="#"
                              className="btn btn-outline-gray-400 mt-4 text-muted"
                            >
                              Write the Review
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="mb-10">
                          <div className="d-flex justify-content-between align-items-center mb-8">
                            <div>
                              <h4>Reviews</h4>
                            </div>
                          </div>
                          <div className="d-flex border-bottom pb-6 mb-6">
                            <img
                              src="../assets/images/avatar/avatar-10.jpg"
                              alt=""
                              className="rounded-circle avatar-lg"
                            />
                            <div className="ms-5">
                              <h6 className="mb-1">Shankar Subbaraman</h6>

                              <p className="small">
                                <span className="text-muted">
                                  30 December 2022
                                </span>
                                <span className="text-primary ms-3 fw-bold">
                                  Verified Purchase
                                </span>
                              </p>

                              <div className="mb-2">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <span className="ms-3 text-dark fw-bold">
                                  Need to recheck the weight at delivery point
                                </span>
                              </div>

                              <p>
                                Product quality is good. But, weight seemed less
                                than 1kg. Since it is being sent in open
                                package, there is Link possibility of pilferage
                                in between. FreshCart sends the veggies and
                                fruits through sealed plastic covers and Barcode
                                on the weight etc. .
                              </p>
                              <div>
                                <div className="border icon-shape icon-lg border-2">
                                  <img
                                    src="../assets/images/products/product-img-1.jpg"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="border icon-shape icon-lg border-2 ms-1">
                                  <img
                                    src="../assets/images/products/product-img-2.jpg"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="border icon-shape icon-lg border-2 ms-1">
                                  <img
                                    src="../assets/images/products/product-img-3.jpg"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                              </div>

                              <div className="d-flex justify-content-end mt-4">
                                <Link to="#" className="text-muted">
                                  <i className="feather-icon icon-thumbs-up me-1"></i>
                                  Helpful
                                </Link>
                                <Link to="#" className="text-muted ms-4">
                                  <i className="feather-icon icon-flag me-2"></i>
                                  Report abuse
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                            <img
                              src="../assets/images/avatar/avatar-12.jpg"
                              alt=""
                              className="rounded-circle avatar-lg"
                            />
                            <div className="ms-5">
                              <h6 className="mb-1">Robert Thomas</h6>

                              <p className="small">
                                <span className="text-muted">
                                  29 December 2022
                                </span>
                                <span className="text-primary ms-3 fw-bold">
                                  Verified Purchase
                                </span>
                              </p>

                              <div className="mb-2">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star text-warning"></i>
                                <span className="ms-3 text-dark fw-bold">
                                  Need to recheck the weight at delivery point
                                </span>
                              </div>

                              <p>
                                Product quality is good. But, weight seemed less
                                than 1kg. Since it is being sent in open
                                package, there is Link possibility of pilferage
                                in between. FreshCart sends the veggies and
                                fruits through sealed plastic covers and Barcode
                                on the weight etc. .
                              </p>

                              <div className="d-flex justify-content-end mt-4">
                                <Link to="#" className="text-muted">
                                  <i className="feather-icon icon-thumbs-up me-1"></i>
                                  Helpful
                                </Link>
                                <Link to="#" className="text-muted ms-4">
                                  <i className="feather-icon icon-flag me-2"></i>
                                  Report abuse
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                            <img
                              src="../assets/images/avatar/avatar-9.jpg"
                              alt=""
                              className="rounded-circle avatar-lg"
                            />
                            <div className="ms-5">
                              <h6 className="mb-1">Barbara Tay</h6>

                              <p className="small">
                                <span className="text-muted">
                                  28 December 2022
                                </span>
                                <span className="text-danger ms-3 fw-bold">
                                  Unverified Purchase
                                </span>
                              </p>

                              <div className="mb-2">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star text-warning"></i>
                                <span className="ms-3 text-dark fw-bold">
                                  Need to recheck the weight at delivery point
                                </span>
                              </div>

                              <p>
                                Everytime i ordered from fresh i got greenish
                                yellow bananas just like i wanted so go for it ,
                                its happens very rare that u get over riped
                                ones.
                              </p>

                              <div className="d-flex justify-content-end mt-4">
                                <Link to="#" className="text-muted">
                                  <i className="feather-icon icon-thumbs-up me-1"></i>
                                  Helpful
                                </Link>
                                <Link to="#" className="text-muted ms-4">
                                  <i className="feather-icon icon-flag me-2"></i>
                                  Report abuse
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                            <img
                              src="../assets/images/avatar/avatar-8.jpg"
                              alt=""
                              className="rounded-circle avatar-lg"
                            />
                            <div className="ms-5 flex-grow-1">
                              <h6 className="mb-1">Sandra Langevin</h6>

                              <p className="small">
                                <span className="text-muted">
                                  8 December 2022
                                </span>
                                <span className="text-danger ms-3 fw-bold">
                                  Unverified Purchase
                                </span>
                              </p>

                              <div className="mb-2">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star text-warning"></i>
                                <span className="ms-3 text-dark fw-bold">
                                  Great product
                                </span>
                              </div>

                              <p>
                                Great product & package. Delivery can be
                                expedited.
                              </p>

                              <div className="d-flex justify-content-end mt-4">
                                <Link to="#" className="text-muted">
                                  <i className="feather-icon icon-thumbs-up me-1"></i>
                                  Helpful
                                </Link>
                                <Link to="#" className="text-muted ms-4">
                                  <i className="feather-icon icon-flag me-2"></i>
                                  Report abuse
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Link
                              to="#"
                              className="btn btn-outline-gray-400 text-muted"
                            >
                              Read More Reviews
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-5">Create Review</h3>
                          <div className="border-bottom py-4 mb-4">
                            <h4 className="mb-3">Overall rating</h4>
                            <div className="rater"></div>
                          </div>
                          <div className="border-bottom py-4 mb-4">
                            <h4 className="mb-0">Rate Features</h4>
                            <div className="my-5">
                              <h5>Flavor</h5>
                              <div className="rater"></div>
                            </div>
                            <div className="my-5">
                              <h5>Value for money</h5>
                              <div className="rater"></div>
                            </div>
                            <div className="my-5">
                              <h5>Scent</h5>
                              <div className="rater"></div>
                            </div>
                          </div>

                          <div className="border-bottom py-4 mb-4">
                            <h5>Add Link headline</h5>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="What’s most important to know"
                            />
                          </div>
                          <div className="border-bottom py-4 mb-4">
                            <h5>Add Link photo or video</h5>
                            <p>
                              Shoppers find images and videos more helpful than
                              text alone.
                            </p>

                            <div
                              id="my-dropzone"
                              className="dropzone mt-4 border-dashed rounded-2 min-h-0"
                            ></div>
                          </div>
                          <div className="py-4 mb-4">
                            <h5>Add Link written review</h5>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="What did you like or dislike? What did you use this product for?"
                            ></textarea>
                          </div>

                          <div className="d-flex justify-content-end">
                            <Link to="#" className="btn btn-primary">
                              Submit Review
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="sellerInfo-tab-pane"
                  role="tabpanel"
                  aria-labelledby="sellerInfo-tab"
                  tabIndex="0"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedItems />
    </main>
  );
};

export default SingleProductPage;
