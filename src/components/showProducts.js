import { doc, getDocs } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { productsRef } from "../firebase/firebase";

const ShowProducts=()=>{
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setData([]);
      const _data = await getDocs(productsRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });

      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div>
    <div className=" mt-6 ml-8 mr-8">
        {loading ? (
          <div className=" w-full flex justify-center items-center h-96">
            <ThreeDots height={40} color="white" />
          </div>
        ) : (
          data.map((e, i) => {
            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Company</th>
                      <th>Price</th>
                      <th>Description</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{e.title}</td>
                      <td>{e.company}</td>
                      <td>{e.price}</td>
                      <td>{e.info}</td>
                      
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShowProducts;