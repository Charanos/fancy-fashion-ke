import React from "react";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import BestSellers from "../components/BestSellers";
import StorePolicy from "../components/StorePolicy";
import LatestCollections from "../components/LatestCollections";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mb-50 sm:mb-2">
        <LatestCollections />
        <BestSellers />
        <StorePolicy />
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
