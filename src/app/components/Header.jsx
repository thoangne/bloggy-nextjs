import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SheetClose,
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { defaultArticle, defaultAvatar } from "./images";
const Header = () => {
  return (
    <header className="flex flex-col max-[480px]:flex-row lg:flex-row justify-between items-center bg-indigo-800 text-white mx-4 mt-4 px-6 py-4 rounded-full shadow-md space-y-4 lg:space-y-0">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
          Bloggy
        </h1>
      </Link>

      <Menubar
        className={` flex md:flex-row justify-center md:justify-end bg-inherit border-0 text-white rounded-full px-4 hover:cursor-pointer md:w-auto w-full
        max-[480px]:hidden 
        `}
      >
        {/* Menu chinh */}
        <MenubarMenu>
          <MenubarTrigger className="hover:cursor-pointer px-4 py-2 hover:text-gray-100 rounded-full transition">
            Menu
          </MenubarTrigger>
          <MenubarContent align="end" className="rounded-md shadow-lg">
            <MenubarItem>
              <Link
                href="/"
                className="w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Home
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link
                href="/categories"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Categories
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Dashboard */}
        <MenubarMenu>
          <MenubarTrigger className="bg-inherit border-0 hover:cursor-pointer px-4 py-2 hover:text-gray-100 rounded-full transition">
            Dashboard
          </MenubarTrigger>
          <MenubarContent align="end" className="rounded-md shadow-lg">
            <MenubarItem>
              <Link
                href="/dashboard"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Overview
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link
                href="/dashboard/article/manage"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Create Article
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link
                href="/dashboard/article/all"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Article
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* Pages */}
        <MenubarMenu>
          <MenubarTrigger className=" hover:cursor-pointer px-4 py-2 hover:text-gray-100 rounded-full transition">
            Pages
          </MenubarTrigger>
          <MenubarContent align="end" className="rounded-md shadow-lg">
            <MenubarItem>
              <Link
                href="/pages/about"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                About
              </Link>
            </MenubarItem>
            <MenubarItem>
              <Link
                href="/pages/contact"
                className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-100 rounded"
              >
                Contact
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex gap-4 items-center">
        {/* Bookmarked Section */}
        <Dialog>
          <DialogTrigger>
            <button className="hover:cursor-pointer" type="button">
              <i className="ri-heart-line text-2xl  hover:text-gray-400"></i>
            </button>
          </DialogTrigger>
          <DialogContent className={"bg-[#0f060611] "}>
            <DialogTitle>Bookmark</DialogTitle>
            {/* <DialogHeader>
            <h1>Bookmarked Article (3)</h1>
          </DialogHeader> */}
            <div className="flex items-center space-x-2 mt-6">
              <div className="grid flex-1 gap-2">
                <div className="overflow-y-auto max-h-[20rem]">
                  <div key={1}>
                    <Link href={"/"}>
                      <div className="flex items-center gap-3 bg-[#232323] p-4 rounded-lg my-5">
                        <img
                          src={defaultArticle}
                          alt=""
                          className="w-33 h-20 object-cover rounded-lg"
                        />
                        <div className="space-y-2">
                          <h3>Lorem ipsum dolor sit amet</h3>
                          <div className="flex justify-between items-center gap-3">
                            <p className="text-sm text-gray-400">
                              <i className="fas fa-eye text-sm"></i> 123 view
                            </p>
                            <button className="bg-red-200 text-red-900 px-2 py-1 rounded hover:text-red-800 hover:bg-red-100 hover:cursor-pointer">
                              <i className="fas fa-trash text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Search Section 23:10 */}
        <Dialog>
          <DialogTrigger>
            <button className="hover:cursor-pointer  ">
              <i className="ri-search-line text-2xl hover:text-gray-400 "></i>
            </button>
          </DialogTrigger>
          <DialogContent
            className={
              "bg-[#0f060611] text-white  max-w-xl border-1 border-gray-800"
            }
          >
            <DialogTitle></DialogTitle>
            <DialogHeader>
              <input
                className="border-1 border-[#232323] bg-[#000212]
                placeholder:px-1
                placeholder:text-sm placeholder:text-gray-400
                rounded-lg outline-0 py-2 focus:ring-indigo-50 focus:ring-2  "
                type="text"
                placeholder="Search"
                name=""
                id=""
              />
            </DialogHeader>
            <div className="flex items-center space-x-2 mt-6">
              <div className="grid flex-1 gap-2">
                <h1>3 Article found</h1>
                <div className="overflow-y-auto max-h-[20rem]">
                  <div key={1}>
                    <Link href={"/"}>
                      <div className="flex items-center gap-3 bg-[#232323] p-4 rounded-lg my-5">
                        <img
                          src={defaultArticle}
                          alt=""
                          className="w-33 h-20 object-cover rounded-lg"
                        />
                        <div className="space-y-2">
                          <h3>Lorem ipsum dolor sit amet</h3>
                          <div className="flex justify-between items-center gap-3">
                            <p className="text-sm text-gray-400">
                              <i className="fas fa-eye text-sm"></i> 123 view
                            </p>
                            <button className="bg-red-200 text-red-900 px-2 py-1 rounded hover:text-red-800 hover:bg-red-100 hover:cursor-pointer">
                              <i className="fas fa-trash text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Link
          href={"/auth/login"}
          className="bg-gradient-to-r
        
        from-indigo-500 to-pink-500 px-6 py-3 border-0 
        text-[15px] font-bold rounded-full 
         "
        >
          Login <i className="fas fa-sign-in-alt"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
