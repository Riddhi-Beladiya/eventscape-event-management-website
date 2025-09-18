
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";

// Cart Item Component
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const itemPrice = Number(item.price) * Number(item.quantity);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <Image
          className="rounded-lg w-full sm:w-32 sm:h-32 object-cover"
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">{item.name}</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                disabled={item.quantity <= 1}
                className="bg-gray-200 px-3 py-1 rounded text-gray-700 hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="bg-gray-200 px-3 py-1 rounded text-gray-700 hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-gray-800 font-medium">₹{itemPrice.toFixed(2)}</p>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500 hover:text-red-700 mt-2 transition"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Cart Page
const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const orderData = {
      ...formData,
      items: cartItems,
      totalAmount,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to place order");

      dispatch(clearCart());
      setIsModalOpen(false);
      setIsOrderConfirmed(true); // Show confirmation pop-up
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="pt-24 min-h-screen mx-auto pb-6 px-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-semibold">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center mt-10">Your cart is empty.</p>
      ) : (
        <div className="mt-5 flex flex-col lg:flex-row justify-center gap-6">
          <div className="w-full lg:w-[60%] flex flex-col gap-5">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Order Summary</h4>
              <div className="flex justify-between mt-3">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900 font-medium">
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-semibold">Total (Including VAT)</p>
                <p className="font-semibold">₹{totalAmount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition"
              >
                Place my Order
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
            <input
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border rounded"
            ></textarea>

            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isOrderConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Order Confirmed 🎉</h3>
            <p className="text-gray-700 mb-4">
              Your order has been successfully placed.
            </p>
            <button
              onClick={() => setIsOrderConfirmed(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
