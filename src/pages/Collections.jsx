import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 my-10 px-2 border-t border-gray-300 pt-10">
      {/* filter collections  */}
      <div className="min-w-60">
        <p className="my-2 text-xl capitalize gap-2 cursor-pointer font-semibold text-gray-800">
          filters
        </p>

        {/* category filter  */}
        <div
          className={`border flex items-center border-gray-300 justify-center rounded-md p-3 mt-6 ${
            showFilter ? "" : "hidden"
          } overflow-hidden transition-all duration-300 sm:block`}
        >
          <p className="text-md font-medium mb-5">Categories</p>

          <div className="flex flex-col gap-2 text-sm font-medium text-gray-900">
            <p className="flex items-center gap-2">
              <input
                value={"Men"}
                type="checkbox"
                className="w-4 h-4 accent-teal cursor-pointer"
              />{" "}
              Men
            </p>
            <p className="flex items-center gap-2">
              <input
                value={"Women"}
                type="checkbox"
                className="w-4 h-4 accent-teal cursor-pointer"
              />{" "}
              Women
            </p>
            <p className="flex items-center gap-2">
              <input
                value={"Kids"}
                type="checkbox"
                className="w-4 h-4 accent-teal cursor-pointer"
              />{" "}
              Kids
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
