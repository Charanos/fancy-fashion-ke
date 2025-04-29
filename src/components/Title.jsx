import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 ">
      <p className="text-gray-500 header">
        {text1}{" "}
        <span className="text-gray-700 font-medium header teal">{text2}</span>
      </p>

      <p className=" hidden md:block w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-300"></p>
    </div>
  );
};

export default Title;
