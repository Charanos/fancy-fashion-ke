// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
// import { toast } from "react-toastify";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "KSH";
//   const deliveryFee = 100;

//   const [cartItems, setCartItems] = useState({});

//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(true);

//   const addToCart = async (size, itemId) => {
//     if (!itemId || !size) {
//       toast.error("Please select a size first.");
//       return;
//     }

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let count = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             count += cartItems[items][item];
//           }
//         } catch (error) {
//           toast.error("Error calculating cart count: " + error.message);
//         }
//       }
//     }
//     return count;
//   };

//   const value = {
//     products,
//     currency,
//     cartItems,
//     addToCart,
//     showSearch,
//     searchQuery,
//     deliveryFee,
//     getCartCount,
//     setShowSearch,
//     setSearchQuery,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "KSH";
  const deliveryFee = 100;
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const addToCart = async (size, itemId) => {
    if (!itemId || !size) {
      toast.error("Please select a size first.");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart!");
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        // If no sizes left for this item, remove the item completely
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Update quantity
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
      // If no sizes left for this item, remove the item completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Item removed from cart!");
    }
  };

  const clearCart = () => {
    setCartItems({});
    toast.success("Cart cleared!");
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            count += cartItems[items][item];
          }
        } catch (error) {
          toast.error("Error calculating cart count: " + error.message);
        }
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          try {
            if (cartItems[itemId][size] > 0) {
              totalAmount += itemInfo.price * cartItems[itemId][size];
            }
          } catch (error) {
            console.error("Error calculating cart amount:", error);
          }
        }
      }
    }
    return totalAmount;
  };

  const getItemQuantity = (itemId, size) => {
    return cartItems[itemId]?.[size] || 0;
  };

  const isInCart = (itemId, size = null) => {
    if (size) {
      return cartItems[itemId]?.[size] > 0;
    }
    // Check if item exists in cart with any size
    return (
      cartItems[itemId] &&
      Object.values(cartItems[itemId]).some((qty) => qty > 0)
    );
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  const value = {
    products,
    currency,
    cartItems,
    deliveryFee,
    searchQuery,
    showSearch,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartAmount,
    getItemQuantity,
    isInCart,
    setShowSearch,
    setSearchQuery,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
