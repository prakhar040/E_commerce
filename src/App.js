import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from './components/Cart/Cart'
import Modal from './components/Modal';
import Default from './components/Default';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { createContext } from "react";
import AddProduct from "./components/AddProduct";
import ShowProducts from "./components/showProducts";
import Admin from "./components/Admin";

const Appstate=createContext();



function App() {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState("");
  return (
    <Appstate.Provider value={{login,userName,setLogin,setUserName}}>
    <div >
    <Navbar />
    <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/showproduct" element={<ShowProducts />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Default />} />


        </Routes>
        <Modal />

    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}
