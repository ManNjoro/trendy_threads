import React, { useContext, useEffect, useState } from "react";
import star from "../assets/images/star.png";
import { getProducts } from "../api";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/Context";

// Loader function to fetch products
export function productLoader() {
  return getProducts();
}

// Products component
export default function Products() {
  const products = useLoaderData();
  const { addToCart, cartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const genderFilter = searchParams.get("gender");

  // Apply category and gender filters to displayed products
  const displayedProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;
  const genderProducts = genderFilter
    ? displayedProducts.filter((product) => product.gender === genderFilter)
    : displayedProducts;

  const url = "https://www.mannjoro.tech:5000/api/products";

  // Map products to elements for rendering
  const productElements = genderProducts.map((product) => (
    <div className="card" key={product.id}>
      <Link
        to={`${product.id}`}
        state={{
          search: `?${searchParams.toString()}`,
          category: categoryFilter,
          gender: genderFilter,
        }}
      >
        {/* Product image */}
        <img
          src={`${url}/${product.id}/image`}
          alt={product.name}
          className="product-img"
          type={product.mime_type}
        ></img>
        <div className="card-stats">
          {/* Star image for product rating */}
          <img src={star} alt="star" className="star"></img>
        </div>
        <section className="product-info">
          {/* Product name and price */}
          <p>{product.name}</p>
          <p>
            <span className="price">KSH {product.price}</span>
          </p>
        </section>
      </Link>
      <div className="link-btns">
        {/* Button to add product to cart */}
        <button className="link-button" onClick={() => addToCart(product.id)}>
          ADD TO CART {cartItems[product.id] > 0 && <> ({cartItems[product.id]}) </>}
        </button>
      </div>
    </div>
  ));

  // Function to handle changes in filters
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <section className="card-container">
      {/* Gender filter buttons */}
      <div className="category-filter-buttons">
        <div className="gender-btns">
          <button
            onClick={() => handleFilterChange("gender", "male")}
            className={`product-category male ${
              genderFilter === "male" ? "selected" : ""
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleFilterChange("gender", "female")}
            className={`product-category female ${
              genderFilter === "female" ? "selected" : ""
            }`}
          >
            Women
          </button>
          {genderFilter && (
            <button
              onClick={() => handleFilterChange("gender", null)}
              className="product-category clear-filters"
            >
              All
            </button>
          )}
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="category-filter-buttons">
        {genderFilter && (
          <>
            <button
              onClick={() => handleFilterChange("category", "short")}
              className={`product-category short ${
                categoryFilter === "short" ? "selected" : ""
              }`}
            >
              Shorts
            </button>
            <button
              onClick={() => handleFilterChange("category", "shirt")}
              className={`product-category shirt ${
                categoryFilter === "shirt" ? "selected" : ""
              }`}
            >
              Shirt
            </button>
            <button
              onClick={() => handleFilterChange("category", "trouser")}
              className={`product-category trouser ${
                categoryFilter === "trouser" ? "selected" : ""
              }`}
            >
              Trouser
            </button>
            <button
              onClick={() => handleFilterChange("category", "jacket")}
              className={`product-category jacket ${
                categoryFilter === "jacket" ? "selected" : ""
              }`}
            >
              Jacket
            </button>
            {genderFilter === "female" && (
              <>
                <button
                  onClick={() => handleFilterChange("category", "lingerie")}
                  className={`product-category lingerie ${
                    categoryFilter === "lingerie" ? "selected" : ""
                  }`}
                >
                  Lingerie
                </button>
                <button
                  onClick={() => handleFilterChange("category", "dress")}
                  className={`product-category dress ${
                    categoryFilter === "dress" ? "selected" : ""
                  }`}
                >
                  Dress
                </button>
              </>
            )}
            {categoryFilter && (
              <button
                onClick={() => handleFilterChange("category", null)}
                className="product-category clear-filters"
              >
                Clear Filter
              </button>
            )}
          </>
        )}
      </div>

      {/* Display products */}
      <div className="cards-list">
        {products ? productElements : <h1>No products as of now</h1>}
      </div>
    </section>
  );
}
