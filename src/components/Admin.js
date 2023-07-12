import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { adminRef } from '../firebase/firebase';
import {Appstate} from "../App";
import swal from 'sweetalert';
import bcrypt from "bcryptjs";
import { query, where, getDocs } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        name: "",
        password: "",
      });
      const [loading, setLoading] = useState(false);

      const login = async () => {
        setLoading(true);
        try {
          const quer = query(adminRef, where("name", "==", form.name));
          const querySnapshot = await getDocs(quer);
    
          querySnapshot.forEach((doc) => {
            const _data = doc.data();
            const isUser = bcrypt.compareSync(form.password, _data.password);
            if (isUser) {
              useAppstate.setLogin(true);
              useAppstate.setUserName(_data.name);
              swal({
                title: "Logged In",
                icon: "success",
                buttons: false,
                timer: 3000,
              });
              navigate("/addproduct");
            } 
          
          });
        } catch (error) {
          swal({
            title: error.message,
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
        setLoading(false);
      };

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-black">
            Admin Name
          </label>
          <input
            type={"text"}
            id="message"
            name="message"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-black">
            Password
          </label>
          <input
            type="password"
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      
    </div>
  )
}

export default Login
