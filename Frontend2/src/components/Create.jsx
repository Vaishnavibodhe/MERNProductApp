import React ,{useState} from 'react'
import axios from "axios"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Create = () => {
const [file,setFile] = useState()
const [name,setName] = useState("");
const [price,setPrice] = useState();
const [discount ,setDiscount]= useState();
const [bgcolor , setBgcolor] =useState("");
const [panelcolor, setPanelcolor] =useState("");
const [textcolor ,setTextcolor] =useState("");

let navigate=useNavigate();

const handleSubmit=(e)=>{
e.preventDefault();

const formData = new FormData();
formData.append('file', file);
formData.append('name', name);
formData.append('price', price);
formData.append('discount', discount);
formData.append('bgcolor', bgcolor);
formData.append('panelcolor', panelcolor);
formData.append('textcolor', textcolor);

axios.post("https://backend-chi-ivory.vercel.app/create",formData)
.then(result => {
  console.log(result)
    navigate("/alldata")
})
.catch(err=> console.log(err))
}

  return (
    <div>
      <div className="min-h-screen flex flex-col font-serif text-slate-800">
                <div className="container px-10 py-20 flex flex-grow">
                    <div className="w-[25%] flex h-screen flex-col items-start">
                        <div className="flex flex-col">
                            <Link to="/alldata" className="block w-fit mb-2 
                            hover:text-2xl  curser-pointer" >All Products</Link>
                            
                        </div>
                    </div>
             <div className="w-3/4 bg-white p-8 shadow ml-4">
          <h2 className="text-xl font-bold mb-4">Create New Product</h2>                    
    <form onSubmit={handleSubmit}>
        <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">Product Details</h3>
    <div className="mb-4">
    <label className="block mb-2 font-medium">Product Image</label>
    <input
  name="image" type="file" className="py-2 px-4 rounded"
  onChange={(e) => setFile(e.target.files[0])}
  ref={(input) => {
    if (input) {
      input.value = ''; // Clear the file input
    }
  }}
  />
 </div>             
    <div className="grid grid-cols-2 gap-4">
 <input name="name" type="text" placeholder="Product Name"
 className="border p-2 rounded w-full"
 value={name} onChange={e=> setName(e.target.value)}/>

<input name="price" type="text" placeholder="Product Price"
className="border p-2 rounded w-full"
value={price} onChange={e=> setPrice(e.target.value)}/>

<input name="discount" type="text" placeholder="Discount Price"
className="border p-2 rounded w-full"
value={discount} onChange={e=> setDiscount(e.target.value)}/>
</div>
</div>

     <div>
     <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
        <div className="grid grid-cols-2 gap-4">
         <input name="bgcolor" type="text" placeholder="Background Color"
        className="border p-2 rounded w-full"
        value={bgcolor} onChange={e=> setBgcolor(e.target.value)}/>

    <input name="panelcolor" type="text" placeholder="Panel Color"
    className="border p-2 rounded w-full"
    value={panelcolor} onChange={e=> setPanelcolor(e.target.value)}/>

 <input name="textcolor" type="text" placeholder="Text Color"
  className="border p-2 rounded w-full"
  value={textcolor} onChange={e=> setTextcolor(e.target.value)}/>
    </div>
    </div>
     <input className="px-5 py-2 rounded mt-3 bg-blue-500 text-white" type="submit"
        />
 </form>
        </div> 
      </div>
    </div>  
</div>
  )}
  
export default Create