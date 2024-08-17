import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`https://backendb-ltn4.onrender.com/admin/getproductbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(result => {
        const fetchedProduct = result.data;
        setProduct(fetchedProduct);
        calculateTotalAmount(fetchedProduct);
      })
      .catch(err => console.log(err));
  }, [id]);

  const deleteProduct = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://backendb-ltn4.onrender.com/admin/deleteproduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(result => {
        console.log(result);
        navigate("/getproducts");
      })
      .catch(err => console.log(err));
  };

  const calculateTotalAmount = (product) => {
    const discountedPrice = product.price - product.discount;
    setTotalAmount(discountedPrice);
  };

  return (
    <div className="mt-20 flex ml-20">
      <div className="flex mt-4 flex-wrap gap-4 text-white">
        <div
          key={product._id}
          style={{ backgroundColor: product.bgcolor }}
          className="shadow-lg rounded-lg overflow-hidden"
        >
          <h2 className="font-bold px-8 py-4">{product.name}</h2>
          <div>
            <img
              src={`https://backendb-ltn4.onrender.com/admin/Images/${product.file}`}
              alt={product.name}
              className="w-full h-[60%] object-cover"
            />
          </div>
          <div
            className="w-full px-4 flex justify-between items-center"
            style={{ backgroundColor: product.panelcolor }}
          >
            <div>
              <h2>Price: ${product.price}</h2>
              <h2>Discount: ${product.discount}</h2>
            </div>
            <div>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600 text-2xl"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] ml-24 mt-8">
        <h3 className="text-xl font-semibold">Price Breakdown</h3>
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
          <h3 className="w-1/3 text-xl font-semibold">Total Amount</h3>
          <h3 className="font-semibold text-xl text-green-600">${totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
