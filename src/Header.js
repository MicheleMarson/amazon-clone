import React from 'react'
import "./Header.css"
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom"
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

const Header = () => {
  const [{basket, user}, dispatch] = useStateValue()
  // console.log("this user",user.email)
  const handleAuthentication = () => {
    if(user){
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="https://boostedmedia.net/wp-content/uploads/2019/11/white-amazon-logo-png-6.png"/>
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text"/>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link className="Link" to={!user && "/login"}> {/*if there is no user only then push to login page*/}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello {!user?"Guest":user.email}</span>
            <span className="header__optionLineTwo">{user?"Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link className="Link" to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Order</span>
          </div>
        </Link>
        
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link className="Link" to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon/>
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
              {/* ? is to handle the error if there is no baaket */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
