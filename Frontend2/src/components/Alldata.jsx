import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import { MdDeleteForever } from "react-icons/md";


const Alldata = () => {
  const [products, setProducts] = useState([]);
  


  useEffect(() => {
    axios.get("http://localhost:4005/getproducts")
      .then(response => {
        console.log(response.data)
        setProducts(response.data);
      })
      .catch(err => console.log(err));
  }, []);
 
  

  return (
    <div className=" px-32 py-24  flex flex-col gap-5 h-screen">
      <h1 className=" flex justify-center text-3xl font-serif text-slate-500 hover:text-black mb-14  ">Here All Products</h1>
      <div className=" gap-10 flex flex-wrap text-white " >
        {products.map(product => (
           <Link to={`/product/${product._id}`}>
          <div key={product._id} 
          style={{ backgroundColor: product.bgcolor }}
          className=" border-b-2 rounded-md w-60">
            <h2 className="font-bold px-8 py-4">{product.name} </h2>
            <div className=" w-full h-52 flex items-center justify-center ">
              <img src={`http://localhost:4005/Images/${product.file}`} alt={product.name} className="w-full object-cover" />
            </div>
            <div className="w-full px-4  flex justify-between items-center" style={{ backgroundColor: product.panelcolor }}>
            <div className="">
              <h2>Price: ${product.price} </h2>
              <h2>Discount: ${product.discount} </h2>
              </div>
              <div className="flex gap-3">
             
             <button  ><MdDeleteForever/></button>
             </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Alldata
