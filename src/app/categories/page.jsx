"use client";
import React, { useState } from "react";
import { Header, Footer } from "../components";
import Image from "next/image";
import Link from "next/link";
import { defaultArticle } from "../components/images";

const page = () => {
  const [Category, setCategory] = useState([
    {
      id: 1,
      title: "Category 1",
      thumgnail: defaultArticle,
      slug: "category-1",
    },
    {
      id: 2,
      title: "Category 2",
      thumgnail: defaultArticle,
      slug: "category-2",
    },
    {
      id: 3,
      title: "Category 3",
      thumgnail: defaultArticle,
      slug: "category-3",
    },
    {
      id: 4,
      title: "Category 4",
      thumgnail: defaultArticle,
      slug: "category-4",
    },
    {
      id: 5,
      title: "Category 5",
      thumgnail: defaultArticle,
      slug: "category-5",
    },
    {
      id: 6,
      title: "Category 6",
      thumgnail: defaultArticle,
      slug: "category-6",
    },
    {
      id: 7,
      title: "Category 7",
      thumgnail: defaultArticle,
      slug: "category-7",
    },
    {
      id: 8,
      title: "Category 8",
      thumgnail: defaultArticle,
      slug: "category-8",
    },
    {
      id: 9,
      title: "Category 9",
      thumgnail: defaultArticle,
      slug: "category-9",
    },
    {
      id: 10,
      title: "Category 10",
      thumgnail: defaultArticle,
      slug: "category-10",
    },
  ]);

  return (
    <div>
      <Header></Header>
      <section className="lg:px-33 px-5 lg:my-30 my-10">
        <div className="mb-10 relative ">
          <h1 className="lg:text-7xl text-4xl font-bold">Categories</h1>
          <p className="italic font-normal text-xs mt-2 text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            aperiam rem eos enim atque omnis sit consequatur distinctio placeat,
            repudiandae est in odit ullam, porro autem quos minima eaque!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-between mt-10 ">
          {Category.map((category, index) => (
            <Link key={index} href={"/"}>
              <div className="w-full h-[5rem] relative">
                <Image
                  width={100}
                  height={100}
                  src={defaultArticle}
                  alt={index}
                  className="w-full h-full object-cover absolute rounded-lg "
                ></Image>
                <div className="w-full h-[5rem] top-0 bg-[#31222e] absolute rounded-lg z-1 opacity-50 " />
                <h1 className="text-xs front-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white drop-shadow-md">
                  {category.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default page;
