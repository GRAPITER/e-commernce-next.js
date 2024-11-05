import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserOrders } from "@/utils/actions";

export default async function page() {
  const orders = await fetchUserOrders();
  return (
    <div>
      <SectionTitle text="yours orders" />
      <Table className="mt-8">
        <TableCaption>Total Orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableHead>Products</TableHead>
          <TableHead>OrderTotal</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Shipping</TableHead>
          <TableHead>Date</TableHead>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { id, products, orderTotal, tax, shipping, createdAt } =
              order;

            return (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>${orderTotal}</TableCell>
                <TableCell>${tax}</TableCell>
                <TableCell>${shipping}</TableCell>
                <TableCell>
                  {new Date(createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
