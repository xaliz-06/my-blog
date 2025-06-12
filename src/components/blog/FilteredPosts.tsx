"use client";

import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import BlogFilter from "./BlogFilter";
import ShowcaseList from "./ShowcaseList";

interface FilteredPostsProps {
  initialPosts: CollectionEntry<"blog">[];
}

const FilteredPosts = ({ initialPosts }: FilteredPostsProps) => {
  const [posts, setPosts] = useState<CollectionEntry<"blog">[]>(initialPosts);

  const handleFilterChange = (value: string) => {
    const sortedPosts = [...initialPosts];

    switch (value) {
      case "recent":
        sortedPosts.sort(
          (a, b) =>
            new Date(b.data.pubDate).valueOf() -
            new Date(a.data.pubDate).valueOf()
        );
        break;
      case "oldest":
        sortedPosts.sort(
          (a, b) =>
            new Date(a.data.pubDate).valueOf() -
            new Date(b.data.pubDate).valueOf()
        );
        break;
      case "popular":
        sortedPosts.sort(
          (a, b) =>
            new Date(b.data.pubDate).valueOf() -
            new Date(a.data.pubDate).valueOf()
        );
        break;
      default:
        break;
    }

    setPosts(sortedPosts);
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row">
        <div className="mt-4 mb-2 flex-1 flex flex-col gap-3">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            📜 ALL POSTS
          </h2>
          <div className="w-[100%] border-3 border-black bg-fuchsia-800 h-[10px]"></div>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <BlogFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <ShowcaseList posts={posts} isPaginated={true} />
    </>
  );
};

export default FilteredPosts;
