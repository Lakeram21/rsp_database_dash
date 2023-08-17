
const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors");
const app = express();
const router = express.Router()
const dbOperations = require('./database/dbOperations')

// Hard Coded Middleware
app.use(bodyparser.urlencoded({extended:true})) //The extended mode allows for parsing nested objects and arrays.
app.use(bodyparser.json()) // It allows your application to handle JSON payloads sent in the request.
app.use(cors()); //This middleware is used to enable Cross-Origin Resource Sharing (CORS), which allows web applications from different domains to make requests to your server
app.use("/api", router) //his middleware is used to mount a specific router under a specific path prefix



/********************************************
 * Routes for all Endpoints
****************/
// This is your middleware and will be called before any other routes are hit
// We can add auth here and parseing etc
router.use((req, res, next)=>{
  console.log("Middleware")
  next()
})

//>>>> Get a specific Product by Sku
router.route("/product/:sku").get((req, res)=>{

  // Gett the params
  const sku = req.params.sku
  
  if (!sku) {
    return res.status(400).json({ error: 'SKU parameter is missing.' });
  }
  dbOperations.getAllProducts(sku).then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  })
})







/***********************
 * Starting the server 
 *********************/

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`RSP Server is running on port ${PORT}.`);
});


