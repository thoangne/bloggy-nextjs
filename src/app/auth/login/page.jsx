"use client";
import React, { useState } from "react";
import { Header, Footer } from "@/app/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { background } from "@/app/components/images";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Login with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      console.error("Login error:", error);
      setLoading(false);
      return;
    }
    toast.success("Login successful");
    setLoading(false);
    // Redirect to dashboard
    router.push("/dashboard");
  };
  return (
    <div>
      <Header></Header>
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover opacity-50 pointer-events-none"
          priority
        />
      </div>

      <section className="lg:px-33 px-5 lg:my-20 my-10 flex justify-center items-center ">
        <div className="bg-[#000] backdrop-blur-md w-[33rem] p-10 rounded-2xl ">
          <div className="mb-10">
            <h1 className="lg:text-5xl text-4xl font-bold">Login</h1>
            <p className="font-normal text-sm mt-2">
              Welcom back to bloggy, login to continue
            </p>
          </div>
          <form onSubmit={handleLogin} action="" className="space-y-5 relative">
            <input
              type="email"
              value={email}
              placeholder="Email address"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-full  bg-gradient-to-r
             flex-row flex items-center justify-center  gap-2
        from-indigo-500 to-pink-500 px-4 py-2                                                                                                                                                                                                                                                                                                                                                                          border-0 
        text-[15px]  rounded-full 
         hover:cursor-pointer hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-500 transition duration-500 hover:text-gray-200 "
            >
              {loading ? <>Login...</> : <> Login </>}
            </button>
            <p className="font-light text-xs text-center mt-2 text-gray-300">
              Don't have an account yet?{" "}
              <Link
                className="border-b border-dashed border-gray-300 text-[#9e0084]"
                href={"/auth/register"}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
