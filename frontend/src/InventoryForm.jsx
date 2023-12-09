//2 -- in this component, we have a form to fill with data for the new product to be added

import { appendErrors } from "react-hook-form";


export default function InventoryForm({formData, handleOnChange, handleOnSubmit, editFlag, handleOnEdit, handleOnUpdate, register, handleSubmit, errors, clearErrors }) {

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
                        <><button value="update" onClick={handleSubmit(handleOnUpdate)}>Update</button><button value="cancel" onClick={handleOnEdit}>Cancelar</button></>
                        : <button onClick={handleSubmit(handleOnSubmit)}>Add Product</button>}
                </div>
            </form>
        </div>
    )
}