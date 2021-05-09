import React, {useEffect, useState} from 'react'
import "./Payment.css"
import { useStateValue } from './StateProvider'
import GradeIcon from '@material-ui/icons/Grade';
import {Link, useHistory} from "react-router-dom"
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { getBasketTotal } from './reducer'
import CurrencyFormat from "react-currency-format"
import axios from "./axios" //from local file
import {db} from "./firebase"


const Payment = () => {
  const history = useHistory()
  const [{basket, user}, dispatch] = useStateValue()
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(()=>{ // fires every time basket changes
    //generate the special stripe secret which allowes us to change a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects total in a currencies subunits
        //total= is quary param
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret) 
    }

    getClientSecret()
  }, [basket])
  console.log("Secret is >>>>", clientSecret)


  const handleSubmit = async event => {
    //stripe
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      //paymentIntent = payment confirmation

      //when we complet the payment push it into database - noSql
      //his data wil be inside firebase porject - firestore database
      db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket, // before we empty it
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({ //  useContext, similar to redux
        type:'EMPTY_BASKET',
      })

      history.replace("/orders") //after successful purchase redirect user to new page
    })

  }

  const handleChange = event => {
    //listen for changes in the CardElement
    //and display any error as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }
  
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} {basket.length == 1?"item":"items"}</Link>)
        </h1>
        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* payment section - rewiev items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* poducts */}
            {basket.map((item)=>{        

              return (
                <div key={item.id} className="basket__product">
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
              )
            })}
          </div>
        </div>  
        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic goes here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value)=>(
                    <h3>Order Total: {value} </h3>
                  )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  >
                </CurrencyFormat>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing?<p>Processing</p>: "Buy now"}</span>
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
