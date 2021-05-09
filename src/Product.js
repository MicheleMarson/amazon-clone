import React from 'react'
import "./Product.css"
import GradeIcon from '@material-ui/icons/Grade';
import { useStateValue } from './StateProvider';

const Product = ({title, price, image, rating, id}) => {
  const [{basket}, dispatch] = useStateValue()

  const addToBasket = () => {
    //dispatsh the item into data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating
      }
    })
  }



  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating).fill().map((_,i)=>{
            return <GradeIcon className="product__star"/>
          })}
        </div>
      </div>
      <img src={image} /> 
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product
