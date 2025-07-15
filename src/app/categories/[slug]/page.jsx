import { Footer, Header } from "@/app/components";
import { defaultAvatar, defaultCategory } from "@/app/components/images";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <Header></Header>
      <section className="lg:px-33 px-5 lg:my-30 my-10 ">
        <div>
          <h1 className="lg:text-7xl text-4xl font-bold"> Hand-Picked</h1>
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
      <Footer></Footer>
    </div>
  );
};

export default page;
