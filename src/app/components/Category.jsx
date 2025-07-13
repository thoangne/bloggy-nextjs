import Image from "next/image";
import React from "react";
import { defaultAvatar, defaultCategory } from "./images";

const Category = () => {
  return (
    <div>
      <h1 className="text-2x; font-bold">Trending Categories</h1>
      <p className="italic font-normal text-xs mt-2 text-gray-500 ">
        Lorem ipsum dolor sit amet
      </p>

      <div className=" space-y-4 mt-10">
        {Array.from({ length: 10 })
          .slice(0, 5)
          ?.map((category, index) => (
            <div key={index} className="w-full h-[5rem] relative">
              {/* Background layer (đặt sau, z thấp) */}

              {/* Image layer (z cao hơn) */}
              <Image
                className="w-full h-[5rem] object-cover absolute rounded-lg "
                width={100}
                height={100}
                src={defaultCategory}
                alt={index}
              ></Image>
              <div className="w-full h-[5rem] bg-[#31222e] absolute rounded-lg z-1 opacity-50 " />

              {/* Text layer (trên cùng) */}
              <h1 className="text-xl font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white drop-shadow-md">
                Trend
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
