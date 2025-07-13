import React from "react";
import { Header, Footer, Category } from "../components";
import Image from "next/image";
import { defaultArticle, defaultAvatar } from "../components/images";

export default function page() {
  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Article Section */}
      <section className="lg:px-33 px-5 my-20 z-10 relative">
        <div className="relative w-full h-[30rem]">
          <Image
            width={100}
            height={100}
            src={defaultArticle}
            alt="Article"
            className="w-full h-[30rem] object-cover absolute rounded-2xl "
          ></Image>
          <div className="w-full h-[30rem] bg-black/80 absolute rounded-2xl z-10" />
          <h1 className=" absolute text-xl font-semibold leading-[4rem]  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white drop-shadow-md">
            Article Title
          </h1>
        </div>

        {/* Article Meta Section */}
        <div className="flex items-center gap-3 mt-10 ">
          <button className="p-2 bg-indigo-800 rounded-lg">
            <i className="fas fa-thumbs-up " />
          </button>
          <button className="p-2 px-4 bg-indigo-800 rounded-lg">
            <i className="fas fa-bookmark" />
          </button>
          <div className="p-2 px-4 bg-indigo-800 rounded-lg">
            <i className="fas fa-eye me-1 capitalize " /> 0 Views
          </div>
          <div className="p-2 px-4 bg-indigo-800 rounded-lg">
            <i className="fas fa-calendar me-1 capitalize " /> 2 mins read
          </div>
        </div>

        {/* Article Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 my-10">
          <div>
            <div className="bg-[#000] p-4 rounded-3xl backdrop-blur-sm mt-10">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem ea harum. Minus voluptatum optio repellat impedit ad?
                Fugit possimus dolorum reiciendis ut sapiente blanditiis facere
                fugiat repudiandae laboriosam voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem ea harum. Minus voluptatum optio repellat impedit ad?
                Fugit possimus dolorum reiciendis ut sapiente blanditiis facere
                fugiat repudiandae laboriosam voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem ea harum. Minus voluptatum optio repellat impedit ad?
                Fugit possimus dolorum reiciendis ut sapiente blanditiis facere
                fugiat repudiandae laboriosam voluptatem?
              </p>
            </div>

            {/* Author Section */}
            <div className="space-y-33 mt-10">
              <div className="flex items-center gap-4 bg-indigo-800 rounded-xl p-3 relative">
                <Image
                  width={100}
                  height={100}
                  src={defaultAvatar}
                  alt=""
                  className="w-[5rem] h-[5rem] rounded-full   "
                />
                <div>
                  <h1 className="text-3xl font-bold ">Destiny</h1>
                  <p className="text-gray-400 text-xs mt-1">Write at 2023</p>
                </div>
              </div>
            </div>

            {/* Comment form Section */}
            <div className="mt-10">
              <h1 className="mb-5 text-2xl font-bold">Leave a comment</h1>
              <div className="space-y-5 relative ">
                <div className="flex flex-col items-start gap-2 ">
                  <label htmlFor="">Full Name</label>
                  <input
                    className="border-3 border-gray-500 p-2 rounded-lg w-full"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 ">
                  <label htmlFor="">Comment</label>
                  <textarea
                    className="border-3 border-gray-500 p-2 rounded-lg w-full"
                    type="text"
                    placeholder="Your Comment"
                  />
                </div>
                <div>
                  <button
                    className="bg-gradient-to-r
            hidden lg:flex-row lg:flex lg:items-center lg:gap-2
        from-indigo-500 to-pink-500 px-4 py-2                                                                                                                                                                                                                                                                                                                                                                          border-0 
        text-[15px] font-bold rounded-full 
         hover:cursor-pointer hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-500 transition duration-500 hover:text-gray-200 "
                  >
                    Submit Content <i className="fas fa-paper-plane ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Comment  Section */}
            <div className="mt-10">
              <h1 className="text-2xl mb-5 ">205 Comment</h1>
              <div className="space-y-6">
                {Array.from({ length: 10 })
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#022502] boder border-[#110c1f] p-5 rounded-xl"
                    >
                      <div className="flex items-center gap-3 ">
                        <Image
                          width={100}
                          height={100}
                          src={defaultAvatar}
                          className="w-[2rem]  rounded-full"
                        ></Image>
                        <div>
                          <h1 className="text-lg font-bold ">Destiny</h1>
                          <p className="text-gray-400 text-xs mt-1">
                            5th August, 2025
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mt-3 text-gray-100 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Consequatur quasi perspiciatis earum nostrum
                        repellat facere quam, est placeat voluptates aut. Sint
                        modi ex nemo quibusdam cum, placeat eius cumque magni?
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Category />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
