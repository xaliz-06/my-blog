import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CommentSchema } from "@/consts";

interface Props {
  postSlug: string;
}

export default function CommentForm({ postSlug }: Props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
    postSlug: postSlug,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    console.log("Submitting comment:", formData);

    const result = CommentSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    console.log("Parsed form data:", result.data);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: new URLSearchParams({ ...formData, postSlug }),
      });

      if (res.ok) {
        setFormData({ username: "", email: "", message: "", postSlug });
        setErrors({});
        setStatus("success");
      } else {
        const data = await res.json();
        setErrors(data.errors || {});
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 font-roboto-mono">
      <input type="hidden" name="postSlug" value={postSlug} />

      <div className="flex w-full flex-col gap-4 md:gap-0 md:flex-row mb-4 md:space-x-8 md:justify-center md:items-center">
        <div className="flex-1 flex flex-col space-y-2 md:space-y-4">
          <label
            htmlFor="username"
            className="text-lg md:text-xl font-semibold tracking-tight"
          >
            Name:
          </label>
          <Input
            name="username"
            id="username"
            placeholder="Name or Nickname"
            value={formData.username}
            onChange={handleChange}
            className="w-full h-[40px] md:h-[50px] bg-purple-400 border-black border-4 px-6 text-lg md:text-2xl font-bold focus:outline-none focus:ring-0 focus:border-black relative shadow-[5px_5px_0px_0px_#000] focus-visible:-translate-x-2 focus-visible:-translate-y-2 focus-visible:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 ease-in-out"
          />
          {errors.username && (
            <p className="text-red-500 text-xs md:text-md">{errors.username}</p>
          )}
        </div>

        <div className="flex-1 flex flex-col space-y-2 md:space-y-4">
          <label
            htmlFor="email"
            className="text-lg md:text-xl font-semibold tracking-tight"
          >
            Email:
          </label>
          <Input
            name="email"
            id="email"
            placeholder="E-mail (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[40px] md:h-[50px] bg-purple-400 border-black border-4 px-6 text-lg md:text-2xl font-bold focus:outline-none focus:ring-0 focus:border-black relative shadow-[5px_5px_0px_0px_#000] focus-visible:-translate-x-2 focus-visible:-translate-y-2 focus-visible:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 ease-in-out"
          />
          {errors.email && (
            <p className="text-red-500 text-xs md:text-md">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mb-4 flex-1 flex flex-col space-y-4">
        <label
          htmlFor="message"
          className="text-lg md:text-xl font-semibold tracking-tight"
        >
          Comment:
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Write your comment here..."
          value={formData.message}
          onChange={handleChange}
          className="w-full h-[80px] md:h-[100px] bg-purple-400 border-black border-4 px-6 text-lg md:text-2xl font-bold focus:outline-none focus:ring-0 focus:border-black relative shadow-[5px_5px_0px_0px_#000] focus-visible:-translate-x-2 focus-visible:-translate-y-2 focus-visible:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 ease-in-out"
        />
        {errors.message && (
          <p className="text-red-500 text-xs md:text-md">{errors.message}</p>
        )}
      </div>

      <div className="mt-6 mb-12 flex justify-between">
        <Button
          type="submit"
          variant="outline"
          className="w-[50%] h-[40px] lg:w-[20%] md:h-[55px] rounded-none border-orange-400 border-4 cursor-pointer bg-orange-400 -translate-x-1 -translate-y-1 transition-all duration-300 ease-in-out text-white shadow-[5px_5px_0px_0px_#000] shadow-black relative hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] hover:shadow-black hover:bg-indigo-500 hover:border-indigo-500 hover:text-white"
        >
          <div className="flex gap-2 items-center justify-center">
            <h5 className="text-lg md:text-2xl font-semibold tracking-tighter">
              ADD COMMENT
            </h5>
          </div>
        </Button>
        {status === "success" && (
          <p className="text-green-600 font-semibold mt-4 text-sm md:text-xl">
            Comment submitted! Refresh to see it.
          </p>
        )}
        {status === "error" && Object.keys(errors).length === 0 && (
          <p className="text-red-600 font-semibold mt-4 text-sm md:text-xl">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </form>
  );
}
