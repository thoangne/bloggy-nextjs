"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header, Footer } from "@/app/components";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("*");
      if (error) {
        toast.error("Failed to fetch categories");
        console.error(error);
      } else {
        setCategories(data);
        if (data.length > 0 && !category) {
          setCategory(data[0].id);
        }
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    let thumbnailUrl = null;

    // Upload thumbnail to Supabase Storage
    if (thumbnail) {
      const fileName = `${Date.now()}_${thumbnail.name}`;
      console.log(fileName, "file name");
      const { data, error } = await supabase.storage
        .from("thumbnails")
        .upload(fileName, thumbnail);

      console.log(data, error);

      if (error) {
        toast.error("Image upload failed");
        console.error(error);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("thumbnails")
        .getPublicUrl(fileName);

      thumbnailUrl = urlData.publicUrl;
    }
    const slug = slugify(title);
    // Insert article into DB
    const { error } = await supabase.from("article").insert({
      title,
      content,
      category_id: category,
      thumbnail: thumbnailUrl,
      slug,
      profile_id: user.id,
      date_created: new Date().toISOString(),
    });

    if (error) {
      toast.error("Failed to create post");
      console.error(error);
    } else {
      toast.success("Post created successfully");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <section className="min-h-screen px-6 py-10  ">
        <div className="max-w-3xl mx-auto bg-black p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full flex items-center justify-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setThumbnail(file);
                    setThumbnailPreview(URL.createObjectURL(file));
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setThumbnail(file);
                      setThumbnailPreview(URL.createObjectURL(file));
                    }
                  };
                  input.click();
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = await uploadImage(file);
                      console.log("Public image URL:", url);
                    }
                  }}
                  className="hidden"
                />
                {!thumbnailPreview ? (
                  <p className="text-center">Drag and drop your image here</p>
                ) : (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full max-h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 p-3 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              className="w-full border border-gray-300 p-3 rounded-lg h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <select
              className="w-full border border-gray-300  p-3 rounded-lg bg-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-black text-white "
                >
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-lg hover:from-pink-500 hover:to-indigo-500 transition"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
