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
.then((result)=>{server.listen(port,()=>{console.log(`Listening on ${port}...\nConnect to DB`);})})
.catch((error)=>{console.log(error);
});



//---- testing our server
server.get("/",(request,response)=>{
    response.send("LIVE!!");
});

// this is the route to get all products from db, it returns and
server.get("/products",async(request,response)=>{
    const products=await Product.find();
    console.log("sending back all products in DB...")
    response.send(products);
})

// adding products to inventory
server.post("/addProduct", async(request,response)=>{
    const product = request.body
    console.log("I'm gonna save a new product...")
    console.log(request.body)
    const newProduct=new Product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity:product.quantity,
        image: product.image,
        price: product.price,
    })
    const saveProduct=await newProduct.save()
    saveProduct?response.send("Product was successfully added to inventory"):response.send("Failed to add!!!!!!!!")
})

// updating data to DB, use the _id to locate the product and then updates it with the object received
server.patch("/updateProduct/:id", async (request, response) => {
    const { id } = request.params
    const product = request.body
    console.log("Updating ...")
    console.log(id)
    console.log(product)
    delete product._id              // I have to delete this Id here, otherwise can't commit the update.
    const update = await Product.findByIdAndUpdate(id, product )
    update?response.send("Product updated"):response.send("Update failed")
})

// deleting Items, by Id
server.delete("/deleteProduct/:id", async(request,response)=>{
    const { id } = request.params
    console.log("deleting" + id)
    const delProduct= await Product.findByIdAndDelete(id)
    delProduct?response.send("Product deleted"):response.send("Deletion failed")

})