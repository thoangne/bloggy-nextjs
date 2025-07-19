"use client";
import Link from "next/link";
import React, { useState } from "react";
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
import { bg, defaultArticle, defaultAvatar } from "./images";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error.message);
        toast.error("Logout failed");
        setLoading(false);
      }
      toast.success("Logout successful");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <>
      <header className="flex    max-[480px]:flex-row lg:flex-row justify-between items-center bg-gradient-to-br from-[#570176] to-[#000] text-white mx-4 mt-4 px-6 py-4 rounded-full shadow-md space-y-4 lg:space-y-0">
        <Link href="/" className="mb-0">
          <h1 className="text-3xl font-bold cursor-pointer hover:opacity-90 transition-opacity items-center">
            Bloggy
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          {/* Bookmarked Section */}
          <Dialog>
            <DialogTrigger>
              <i className="ri-heart-line text-2xl hover:cursor-pointer hover:text-gray-400"></i>
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
              <i className="ri-search-line text-2xl hover:cursor-pointer hover:text-gray-400 "></i>
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
          <Menubar className={"bg-inherit border-0"}>
            <MenubarMenu>
              <MenubarTrigger className=" hover:cursor-pointer   hover:text-gray-500 rounded-full transition">
                <i className="fas fa-user text-xl" />
              </MenubarTrigger>
              <MenubarContent align="end" className="rounded-md shadow-lg">
                <MenubarItem>
                  <Link
                    href="/dashboard"
                    className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-500 rounded"
                  >
                    Dashboard
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    href="/dashboard/profile"
                    className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-500 rounded"
                  >
                    Profile
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    href="/dashboard/article"
                    className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-500 rounded"
                  >
                    Article
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link
                    href="/dashboard/article/manage"
                    className="hover:cursor-pointer w-full block px-2 py-1 hover:text-gray-500 rounded"
                  >
                    Manage Article
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Login Section */}
          {user ? (
            <button
              disabled={loading}
              onClick={handleLogout}
              className="bg-gradient-to-r
            hidden lg:flex-row lg:flex lg:items-center lg:gap-2
        from-indigo-500 to-pink-500 px-4 py-2                                                                                                                                                                                                                                                                                                                                                                          border-0 
        text-[15px] font-bold rounded-full 
         hover:cursor-pointer hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-500 transition duration-500 hover:text-gray-200 "
            >
              {loading ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                <i className="fas fa-sign-out-alt"></i>
              )}
            </button>
          ) : (
            <Link
              href={"/auth/login"}
              className="bg-gradient-to-r
            hidden lg:flex-row lg:flex lg:items-center lg:gap-2
        from-indigo-500 to-pink-500 px-4 py-2                                                                                                                                                                                                                                                                                                                                                                          border-0 
        text-[15px] font-bold rounded-full 
         hover:cursor-pointer hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-500 transition duration-500 hover:text-gray-200 "
            >
              Login <i className="fas fa-sign-in-alt"></i>
            </Link>
          )}
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <i className="fas fa-bars text-2xl ms-3" />
            </SheetTrigger>
            <SheetContent
              className={"bg-[#0f060611] border text-white border-[#110c1f] "}
            >
              <SheetHeader>
                <SheetTitle className={"text-2xl font-bold text-white"}>
                  Bloggy
                </SheetTitle>
              </SheetHeader>
              <ul className="ms-2 space-y-7">
                <li>
                  <a href="" className="flex items-center gap-3 ">
                    <i className="fas fa-home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center gap-3 ">
                    <i className="fas fa-book" />
                    <span>Article</span>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center gap-3 ">
                    <i className="fas fa-user" />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center gap-3 ">
                    <i className="fas fa-gear" />
                    <span>Setting</span>
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Header;
