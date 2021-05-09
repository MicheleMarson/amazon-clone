const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IlHxqDnMdTd2LXRCxtEO8VjQWZChUAFGcqxERwmS0XR2q2pbN2pqzzs4whWMOxnspblKazo9L9YSL2PNv1Bmm8S00DWs9LjpJ")

//API

//-App config
const app = express()


//-Middlewares
app.use(cors({origin:true}))
app.use(express.json())

//-API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create", async (request, response) => {
  const total = request.query.total

  console.log("Amount is >>>>", total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount:total, //subunit of the currency
    currency: "usd"
  })

  //OK - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  })
})

//-Listen command
exports.api = functions.https.onRequest(app)

//example endpoint - local

