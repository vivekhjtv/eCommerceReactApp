import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "./ProductCard";

const DailyBestSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProducts = await getProducts();
        setProducts(responseProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-6">
            <h3 className="mb-0">Daily Best Sells</h3>
          </div>
        </div>
        <div className="table-responsive-lg pb-6">
          <div className="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4 flex-nowrap">
            <div className="col">
              <div
                className="pt-8 px-6 px-xl-8 rounded"
                style={{
                  backgroundImage:
                    "url('assets/images/banner/banner-deal.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "470px",
                }}
              >
                <div>
                  <h3 className="fw-bold text-white">
                    100% Organic Coffee Beans.
                  </h3>
                  <p className="text-white">Get the best deal before close.</p>
                  <a href="/shop-grid-column" className="btn btn-primary">
                    Shop Now
                    <i className="feather-icon icon-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
            {products.slice(0, 3).map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBestSeller;
