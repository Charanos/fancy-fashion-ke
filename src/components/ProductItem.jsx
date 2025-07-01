import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/products/${id}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="cursor-pointer mt-6 flex flex-col items-start justify-between p-6 bg-white rounded-xl shadow-[8px_8px_16px_#d1d1d1,_-8px_-8px_16px_#ffffff]  transition-all duration-300 "
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="an image of a product"
          className="hover:scale-110 transition ease-in-out"
        />
      </div>

      <p className="text-sm pt-4 pb-2 font-medium">{name}</p>

      <p className="text-sm font-bold text-gray-800">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
