import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import productsData from "../data/products.json";
import RecommendationEngine from "./RecommendationEngine";
import UserPreferences from "./UserPreferences";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [userPreferences, setUserPreferences] = useState({});
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      
      if (componentMounted) {
        setData(productsData);
        setFilter(productsData);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, priceRange);
  };

  const handlePriceFilter = (min, max) => {
    const newPriceRange = { min, max };
    setPriceRange(newPriceRange);
    applyFilters(searchTerm, newPriceRange);
  };

  const applyFilters = (searchTerm, priceRange) => {
    let filteredData = data;

    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredData = filteredData.filter(item =>
      item.price >= priceRange.min && item.price <= priceRange.max
    );

    setFilter(filteredData);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="search-filters py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-3 mb-3">
              <label htmlFor="minPrice" className="form-label">Min Price: ${priceRange.min}</label>
              <input
                type="range"
                className="form-range"
                id="minPrice"
                min="0"
                max="2000"
                value={priceRange.min}
                onChange={(e) => handlePriceFilter(parseInt(e.target.value), priceRange.max)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="maxPrice" className="form-label">Max Price: ${priceRange.max}</label>
              <input
                type="range"
                className="form-range"
                id="maxPrice"
                min="0"
                max="2000"
                value={priceRange.max}
                onChange={(e) => handlePriceFilter(priceRange.min, parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="buttons text-center py-3">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title}
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  <li className="list-group-item">
                    <span className="text-warning">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="ms-2">({product.rating})</span>
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
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
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">AI-Enhanced Product Catalog</h2>
            <hr />
          </div>
        </div>
        
        <UserPreferences onPreferencesChange={setUserPreferences} />
        
        <RecommendationEngine 
          products={data} 
          userPreferences={userPreferences}
        />
        
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
