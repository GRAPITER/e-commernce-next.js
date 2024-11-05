"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser, EmailAddress } from "@clerk/nextjs/server";
import { productSchema, reviewSchema } from "./Schema";
import { imageSchema } from "./Schema";
import { bucketImageUpload, deleteImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

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

//add to fav technique action section

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
// curd with reviews technique action section

export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await authUser();

  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);
    const validateReview = reviewSchema.safeParse(rawData);
    if (!validateReview.success) {
      const error = validateReview.error.errors.map((err) => err.message);
      throw new Error(error.join(","));
    }
    await db.review.create({
      data: {
        ...validateReview.data,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validateReview.data.productId}`);
    return { message: "review created" };
  } catch (error) {
    console.error(error);
    return error instanceof Error
      ? { message: error.message }
      : { message: "there is an Error" };
  }
}

export async function fetchProductReview(productId: string) {
  const review = await db.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return review;
}

export async function fetchRatingAverage(productId: string) {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  return result || null;
}

export async function fetchUserReview() {
  const user = await authUser();
  const review = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      comment: true,
      rating: true,
      id: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  return review;
}

export async function DeleteUserReview(prevState: any, formData: FormData) {
  const reviewId = formData.get("rId") as string;
  const user = await authUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "review deleted" };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there is an Error" };
  }
}

export async function findExistingReview(productId: string, userId: string) {
  return await db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
}

//queries related to cartItems

//it cheak how many item in cart
// export async function fetchCartItems() {
//   const user = auth();
//   const cart = await db.cart.findFirst({
//     where: {
//       clerkId: user?.userId ?? "",
//     },
//     select: {
//       numItemsInCart: true,
//     },
//   });

//   return cart?.numItemsInCart || 0;
// }

// //1 helper funtion to fech the product accouding to productId
// async function fetchProduct(productId: string) {
//   const product = await db.product.findUnique({
//     where: {
//       id: productId,
//     },
//   });
//   if (!product) throw new Error("there is no product");

//   return product;
// }

// //2 helper function to fetch or create cart

// async function fetchOrCreateCart(userId: string, isError: boolean = false) {
//   let cart = await db.cart.findFirst({
//     where: {
//       clerkId: userId,
//     },
//     include: {
//       cartItems: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   });

//   if (!cart && isError) throw new Error("Cart Not Found");

//   if (!cart) {
//     cart = await db.cart.create({
//       data: {
//         clerkId: userId,
//       },
//       include: {
//         cartItems: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });
//   }
//   return cart;
// }

// //3 helper function to update or create cartItems

// async function updateOrCreateCartItems({
//   productId,
//   amount,
//   cartId,
// }: {
//   productId: string;
//   amount: number;
//   cartId: string;
// }) {
//   let cartItem = await db.cartItem.findFirst({
//     where: {
//       productId: productId,
//       cartId: cartId,
//     },
//   });

//   if (cartItem) {
//     cartItem = await db.cartItem.update({
//       where: {
//         id: cartItem.id,
//       },
//       data: {
//         amount: cartItem.amount + amount,
//       },
//     });
//   } else {
//     cartItem = await db.cartItem.create({
//       data: {
//         productId,
//         amount,
//         cartId,
//       },
//     });
//   }
// }

// //4 helper to update cart
// export const updateCart = async (cart: Cart) => {
//   const cartItems = await db.cartItem.findMany({
//     where: {
//       cartId: cart.id,
//     },
//     include: {
//       product: true, // Include the related product
//     },
//   });

//   let numItemsInCart = 0;
//   let cartTotal = 0;

//   for (const item of cartItems) {
//     numItemsInCart += item.amount;
//     cartTotal += item.amount * item.product.price;
//   }
//   const tax = cart.taxRate * cartTotal;
//   const shipping = cartTotal ? cart.shipping : 0;
//   const orderTotal = cartTotal + tax + shipping;

//   await db.cart.update({
//     where: {
//       id: cart.id,
//     },
//     data: {
//       numItemsInCart,
//       cartTotal,
//       tax,
//       orderTotal,
//     },
//   });
// };

// //this action is use to add the product in cart
// export async function addToCartActions(prevState: any, formData: FormData) {
//   const user = await authUser();
//   if (!user.id) redirect("/");
//   try {
//     const productId = formData.get("pId") as string;
//     const amount = Number(formData.get("amount"));
//     await fetchProduct(productId);
//     const cart = await fetchOrCreateCart(user.id);
//     await updateOrCreateCartItems({ productId, amount, cartId: cart.id });
//     await updateCart(cart);
//     return { message: "item added in cart" };
//   } catch (error) {
//     return error instanceof Error
//       ? { message: error.message }
//       : { message: "there is Error" };
//   }
// }

//1 this going to cheak how many items in my cart
export async function fetchCartItems() {
  const user = auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: user?.userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
}

//1 helper function to create and update cart
export async function createOrUpdateCart(user: string) {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: user,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: user,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
}
//2 helper function to create and update cartItems
async function createOrUpdateCartItems(
  amount: number,
  productId: string,
  cart: string
) {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId: productId,
      cartId: cart,
    },
  });
  if (!cartItem) {
    cartItem = await db.cartItem.create({
      data: {
        amount: amount,
        productId: productId,
        cartId: cart,
      },
    });
  } else {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  }
}

//3 now update cart value
export async function updateCart(cart: Cart) {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  numItemsInCart = cartItems.reduce((sum, item) => sum + item.amount, 0);
  cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0
  );

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
  });

  return cartItems;
}

//main action which is going to add in cart
export async function addToCartActions(prevState: any, formdata: FormData) {
  const user = auth();
  if (!user.userId) return redirect("/");
  try {
    const productId = formdata.get("pId") as string;
    const amount = Number(formdata.get("amount"));
    const cart = await createOrUpdateCart(user.userId);
    await createOrUpdateCartItems(amount, productId, cart.id);
    await updateCart(cart);
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there is Error" };
  }
  redirect("/cart");
}

export async function CreateOrderAction() {
  const user = await authUser();
  try {
    const cart = await createOrUpdateCart(user.id);
    await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    await db.cart.delete({
      where: {
        id: cart.id,
      },
    });
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there is an error" };
  }
  redirect("/orders");
}

export async function DeleteCartItem(prevState: unknown, formData: FormData) {
  const user = await authUser();
  try {
    const pId = formData.get("pId") as string;
    const cart = await createOrUpdateCart(user.id);
    await db.cartItem.delete({
      where: {
        id: pId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "deleted cart item" };
  } catch (error) {
    return error instanceof Error
      ? { message: error.message }
      : { message: "there is an error" };
  }
}

export async function editCartItem({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) {
  const user = await authUser();
  try {
    const cart = await createOrUpdateCart(user.id);
    const updateCartItem = await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return updateCartItem;
  } catch (error) {
    return error instanceof Error ? error : new Error("there is error");
  }
}

//orders page query

export async function fetchUserOrders() {
  const user = await authUser();
  const orders = db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}

export async function fetchAdminOrders() {
  const orders = db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}
