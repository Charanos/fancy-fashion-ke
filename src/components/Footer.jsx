import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick links data for easier maintenance
  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Our Collections", path: "/collections" },
    { title: "Privacy Policy", path: "/privacy-policy" }
  ];

  return (
    <div className="bg-white mt-20 w-full h-auto p-8 text-gray-700 shadow-[-8px_-8px_16px_rgba(209,209,209,0.2)]">
      <div className="container mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-md">
        {/* Brand section */}
        <div className="flex flex-col items-center justify-start sm:items-start">
          <div className="mb-6">
            <img src={assets.logo} alt="Fancy Fashion Logo" className="w-60" />
          </div>
          <p className="w-full md:w-2/3 text-gray-600 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
            molestias blanditiis quam corporis eius non consequatur minima velit
            porro. Iusto, fugiat.
          </p>
        </div>

        {/* Quick Links section */}
        <div className="mt-6 sm:mt-0">
          <h3 className="text-xl font-semibold text-gray-800 prata-regular mb-6">
            Quick Links
          </h3>

            <ul className="flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <li>
                  <Link 
                   key={index}
                    to={link.path}
                    className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 capitalize"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
        </div>

        {/* Contact section */}
        <div className="mt-6 sm:mt-0">
          <h3 className="text-xl font-semibold text-gray-800 prata-regular mb-6">
            Let's Chat
          </h3>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                +91 1234567890
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                email@address.com
              </li>
            </ul>
        </div>
      </div>

      {/* Copyright section */}
      <div className="mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full mx-auto"></div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium">
            <span className="text-teal-600">&copy; {currentYear}</span>
            {" "}
            <span className="text-gray-700">fancyfashion.co.ke</span>
            {" - "}
            <span className="text-gray-500">All Rights Reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;