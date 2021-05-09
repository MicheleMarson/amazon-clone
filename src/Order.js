import React from 'react'
import "./Order.css"
import moment from "moment"
import GradeIcon from '@material-ui/icons/Grade';
import CurrencyFormat from 'react-currency-format';


//props inside ({})
const Order = ({order}) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item => ( //now we pull orders from database that we saved 
        <div key={item.id} {...item} className="basket__product">
          <div className="basket__img">
            <img src={item.image} />
          </div>
          <div className="basket__info">
            <h3>{item.title}</h3>
            <p className="product__price">
              <small>$</small>
              <strong>{item.price}</strong>
            </p>
            <div className="product__rating">
              {Array(item.rating).fill().map((_,i)=>{
                return <GradeIcon className="product__star"/>
              })}
            </div>
          </div>
        </div>
      ))}
      <CurrencyFormat
        renderText ={(value)=>(
          <h3 className="order__total">Order total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100} // it is in cents 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  )
}

export default Order
