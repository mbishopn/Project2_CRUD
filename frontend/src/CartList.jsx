/*
This component will render all Cart information
it receives 4 props:
- cart, is the array containing all items in the cart
- emptyCart, the function to delete the whole cart and reinitialize Total to 0
- removeItem, function to remove and item when click on its remove button
- Total, variable to keep track to total amount of sale

all items in cart are cartItems objects with this keys
- uuid, unique identifier
- name, the product name
- price, do I need to explain this one too?
*/


export default function CartList({cart, emptyCart, removeItem, Total})
{

    return(
        <div className="CartList-Container">
            {(cart.length===0)  // if cart array is empty, then let the user know
            ?<div>Your cart is Empty</div>
            :<div >             {/* // if not empty then render all items */}
                <h2>Your Cart</h2>
                <p>No. of Items: {cart.length}</p>
                {
                cart.map((item)=>       // use map to print all cartItem elements
                    (
                    <div className="CartList-Card" key={item["cartItem"].uuid}>
                        <div className="CartList-Card-Info">
                            <div>{item["cartItem"].name}</div>
                            <div>{item["cartItem"].price}</div>
                        </div>             {/* //removeItem function uses cartItem uuid to identify the element to remove from the cart */}
                        <button className="Remove-Button CartList-Buttons" onClick={()=>removeItem(item["cartItem"].uuid)}>Remove</button>
                    </div>
                    )
                )
                }
                {/* down here, buttons for emptycart and buy are rendered, emptyCart function is called onClick the first */}
                <div className="CartList-Card-Info">
                    <button className="Remove-Button CartList-Buttons" onClick={()=>emptyCart()} value="delete">Empty Cart</button>
                    <button className="CartList-Buttons" id="Buy-Button">Buy-Total: ${Total.toFixed(2)}</button>
                </div>
            </div>
            }

        </div>

    )
}