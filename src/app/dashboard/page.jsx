"use client";

import React from "react";
import { Footer, Header } from "../components";
import { defaultAvatar } from "../components/images";
import Image from "next/image";
import Link from "next/link";

/**
 * The root page of the application.
 *
 * This page is the entry point for the application. It renders a header and
 * a footer, and contains a section element in the middle that is empty.
 *
 * @returns {React.ReactElement} The root page of the application.
 */

const page = () => {
  const notification = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    type: "comment",
    message: `Jane Doe commented on your post ${i + 1}`,
    is_read: false,
    article_id: i + 1,
    receiver_id: `user_${i + 1}`,
    sender_id: "user_2",
    created: `2022-01-0${i + 1}T00:00:00.000Z`,
  }));

  const comments = Array.from({ length: 10 }).map((_, i) => ({
    profile: {
      full_name: `Jame Ortega ${i + 1}`,
      image: defaultAvatar,
    },
    article_id: i + 1,
    comment: `Thanh for bread ${i + 1}`,
    created: new Date(Date.now() - (i + 1) * 1000 * 60 * 60 * 24).toISOString(),
  }));

  const statsArray = [
    {
      title: "Views",
      value: 10,
      icon: "fas fa-eye",
      bg: "bg-[#FFC0CB] text-[#FF0000]",
      text: "text-orange-500",
    },
    {
      title: "Posts",
      value: 5,
      icon: "fas fa-pencil-alt",
      bg: "bg-[#ADD8E6] text-[#0000FF]",
      text: "text-blue-500",
    },
    {
      title: "Likes",
      value: 20,
      icon: "fas fa-thumbs-up",
      bg: "bg-[#FFFFE0] text-[#FFD700]",
      text: "text-yellow-500",
    },
    {
      title: "Comments",
      value: 8,
      icon: "fas fa-comments",
      bg: "bg-[#E6E6FA] text-[#8A2BE2]",
      text: "text-purple-500",
    },
    {
      title: "Notification",
      value: 3,
      icon: "fas fa-bell",
      bg: "bg-[#FFE4E1] text-[#FF6347]",
      text: "text-red-500",
    },
  ];
  return (
    <div>
      <Header></Header>
      <section className="lg:px-33 px-5 my-20 space-y-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {statsArray.map((stat, index) => (
            <div className="p-5 rounded-lg flex items-center gap-6 bg-[#000] border border-[#1a1a1ab4]">
              <i
                className={`${stat?.icon} text-3xl rounded-lg p-3 ${stat?.bg} ${stat?.text}`}
              />
              <div>
                <h2 className="text-3xl font-bold">{stat?.value}</h2>
                <p className="text-md text-gray-300">{stat?.title}</p>
              </div>
            </div>
          ))}
        </div>
        {/*Post */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg bg-[#000] border border-[#222] space-y-8">
            <div className="space-y-1 mb-10">
              <h2 className="text-3xl font-bold">Posts</h2>
              <p className="text-sm text-gray-300">All Posts</p>
            </div>
            <div className="overflow-y-scroll max-h-[40rem]">
              {Array.from({ length: 10 }).map((key, i) => (
                <div className="border border-[#222223] py-5 me-2 rounded-lg">
                  <div key={key} className="flex gap-4 items-center ">
                    <Image
                      width={100}
                      height={100}
                      src={defaultAvatar}
                      alt={i}
                      className="w-20 h-20 object-cover rounded-md "
                    />
                    <div className="space-y-2 ">
                      <p className="text-md">
                        Jane Doe posted a postJane Doe posted a post Jane Doe
                        posted a post Jane Doe posted a post
                      </p>
                      <div className="flex gap-4 ">
                        <p className="text-xs text-gray-500">
                          <i className="fas fa-calendar me-1" /> 15 August,2025
                        </p>
                        <p className="text-xs text-gray-500">
                          <i className="fas fa-eye me-1" /> 5
                        </p>
                        <p className="text-xs text-gray-500">
                          <i className="fas fa-thumbs-up me-1" /> 5
                        </p>
                        <p className="text-xs text-gray-500">
                          <i className="fas fa-comment me-1" /> 5
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="flex gap-3 mt-3 justify-end  "
                  >
                    <Link
                      style={{ alignItems: "center" }}
                      className="h-10 w-10 justify-center flex align-items-center align-content-center  bg-green-700 rounded-md"
                      href={`/post/${i + 1}`}
                    >
                      <i className="fas fa-eye" />
                    </Link>
                    <Link
                      style={{ alignItems: "center" }}
                      className="h-10 w-10 justify-center flex align-items-center align-content-center   bg-blue-700 rounded-md"
                      href={`/post/${i + 1}`}
                    >
                      <i className="fas fa-edit" />
                    </Link>
                    <button
                      style={{ alignItems: "center" }}
                      className="h-10 w-10  justify-center flex align-items-center align-content-center  bg-red-700 rounded-md"
                      href={`/post/${i + 1}`}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#000] border border-[#222] space-y-8">
            <div className="space-y-1 mb-10">
              <h2 className="text-3xl font-bold">Commment</h2>
              <p className="text-sm text-gray-300">Recent comment</p>
            </div>
            <div className="overflow-y-scroll max-h-[40rem]">
              {comments.map((comment, i) => (
                <div className="flex gap-4 items-center border-b border-[#000] p-5 ">
                  <Image
                    className="w-10 h-10 object-cover rounded-md "
                    width={100}
                    height={100}
                    src={defaultAvatar}
                    alt={i}
                  ></Image>
                  <div className="space-y-2 ">
                    <p className="text-sm text-gray-200">{comment.comment}</p>
                    <p className="text-sm text-gray-500">
                      {comment.profile.full_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-lg bg-[#000] border border-[#222] space-y-8">
            <div className="space-y-1 mb-10">
              <h2 className="text-3xl font-bold">Notification</h2>
              <p className="text-sm text-gray-300">Unread notification</p>
            </div>
            <div className="overflow-y-scroll max-h-[40rem]">
              {notification?.map((noti, i) => (
                <div className="flex items-center gap-4 border-b border-[#000] py-5">
                  <i
                    className={`fas ${
                      noti.type === "comment"
                        ? "fa-comment bg-pink-600"
                        : "fa-thumbs-up text-blue-600"
                    } text-3xl p-3 rounded-lg`}
                  />
                  <div>
                    <h2 className="capitalize">{noti.type}</h2>
                    <p className="text-xs text-gray-500">{noti.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default page;
