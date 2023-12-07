/* This component will render product related info according to 
object contents passed as parameter.
it receives to props:
- item, is an object from products db
- onClick, function to handle click on add-to-cart button
*/

export default function InventoryCards({item, onClick, onDelete, handleOnUpdate})
{

//let's convert the object into array to use map and render its contents in return function
const info=Object.entries(item)
return(
        <div className="Inventory-Card" >
        {
            info.map((data) => (
                (
                    // looking for simplicity I used ternary operator to handle id, images and other data
                    // also I decided to handle presentation throug css instead of adding an element for every
                    // key/value in the array. I'm not sure if this is better but it helped me to remember
                    // some css. NOTE: for sure there's something simpler and easier to understand but I
                    // already had this I was to tired to change it before submitting, I'll try later :)
                    (data[0] === "__v" || data[0] === "createdAt" || data[0] === "updatedAt") ? <input type="hidden" key={data[0]}></input>:   // don't want to show this data retrieved from db
                                
                            (data[0] === "id") ? <input type="hidden" id={data[1]}  key={data[0]}  value={data[1]}></input> :  // I'm putting this here to get rid of old id
                            (data[0]==="_id")                                                    // is this the _id?, then create the button
                                ? <div id="button-container" key={data[0]}>
                                    <div><button className="btnInv" id={data["id"]} onClick={onClick} value={data[1]}>Add to cart</button></div>
                                    <span><button className="btnInv" onClick={onDelete} value={data[1]}>Delete</button>
                                    <button className="btnInv" onClick={handleOnUpdate} value={data[1]}>Edit</button></span>
                                </div>
                            : (data[0]==="image")                                               // image? then put it in a img tag
                            ? <img key={data[0]} src={data[1]}/>
                            : <div key={data[0]} className="Inventory-data">{data[1]}</div>     // otherwise just use a div to render other info
                ))
            )
        }
  
        </div>
    )
}