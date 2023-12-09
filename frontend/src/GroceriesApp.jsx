/*
This component controls the logic of application, it will manage interaction between a remote mongodb collection through
our local API, but it can be wherever we want.
Inventory display handled with InventoryCards component and
Cart info rendered with CartList component

for project 2 I added the components required to perform CRUD operations:
InventorForm to create and edit products
under /api I put 2 files with functions to interact with the API,
I know it wasn't necessary but it help me to keep my code a little bit 
understandable, at least for me
*/

// first let's import all files containgin our code/db
import { useState, useEffect } from "react"             // to use hooks/states 2) I need useEffect too
//import {products} from "./data/products.js" // our products DB <--- not required, I'm using mongodb now
import CartList from "./cartList.jsx"                   // component rendering cart
import InventoryCards from "./inventoryCards.jsx"       // component rendering inventory
import { readProduct, createProduct, updateProduct, deleteProduct } from "./api/crud" // my crud functions file, axios object is called from there
import InventoryForm from "./InventoryForm.jsx"         // our new form to add and edit products
import {useForm} from "react-hook-form"

export default function GroceriesApp()
{
    // 2 -- I want to store records from db in products object, so I use a state hook.
    //      No more importing products object from js local file
    const [products, setProducts] = useState([]);       // hook to hold all products
    const emptyForm =                                   // this is my form template object
    {
        _id:"",
        id: "",
        productName: "",
        brand: "",
        quantity: "",
        image: "",
        price: "",
    }
    
    const [formData, setFormData] = useState(emptyForm);    // wanna control what happen in my form
    const [APIResponse, setAPIResponse] = useState("")      // Used to re-render every time API answers something
    const[editFlag,setEditFlag]=useState(false)             // flag to toggle form buttons for add/edit
    const {register,handleSubmit, clearErrors, reset, setValue, getValues, formState:{errors}}=useForm({
        defaultValues:{         // let's define default values for the form
            productName:"",
            brand:"",
            quantity:"",
            image:"",
            price:"",
        }
    });

    //2 -- now I need a callback function to use it with effect
    // I want this function to be executed only the firstime or when I change something in the DB ONLY!!
    useEffect(() => {
        
        readProduct().then((response) => { setProducts(response) })
        
    },[APIResponse])
    
/// ----------------------------------    THIS IS FROM PROJECT 1  ----------------------------------------
    // we'll use cartItem variable to add new elements to our Cart, I'm not using a hook here because
    // I don't really need to hold its state
    let cartItem =
    {
        uuid:"",
        name:"",
        price:0
    }

    const [cart, setCart]= useState([]) // this array is my Cart list, initially it's empty but it will be filled with cartItem objects
    const [Total, setTotal]=useState(0) // hook for Total amount of current sale

    // -------------------- NEXT FUNCTIONS ARE TO HANDLE CART BEHAVIOUR -----------------------------

    // ----------- handleSubmission FUNCTION ---------------------------------------
    // Adds the selected item to the shopping cart
    // will be passed to Inventory Card to handle every time we click on Add to cart buttons 
    // when the button is clicked I use that event to get the product id stored in button tag value
    // ----- UPDATE: because now we also have the _id from mongodb, I use it to identify my products,
    // the old ID is still there but just for nothing.
    const handleSubmission = (evt) =>
    {
        //console.log(evt.target.value)
        // Fill cartItem object acording the product Id selected in the Inventory
        cartItem.uuid=crypto.randomUUID()
        cartItem.name=products.find((product)=>product._id===evt.target.value).productName
        cartItem.price=products.find((product)=>product._id===evt.target.value).price

        setCart((prevCart)=>{return[...prevCart,{cartItem}]}) // Now, insert the new cartItem in the cart Array
        setTotal((prevTotal)=>{ return prevTotal+parseFloat(cartItem.price.replace(/\$/,""))}) // every time an item is added, we add the price to the Total

    }

    // ---------------- removeItem FUNCTION -----------------------------------------
    // will remove items from our cart, using random uuid to identify them
    const removeItem = (uuid) =>
    {
        setCart((prevcart)=>{    return prevcart.filter((item)=> item["cartItem"].uuid!==uuid)}) // remove cartItem from cart Array
        setTotal((prevTotal)=>{return prevTotal- parseFloat(cart.find((item)=>item["cartItem"].uuid===uuid)["cartItem"].price.replace(/\$/,""))}) // substracts cartItem price from Total
    }

    // --------------- emptyCart FUNCTION ------------------------------------------
    // just deletes the whole cart and reinitialize Total to 0 
    const emptyCart = () =>
    {
        setCart([]/* (prevCart)=>{return prevCart=[]} */)
        setTotal(0/* (prevTotal)=>{return prevTotal=0} */)
    }


/////// --------------------  P R O J E C T   2    S T A R T S    H E R E  ---------------------

    // ---------------- FUNCIONS TO INTERACT WITH BACKEND API START HERE ---------------------
    

    // 2 -------------------- handleOnChange FUNCTION ------------------------------------
    // this will handle any change on our form fields to re-render the component
    // basically, just wanna see what I type in the form :)

    const handleOnChange = (evt) =>
    {
        const fieldName= evt.target.name
        const fieldValue = evt.target.value
        setFormData((prevData) => {
            return{...prevData, [fieldName]:fieldValue}
        })
    }

    // -------------------- handleOnSubmit FUNCTION ----------------------------------------
    // this one post the new product to the backend API, which will update the DB

    const handleOnSubmit = async (evt) => {
        evt.preventDefault
        await createProduct(formData)
            .then((response) => {
                console.log(response)
                setAPIResponse(<>{response[0].data}</>)
                reset()
                //setFormData(emptyForm)
                // window.alert(response[0].data + " Id: " + response[1])
            })
    }



    // -------------------- handleOnEdit FUNCTION ----------------------------------------
    // this one send an item to be updated to the backend API, which will update the DB
    
    const handleOnEdit = async (evt) => 
    {
        evt.preventDefault                // don't refresh
        console.log(evt)
        console.log("estoy cancelando")
        const pid = evt.target.value        // which button called this function?
        if (pid === "cancel")          // CANCEL button? no problema, get back to normal
        {
            setEditFlag(!editFlag)
            //reset()
            setFormData(()=>{reset(); return emptyForm}) // clean form and formData variable
            clearErrors()
            console.log(formData)
            console.log(getValues())
        }
        else 
        {
            setEditFlag(true)         // EDIT button from InventoryCards?
            const editar = products.filter((res) => (res._id === pid))  // then grab the produc info from the card (products object)
            const dato = {                              // create another object with the product data to be put in the form
                _id:editar[0]._id,
                id:editar[0].id,
                // productName: editar[0].productName,
                // brand: editar[0].brand,
                // quantity: editar[0].quantity,
                // image: editar[0].image,
                // price: editar[0].price,
            }
            setFormData(() => {  // let's use our setFormData to modify our hook/state formData
                
                setValue("productName",editar[0].productName)
                setValue("brand",editar[0].brand)
                setValue("quantity",editar[0].quantity)
                setValue("image",editar[0].image)
                setValue("price",editar[0].price)
                return {...dato,...getValues()} })                 

            document.getElementById("productName").focus()      // please take me to the form, I'm lazy
            console.log(formData)
           // console.log(getValues())
        }
    }

    // -------------------- handleOnUpdate FUNCTION ----------------------------------------
    // this one send an item to be updated to the backend API, which will update the DB
    
    const handleOnUpdate = async (evt) => 
    {
        
       // evt.preventDefault()                // don't refresh
            await updateProduct(formData)   // call the API to update the product
                .then((response) => {
                    setAPIResponse(<>{response.data}</>)  // how was it?
                })
                reset()
                setFormData(()=>{reset(); return emptyForm})      // clean the form
                setEditFlag(!editFlag)      // once updated, we get back to normal add button
            
    }

    // -------------------- handleOnDelete FUNCTION ----------------------------------------
    // this one send an item to delete to the backend API, which will update the DB
    
    const handleOnDelete = async (evt) => {
        const id=evt.target.value                   // the button contains product Id as value, so I can identify the product to be deleted
        await deleteProduct(id)                     // call the api
            .then((response) => {                   // once it gets back with a result, we send that to render
                setAPIResponse(<>{response.data}</>)
                window.alert(response.data)         // I added a pop-up just for fun!
        })
    }


    /// thas it! now this is what our component renders!
    //      - InventoryForm     - to add and edit products
    //      - InventoryCards    - Our lovely InventoryCards
    //      - CartList          - Our lovely shopping Cart

    return(
        <>
            <InventoryForm
                formData={formData}                 // wanna use form data right?
                handleOnChange={handleOnChange}     // for instance, to see what we type
                handleOnSubmit={handleOnSubmit}     // this form want's to send things like... products?
                editFlag={editFlag}                 // toggle buttons for edit/add
                handleOnEdit={handleOnEdit}
                handleOnUpdate={ handleOnUpdate }
                register={register}                 // from react-hook-form 
                handleSubmit={handleSubmit}
                errors={errors}
                clearErrors={clearErrors}
                reset={reset} /> 
            <p>{APIResponse}</p>
            <div className="GroceriesApp-Container">
                {
                    <div className="Inventory-Container">

                        {   // by mapping products array, every product in database is passed as prop "item" for InventoryCards component, 
                            
                            products.map((product)=>(
                                <InventoryCards         // THIS COMPONENT renders inventory items
                                    key={product.id}    // only to get rid of the keys error
                                    item={product}      // every item in inventory
                                    onClick={handleSubmission} // passing the function to Add current item to Cart
                                    onDelete={handleOnDelete}  // passing the function to handle click on delete button
                                    handleOnEdit={handleOnEdit}
                                />
                                )
                            )
                        }
                    </div>
                }
                {/* This component renders our lovely Cart */}
                <CartList
                    cart={cart}             // the array containing all items in the cart
                    emptyCart={emptyCart}   // function to get the cart empty
                    removeItem={removeItem} // function to remove 1 item by clicking on its remove button
                    Total={Total}           // Variable to print total addition
                />
            </div>
        </>
    )
}
