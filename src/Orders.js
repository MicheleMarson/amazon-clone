import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import "./Orders.css"
import { useStateValue } from './StateProvider'
import Order from "./Order"
//push orders into database

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [{basket, user}, dispatch] = useStateValue() 


  useEffect(()=>{
    if(user){
      db
      .collection("users") //accessing users collection(from firestore)
      .doc(user?.uid) //get specific user that is loged in
      .collection("orders") //access that users order
      .orderBy("created", "desc") //order them baset on data created in descanding order
      .onSnapshot(snapshot => ( //map through the orders
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
    }else{
      setOrders([])
    }
    
  }, [user])

  return (
    <div className="orders">
      <div className="orders__order">
        <h1>Your Orders</h1>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
