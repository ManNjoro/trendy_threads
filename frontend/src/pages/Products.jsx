import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/katie-zaferes.png";
import star from "../assets/images/star.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { getProducts } from "../api";
import { Link, useLoaderData } from "react-router-dom";
import { ShopContext } from "../context/Context";

export function productLoader() {
  return getProducts();
}

export default function Products() {
  const products = useLoaderData();
  const {addToCart, cartItems} = useContext(ShopContext)
  const scrollStep = 200;
  let scrollContainer;

  const scrollTo = (direction) => {
    if (scrollContainer) {
      const currentPosition = scrollContainer.scrollLeft;
      const targetPosition =
        direction === "next"
          ? currentPosition + scrollStep
          : currentPosition - scrollStep;
      scrollContainer.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    scrollContainer = document.querySelector(".cards-list");

    // Function to handle scroll and update button visibility
    const handleScroll = () => {
      if (scrollContainer) {
        const currentPosition = scrollContainer.scrollLeft;
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Show/hide the left button based on scroll position
        if (currentPosition === 0) {
          prevButton.style.display = "none";
        } else {
          prevButton.style.display = "block";
        }

        // Show/hide the right button based on scroll position
        if (currentPosition === maxScroll) {
          nextButton.style.display = "none";
        } else {
          nextButton.style.display = "block";
        }
      }
    };

    // Attach event listeners to the buttons
    prevButton.addEventListener("click", () => scrollTo("prev"));
    nextButton.addEventListener("click", () => scrollTo("next"));

    // Attach a scroll event listener to the scroll container
    scrollContainer.addEventListener("scroll", handleScroll);

    // Initially, check and set the button visibility
    handleScroll();

    // Remove event listeners when the component unmounts
    return () => {
      prevButton.removeEventListener("click", () => scrollTo("prev"));
      nextButton.removeEventListener("click", () => scrollTo("next"));
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const url = "http://127.0.0.1:5000/api/products";
  return (
    <section className="card-container">
      <section className="category-bar">Shorts</section>
      <FaAngleLeft className="prev-button nav-arrow" id="prevButton" />
      <div className="cards-list">
        {products &&
          products.map((product) => (
            <div className="card" key={product.id}>
              <Link to={`${product.id}`}>
                <img
                  src={`${url}/${product.id}/image`}
                  alt={product.name}
                  className="product-img"
                  type={product.mime_type}
                ></img>
                <div className="card-stats">
                  <img src={star} alt="star" className="star"></img>
                </div>
                <section className="product-info">
                  <p>{product.name}</p>
                  <p>
                    <span className="price">KSH {product.price}</span>
                  </p>
                </section>
              </Link>
                <div className="link-btns">
                  <button className="link-button" onClick={()=> addToCart(product.id)}>ADD TO CART {cartItems[product.id] > 0 && <> ({cartItems[product.id]}) </>}</button>
                </div>
            </div>
          ))}
      </div>
      <FaAngleRight id="nextButton" className="next-button nav-arrow" />
    </section>
  );
}
