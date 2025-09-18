// "use client";

// import { createSlice } from "@reduxjs/toolkit";

// const loadCartFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   }
//   return [];
// };

// const saveCartToLocalStorage = (cartItems) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//       cartItems: loadCartFromLocalStorage(),
//     },
//     reducers: {
//       addToCart: (state, action) => {
//         const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
//         if (existingItem) {
//           existingItem.quantity += 1;
//         } else {
//           state.cartItems.push({ ...action.payload, quantity: 1 });
//         }
//         saveCartToLocalStorage(state.cartItems);
//       },
//       removeFromCart: (state, action) => {
//         state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
//         saveCartToLocalStorage(state.cartItems);
//       },
//       setCartItems: (state, action) => {
//         state.cartItems = action.payload;
//         saveCartToLocalStorage(state.cartItems);
//       },
//       // ✅ Add increaseQuantity & decreaseQuantity
//       increaseQuantity: (state, action) => {
//         const item = state.cartItems.find((item) => item.id === action.payload);
//         if (item) {
//           item.quantity += 1;
//         }
//         saveCartToLocalStorage(state.cartItems);
//       },
//       decreaseQuantity: (state, action) => {
//         const item = state.cartItems.find((item) => item.id === action.payload);
//         if (item && item.quantity > 1) {
//           item.quantity -= 1;
//         }
//         saveCartToLocalStorage(state.cartItems);
//       },
//     },
//   });
  
//   export const { addToCart, removeFromCart, setCartItems, increaseQuantity, decreaseQuantity } =
//     cartSlice.actions;
//   export default cartSlice.reducer;
      

// "use client";

// import { createSlice } from "@reduxjs/toolkit";

// const loadCartFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   }
//   return [];
// };

// const saveCartToLocalStorage = (cartItems) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: loadCartFromLocalStorage(),
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//       saveCartToLocalStorage(state.cartItems);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
//       saveCartToLocalStorage(state.cartItems);
//     },
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//       saveCartToLocalStorage(state.cartItems);
//     },
//     increaseQuantity: (state, action) => {
//       const item = state.cartItems.find((item) => item.id === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//       saveCartToLocalStorage(state.cartItems);
//     },
//     decreaseQuantity: (state, action) => {
//       const item = state.cartItems.find((item) => item.id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//       saveCartToLocalStorage(state.cartItems);
//     },
//     // ✅ Clear Cart Reducer
//     clearCart: (state) => {
//       state.cartItems = [];
//       saveCartToLocalStorage([]); // Clear localStorage
//     },
//   },
// });

// export const { addToCart, removeFromCart, setCartItems, increaseQuantity, decreaseQuantity, clearCart } =
//   cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//     },
//     addToCart: (state, action) => {
//       const item = state.cartItems.find((i) => i.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     increaseQuantity: (state, action) => {
//       const item = state.cartItems.find((i) => i.id === action.payload);
//       if (item) item.quantity += 1;
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     decreaseQuantity: (state, action) => {
//       const item = state.cartItems.find((i) => i.id === action.payload);
//       if (item && item.quantity > 1) item.quantity -= 1;
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const { setCartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
