import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever} from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate=useNavigate();

  useEffect(() => {
    axios.get(`https://backend-chi-ivory.vercel.app/getproductbyid/${id}`)
      .then(result => {
        const fetchedProduct = result.data;
        setProduct(fetchedProduct);
        calculateTotalAmount(fetchedProduct);
      })
      .catch(err => console.log(err));
  }, [id]);

  const deleteProduct=(id)=>{
    axios.delete(`http://localhost:4005/deleteproduct/${id}`)
    .then(result => {
      console.log(result)
      navigate("/alldata")
    }).catch(err => console.log(err))
  }

  const calculateTotalAmount = (product) => {
    const discountedPrice = product.price - product.discount;
    setTotalAmount(discountedPrice);
  };

  return (
    <div className="mt-20 flex ml-20">
      <div className="flex mt-4 flex-wrap gap-4 text-white">
        <div key={product._id}
          style={{ backgroundColor: product.bgcolor }}
          className="">
          <h2 className="font-bold px-8 py-4">{product.name}</h2>
          <div className="">
            <img src={`http://localhost:4005/Images/${product.file}`} alt={product.name} className="w-full h-[60%] object-cover" />
          </div>
          <div className="w-full px-4 flex justify-between items-center" style={{ backgroundColor: product.panelcolor }}>
            <div className="">
              <h2>Price: ${product.price}</h2>
              <h2>Discount: ${product.discount}</h2>
            </div>
            <div className="">
              <button onClick={e=> deleteProduct(product._id)}><MdDeleteForever /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] ml-24 mt-8">
        <h3 className="text-xl">Price Breakdown</h3>
        <div className="px-10 mt-5">
          <div className="flex mt-2">
            <h4 className="w-1/3">Total MRP</h4>
            <h4>${product.price}</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Discount on MRP</h4>
            <h4>${product.discount}</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Shipping Fee</h4>
            <h4>FREE</h4>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black mt-10"></div>
        <div className="flex mt-5">
          <h3 className="w-1/3 text-xl">Total Amount</h3>
          <h3 className="font-semibold text-xl text-green-600">${totalAmount}</h3>
        </div>
      </div>
    </div>
  );
}

export default Product;
