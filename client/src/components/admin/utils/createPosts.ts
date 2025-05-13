import { BlogPost } from "@/types/blog";

export const createBlogPost = async (postData: BlogPost) => {
  const response = await fetch("/api/blogs/create", {
    method: "POST",
    credentials: 'include', // This sends cookies with the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create post");
  }

  return await response.json();
};