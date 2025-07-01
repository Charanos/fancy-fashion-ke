import Title from "../components/Title";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import React, { useContext, useEffect, useState } from "react";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    clearCart,
    getCartAmount,
    updateQuantity,
    removeFromCart,
  } = useContext(ShopContext);

  const [discount, setDiscount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (id, size, change) => {
    const currentQuantity = cartItems[id]?.[size] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    if (newQuantity === 0) {
      removeFromCart(id, size);
    } else {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handlePromoCode = () => {
    // Simple promo code logic - you can expand this
    const validCodes = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      WELCOME: 0.15,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
      setPromoCode("");
      return;
    }
  };

  const subtotal = getCartAmount();
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 0 ? (subtotal > 900 ? 0 : 100) : 0;
  const total = subtotal - discountAmount + shipping;

  if (cartData.length === 0) {
    return (
      <div className="mx-auto px-4 sm:px-6 py-14 border-t border-gray-200">
        <div className="text-2xl mb-6">
          <Title text1={"Your"} text2={"Cart"} />
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff] text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9H19M7 13v8a2 2 0 100 4 2 2 0 000-4zm8 0v8a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 prata-regular">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/collections"
            className="
              inline-block
              bg-teal-600 text-white
              px-6 py-2 sm:px-8 sm:py-3
              rounded-xl font-medium
              shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff]
              hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
              active:shadow-[inset_2px_2px_4px_#4a9992,_inset_-2px_-2px_4px_#5fb3ab]
              transition-all duration-300
              hover:scale-105
            "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-14 min-h-screen border-t border-gray-200">
      <div className="text-2xl mb-6">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff]">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-xl font-semibold prata-regular">
                Cart Items ( {cartData.length} )
              </h2>
              <button
                onClick={clearCart}
                className="
                  text-teal-500 hover:text-teal-700
                  text-xs sm:text-sm font-medium
                  transition-colors duration-300 cursor-pointer underline
                "
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {cartData.map((item) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="bg-gray-50 rounded-xl p-3 sm:p-4 shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-auto h-auto flex-shrink-0">
                        <img
                          alt={product.name}
                          src={product.image[0]}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 prata-regular">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-[10px] sm:text-sm">
                            Size: {item.size}
                          </span>
                          <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-[10px] sm:text-sm">
                            {currency} {product.price} each
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                          <div className="flex items-center gap-3 mb-3 sm:mb-0">
                            <span className="text-sm font-medium text-gray-600">
                              Quantity:
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, item.size, -1)
                                }
                                className="
                                  w-8 h-8 sm:w-8 sm:h-8
                                  rounded-lg cursor-pointer flex items-center justify-center text-sm font-medium
                                  shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                                  hover:shadow-[1px_1px_2px_#d1d9e6,_-1px_-1px_2px_#ffffff]
                                  active:shadow-[inset_1px_1px_2px_#d1d9e6,_inset_-1px_-1px_2px_#ffffff]
                                  transition-all duration-200 hover:scale-105 hover:bg-gray-200
                                "
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, item.size, 1)
                                }
                                className="
                                  w-8 h-8 sm:w-8 sm:h-8
                                  cursor-pointer rounded-lg flex items-center justify-center text-sm font-medium
                                  shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                                  hover:shadow-[1px_1px_2px_#d1d9e6,_-1px_-1px_2px_#ffffff]
                                  active:shadow-[inset_1px_1px_2px_#d1d9e6,_inset_-1px_-1px_2px_#ffffff]
                                  transition-all duration-200 hover:scale-105 hover:bg-gray-200
                                "
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right flex items-center gap-6">
                            <div className="text-xl font-bold text-teal-700">
                              {currency}{" "}
                              {(product.price * item.quantity).toLocaleString()}
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(item._id, item.size)
                              }
                              className="text-red-500 hover:text-red-700 text-sm transition-colors duration-300"
                            >
                              <img
                                src={assets.bin_icon}
                                alt="delete item from cart"
                                className="w-4 h-4 sm:w-5 sm:h-5 inline-block hover:scale-110 transition-transform duration-200 cursor-pointer"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[inset_4px_4px_8px_#d1d9e6,_inset_-4px_-4px_8px_#ffffff] md:sticky md:top-4">
            <h2 className="text-xl font-semibold mb-6 prata-regular">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Promo Code
              </label>
              <div className="flex flex-col sm:flex-row gap-6">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="
                    w-full sm:w-auto
                    px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500
                    shadow-[inset_2px_2px_4px_#d1d9e6,_inset_-2px_-2px_4px_#ffffff]
                  "
                />
                <button
                  onClick={handlePromoCode}
                  className="
                    w-full sm:w-auto
                    px-4 py-2 bg-teal-600 text-white rounded-lg font-medium
                    shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                    hover:shadow-[1px_1px_2px_#d1d9e6,_-1px_-1px_2px_#ffffff]
                    active:shadow-[inset_1px_1px_2px_#4a9992,_inset_-1px_-1px_2px_#5fb3ab]
                    transition-all duration-200 hover:scale-105
                  "
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ {discount * 100}% discount applied!
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Subtotal</span>
                <span>
                  {currency} {subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Discount</span>
                  <span>
                    -{currency} {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `${currency} ${shipping.toLocaleString()}`}
                </span>
              </div>

              <hr className="border-gray-300" />

              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>
                  {currency} {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Free Shipping Notice */}
            {subtotal > 0 && subtotal < 900 && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-6">
                <p className="text-teal-700 text-sm">
                  Add {currency} {(900 - subtotal).toLocaleString()} more for
                  free shipping!
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/place-order"
                className="
                  block w-full sm:w-auto
                  bg-black text-white
                  py-3 sm:py-3
                  rounded-xl font-medium text-center
                  shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff]
                  hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                  active:shadow-[inset_2px_2px_4px_#333333,_inset_-2px_-2px_4px_#666666]
                  transition-all duration-300
                  hover:scale-105 hover:bg-teal-800
                "
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/collections"
                className="
                  block w-full sm:w-auto
                  bg-white text-gray-800
                  py-3 sm:py-3
                  rounded-xl font-medium text-center
                  border border-gray-300
                  shadow-[4px_4px_8px_#d1d9e6,_-4px_-4px_8px_#ffffff]
                  hover:shadow-[2px_2px_4px_#d1d9e6,_-2px_-2px_4px_#ffffff]
                  active:shadow-[inset_2px_2px_4px_#d1d9e6,_inset_-2px_-2px_4px_#ffffff]
                  transition-all duration-300
                  hover:scale-105 hover:bg-gray-50
                "
              >
                Continue Shopping
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-10 text-center">
              <div className="flex items-center justify-center gap-2 text-sm sm:text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure Checkout</span>
              </div>

              <div className="items-center">
                <img
                  src={assets.mpesa}
                  alt="accepted payment methods"
                  className="mx-auto mt-2 w-16 sm:w-20 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
