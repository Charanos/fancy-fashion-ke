import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";
import React, { useContext, useEffect, useState } from "react";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-20 px-2 sm:py-0 py-10">
      <div className="text-center flex flex-col items-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"collections"} />

        <p className="m-auto w-3/4 my-6 text-sm md:text-base lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          fringilla, .
        </p>
      </div>

      {/* Render Products  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 gap-y-12">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
