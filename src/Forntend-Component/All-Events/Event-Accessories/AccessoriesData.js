// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { FaCartShopping } from "react-icons/fa6";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/store/cartSlice";
// import { fetchProducts } from "@/app/api/Productapi";
// import "./AccessoriesData.css";

// const AccessoriesData = () => {
//   const [accessories, setAccessories] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getProducts = async () => {
//       const storedProducts =
//         JSON.parse(localStorage.getItem("accessories")) || [];
//       if (storedProducts.length > 0) {
//         setAccessories(storedProducts);
//       } else {
//         const productsData = await fetchProducts();
//         if (productsData) {
//           const productsArray = Object.keys(productsData).map((key) => ({
//             id: key,
//             ...productsData[key],
//           }));
//           setAccessories(productsArray);
//           localStorage.setItem("accessories", JSON.stringify(productsArray));
//         }
//       }
//     };
//     getProducts();
//   }, []);

//   const handleAddToCart = (item) => {
//     if (!item || !item.id) {
//       console.error("Invalid item data:", item);
//       return;
//     }
//     dispatch(addToCart(item));
//   };

//   return (
//     <div className="accessoriesdata">
//       {accessories.length > 0 ? (
//         accessories.map((item) => (
//           <div key={item.id} className="accessoriesdata_card">
//             <div className="accessoriesdata_image">
//               <Image
//                 src={item.image || "/default-image.jpg"}
//                 alt={item.name || "Accessory"}
//                 width={400}
//                 height={300}
//                 className="w-full h-[300px] object-cover rounded-t-md"
//               />
//               <p className="accessoriesdata_price bg-blue-500 text-white px-4 py-2 rounded-lg">
//                 $ {item.price || "N/A"}
//               </p>
//             </div>

//             <div className="accessoriesdata_bottom">
//               <h2>{item.name || "No Title"}</h2>
//               <p className="accessoriesdata_intro">
//                 {item.description || "No description available."}
//               </p>
//               <button
//                 className="add-to-cart flex gap-2 btn"
//                 onClick={() => handleAddToCart(item)}
//               >
//                 <FaCartShopping className="text-xl" /> Add To Cart
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Loading accessories...</p>
//       )}
//     </div>
//   );
// };

// export default AccessoriesData;



"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { fetchProducts } from "@/app/api/Productapi";
import "./AccessoriesData.css";

const AccessoriesData = ({ searchQuery }) => {
  const [accessories, setAccessories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const storedProducts =
        JSON.parse(localStorage.getItem("accessories")) || [];
      if (storedProducts.length > 0) {
        setAccessories(storedProducts);
      } else {
        const productsData = await fetchProducts();
        if (productsData) {
          const productsArray = Object.keys(productsData).map((key) => ({
            id: key,
            ...productsData[key],
          }));
          setAccessories(productsArray);
          localStorage.setItem("accessories", JSON.stringify(productsArray));
        }
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = (item) => {
    if (!item || !item.id) {
      console.error("Invalid item data:", item);
      return;
    }
    dispatch(addToCart(item));
  };

  // Filter Accessories Based on Search Query
  const filteredAccessories = accessories.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="accessoriesdata">
      {filteredAccessories.length > 0 ? (
        filteredAccessories.map((item) => (
          <div key={item.id} className="accessoriesdata_card">
            <div className="accessoriesdata_image">
              <Image
                src={item.image || "/default-image.jpg"}
                alt={item.name || "Accessory"}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover rounded-t-md"
              />
              <p className="accessoriesdata_price bg-blue-500 text-white px-4 py-2 rounded-lg">
                $ {item.price || "N/A"}
              </p>
            </div>

            <div className="accessoriesdata_bottom">
              <h2>{item.name || "No Title"}</h2>
              <p className="accessoriesdata_intro">
                {item.description || "No description available."}
              </p>
              <button
                className="add-to-cart flex gap-2 btn"
                onClick={() => handleAddToCart(item)}
              >
                <FaCartShopping className="text-xl" /> Add To Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No matching products found.</p>
      )}
    </div>
  );
};

export default AccessoriesData;
