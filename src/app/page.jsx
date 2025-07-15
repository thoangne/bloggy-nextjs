import Image from "next/image";

import { Header, Category, Footer } from "@/app/components/index";
import {
  background,
  defaultArticle,
  defaultAvatar,
  defaultCategory,
} from "./components/images";
import { Link } from "lucide-react";
export default function Home() {
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

        <div className="relative h-[40rem] rounded-xl overflow-hidden shadow-xl">
          {/* Background image */}
          <Image
            width={100}
            height={100}
            src={defaultArticle}
            alt="Article"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Nền mờ cứng mạnh mẽ */}
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
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <a href="/">
              <div className="relative h-[300px] w-full border-1 border-[#5552385] rounded-xl ">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-xl"
                  src={defaultArticle}
                  alt=""
                />
                <div className="absolute bottom-[-2px] left-[-1px] w-[101%] h-[10rem] bg-gradient-to-t from-[#352929] to-transparent rounded-b-xl"></div>

                <div className="absolute bottom-0 p-3 space-y-3 rounded-b-xl">
                  <div className="inline-flex items-center gap-2 bg-indigo-500 p-1 w-auto text-xs me-2 rounded-full ">
                    <i className="fas fa-umbrella" />
                    <p>Lifestyle</p>
                  </div>
                  <h1 className="text-sm lg:text-xl font-bold drop-shadow-lg ">
                    Example Artical title
                  </h1>
                  <div className="flex items-center gap-4 font-semibold">
                    <Image
                      width={100}
                      height={100}
                      className="w-8 h-8 rounded-full "
                      src={defaultAvatar}
                      alt=""
                    />
                    <p className="text-sm lg:text-md ">By Frank</p>
                    <p className="text-sm lg:text-md">5 min read</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* hot picks */}
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div className="my-10 border-b  border-[#ffffff]">
          <h1 className="lg:text-7xl text-4xl font-bold"> Hot Picks</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-7">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-7">
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
                  {/*post card body */}
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
          <div>
            <Category />
            <div>
              <div className="my-10 ">
                <h1 className="text-2xl font-bold mt-10 ">Recent Posts</h1>
                <p className="italic font-normal text-xs mt-2 text-gray-500 ">
                  All recent posts to keep you updateed
                </p>
              </div>
              {Array.from({ length: 5 }).map((_, key) => (
                <div
                  key={key}
                  className="mb-4 flex gap-2 border border-[#fcfcfc5f] p-2 rounded-xl"
                >
                  <Image
                    width={100}
                    height={100}
                    src={defaultCategory}
                    alt={key}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <h1 className="font-bold">article title</h1>
                    <div className="flex items-center gap-4 font-light capitalize text-xs">
                      <p>by Frank</p>
                      <p>5 mins read</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
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
                  {/*post card body */}
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
      </section>
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
              {/* Background image */}
              <Image
                width={100}
                height={100}
                src={defaultArticle}
                alt="Article"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Nền mờ cứng mạnh mẽ */}
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
      <Footer />
    </>
  );
}
