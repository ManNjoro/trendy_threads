import React, { useContext } from "react";
import { ShopContext } from "../context/Context";

export default function CartItem(props) {
  const { id, name, price } = props.data;
  const { addToCart, removeFromCart, cartItems, updateCartItemCount } = useContext(ShopContext);
  const url = "https://www.mannjoro.tech:5000/api/products";
  return (
    <div className="cartItem">
      <img src={`${url}/${id}/image`} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>KSH {price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={(e)=> updateCartItemCount(Number(e.target.value), id)}/>
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
}
