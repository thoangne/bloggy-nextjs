"use client";
import React, { useState } from "react";
import { Header, Footer } from "@/app/components";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      setLoading(false);
      return;
    }

    // Register with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
      },
    });

    if (error) {
      toast.error(error.message);
      console.error("Sign-up error:", error);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;
    if (!userId) {
      toast.error("User ID not found after signup");
      setLoading(false);
      return;
    }

    // Insert profile info
    const { error: profileError } = await supabase.from("profile").insert({
      id: userId,
      full_name: fullName,
      role: "user",
    });

    if (profileError) {
      toast.error("Failed to create profile: " + profileError.message);
      console.error("Insert profile error:", profileError);
      setLoading(false);
      return;
    }

    toast.success("Registration successful");
    setLoading(false);
    router.push("/auth/login").then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Header />
      <section className="lg:px-33 px-5 lg:my-20 my-10 flex justify-center items-center">
        <div className="bg-[#000] backdrop-blur-md w-[33rem] p-10 rounded-2xl">
          <div className="mb-10">
            <h1 className="lg:text-5xl text-4xl font-bold">Register</h1>
            <p className="font-normal text-sm mt-2">
              Welcome to bloggy, sign up to continue
            </p>
          </div>
          <form onSubmit={handleRegister} className="space-y-5 relative">
            <input
              type="text"
              placeholder="Full name"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-3 border-gray-500 p-2 rounded-lg w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r flex-row flex items-center justify-center gap-2
              from-indigo-500 to-pink-500 px-4 py-2 border-0 text-[15px] rounded-full 
              hover:cursor-pointer hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-500 
              transition duration-500 hover:text-gray-200"
            >
              {loading ? (
                <>
                  Creating Account...{" "}
                  <i className="fas fa-spinner fa-spin ms-1" />
                </>
              ) : (
                <>
                  Create Account <i className="fas fa-user-plus ms-1" />
                </>
              )}
            </button>
            <p className="font-light text-xs text-center mt-2 text-gray-300">
              Already have an account?{" "}
              <Link
                className="border-b border-dashed border-gray-300 text-[#9e0084]"
                href={"/auth/login"}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
