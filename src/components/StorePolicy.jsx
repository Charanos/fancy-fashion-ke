import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const StorePolicy = () => {
  return (
    <div
      className="flex 
            flex-col 
            sm:flex-row 
            items-center 
            justify-evenly 
            gap-8 
            sm:gap-10 
            md:gap-12
            sm:my-40 
            my-30
            py-20
            px-10
            text-sm 
            md:text-md 
            lg:text-base
            text-gray-700
            rounded-xl
            bg-white
            border-none
            shadow-[6px_6px_15px_#e1e1e1, -6px_-6px_12px_#f4f4f4]
            transition-all
            duration-300"
    >
      <div className="">
        <img
          alt="exchange"
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5"
        />

        <p className="capitalize font-semibold text-center ">
          Stress-Free Returns & Exchanges
        </p>

        <p className="capitalize text-center mt-4 text-gray-600">
          Didn't get exactly what you wanted? No problem! Our hassle-free
          exchange and return process puts your satisfaction first.
        </p>
      </div>

      <div className="">
        <img
          alt="quality"
          src={assets.quality_icon}
          className="w-12 m-auto mb-5"
        />

        <p className="capitalize font-semibold text-center ">
          Full Week to Decide
        </p>

        <p className="capitalize text-center mt-4 text-gray-600">
          Take your time—enjoy a full 7 days to return any purchase with zero
          questions asked.
        </p>
      </div>

      <div className="">
        <img
          alt="support"
          src={assets.support_img}
          className="w-10 m-auto mb-5"
        />

        <p className="capitalize font-semibold text-center ">
          Always Here for You
        </p>

        <p className="capitalize text-center mt-4 text-gray-600">
          Day or night, our dedicated support team is just a message away, ready
          to solve any issue that comes up.
        </p>
      </div>
    </div>
  );
};

export default StorePolicy;
