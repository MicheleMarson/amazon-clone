import React, {forwardRef} from 'react'
import { useStateValue } from './StateProvider'
import GradeIcon from '@material-ui/icons/Grade';
import "./BasketItem.css"
// import FlipMove from "react-flip-move"

const BasketItem = () => {
  const [{basket}, dispatch] = useStateValue()

  const FunctionalArticle = forwardRef((props, ref) => (
    <button ref={ref}>
      {props.children}
    </button>
  ));
  

  console.log(basket)
  return (
    <div className="basket">
      {basket.map((item)=>{
        const removeFromBasket = () => {
          //remove the item from the basket
          dispatch({
            type: "REMOVE_FROM_BASKET",
            id: item.id
          })
        }
        
        return (
        // <FlipMove enterAnimation="fade">
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
              <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
          </div>
        // </FlipMove>
        )
      })}
    </div>
  )
}

export default BasketItem
