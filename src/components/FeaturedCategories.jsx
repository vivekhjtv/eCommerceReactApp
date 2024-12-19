import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService";
import { Link } from "react-router-dom";
import { chunkCategories } from "../helpers/chunk";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to split categories into chunks of 6

  const categoryChunks = chunkCategories(categories, 6);

  return (
    <section className="mb-lg-10 mt-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0">Featured Categories</h3>
          </div>
        </div>
        <div
          id="categoryCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {categoryChunks.map((chunk, chunkIndex) => (
              <div
                className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}
                key={chunkIndex}
              >
                <div className="row text-center">
                  {chunk.map((category, index) => (
                    <div className="col-md-2" key={index}>
                      <Link
                        to="/shop-grid-column"
                        className="text-decoration-none text-inherit"
                      >
                        <div className="card card-product mb-lg-4">
                          <div className="card-body text-center py-8">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="mb-3 img-fluid"
                            />
                            <div className="text-truncate">{category.name}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
