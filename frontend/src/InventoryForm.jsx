//2 -- in this component, we have a form to fill with data for the new product to be added


export default function InventoryForm({formData, handleOnChange, handleOnSubmit, editFlag, handleOnUpdate }) {

    return (
        <div>
            <form action=""/*  onSumbit={handleOnSubmit }*/>
                <div>
                    <div>
                        <label htmlFor="productName">Product Name</label>
                        <input type="hidden" name="id" id="id" value={formData.id} />
                        <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleOnChange} />
                    </div>
                    <div>
                    <label htmlFor="brand">Brand</label>
                        <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleOnChange} />
                    </div>
                    <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" name="quantity" id="quantity"  value={formData.quantity} onChange={handleOnChange}/>
                    </div>
                    <div>
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image"  value={formData.image} onChange={handleOnChange}/>
                    </div>
                    <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price"  value={formData.price} onChange={handleOnChange}/>
                    </div>
                    {(editFlag) ?           // different buttons when edit or add products
                        <><button value="update" onClick={handleOnUpdate}>Update</button><button value="cancel" onClick={handleOnUpdate}>Cancelar</button></>
                        : <button onClick={handleOnSubmit}>Add Product</button>}
                </div>
            </form>
        </div>
    )
}