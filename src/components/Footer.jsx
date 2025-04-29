import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white w-full h-auto p-10 text-gray-700 shadow-[-8px_-8px_16px_#d1d1d110]">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-20 mt-10 text-md ">
        <div className="flex flex-col items-center justify-start sm:items-start">
          <img src={assets.logo} alt="logo" className="mb-6 w-62" />
          <p className="capitalize w-full md:w-2/3 text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
            molestias blanditiis quam corporis eius non consequatur minima velit
            porro. Iusto, fugiat.
          </p>
        </div>

        <div className="">
          <p className="uppercase text-gray-600 mb-6 text-lg">
            <h3 className="teal mr-1 text-2xl">Quick Links</h3>
          </p>

          <ul className="flex flex-col gap-5 font-medium text-gray-700 items-start justify-center">
            <Link to="/">
              <li className="flex capitalize">home</li>
            </Link>
            <Link to="/about">
              <li className="flex capitalize">about us</li>
            </Link>
            <Link to="/collections">
              <li className="flex capitalize">our collections</li>
            </Link>
            <Link to="/privacy-policy">
              <li className="flex capitalize">privacy policy</li>
            </Link>
          </ul>
        </div>

        <div className="">
          <p className="uppercase text-gray-600 mb-6 text-lg">
            <h3 className="teal mr-1 text-2xl">Let's have a chat</h3>
          </p>

          <ul className="flex flex-col gap-5 font-medium text-gray-700 items-start justify-center">
            <li className="flex capitalize">+91 1234567890</li>
            <li className="flex">email@address.com</li>
          </ul>
        </div>
      </div>

      <div className="">
        <hr className="text-gray-300 w-[80vw] mx-auto" />

        <p className="uppercase py-5 text-center teal font-medium">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gray-700 ">fancyfashion.co.ke</span> - all
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
