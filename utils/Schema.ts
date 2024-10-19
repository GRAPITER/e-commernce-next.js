import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name should be greater than 3 character" }),
  company: z
    .string()
    .min(4, { message: "name should be greator than 4 character" }),
  price: z.coerce.number().int().min(0, {
    message: "price should not be in negative",
  }),
  description: z
    .string()
    .refine((val) => val.length >= 10 && val.length <= 500, {
      message:
        "description must be greater then 10  and smaller than 500 letter",
    }),
  featured: z.coerce.boolean(),
});

const maxFileSize = 1024 * 1024;
export const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxFileSize;
    }, `file size must be smaller than 1 MB`)
    .refine((file) => {
      return !file || file.type.startsWith("image/");
    }, `file type is incorrect`),
});
