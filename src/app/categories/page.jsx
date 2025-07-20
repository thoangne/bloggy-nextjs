"use client";
import React, { useEffect, useState } from "react";
import { Header, Footer, Category } from "../components";
import Image from "next/image";
import Link from "next/link";
import { defaultArticle } from "../components/images";
import { supabase } from "@/lib/supabaseClient";

const page = () => {
  const [Categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("thumbnail,name,slug");

    if (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    } else {
      setCategories(data);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Header></Header>
      <section className="lg:px-33 px-5 lg:my-30 my-10">
        <div className="mb-10 relative ">
          <h1 className="lg:text-7xl text-4xl font-bold">Categories</h1>
          <p className="italic font-normal text-xs mt-2 text-gray-500 ">
            Categories is a great way to group similar articles together, making
            it easier for readers to find the content they're interested in. It
            also helps us to categorize and organize our content in a more
            structured way.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-between mt-10 ">
          {Categories.map((category, index) => (
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
      </section>
      <Footer></Footer>
    </div>
  );
};

export default page;
