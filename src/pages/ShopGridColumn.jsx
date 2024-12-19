import React, { useEffect, useState } from "react";
import { getAllSubCategories } from "../services/subCategoryService";
import { getAllCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ShopGridColumn = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("Featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProducts = await getProducts();
        setProducts(responseProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const allSubCategories = await getAllSubCategories();
        setSubCategories(allSubCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleSubCategoryClick = (subCategoryId, name) => {
    setSelectedSubCategory(subCategoryId);
    setSelectedSubCategoryName(name);
    setCurrentPage(1);
  };

  const filteredProducts = selectedSubCategory
    ? products.filter((product) =>
        product.subCategory.some((subCat) => subCat._id === selectedSubCategory)
      )
    : products;

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  const sortProducts = (products, option) => {
    switch (option) {
      case "Low to High":
        return [...products].sort((a, b) => a.price - b.price);
      case "High to Low":
        return [...products].sort((a, b) => b.price - a.price);
      case "Release Date":
        return [...products].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          if (isNaN(dateA) || isNaN(dateB)) {
            console.error("Invalid date detected.");
            return 0;
          }

          return dateB - dateA;
        });
      default:
        return [...products];
    }
  };

  const sortedProducts = sortProducts(filteredProducts, selectedSortOption);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (!products || !categories || !subCategories) {
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
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#!">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Snacks & Munchies
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-lg-14 mb-8">
        <div className="container">
          <div className="row gx-10">
            {/* Left Sidebar */}
            <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
              <div
                className="offcanvas offcanvas-start offcanvas-collapse w-md-50"
                tabIndex="-1"
                id="offcanvasCategory"
                aria-labelledby="offcanvasCategoryLabel"
              >
                <div className="offcanvas-header d-lg-none">
                  <h5 className="offcanvas-title" id="offcanvasCategoryLabel">
                    Filter
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body ps-lg-2 pt-lg-0">
                  <div className="mb-8">
                    <h5 className="mb-3">Categories</h5>
                    <ul className="nav nav-category" id="categoryCollapseMenu">
                      {categories.map((category, index) => (
                        <li
                          className="nav-item border-bottom w-100"
                          key={index}
                        >
                          <a
                            href="#"
                            className="nav-link collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#categoryFlush${index}`}
                            aria-expanded="false"
                            aria-controls={`categoryFlush${index}`}
                          >
                            {category.name}
                            <i className="feather-icon icon-chevron-right"></i>
                          </a>
                          <div
                            id={`categoryFlush${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#categoryCollapseMenu"
                          >
                            <div>
                              <ul className="nav flex-column ms-3">
                                {subCategories
                                  .filter((sub) =>
                                    sub.category.some(
                                      (cat) => cat._id === category._id
                                    )
                                  )
                                  .map((sub, subIndex) => (
                                    <li className="nav-item" key={subIndex}>
                                      <a
                                        className="nav-link"
                                        onClick={() =>
                                          handleSubCategoryClick(
                                            sub._id,
                                            sub.name
                                          )
                                        }
                                      >
                                        {sub.name}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="col-lg-9 col-md-12">
              <div className="card mb-4 bg-light border-0">
                <div className="card-body p-9">
                  <h2 className="mb-0 fs-1">
                    {selectedSubCategoryName || "All Products"}
                  </h2>
                </div>
              </div>

              <div className="d-lg-flex justify-content-between align-items-center">
                <div className="mb-3 mb-lg-0">
                  <p className="mb-0">
                    <span className="text-dark pe-1">
                      {filteredProducts.length}
                    </span>
                    Products found
                  </p>
                </div>
                <div className="d-flex mt-2 mt-lg-0">
                  <div className="me-2 flex-grow-1">
                    <select
                      className="form-select"
                      onChange={handleProductsPerPageChange}
                      value={productsPerPage}
                    >
                      <option value="3">Show: 3</option>
                      <option value="6">Show: 6</option>
                      <option value="9">Show: 9</option>
                      <option value="12">Show: 12</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="form-select"
                      value={selectedSortOption}
                      onChange={handleSortChange}
                    >
                      <option value="Featured">Sort by: Featured</option>
                      <option value="Low to High">Price: Low to High</option>
                      <option value="High to Low">Price: High to Low</option>
                      <option value="Release Date">Release Date</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                {currentProducts.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>

              {/* Pagination */}
              <div className="row mt-8">
                <div className="col">
                  <nav>
                    <ul className="pagination">
                      {/* Previous Button */}
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <a
                          className="page-link mx-1"
                          href="#"
                          aria-label="Previous"
                          onClick={handlePrevPage}
                        >
                          <i className="feather-icon icon-chevron-left"></i>
                        </a>
                      </li>

                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          key={index}
                        >
                          <a
                            className="page-link mx-1"
                            href="#"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}

                      {/* Next Button */}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <a
                          className="page-link mx-1"
                          href="#"
                          aria-label="Next"
                          onClick={handleNextPage}
                        >
                          <i className="feather-icon icon-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopGridColumn;
