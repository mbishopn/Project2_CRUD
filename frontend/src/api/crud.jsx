import { client } from "./client"  // import axios object

// here are my CRUD FUNCTIONS, all behave similarly, they are all async and whenever they are done,
// return a value to be used in our App

// this one gets the products from database
export const readProduct = async () => {
    console.log("AXIOS: sending READ to API")
    const { data } = await client.get('/products')
    return data
}
// create a new record/element in the DB
export const createProduct = async (newProd) => {
    newProd.id = crypto.randomUUID() // this id comes from the first project, it was a "pain in the rear end", but I kept it
    console.log("AXIOS: sending CREATE to API...")
    const result = await client.post("/addProduct", newProd) // call the API to add a product, 
      //console.log(result)
    return ([result,newProd.id ])  // return the API answer and the Id for the 
 
}

export const updateProduct = async (Prod) => {
    console.log("AXIOS: sending UPDATE to API...")
    // console.log(Prod)
    // console.log(Prod.id)
    const result = await client.patch(`/updateProduct/${Prod._id}`, Prod)
    //console.log(result)
    return(result)
}

export const deleteProduct = async (id) => {
    
    console.log("AXIOS: sending DELETE to API " + id)
    const result = await client.delete(`/deleteProduct/${id}`)
    return(result)
}