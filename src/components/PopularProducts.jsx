import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
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
    <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0">Popular Products</h3>
          </div>
        </div>

        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
