interface TagsListProps {
  primaryTags: string[];
  secondaryTags?: string[];
}

const TagsList = ({ primaryTags, secondaryTags }: TagsListProps) => {
  return (
    <>
      <div className="flex gap-2">
        {primaryTags.map((tag) => (
          <div
            key={tag}
            className="p-2 min-w-[4vw] h-[20px] md:h-[30px] bg-purple-500 flex items-center justify-center border-black border-2 relative -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#000] transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => (window.location.href = `/search?q=${tag}&type=tag`)}
          >
            <p className="text-sm md:text-md font-archivo font-bold">{tag}</p>
          </div>
        ))}
      </div>
      {secondaryTags && (
        <div className="flex gap-2">
          {secondaryTags.map((tag) => (
            <div
              key={tag}
              className="p-2 min-w-[4vw] h-[20px] md:h-[30px] bg-fuchsia-500 flex items-center justify-center border-black border-2 relative -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#000] transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() =>
                (window.location.href = `/search?q=${tag}&type=tag`)
              }
            >
              <p className="text-sm md:text-md font-archivo font-bold">{tag}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagsList;
