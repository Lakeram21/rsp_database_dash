
const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors");
const app = express();
const router = express.Router()
const dbOperations = require('./database/dbOperations')

const mongoDBOp = require("./mongodb/mongoDBOperations")
// Hard Coded Middleware
app.use(bodyparser.urlencoded({extended:true})) //The extended mode allows for parsing nested objects and arrays.
app.use(bodyparser.json()) // It allows your application to handle JSON payloads sent in the request.
app.use(cors()); //This middleware is used to enable Cross-Origin Resource Sharing (CORS), which allows web applications from different domains to make requests to your server
app.use("/api", router) //his middleware is used to mount a specific router under a specific path prefix


// const value = await mongoDBOp.createVendor()
// console.log(value)
/********************************************
 * Routes for all Endpoints
****************/
// // This is your middleware and will be called before any other routes are hit
// // We can add auth here and parseing etc
// router.use((req, res, next)=>{
//   console.log("Middleware")
//   next()
// })

router.route("/createvendor").post(async(req, res)=>{
  try {
    const vendorData = req.body
    const newvendor = await mongoDBOp.createVendor(vendorData)
    res.status(201).json(newvendor)
  } catch (error) {
    res.status(400).json(error)
  }
 
})

router.route("/allvendor").get(async (req, res)=>{
  try {
    const allVendors = await mongoDBOp.getAllVendors()
    res.status(200).json(allVendors)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
 
})


router.route("/editVendor/:id").put(async (req, res)=>{
  try {
    const vendorData = req.body
    const id = req.params.id
    const editedVendor = await mongoDBOp.updateVendor(id, vendorData)
    
    res.status(201).json(editedVendor)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
 
})

/**************************************************************
 * SQL Database Routes
 * 
 **************************/
// Getting all Manufacturers
router.route("/supplier").post((req, res)=>{
  const category = req.body.category
  const manufacturers = req.body.manufacturers
  dbOperations.getSupplierBasedOnCategoryAndManu(category, manufacturers ).then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching suppliers.' });
  })
})

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

//>>>> Edit a product
router.route("/product").put((req, res)=>{
  const data = req.body
  console.log(data)
})

// Getting all Manufacturers
router.route("/allmanufacturer").get((req, res)=>{

  dbOperations.getAllManufacturer().then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching manufacturers.' });
  })
})


router.route("/allcategoryonmanufacturer/:manufacturer").get((req, res)=>{
  const manufacturer = req.params.manufacturer
  dbOperations.getCategoryOnManufacturer(manufacturer).then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching manufacturers.' });
  })
})


router.route("/allProductsOnManuAndDescription/:manufacturer/:description").get((req, res)=>{
  const manufacturer = req.params.manufacturer
  const description = req.params.description

  dbOperations.getAllProductsBasedOnManfacturerAndDescription(manufacturer,description).then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  })
})

router.route("/allcategories").get((req, res)=>{
  dbOperations.getAllProductsCategory().then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  })
})

router.route("/allproductsoncategories/:category/:manfacturer").get((req, res)=>{
  const category = req.params.category
  const manfacturer = req.params.manfacturer

  dbOperations.getProductsOnCategory(category, manfacturer).then(result =>{
    res.json(result)
  }).catch(error=>{
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  })
})

/**************************************************************
 * MongoDB Routes
 * 
 **************************/


/***********************
 * Starting the server 
 *********************/


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`RSP Server is running on port ${PORT}.`);
});


