import { upload } from "@imagekit/react";

export const getImagekitAuth = async () => {
  const res = await fetch("/api/blogs/upload-auth");
  if (!res.ok) throw new Error("ImageKit auth failed");
  return await res.json();
};

export const uploadImageToImageKit = async (file: File): Promise<string> => {
  const auth = await getImagekitAuth();
  const { url } = await upload({
    file,
    fileName: `${Date.now()}-${file.name}`,
    ...auth,
    onProgress: (e) => {
      console.log("Upload progress:", Math.round((e.loaded / e.total) * 100));
    },
  });
  return url;
};
