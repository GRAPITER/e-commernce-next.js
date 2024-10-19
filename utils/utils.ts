type link = {
  href: string;
  name: string;
};

export const Links: link[] = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/products", name: "Products" },
  { href: "/favorites", name: "Favorits" },
  { href: "/cart", name: "Cart" },
  { href: "/orders", name: "Orders" },
  { href: "/admin/products", name: "dashboard" },
];

export const AdminLink: link[] = [
  { href: "/admin/sales", name: "sales" },
  { href: "/admin/products", name: "my products" },
  { href: "/admin/products/create", name: "create products" },
];
