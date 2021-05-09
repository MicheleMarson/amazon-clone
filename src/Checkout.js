import React from 'react'
import BasketItem from './BasketItem'
import "./Checkout.css"
import { useStateValue } from './StateProvider'
import Subtotal from "./Subtotal"

const Checkout = () => {
  const [{basket, user}, dispatsh] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__add" 
        src="https://images-na.ssl-images-amazon.com/images/G/01/gift-certificates/consumer/2020/amazoncash/Q3/AC_BB_1500x200_EN_20200908.jpg"/>
        <div>
          <h3>{user?.email}</h3> {/* ? optional chaining, important */}
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <BasketItem/>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal/>
      </div>
    </div>
  )
}

export default Checkout
