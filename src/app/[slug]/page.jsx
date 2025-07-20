"use client";
import React, { useState, useEffect } from "react";
import { Header, Footer, Category } from "../components";
import Image from "next/image";
import {
  background,
  defaultArticle,
  defaultAvatar,
} from "../components/images";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { formatDate, readingTime } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DOMPurify from "dompurify";
import CommentPagination from "../components/CommentPagination ";
export default function page() {
  const commentsPerPage = 5;
  const [allComments, setAllComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const [comment, setComment] = useState("");
  const { user, UserLoading } = useAuth();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState([]);
  const [profile_id, setProfile_id] = useState(null);
  const [bookmark, setBookmark] = useState(false);
  const [liked, setLiked] = useState(false);
  const totalPages = Math.ceil(allComments.length / commentsPerPage);

  const checkIfLiked = async (articleId, userId) => {
    const { data, error } = await supabase
      .from("like")
      .select("id")
      .eq("article_id", articleId)
      .eq("profile_id", userId)
      .maybeSingle(); // Không lỗi nếu không có bản ghi

    if (error && error.code !== "PGRST116") {
      console.error("Error checking like:", error);
      return false;
    }

    return !!data; // true nếu đã like
  };
  const checkIfBookmarked = async (articleId, userId) => {
    const { data, error } = await supabase
      .from("bookmark")
      .select("id")
      .eq("article_id", articleId)
      .eq("profile_id", userId)
      .maybeSingle(); // Không lỗi nếu không có bản ghi

    if (error && error.code !== "PGRST116") {
      console.error("Error checking like:", error);
      return false;
    }

    return !!data; // true nếu đã like
  };

  const fetchArticleData = async () => {
    setLoading(true);
    const { data: articleData, error: articleError } = await supabase
      .from("article")
      .select(
        "id,title,content,thumbnail,views,slug,date_created,category:category_id(id,name,thumbnail,color),author:profile_id(id,full_name,job_title),like(id,date_created,profile:profile_id(full_name,image))"
      )
      .eq("slug", slug)
      .single();
    setProfile_id(articleData?.author?.profile_id);
    if (articleError) {
      toast.error("Failed to fetch article data");
      console.error(articleError);
    } else {
      setArticle(articleData);
      setLike(articleData?.like);
      setLoading(false);
    }
  };
  const fetchComment = async () => {
    const { data, error } = await supabase
      .from("comment")
      .select("id, content, date_created, profile:profile_id(full_name, image)")
      .eq("article_id", article.id)
      .order("date_created", { ascending: false });
    if (error) {
      toast.error("Failed to fetch comment data");
      console.error(commentError);
    } else {
      setAllComments(data);
      setAllComments((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        )
      );
      setCurrentPage(1);
      setComments(data.slice(0, commentsPerPage));
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const start = (page - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    setComments(allComments.slice(start, end));
  };

  const fetchBookmark = async (articleId, userId) => {
    const { data, error } = await supabase
      .from("bookmark")
      .select("*")
      .eq("article_id", articleId)
      .eq("profile_id", userId)
      .single(); // chỉ lấy 1 bản ghi

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found when using .single()
      console.error("Failed to fetch bookmark:", error);
      setBookmark(false);
      return null;
    }
    setBookmark(true);
    return data; // null nếu chưa bookmark, hoặc object nếu đã bookmark
  };
  useEffect(() => {
    const fetchAll = async () => {
      await fetchArticleData();
      if (user?.id && article.id) {
        await fetchBookmark(article.id, user.id);
        const liked = await checkIfLiked(article.id, user.id);
        setLiked(liked);
        const booked = await checkIfBookmarked(article.id, user.id);
        setBookmark(booked);
      }
    };
    fetchAll();
  }, [user?.id, article.id]);
  useEffect(() => {
    if (article.id) {
      fetchComment();
    }
  }, [article.id]);

  const handleLike = async () => {
    try {
      // 1. Kiểm tra xem đã like chưa
      const { data: existingLike, error: fetchError } = await supabase
        .from("like")
        .select("id")
        .eq("article_id", article.id)
        .eq("profile_id", user?.id)
        .maybeSingle(); // không lỗi nếu không có dữ liệu

      if (fetchError) {
        toast.error("Lỗi kiểm tra trạng thái like");
        console.error("Fetch like error:", fetchError);
        return;
      }

      // 2. Nếu đã like → unlike
      if (existingLike) {
        const { error: deleteError } = await supabase
          .from("like")
          .delete()
          .eq("id", existingLike.id);

        if (deleteError) {
          toast.error("Không thể bỏ like");
          console.error("Unlike error:", deleteError);
        } else {
          // Cập nhật lại state nếu bạn có
          setLike((prev) => prev.filter((item) => item.id !== existingLike.id));
          setLiked(false);
        }
      }
      // 3. Nếu chưa like → like
      else {
        const { data: newLike, error: insertError } = await supabase
          .from("like")
          .insert({
            article_id: article.id,
            profile_id: user?.id,
            date_created: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          toast.error("Không thể like bài viết");
          console.error("Like error:", insertError);
        } else {
          setLike((prev) => [...prev, newLike]);
          setLiked(true);
        }
      }
    } catch (err) {
      toast.error("Đã xảy ra lỗi bất ngờ");
      console.error("Unexpected error in handleLike:", err);
    }
  };

  const handleBookmark = async () => {
    // Kiểm tra đã bookmark chưa
    const { data: bookmarkData, error: fetchError } = await supabase
      .from("bookmark")
      .select("id")
      .eq("article_id", article.id)
      .eq("profile_id", user?.id)
      .maybeSingle(); // tránh lỗi khi không có kết quả

    if (fetchError) {
      toast.error("Failed to check bookmark");
      console.error(fetchError);
      return;
    }

    // Nếu đã bookmark → unbookmark
    if (bookmarkData) {
      const { error: deleteError } = await supabase
        .from("bookmark")
        .delete()
        .eq("id", bookmarkData.id);
      if (deleteError) {
        toast.error("Failed to remove bookmark");
        console.error(deleteError);
      } else {
        setBookmark(false);
      }
    }
    // Nếu chưa bookmark → bookmark
    else {
      const { data: insertData, error: insertError } = await supabase
        .from("bookmark")
        .insert({
          article_id: article.id,
          profile_id: user?.id,
          date_created: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        toast.error("Failed to add bookmark");
        console.error(insertError);
      } else {
        setBookmark(true);
      }
    }
  };

  const handleComment = async () => {
    if (!user?.id) {
      toast.error("Please login to comment");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const { data: commentData, error: commentError } = await supabase
      .from("comment")
      .insert({
        article_id: article.id,
        profile_id: user?.id,
        content: comment,
        date_created: new Date().toISOString(),
      });

    if (commentError) {
      toast.error("Failed to comment");
      console.error(commentError);
    } else {
      toast.success("Commented successfully");

      //Reset ô input sau khi gửi thành công
      setComment("");
      fetchComment();
      //Nếu cần cập nhật danh sách bình luận:
      setComments((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        )
      );
    }
  };

  return (
    <div>
      {/* Header Section */}
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

      {/* Article Section */}
      <section className="lg:px-33 px-5 my-20 z-10 relative">
        <div className="relative w-full h-[30rem]">
          <Image
            width={100}
            height={100}
            src={article?.thumbnail || defaultArticle}
            alt="Article"
            className="w-full h-[30rem] object-cover absolute rounded-2xl "
          ></Image>
          <div className="w-full h-[30rem] bg-black/50 absolute rounded-2xl z-10" />
          <h1 className=" absolute text-xl font-semibold leading-[4rem]  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center text-white drop-shadow-md">
            {article?.title}
          </h1>
        </div>

        {/* Article Meta Section */}
        <div className="flex items-center gap-3 mt-10 ">
          <button
            onClick={handleLike}
            className={`p-2  ${
              liked
                ? "bg-purple-800 hover:bg-purple-600"
                : "bg-indigo-800 hover:bg-indigo-600"
            } rounded-lg  hover:cursor-pointer`}
          >
            <i className="fas fa-thumbs-up " /> {like?.length || "0"}
          </button>
          <button
            onClick={handleBookmark}
            className={`p-2 px-4  rounded-lg ${
              bookmark ? "bg-purple-800 hover:bg-purple-600" : "bg-indigo-800"
            } hover:bg-indigo-600 hover:cursor-pointer  `}
          >
            <i className="fas fa-bookmark" />
          </button>
          <div className="p-2 px-4 bg-indigo-800 rounded-lg">
            <i className="fas fa-eye me-1 capitalize " /> {article?.views || 0}{" "}
            Views
          </div>
          <div className="p-2 px-4 bg-indigo-800 rounded-lg">
            <i className="fas fa-calendar me-1 capitalize " />{" "}
            {readingTime(article?.content || "")}
          </div>
        </div>

        {/* Article Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 my-10">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.content),
              }}
              className="bg-[#000] p-4 rounded-3xl backdrop-blur-sm mt-10"
            >
              {}
            </div>

            {/* Author Section */}
            <div className="space-y-33 mt-10">
              <div className="flex items-center gap-4 bg-indigo-800 rounded-xl p-3 relative">
                <Image
                  width={100}
                  height={100}
                  src={article?.author?.image || defaultAvatar}
                  alt={article?.title || "Author"}
                  className="w-[5rem] h-[5rem] rounded-full   "
                />
                <div>
                  <h1 className="text-3xl font-bold ">
                    {article?.author?.full_name}
                  </h1>
                  <p className="text-gray-400 text-xs mt-1">
                    {article?.author?.job_title}
                  </p>
                </div>
              </div>
            </div>

            {/* Comment form Section */}
            <div className="mt-10">
              <h1 className="mb-5 text-2xl font-bold">Leave a comment</h1>
              <div className="space-y-5 relative ">
                <div className="flex flex-col items-start gap-2 ">
                  <label htmlFor="">Comment</label>
                  <textarea
                    className="border-3 border-gray-500 p-2 rounded-lg w-full"
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Your Comment"
                    value={comment}
                  />
                </div>
                <div>
                  <button
                    onClick={handleComment}
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
              <h1 className="text-2xl mb-5 ">
                {allComments?.length || "0"} Comments
              </h1>
              <div className="space-y-6 ">
                {comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-[#022502] boder border-[#110c1f] p-5 rounded-xl"
                  >
                    <div className="flex items-center gap-3 ">
                      <Image
                        width={100}
                        height={100}
                        alt={comment?.profile?.full_name || "Author"}
                        src={comment?.profile?.image || defaultAvatar}
                        className="w-[2rem]  rounded-full"
                      ></Image>
                      <div>
                        <h1 className="text-lg font-bold ">
                          {comment?.profile?.full_name}
                        </h1>
                        <p className="text-gray-400 text-xs mt-1">
                          {formatDate(comment?.date_created)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mt-3 text-gray-100 ">
                      {comment?.content}
                    </p>
                  </div>
                ))}
                {allComments.length > 5 && (
                  <CommentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
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
