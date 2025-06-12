"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface BlogFilterProps {
  onFilterChange: (value: string) => void;
}

const BlogFilter = ({ onFilterChange }: BlogFilterProps) => {
  return (
    <Select onValueChange={onFilterChange} defaultValue="recent">
      <SelectTrigger className="w-[45vw] md:w-[25vw] lg:w-[15vw] h-[50px] bg-violet-500 text-black font-roboto-mono border-black border-4 hover:bg-violet-600 px-4 text-sm md:text-xl font-semibold tracking-tight focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 ring-offset-0 focus:ring-0 -translate-y-1 -translate-x-1 shadow-black shadow-[5px_5px_0px_0px_#000]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="mt-4 font-roboto-mono text-black bg-violet-300 border-4 border-black [&>*]:hover:border-black">
        <SelectGroup>
          <SelectItem
            value="recent"
            className="text-sm md:text-lg tracking-tight focus:bg-violet-400 hover:border-black hover:border-2"
          >
            Most Recent
          </SelectItem>
          <SelectItem
            value="oldest"
            className="text-sm md:text-lg tracking-tight focus:bg-violet-400 hover:border-black hover:border-2"
          >
            Oldest First
          </SelectItem>
          <SelectItem
            value="popular"
            className="text-sm md:text-lg tracking-tight focus:bg-violet-400 hover:border-black hover:border-2"
          >
            Most Popular
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BlogFilter;
