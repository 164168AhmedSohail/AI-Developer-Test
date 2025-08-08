import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const RecommendationEngine = ({ products, currentProduct, userPreferences = {} }) => {
  const [recommendations, setRecommendations] = useState([]);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const generateRecommendations = () => {
    if (!products || products.length === 0) return [];

    let scoredProducts = products
      .filter(product => !currentProduct || product.id !== currentProduct.id)
      .map(product => ({
        ...product,
        score: calculateRecommendationScore(product)
      }));

    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const recommended = generateRecommendations();
      setRecommendations(recommended);
    }
  }, [products, currentProduct, userPreferences]);

  const calculateRecommendationScore = (product) => {
    let score = 0;

    if (currentProduct) {
      if (product.category === currentProduct.category) {
        score += 30;
      }
      
      const priceDifference = Math.abs(product.price - currentProduct.price);
      const maxPrice = Math.max(...products.map(p => p.price));
      score += (1 - priceDifference / maxPrice) * 20;
    }

    score += product.rating * 10;

    if (userPreferences.preferredCategories && userPreferences.preferredCategories.includes(product.category)) {
      score += 25;
    }

    if (userPreferences.budgetRange) {
      const { min, max } = userPreferences.budgetRange;
      if (product.price >= min && product.price <= max) {
        score += 15;
      }
    }

    if (userPreferences.preferHighRated && product.rating >= 4.5) {
      score += 20;
    }

    const randomFactor = Math.random() * 5;
    score += randomFactor;

    return score;
  };

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-section my-5">
      <div className="container">
        <h3 className="text-center mb-4">🤖 AI Recommended For You</h3>
        <div className="row">
          {recommendations.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-6 col-12 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top p-2"
                  src={product.image}
                  alt={product.title}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">
                    {product.title.length > 25 ? product.title.substring(0, 25) + "..." : product.title}
                  </h6>
                  <p className="card-text small flex-grow-1">
                    {product.description.substring(0, 60)}...
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-primary">${product.price}</span>
                      <span className="text-warning">
                        ★ {product.rating}
                      </span>
                    </div>
                    <div className="d-grid gap-1">
                      <Link
                        to={"/product/" + product.id}
                        className="btn btn-outline-dark btn-sm"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                          toast.success("Added to cart");
                          addProduct(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">
            Recommendations based on your preferences, similar products, and ratings
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;