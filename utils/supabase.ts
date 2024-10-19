import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export async function bucketImageUpload(image: File) {
  const timeStamp = Date.now();
  const pathName = `${timeStamp}-${image.name}`;

  const { data } = await supabase.storage
    .from("product")
    .upload(pathName, image, { cacheControl: "3600" });

  if (!data) {
    throw new Error("image not uploded");
  }

  return `https://dlvhpxifykiddkctejhj.supabase.co/storage/v1/object/public/product/${pathName}`;
}

export async function deleteImage(url: string) {
  const fileName = url.split("/").pop();

  if (!fileName) throw new Error("there is no image name");

  const { data } = await supabase.storage.from("product").remove([fileName]);

  return data;
}
