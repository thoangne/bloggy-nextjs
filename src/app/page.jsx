"use client";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { Header, Category, Footer } from "@/app/components/index";
import {
  background,
  defaultArticle,
  defaultAvatar,
  defaultCategory,
} from "./components/images";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate, readingTime } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aritcleNew, setAritcleNew] = useState([]);
  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("article")
      .select(
        "id, title, content, thumbnail,views, slug, date_created, category:category_id(id, name, thumbnail,color,icon), author:profile_id(id, full_name, job_title)"
      );

    if (error) {
      toast.error("Failed to fetch articles");
      console.error(error);
    } else {
      // Sắp xếp theo thời gian tạo mới nhất
      const sorted = [...data].sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );

      setArticles(data);
      setAritcleNew(sorted);
      setLoading(false);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover opacity-50 pointer-events-none"
          priority
        />
      </div>
      {/* Article */}
      <section
        className="py-5 my-20 grid lg:grid-cols-2 grid-cols-1 gap-7 px-5 lg:px-33
      "
      >
        {/** Background */}

        <div
          className="relative h-[40rem] rounded-xl overflow-hidden shadow-xl hover:border-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-indigo-500/50"
          onClick={() => router.push(`/${articles[0]?.slug}`)}
        >
          {/* Background image */}
          <Image
            width={100}
            height={100}
            src={articles[0]?.thumbnail || defaultArticle}
            alt="Article"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Nền mờ cứng mạnh mẽ */}
          <div className="absolute bottom-[-1px] w-full  bg-black/80 p-6 z-20 backdrop-blur-sm hover:cursor-pointer  ">
            <div
              className={`inline-flex items-center gap-2 ${articles[0]?.category?.color} px-3 py-1 text-xs rounded-full mb-3 text-white`}
            >
              <i className={articles[0]?.category?.icon || "fas fa-umbrella"} />
              <span className="font-medium">
                {articles[0]?.category?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-sm lg:text-2xl font-bold text-white drop-shadow-lg mb-4 max-w-3xl ">
              {articles[0]?.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-200">
              <Image
                width={100}
                height={100}
                className="w-9 h-9 rounded-full"
                src={articles[0]?.author?.image || defaultAvatar}
                alt="Author"
              />
              <span>{articles[0]?.author?.full_name}</span>
              <span className="text-xl">•</span>
              <span>{readingTime(articles[0]?.content) || "1 min read"}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {articles.slice(1, 5).map((article, id) => (
            <div className="" key={id}>
              <a href={`${article?.slug}`}>
                <div className="relative h-[300px] w-full border-1 border-[#5552385] rounded-xl hover:border-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-indigo-500/50 ">
                  <Image
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-xl"
                    src={article?.thumbnail || defaultArticle}
                    alt=""
                  />
                  <div className="absolute bottom-[-2px] left-[-1px] w-[101%] bg-blue h-[10rem] bg-gradient-to-t from-[#352929] to-transparent rounded-b-xl"></div>

                  <div className="absolute bottom-0 p-3 space-y-3 rounded-b-xl">
                    <div
                      className={`inline-flex items-center gap-2 ${article?.category.color} p-1 w-auto text-xs me-2 rounded-full`}
                    >
                      <i className={`${article?.category?.icon}`} />
                      <p>{article?.category?.name}</p>
                    </div>
                    <h1 className="text-sm lg:text-xl font-bold drop-shadow-lg ">
                      {article?.title}
                    </h1>
                    <div className="flex items-center gap-4 font-semibold">
                      <Image
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-full "
                        src={article?.author?.image || defaultAvatar}
                        alt=""
                      />
                      <p className="text-sm lg:text-md ">
                        {article?.author?.full_name}
                      </p>
                      <p className="text-sm lg:text-md">
                        {readingTime(article?.content)}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
      {/* hot picks */}
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div className="my-10 border-b  border-[#ffffff]">
          <h1
            className="lg:text-7xl text-4xl font-bold"
            onClick={fetchArticles}
          >
            {" "}
            Hot Picks
          </h1>
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-[3fr_1fr] gap-7">
          {/* post card */}
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-7 lg:max-h-10 ">
            {" "}
            {articles.map((article, i) => (
              <div
                key={i}
                className="border-2 border-[#32313166] bg-[#2e2b37] rounded-xl p-2 shadow-lg h-auto hover:cursor-pointer hover:border-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-indigo-500/50"
                onClick={() => router.push(`/${article.slug}`)}
              >
                <Image
                  className="w-full h-[20rem] object-cover rounded-xl"
                  width={100}
                  height={100}
                  src={article.thumbnail}
                  alt=""
                ></Image>
                <div className=" space-y-3 pt-5 ">
                  {/*post card body */}
                  <div
                    className={`inline-flex items-center gap-2 ${article?.category?.color}  p-1 w-auto text-xs me-2 rounded-full`}
                  >
                    <i className={`${article?.category?.icon}`} />
                    <p>{article?.category?.name}</p>
                  </div>
                  <h1
                    className={`text-sm lg:text-2xl font-bold drop-shadow-lg line-clamp-2 `}
                  >
                    {article.title}{" "}
                  </h1>
                  <div className="flex items-center gap-5 text-xs text-gray-300 font-light">
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-calendar"></i>
                      <p className="font-semibold mb-0 ">
                        {formatDate(article.date_created)}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-eye"></i>
                      <p className="font-semibold mb-0 ">
                        {article.views || 0} Views
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-clock"></i>
                      <p className="font-semibold mb-0 ">
                        {readingTime(article?.content)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex  items-center justify-between gap-4 font-semibold bg-indigo-900 p-2 rounded-xl mt-2 ">
                  {/*Post card footer */}
                  <div className="flex items-center gap-2 ">
                    <Image
                      className="w-8 h-8 object-cover rounded-full"
                      width={100}
                      height={100}
                      src={defaultAvatar}
                      alt=""
                    ></Image>
                    <div className="">
                      <h1 className="text-sm text-white font-bold mb-0">
                        {article.author.full_name}
                      </h1>
                      <p className="text-xs font-light text-gray-100 italic mt-0 ">
                        {article.author.job_title || "Not yet"}
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
          <div>
            <Category />
            <div>
              <div className="my-10 ">
                <h1 className="text-2xl font-bold mt-10 ">Recent Posts</h1>
                <p className="text-xs text-gray-300 ">
                  All recent posts to keep you updated
                </p>
              </div>
              {aritcleNew.map((article, id) => (
                <div
                  key={id}
                  className="mb-4 flex gap-2 border border-[#fcfcfc5f] p-2 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 hover:cursor-pointer hover:border-2 hover:border-purple-500"
                  onClick={() => router.push(`/${article.slug}`)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={article?.thumbnail}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <h1 className="font-bold">{article.title}</h1>
                    <div className="flex items-center gap-4 font-light capitalize text-xs">
                      <p>{article.category.name}</p>
                      <p>{formatDate(article.date_created)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div className="my-10 border-b  border-[#ffffff]">
          <h1 className="lg:text-7xl text-4xl font-bold"> Hot Picks</h1>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-2 border-[#32313166] bg-[#2e2b37] rounded-xl p-2 shadow-lg h-auto"
              >
                <Image
                  className="w-full h-[20rem] object-cover rounded-xl"
                  width={100}
                  height={100}
                  src={defaultCategory}
                  alt=""
                ></Image>
                <div className=" space-y-3 pt-5 ">
                  <div className="inline-flex items-center gap-2 bg-indigo-500 p-1 w-auto text-xs me-2 rounded-full ">
                    <i className="fas fa-umbrella" />
                    <p>Lifestyle</p>
                  </div>
                  <h1 className="text-sm lg:text-xl font-bold drop-shadow-lg ">
                    Example Artical title
                  </h1>
                  <div className="flex items-center gap-5 text-xs text-gray-300 font-light">
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-calendar"></i>
                      <p className="font-semibold mb-0 ">5th August, 2025</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-eye"></i>
                      <p className="font-semibold mb-0 ">9 Views</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-clock"></i>
                      <p className="font-semibold mb-0 ">2 Mins Read</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 font-semibold bg-indigo-900 p-2 rounded-xl mt-2 ">
                  <div className="flex items-center gap-2 ">
                    <Image
                      className="w-8 h-8 object-cover rounded-full"
                      width={100}
                      height={100}
                      src={defaultAvatar}
                      alt=""
                    ></Image>
                    <div className="">
                      <h1 className="text-sm text-white font-bold mb-0">
                        Frank
                      </h1>
                      <p className="text-xs font-light text-gray-100 italic mt-0 ">
                        Write a Desphi
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
        </div>
      </section> */}
      {/*
      
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div className="my-10 border-b  border-[#ffffff]">
          <h1 className="lg:text-7xl text-4xl font-bold"> Hot Picks</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="relative h-[40rem] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                width={100}
                height={100}
                src={defaultArticle}
                alt="Article"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute bottom-[-1px] w-full bg-black/80 p-6 z-20 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 bg-indigo-600 px-3 py-1 text-xs rounded-full mb-3 text-white">
                  <i className="fas fa-umbrella" />
                  <span className="font-medium">Lifestyle</span>
                </div>

                <h1 className="text-sm lg:text-2xl font-bold text-white drop-shadow-lg mb-4 max-w-3xl ">
                  Example Article Title
                </h1>

                <div className="flex items-center gap-4 text-sm font-medium text-gray-200">
                  <Image
                    width={100}
                    height={100}
                    className="w-9 h-9 rounded-full"
                    src={defaultAvatar}
                    alt="Author"
                  />
                  <span>5th August, 2025</span>
                  <span className="text-xl">•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      */}
      <Footer />
    </>
  );
}
