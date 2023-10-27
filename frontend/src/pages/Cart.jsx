import React, { useContext } from 'react'
import { getProducts } from '../api'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/Context";
import CartItem from './CartItem';

export function cartLoader() {
  return getProducts();
}
export default function Cart() {
  const products = useLoaderData()
  const { cartItems, getTotalCartAmount} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cartItems'>
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />
          }
        })}
      </div>
        {totalAmount > 0 ? 
      <div className='checkout'>
        <p>Subtotal: KSH {totalAmount}</p>
        <button onClick={()=> navigate('/products')}>Continue Shopping</button>
        <button>Checkout</button>
      </div>
      :
      <h1>Your Cart is Empty</h1>
      }
    </div>
  )
}
