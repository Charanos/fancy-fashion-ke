import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <nav className="flex justify-between items-center py-10 font-medium flex-col sm:flex-row gap-5 sm:gap-0">
      <Link to="/">
        <img src={assets.logo} className="w-80 sm:w-70" alt="logo" />
      </Link>

      <ul className="hidden lg:flex space-x-6 text-md font-semibold">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p className="uppercase">Home</p>
          <hr className="w-3/4 border-none h-[1.3px] bg-gray-800 hidden" />
        </NavLink>

        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p className="uppercase">Collections</p>
          <hr className="w-3/4 border-none h-[1.3px] bg-gray-800 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p className="uppercase">About</p>
          <hr className="w-3/4 border-none h-[1.3px] bg-gray-800 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p className="uppercase">Contact</p>
          <hr className="w-3/4 border-none h-[1.3px] bg-gray-800 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          alt="search icon"
          src={assets.search_icon}
          className="w-5 cursor-pointer"
        />

        <div className="group relative">
          <img
            alt="avatar"
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
          />

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-42 py-3 px-5 bg-white rounded-lg shadow-lg text-gray-400">
              <p className="cursor-pointer hover:text-black">
                <NavLink to="/login">Login</NavLink>
              </p>
              <p className="cursor-pointer hover:text-black">
                <NavLink to="/login">Login</NavLink>
              </p>
              <p className="cursor-pointer hover:text-black">
                <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />

          <p className="absolute right-[-5px] bottom-[-5px] bg-black p-2 leading-4 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold">
            2
          </p>
        </Link>

        <img
          alt="mobile menu"
          onClick={toggleMenu}
          src={assets.menu_icon}
          className="w-5 cursor-pointer lg:hidden"
        />
      </div>

      {/* mobile menu  */}

      <div
        className={`absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out z-40 ${
          visible ? "w-full h-screen" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600" onClick={toggleMenu}>
          <div className="flex items-center gap-2 pt-13 pl-4 cursor-pointer">
            <img
              alt="close"
              src={assets.dropdown_icon}
              className="h-3 rotate-180"
            />
            <p className="capitalize text-xs">back</p>
          </div>

          <div className="flex flex-col gap-10 h-full justify-between">
            <hr className="w-full border-none h-[1.3px] bg-gray-500 mt-2" />
            <NavLink
              to={"/"}
              className="flex flex-col items-center gap-1 mt-30 "
            >
              <p className="uppercase hover:text-red-500">Home</p>
              <hr className="w-full border-none h-[1.3px] bg-gray-300" />
            </NavLink>

            <NavLink
              to={"/about"}
              className="flex flex-col items-center gap-1 mt-10"
            >
              <p className="uppercase">about</p>
              <hr className="w-full border-none h-[1.3px] bg-gray-300" />
            </NavLink>

            <NavLink
              to={"/collection"}
              className="flex flex-col items-center gap-1 mt-10"
            >
              <p className="uppercase">collections</p>
              <hr className="w-full border-none h-[1.3px] bg-gray-300" />
            </NavLink>

            <NavLink
              to={"/contact"}
              className="flex flex-col items-center gap-1 mt-10"
            >
              <p className="uppercase">contact</p>
              <hr className="w-full border-none h-[1.3px] bg-gray-300" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
