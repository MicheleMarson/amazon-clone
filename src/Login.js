import React, { useState } from 'react'
import "./Login.css"
import {Link, useHistory} from "react-router-dom"
import { auth } from './firebase'

const Login = () => {
  const history = useHistory() //browser history
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = (e) => {
    e.preventDefault()
    //firebase login

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth =>{
        if(auth){
          history.push("/")
        }
      })
      .catch(error => alert(error))

  }

  const register = (e) => {
    e.preventDefault()
    //firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
        if(auth){
          history.push("/")
        }
      })
      .catch((error) => alert(error))
  }

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" 
        src="http://feedbackindia.in/upload_products//1593277198-84987.png"/>
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          <button type="submit" onClick={signIn} className="login__signInButton">Sign in</button>
        </form>
        <p>By continuing, you agree to Amazon's fake clone Conditions of Use and Privacy Notice.</p>
        <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
      </div>
      
    </div>
  )
}

export default Login
