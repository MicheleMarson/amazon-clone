import React from 'react'
import "./Home.css"
import Product from "./Product"

const Home = () => {
  return (
    <div className="home">
      <div  className="home__container">
        <img className="home__image" src="https://store-images.s-microsoft.com/image/apps.16285.14618985536919905.552c0017-6644-49a8-8467-8f7b34ce0428.30ad6b05-16d9-4d5e-a242-43107708a16a?mode=scale&q=90&h=1080&w=1920"/>
      </div>
      <div className="home__row">
        <Product 
          id="123435"
          title="The lean startup" price={29.99}
          image="https://i0.wp.com/startupcollections.com/inc/uploads/2016/11/the-lean-startup.png?resize=554%2C522&ssl=1"
          rating={5}/>
        <Product
          id="347635"
          title="Spiritual Healing: 6 Books in 1" price={31.99}
          image="https://m.media-amazon.com/images/I/41V0hOpJa8L.jpg"
          rating={5}/>
      </div>
      <div className="home__row">
        <Product
          id="347635"
          title="JBL Tune 115TWS" price={69.99}
          image="https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwcd770a25/JBL_TUNE%20115TWS_Product%20Image_Hero_Black.png?sw=537&sfrm=png"
          rating={4}/>
      	<Product
          id="276455"
          title="Smart watch for Android Phones Samsung iPhone" price={162.99}
          image="https://images-na.ssl-images-amazon.com/images/I/51NP0hfzakL._AC_SX522_.jpg"
          rating={4}/>
      	<Product
          id="782325"
          title="Galaxy Note20 5G" price={899.99}
          image="https://images-na.ssl-images-amazon.com/images/I/81qmTTzUlfL._AC_SX679_.jpg"
          rating={5}/>
      </div>
      <div className="home__row">
      	<Product
        id="236647"
          title="SAMSUNG 43-inch Class Crystal UHD TU-8000 Series - 4K UDH HDR Smart TV" price={1800.99}
          image="https://images-na.ssl-images-amazon.com/images/I/71RiQZ0J2SL._AC_SX355_.jpg"
          rating={4}/>
      </div>
    </div>
  )
}

export default Home
