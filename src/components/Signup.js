import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import bcrypt from "bcryptjs";

import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    setLoading(true);
    try {
      await addDoc(usersRef, form);
      uploadData();
      swal({
        title: "Successfully added",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      navigate("/login");

      setForm({
        name: "",
        mobile: "",
        password: "",
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

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Sign Up</h1>

      <>
        <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-black">
              Name
            </label>
            <input
              id="message"
              name="message"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-black">
              Mobile Number
            </label>
            <input
              type={"number"}
              id="message"
              name="message"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
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
            onClick={addUser}
            class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "SignUp"}
          </button>
        </div>
      </>

      <div>
        <p>
          Already have an account{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
