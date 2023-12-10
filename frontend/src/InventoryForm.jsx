//2 -- in this component, we have a form to fill with data for the new product to be added

//import { appendErrors, useForm } from "react-hook-form";


export default function InventoryForm({
    formData,           // holds the data to be sent, it seems this is not needed if using stateform but came from the first version
    handleOnChange,     // handles changes on form fields
    handleOnSubmit,     // processes submission for new products
    editFlag,           // working on an existant product?
    handleOnEdit,       // handles presentation for edition form
    handleOnUpdate,     // processes submission for update products
    register,           // to register fields to validate
    handleSubmit,       // processes validation before sending data
    errors              // holds validation errors
})
 {
   // console.log(editFlag?"editting product: " + formData.productName + " id: " + formData._id:"adding mode...")
   // console.log("esto hay en el formulario");console.log(formData)
   // console.log(isValid)
   console.log((editFlag?"edditing mode..."+formData.productName + " id: " + formData : "adding mode...") + (Object.keys(errors).length!==0?"errors found...":""))
    return (
        <div>
            <form action=""  /* onSubmit={handleSubmit(editFlag?{handleOnSubmit }:{handleOnUpdate})} */ >
                <div>
                    <div>
                        <label htmlFor="productName">Product Name</label>
                        <input type="hidden" name="id" id="id" value={formData.id} />
                        <input 
                            type="text"
                            {...register("productName", {required: "enter a valid Name"})}
                            id="productName" 
                            value={formData.productName} 
                            onChange={handleOnChange} />{errors.productName?.message}
                    </div>
                    <div>
                    <label htmlFor="brand">Brand</label>
                        <input 
                            type="text" 
                            {...register("brand", {required: "enter a valid brand"})}
                            id="brand" 
                            value={formData.brand} 
                            onChange={handleOnChange} />{errors.brand?.message}
                    </div>
                    <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        type="text" 
                        {...register("quantity", {required: "enter a valid quantity"})} 
                        id="quantity"  
                        value={formData.quantity} 
                        onChange={handleOnChange}/>{errors.quantity?.message}
                    </div>
                    <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        type="text" 
                        {...register("image", {required: "can't be empty"})} 
                        id="image"  
                        value={formData.image} 
                        onChange={handleOnChange}/>{errors.image?.message}
                    </div>
                    <div>
                    <label htmlFor="price">Price</label>
                    <input 
                        type="text" 
                        {...register("price", {required: "enter a valid price"})} 
                        id="price"  
                        value={formData.price} 
                        onChange={handleOnChange}/>{errors.price?.message}
                    </div>
                    {(editFlag) ?           // different buttons when edit or add products
                        <>
                            <button onClick={handleSubmit(handleOnSubmit)}>Copy to new Product</button> {/* why not? */}
                            <button value="update" onClick={handleSubmit(handleOnUpdate)}>Update</button>
                        </>
                        : <button onClick={handleSubmit(handleOnSubmit)}>Add Product</button>}
                    { // cancel button will only show up when required
                     (Object.keys(errors).length!==0||editFlag)?<button value="cancel" onClick={handleOnEdit}>Cancel</button>:<></> 
                     }
                </div>
            </form>
        </div>
    )
}