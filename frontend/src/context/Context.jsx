import React, { createContext, useState } from "react";
import { getProducts, getUser } from "../api";

export const ShopContext = createContext();
const products = await getProducts()
function getDefaultCart() {
  let cart = {};
  for (let i = 0; i <= products.length; i++) {
    cart[i] = 0;
  }
  return cart;
}


export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [token, setToken] = useState(null);
  const loginToken = (newToken) => {
    setToken(newToken);
  };
  const logoutToken = () => {
    setToken(null);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item))
        totalAmount+= cartItems[item] * itemInfo.price
      }
    }
    return totalAmount
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: newAmount}))
  }

  const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, loginToken, logoutToken, token};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
