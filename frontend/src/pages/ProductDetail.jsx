import React, { useContext } from "react";
import { getProducts } from "../api";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { ShopContext } from "../context/Context";
import { FaArrowLeftLong } from "react-icons/fa6";

export function productDetailLoader({ params }) {
  return getProducts(params.id);
}

export default function ProductDetail() {
  const product = useLoaderData()
  const location = useLocation()
  const {addToCart, cartItems} = useContext(ShopContext)
  const url = "http://54.164.125.110:5000/api/products";
  const search = location.state?.search || ""
  const category = location.state?.category || "all"
  return (
    <div className="product-detail-container">
      <Link to={`..${search}`} relative="path" className="back-btn">
        <FaArrowLeftLong /> <span>Back to {category} products</span>
      </Link>

      <div className="product-card">
        <img
          alt={product.name}
          src={`${url}/${product.id}/image`}
          className="product-detail-img"
        />
        <div className="product-details-only">
          <h2>{product.name}</h2>
          <p className="product-price">
            KSH {product.price}
          </p>
          <p>{product.description}</p>
          {product.size && <h1>Sizes available</h1>}
          <p>{product.size}</p>
          <div className="link-btns">
            <button className="link-button" onClick={()=> addToCart(product.id)}>Add to cart {cartItems[product.id] > 0 && <> ({cartItems[product.id]}) </>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
