import React from "react";

const Newsletter = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <div className="text-center mb-30">
      <p className="text-2xl header text-gray-900 mb-8">
        STYLE UPDATES & EXCLUSIVE OFFERS
      </p>

      <p className="">
        Become a style insider! Subscribe to our newsletter for first looks at
        new collections, seasonal trend alerts, and exclusive subscriber-only
        discounts on the fashion pieces you'll love.
      </p>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Your fashion inbox awaits..."
          className="bg-white py-3 px-9 my-18 sm:mx-auto md:mx-5.5 md:w-[60vw] mx-auto w-full sm:flex-1  outline-none rounded-lg border-none required text-gray-700 focus:outline-none shadow-[inset_6px_6px_12px_#e1e1e1,_inset_-6px_-6px_12px_#ffffff] placeholder-gray-400 transition-shadow duration-300
          "
        />

        <button
          type="submit"
          className="uppercase cursor-pointer bg-black hover:bg-teal-600 text-gray-100 font-semibold rounded-lg px-18 py-3 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
