"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./Schema";
import { imageSchema } from "./Schema";
import { bucketImageUpload, deleteImage } from "./supabase";
import { revalidatePath } from "next/cache";
import path from "path";
import { tree } from "next/dist/build/templates/app-page";

async function authUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error("how the fuck u access this page");
  }
  return user;
}

export async function FetchFeaturedProducts() {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
}

export async function FetchAllProducts(search: string = "") {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export async function FetchSingleProduct(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
}

export async function createProduct(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  const user = await authUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validateField = productSchema.safeParse(rawData);

    const file = formData.get("image") as File;
    const imageValidate = imageSchema.safeParse({ image: file });

    if (!imageValidate.success) {
      const error = imageValidate.error.errors.map((err) => err.message);
      throw new Error(error.join(","));
    }

    if (!validateField.success) {
      const errors = validateField.error.errors.map((error) => error.message);
      throw new Error(errors.join(","));
    }

    //supabase image upload path
    const fullPath = await bucketImageUpload(imageValidate.data.image);

    await db.product.create({
      data: {
        ...validateField.data,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: error instanceof Error ? error.message : "there is error",
    };
  }
  redirect("/admin/products");
}

export async function fetchAdminProducts() {
  const product = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return product;
}

export async function DeleteProduct(prevState: any, formData: FormData) {
  const productId = formData.get("id") as string;
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    deleteImage(product.image);
    revalidatePath("admin/products");
    return { message: "product Deleted" };
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : "there is error",
    };
  }
}

export async function FetchAdminProduct(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!productId) redirect("/admin/products");
  return product;
}

export async function ProductUpdated(prevState: any, formData: FormData) {
  try {
    const productId = formData.get("ids") as string;
    const rawData = Object.fromEntries(formData);
    const validateData = productSchema.safeParse(rawData);
    if (!validateData.success) {
      const erros = validateData.error.errors.map((err) => err.message);
      throw new Error(erros.join(","));
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validateData.data,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "product updated successfully" };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there  is error" };
  }
}

export async function updateImageAction(prevState: any, formData: FormData) {
  try {
    const newImage = formData.get("image") as File;
    const oldIMage = formData.get("url") as string;
    const productId = formData.get("pId") as string;

    const validateImage = imageSchema.safeParse({ image: newImage });
    if (!validateImage.success) {
      const erros = validateImage.error.errors.map((err) => err.message);
      throw new Error(erros.join(","));
    }
    const fullPath = await bucketImageUpload(validateImage.data.image);
    await deleteImage(oldIMage);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "image updated successfully" };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there  is error" };
  }
}

export async function fetchFavoriteId({ productId }: { productId: string }) {
  const user = await authUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId: productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
}

export async function buttonFavoriteToogle(prevState: any, formData: FormData) {
  const user = await authUser();
  try {
    const productId = formData.get("pId") as string;
    const favoriteId = formData.get("fId") as string | null;
    const pathName = formData.get("pName") as string;

    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathName);
    return {
      message: favoriteId ? "removed from favorites" : "added to favorites",
    };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there  is error" };
  }
}

export async function fetchFavoriteproduct() {
  const user = await authUser();
  const products = db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return products;
}
