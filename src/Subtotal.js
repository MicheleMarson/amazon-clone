import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import {useHistory} from "react-router-dom"

const Subtotal = () => {
  const history = useHistory()
  const [{basket}, dispatch] = useStateValue()

  console.log(basket)
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText ={(value)=>(
          <>
            <p>
              Subtotal ({basket.length}  {basket.length === 1?"item":"items"}):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        // value={basket.reduce((i, j) => i + j.price, 0)} or
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
