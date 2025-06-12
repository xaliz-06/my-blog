"use client";

import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ShowcaseList from "./ShowcaseList";

interface SearchProps {
  posts: CollectionEntry<"blog">[];
}

const BlogSearch = ({ posts }: SearchProps) => {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  const defaultQuery = searchParams?.get("q") ?? "";
  const defaultType = searchParams?.get("type") ?? "title";

  const [inputValue, setInputValue] = useState(defaultQuery);
  const [query, setQuery] = useState(defaultQuery);
  const [searchType, setSearchType] = useState<"title" | "tag">(
    defaultType === "tag" ? "tag" : "title"
  );

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      includeScore: true,
      shouldSort: true,
      threshold: 0.3,
      keys:
        searchType === "title"
          ? ["data.title"]
          : ["data.primaryTags", "data.secondaryTags"],
    });
  }, [posts, searchType]);

  useEffect(() => {
    const timeout = setTimeout(() => setQuery(inputValue), 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    url.searchParams.set("type", searchType);
    window.history.replaceState({}, "", url);
  }, [query, searchType]);

  return (
    <div className="min-h-screen mt-12 mb-20 w-[90vw] mx-auto lg:w-full">
      <div className="w-full md:max-w-5xl mx-auto px-4 mt-8">
        <div className="flex gap-4 flex-col items-end md:flex-row md:items-center md:justify-between">
          <Input
            className="w-full h-[60px] md:h-[80px] bg-purple-400 border-black border-4 px-6 text-xl md:text-3xl font-bold focus:outline-none focus:ring-0 focus:border-black focus-visible:outline-none focus-visible:ring-0 focus-visible:border-black relative shadow-[5px_5px_0px_0px_#000] focus-visible:-translate-x-2 focus-visible:-translate-y-2 focus-visible:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 ease-in-out"
            type="text"
            placeholder="Search for ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Select
            value={searchType}
            onValueChange={(val) => setSearchType(val as "title" | "tag")}
          >
            <SelectTrigger className="w-[40vw] md:w-[15vw] h-[60px] md:h-[80px] mt-1 bg-purple-400 text-black font-roboto-mono border-black border-4 hover:bg-purple-400 px-4 text-base md:text-xl font-semibold tracking-tight focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 ring-offset-0 focus:ring-0 -translate-y-1 -translate-x-1 shadow-black shadow-[5px_5px_0px_0px_#000]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="mt-4 font-roboto-mono text-black bg-violet-300 border-4 border-black [&>*]:hover:border-black">
              <SelectGroup>
                <SelectItem
                  value="title"
                  className="text-sm md:text-lg tracking-tight focus:bg-purple-300 hover:border-black hover:border-2"
                >
                  Title
                </SelectItem>
                <SelectItem
                  value="tag"
                  className="text-sm md:text-lg tracking-tight focus:bg-purple-300 hover:border-black hover:border-2"
                >
                  Tag
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full md:max-w-5xl mx-auto px-4 mt-8 mb-2 md:mt-14 md:mb-10">
        {query.trim().length !== 0 && (
          <div>
            {results.length > 0 ? (
              <h3 className="text-xl md:text-3xl font-semibold tracking-tight font-archivo">
                <span className="text-purple-700">{results.length}</span>{" "}
                results found for{" "}
                <span className="text-purple-700">{query}</span> in{" "}
                <span className="text-purple-700">{searchType}</span> search
              </h3>
            ) : (
              <h3 className="text-xl md:text-3xl font-semibold tracking-tight font-archivo">
                No results found for{" "}
                <span className="text-purple-700">{query}</span> in{" "}
                <span className="text-purple-700">{searchType}</span> search
              </h3>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col my-4 md:my-8 w-full">
        <section className="mb-6 md:mb-12">
          <ShowcaseList posts={results} isPaginated={true} />
        </section>
      </div>
    </div>
  );
};

export default BlogSearch;
