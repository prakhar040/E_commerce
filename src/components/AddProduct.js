import React from 'react';
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { productsRef } from '../firebase/firebase';
import swal from "sweetalert";
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [data, setData] = useState({
        title:"",
        img:"",
        company:"",
        price:"",
        info:""
    })
    const [loading, setLoading] = useState(false);

    const products=async ()=>{
        setLoading(true);
    try {
      await addDoc(productsRef, data);
      swal({
        title: "Successfully added",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setData({
        title:"",
        img:"",
        company:"",
        price:"",
        info:""
      });
    } catch (err) {
    swal({
      title: err,
      icon: "error",
      buttons: false,
      timer: 3000,
    });
  }
  setLoading(false);
};

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
      };
  return (
    <div>
    <Link to={"/showproduct"}>
        <button className=" ml-8 mt-8 bg-white p-2 text-xl">
          Show Products
        </button>
      </Link>

<h1 className=" text-center mt-9 text-4xl">
        Add Product
      </h1>
      <form className='flex flex-col justify-center items-center mt-10 text-2xl' onSubmit={handleSubmit} >
        <label>
          Product Name:
          <br />
          <input
            className=" text-black"
            type="text"
            placeholder="Product Name"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image Link:
          <br />
          <input
            className=" text-black"
            type="text"
            placeholder="Image Link"
            name="img"
            value={data.img}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Product Company:
          <br />
          <input
            className=" text-black"
            type="text"
            placeholder="Product Company"
            name="company"
            value={data.company}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Product Price:
          <br />
          <input
            className=" text-black"
            type="number"
            placeholder="Product Price"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
          
            className=" text-black "
            type="text"
            placeholder="Product Description"
            name="info"
            value={data.info}
            onChange={handleChange}
            
          />
        </label>
        <br />
        
        <button onClick={products}  className=" bg-blue-500 mb-20 p-2" type="submit">
          {loading ? <TailSpin height={25} color="white" /> : "Add Product"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
