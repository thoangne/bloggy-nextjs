"use client";
import { Footer, Header } from "@/app/components";
import CommentPagination from "@/app/components/CommentPagination ";
import { defaultAvatar, defaultCategory } from "@/app/components/images";
import { supabase } from "@/lib/supabaseClient";
import { formatDate, readingTime } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const slug = useParams().slug;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  const fetchArticlesByCategorySlug = async () => {
    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("id")
        .eq("slug", slug)
        .single();

      if (categoryError || !categoryData) {
        console.error("Category not found:", categoryError);
        return;
      }

      const categoryId = categoryData.id;

      const { data, error } = await supabase
        .from("article")
        .select(
          "id, title, thumbnail, views, slug, date_created, category:category_id(id,name,thumbnail,slug,color,icon), author:profile_id(id,full_name,job_title)"
        )
        .eq("category_id", categoryId);

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data);
        setFilteredArticles(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchArticlesByCategorySlug();
  }, [slug]);
  return (
    <div>
      <Header></Header>
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div onClick={fetchArticlesByCategorySlug} className="mb-10 border-b">
          <h1 className="lg:text-7xl text-4xl font-bold">
            {" "}
            {articles[0]?.category?.name}
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-20">
            {currentArticles.map((article, index) => (
              <div
                key={index}
                className="border-2 border-[#32313166] bg-[#2e2b37] rounded-xl p-2 shadow-lg h-auto hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer"
              >
                <Image
                  className="w-full h-[20rem] object-cover rounded-xl"
                  width={100}
                  height={100}
                  src={article?.thumbnail}
                  alt=""
                ></Image>
                <div className=" space-y-3 pt-5 ">
                  {/*post card body */}
                  <div
                    className={`inline-flex items-center gap-2 ${article?.category?.color} p-1 w-auto text-xs me-2 rounded-full `}
                  >
                    <i className={`${article?.category?.icon}`} />
                    <p>{article?.category?.name}</p>
                  </div>
                  <h1 className="text-sm lg:text-xl font-bold drop-shadow-lg ">
                    {article?.title}
                  </h1>
                  <div className="flex items-center gap-5 text-xs text-gray-300 font-light">
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-calendar"></i>
                      <p className="font-semibold mb-0 ">
                        {formatDate(article?.date_created)}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-eye"></i>
                      <p className="font-semibold mb-0 ">{article?.views}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-clock"></i>
                      <p className="font-semibold mb-0 ">
                        {readingTime(article?.content)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 font-semibold bg-indigo-900 p-2 rounded-xl mt-2 ">
                  {/*Post card footer */}
                  <div className="flex items-center gap-2 ">
                    <Image
                      className="w-8 h-8 object-cover rounded-full"
                      width={100}
                      height={100}
                      src={article?.author?.image || defaultAvatar}
                      alt=""
                    ></Image>
                    <div className="">
                      <h1 className="text-sm text-white font-bold mb-0">
                        {article?.author?.full_name}
                      </h1>
                      <p className="text-xs font-light text-gray-100 italic mt-0 ">
                        {article?.author?.job_title}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-2 bg-indigo-400 text-[12px] px-4 py-2 rounded-xl border-0"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {filteredArticles.length > itemsPerPage && (
            <CommentPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredArticles.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default page;
