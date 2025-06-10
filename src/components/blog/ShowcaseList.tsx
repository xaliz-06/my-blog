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
        {postsWithUrls.map((post) => (
          <li
            key={post.id}
            className="relative cursor-pointer"
            onClick={() => (window.location.href = post.url)}
          >
            <div className="w-full border-4 border-black px-8 py-6 min-h-[15vh] bg-violet-300 -translate-x-1 -translate-y-1 shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 mb-4 justify-center items-center">
                  {post.data.isPinned && (
                    <Pin className="text-emerald-700 " strokeWidth="3" />
                  )}
                  <div className="flex gap-2">
                    {post.data.primaryTags.map((tag) => (
                      <div
                        key={tag}
                        className="p-2 min-w-[4vw] h-[30px] bg-purple-500 flex items-center justify-center border-black border-2 relative -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_#000]"
                      >
                        <p className="text-md font-archivo font-bold">{tag}</p>
                      </div>
                    ))}
                  </div>
                  {post.data.secondaryTags && (
                    <div className="flex gap-2">
                      {post.data.secondaryTags.map((tag) => (
                        <div
                          key={tag}
                          className="p-2 min-w-[4vw] h-[30px] bg-fuchsia-500 flex items-center justify-center border-black border-2 relative -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_#000]"
                        >
                          <p className="text-md font-archivo font-bold">
                            {tag}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-6">
                  <div className="flex gap-2 items-center justify-center text-gray-600">
                    <Calendar size="18" />
                    {formatRelativeDate(post.data.pubDate)}
                  </div>
                  <div className="flex gap-2 items-center justify-center text-gray-600">
                    <Clock10 size="18" />
                    <p>{post.data.minutesToRead} minutes to read</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-4">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {post.data.title}
                  </h2>
                  <p className="text-xl font-archivo tracking-tighter text-gray-600">
                    {post.data.description}
                  </p>
                </div>
                {post.data.heroImage && (
                  <div className="flex flex-1 justify-end items-center">
                    <img
                      src={post.data.heroImage.src}
                      alt="hero-image"
                      className="w-[60%] object-contain"
                    />
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                className="w-[20%] h-[55px] rounded-none border-orange-400 border-4 cursor-pointer bg-orange-400 -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white"
                onClick={() => (window.location.href = post.url)}
              >
                <div className="flex gap-2 items-center justify-center">
                  <h5 className="text-2xl font-semibold tracking-tighter">
                    READ MORE
                  </h5>
                  <ArrowRight size="18" />
                </div>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {isPaginated && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant={"outline"}
            className={`w-[5vw] h-[55px] mx-8 rounded-none border-orange-400 border-4 cursor-pointer bg-orange-400 -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
              currentPage === 1
                ? "bg-orange-300 border-orange-300 cursor-not-allowed"
                : "bg-orange-500 border-orange-500 hover:border-indigo-700 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            <ChevronLeft size={20} />
          </Button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2">
                <Ellipsis size="22" />
              </span>
            ) : (
              <Button
                key={index}
                onClick={() => setCurrentPage(Number(page))}
                className={`w-[5vw] h-[55px] rounded-none text-xl  border-4 cursor-pointer -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
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
            className={`w-[5vw] h-[55px] mx-8 rounded-none border-4 cursor-pointer  -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white ${
              currentPage === totalPages
                ? "bg-orange-300 border-orange-300 cursor-not-allowed"
                : "bg-orange-500 border-orange-500 hover:border-indigo-700 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            <div className="flex gap-2 items-center justify-center">
              <ChevronRight size="28" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowcaseList;
