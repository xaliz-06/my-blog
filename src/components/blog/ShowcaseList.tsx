"use client";

import type { CollectionEntry } from "astro:content";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock10,
  Ellipsis,
  Pin,
} from "lucide-react";
import { useState } from "react";
import { formatRelativeDate } from "@/lib/date-formatter";
import TagsList from "./TagsList";

interface ShowcaseProps {
  posts: CollectionEntry<"blog">[];
  isPaginated: boolean;
}

const ShowcaseList = ({ posts, isPaginated }: ShowcaseProps) => {
  const postsWithUrls = posts.map((post) => {
    return {
      ...post,
      url: `/blog/${post.id}`,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  // const totalPages = 33;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsWithUrls.slice(indexOfFirstPost, indexOfLastPost);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="mt-12">
      <ul className="list-none flex flex-col gap-4">
        {currentPosts.map((post) => (
          <li
            key={post.id}
            className="relative cursor-pointer"
            onClick={() => (window.location.href = post.url)}
          >
            <div className="w-full border-4 border-black px-4 py-3 md:px-8 md:py-6 min-h-[15vh] bg-violet-300 -translate-x-1 -translate-y-1 shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black transition-all duration-300 ease-in-out">
              <div className="flex flex-col gap-2 mb-4 md:mb-0 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
                <div className="flex gap-2 md:gap-4 md:2 md:mb-4 justify-start items-center flex-wrap">
                  {post.data.isPinned && (
                    <Pin
                      className="text-emerald-700 scale-75 md:scale-115"
                      strokeWidth="3"
                    />
                  )}
                  <TagsList
                    primaryTags={post.data.primaryTags}
                    secondaryTags={post.data.secondaryTags}
                  />
                </div>
                <div className="flex gap-3 justify-between md:gap-6 text-xs md:text-base md:items-center">
                  <div className="flex gap-0 md:gap-2 items-center justify-center text-gray-600">
                    <Calendar className="scale-60 md:scale-75" />
                    {formatRelativeDate(post.data.pubDate)}
                  </div>
                  <div className="flex gap-0 md:gap-2 items-center justify-center text-gray-600">
                    <Clock10 className="scale-60 md:scale-75" />
                    <p>{post.data.minutesToRead} minutes to read</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-between mb-3 lg:mb-0">
                <div className="flex">
                  <h2 className="text-xl md:text-3xl font-semibold tracking-tighter md:tracking-tight">
                    {post.data.title}
                  </h2>
                </div>

                <div className="flex flex-row justify-between items-start gap-4 md:gap-0">
                  <div className="flex-3 flex items-center justify-start">
                    <p className="text-sm md:text-xl font-archivo tracking-tighter text-gray-600">
                      {post.data.description}
                    </p>
                  </div>
                  {post.data.heroImage && (
                    <div className="flex-2 flex justify-end">
                      <img
                        src={post.data.heroImage.src}
                        alt="hero-image"
                        className="w-[100%] md:w-[60%] object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                className="min-w-[20%] md:min-w-[40%] lg:min-w-[20%] h-[35px] md:h-[55px] rounded-none border-orange-400 border-4 cursor-pointer bg-orange-400 -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white"
                onClick={() => (window.location.href = post.url)}
              >
                <div className="flex gap-2 items-center justify-center">
                  <h5 className="text-lg :md:text-2xl font-semibold tracking-tighter">
                    READ MORE
                  </h5>
                  <ArrowRight size="18" className="scale-150 ml-2" />
                </div>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {isPaginated && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 px-2 flex-wrap w-full">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant={"outline"}
            className={`w-[20px] h-[30px] md:w-[5vw] md:h-[55px] mr-4 md:mx-8 rounded-none border-4 cursor-pointer  -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
              currentPage === 1
                ? "bg-orange-300 border-orange-300 cursor-not-allowed"
                : "bg-orange-500 border-orange-500 hover:border-indigo-700 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            <div className="flex gap-2 items-center justify-center">
              <ChevronLeft className="scale-100 md:scale-150" />
            </div>
          </Button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2">
                <Ellipsis className="scale-100 md:scale-150" />
              </span>
            ) : (
              <Button
                key={index}
                onClick={() => setCurrentPage(Number(page))}
                className={`w-[20px] h-[30px] md:w-[5vw] md:h-[55px] rounded-none text-sm md:text-xl mx-0.5  border-4 cursor-pointer -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
                  currentPage === page
                    ? "bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700"
                    : "bg-violet-500 border-violet-500 hover:bg-violet-600 hover:border-violet-600"
                }`}
              >
                {page}
              </Button>
            )
          )}

          <Button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            variant={"outline"}
            className={`w-[20px] h-[30px] md:w-[5vw] md:h-[55px] ml-4 md:mx-8 rounded-none border-4 cursor-pointer  -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
              currentPage === totalPages
                ? "bg-orange-300 border-orange-300 cursor-not-allowed"
                : "bg-orange-500 border-orange-500 hover:border-indigo-700 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            <div className="flex gap-2 items-center justify-center">
              <ChevronRight className="scale-100 md:scale-150" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowcaseList;
