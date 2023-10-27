import React, { useContext } from "react";
import { getProducts } from "../api";
import { Link, useLoaderData } from "react-router-dom";
import { ShopContext } from "../context/Context";

export function productDetailLoader({ params }) {
  return getProducts(params.id);
}

export default function ProductDetail() {
  const product = useLoaderData();
  const {addToCart, cartItems} = useContext(ShopContext)
  const url = "http://127.0.0.1:5000/api/products";
  return (
    <div className="product-detail-container">
      <Link to={`..`} relative="path" className="back-btn">
        &larr; <span>Back to products</span>
      </Link>

      <div className="product-card">
        <img
          alt={product.name}
          src={`${url}/${product.id}/image`}
          className="product-detail-img"
        />
        <div className="product-details-only">
          <i className={`product-type ${product.category} selected`}>
            {product.category}
          </i>
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
