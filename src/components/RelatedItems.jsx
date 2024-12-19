import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";

const RelatedItems = () => {
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
    <section className="my-lg-14 my-14">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Related Items</h3>
          </div>
        </div>

        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-2 mt-2">
          {products.slice(0, 5).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedItems;
