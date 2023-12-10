// imports and definitions

const express = require("express")  // wanna run a server? you'll need express
const server=express(); // create an object to handle your server
const {request,response} = require("http")
const cors=require("cors") // to prevent the security lock when calling our api
const mongoose = require("mongoose")
const Product=require("./models/product")
const port = 3000;
//const db_uri="mongodb+srv://admin:Mongodb1977-?@cluster0.dowovpy.mongodb.net/products"
const db_uri="mongodb+srv://admin:admin@cluster0.dowovpy.mongodb.net/products?retryWrites=true&w=majority"

// --------- Middleware  ------- the one handling communication between front and back ends

server.unsubscribe(express.urlencoded({extended:false})) // to be able to understand whatever we put on url
server.use(express.json())  //  
server.use(cors())  // use cors to prevent browser locking

// ---------- Connections
mongoose.connect(db_uri)
.then((result)=>{server.listen(port,()=>{console.log(`Listening on ${port}...\nConnect to DB\nAwaiting requests...\n-`);})})
.catch((error)=>{console.log(error);
});



//---- testing our server
server.get("/",(request,response)=>{
    response.send("LIVE!!");
});

// this is the route to get all products from db, it returns and
server.get("/products",async(request,response)=>{
    const products=await Product.find();
    console.log("READ and send all products in DB...\nDone.\n-")
    response.send(products);
})

// adding products to inventory
server.post("/addProduct", async(request,response)=>{
    const product = request.body
    console.log("CREATE a new product in DB...")
    console.log(product)
    const newProduct=new Product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity:product.quantity,
        image: product.image,
        price: product.price,
    })
    saveProduct = await newProduct.save().then(console.log("Done...\n-")).catch((error)=>console.log(error))
    saveProduct?response.send("Product was successfully added to inventory"):response.send("Failed to add!!!!!!!!")
})

// updating data to DB, use the _id to locate the product and then updates it with the object received
server.patch("/updateProduct/:id", async (request, response) => {
    const { id } = request.params
    const product = request.body
    console.log("UPDATE product in DB...")
    console.log(product)
    delete product._id              // I have to delete this Id here, otherwise can't commit the update.
    const update = await Product.findByIdAndUpdate(id, product ).then(console.log("Done...\n-")).catch((error)=>console.log(error))
    update?response.send("Product updated"):response.send("Update failed")
})

// deleting Items, by Id
server.delete("/deleteProduct/:id", async(request,response)=>{
    const { id } = request.params
    console.log("DELETE product with id: " + id + " from DB")
    const delProduct= await Product.findByIdAndDelete(id).then(console.log("Done...\n-")).catch((error)=>console.log(error))
    delProduct?response.send("Product deleted"):response.send("Deletion failed")

})