import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);

  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellers = products.filter((product) => product.bestseller);
    setBestSeller(bestSellers.slice(0, 5));
  }, []);

  return (
    <div className="my-10 sm:my-20">
      <div className="text-center flex flex-col items-center py-10 text-3xl">
        <Title text1={"Best "} text2="Sellers" />
        <p className="m-auto w-3/4 my-6 text-sm md:text-base lg:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem esse
          nisi praesentium dolores est dolorem, eligendi reprehenderit, ipsum
          doloribus illo facilis pariatur nesciunt quia molestiae doloremque
          accusantium dolorum, officiis suscipit.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 gap-y-12">
        {bestseller.map((item, index) => (
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

export default BestSellers;
