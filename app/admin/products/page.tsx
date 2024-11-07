import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteProduct, fetchAdminProducts } from "@/utils/actions";

import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminProducts() {
  const products = await fetchAdminProducts();
  return (
    <Table>
      <TableCaption className="capitalize">
        total product : {products.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">product name</TableHead>
          <TableHead className="capitalize">company</TableHead>
          <TableHead className="capitalize">price</TableHead>
          <TableHead className="capitalize">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          return (
            <TableRow key={product.id}>
              <TableCell className="text-muted-foreground underline tracking-wide capitalize">
                {product.name}
              </TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{`$${product.price}`}</TableCell>
              <TableCell className="flex  items-center">
                <Button asChild size={"icon"} variant={"ghost"}>
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                </Button>

                <DeleteProducts productId={product.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function DeleteProducts({ productId }: { productId: string }) {
  return (
    <FormContainer action={DeleteProduct}>
      <input type="hidden" name="id" value={productId} />
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
