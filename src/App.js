import './App.css';
import Home from "./Home"
import Header from "./Header"
import "./index.css"
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from "./Checkout"
import Login from "./Login"
import { useEffect } from 'react';
import { auth } from './firebase'; 
import { useStateValue } from './StateProvider';
import Payment from "./Payment"
import {loadStripe} from "@stripe/stripe-js" // for payment method
import {Elements} from "@stripe/react-stripe-js"
import Orders from "./Orders"
//moment - datastamp
//upgrade firebase to blaze - firebase deploy --only functions
//stripe.js - payment transaction
// blaze play on firebase
//axios - fetching library
//functions folder is back-end(cloud functions)
//back-end logs see - terminal - firebase emulators:start _> after that api is functions[api]
//to test payment use 4242424242424... numb 
//after successful purchase i will receave in stripe.cpm payments that have ben sent
//http://localhost:5001/clone-21945/us-central1/api -- this key will power the transaction
//8:20

const promise = loadStripe("pk_test_51IlHxqDnMdTd2LXReBIlxzRqFEWbLjs13VIYM3RwW7vdYB3VtSHKYlgHb3Gcis1NyXkSkBxCpuqsUUjvIYwfIP1k006BBjcFkn")

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(()=>{
    //will run once when the app component loads

    auth.onAuthStateChanged(authUser => { //listener
      console.log("he user is >>>", authUser)
      if(authUser){
        //the user just loged in/ the user was loged in

        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }else{
        //the user is loged out

        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    }) 
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout"> {/*this has to be before / to work*/}
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
