"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { defaultAvatar, defaultCategory } from "./images";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Link from "next/link";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("*");
      if (error) {
        toast.error("Failed to fetch categories");
        console.error(error);
      } else {
        setCategories(data);
        if (data.length > 0 && !categories) {
          setCategories(data[0].id);
        }
      }
    };

    fetchCategories();
  });
  return (
    <div>
      <h1 className="text-2x; font-bold ">Trending Categories</h1>
      <span className="text-xs text-gray-300 ">
        Don't miss out on the hottest topics
      </span>

      <div className=" space-y-4 mt-10">
        {categories?.map((category, index) => (
          <Link
            href={`/categories/${category?.slug}`}
            key={index}
            className="w-full h-[5rem] relative flex items-center justify-center  hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Background layer (đặt sau, z thấp) */}

            {/* Image layer (z cao hơn) */}
            <Image
              className="w-full h-[5rem] object-cover absolute rounded-lg "
              width={100}
              height={100}
              src={category?.thumbnail || defaultCategory}
              alt={category?.name}
            ></Image>
            <div className="w-full h-[5rem] bg-[#31222e] absolute rounded-lg z-1 opacity-50 " />

            {/* Text layer (trên cùng) */}
            <h1 className="text-xl font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white drop-shadow-md">
              {category?.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
