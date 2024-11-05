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
import { fetchAdminOrders } from "@/utils/actions";

export default async function ProductsSales() {
  const orders = await fetchAdminOrders();
  return (
    <section>
      <div>
        <Table>
          <TableCaption>Total orders : {orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const {
                id,
                products,
                orderTotal,
                tax,
                shipping,
                createdAt,
                email,
              } = order;

              return (
                <TableRow key={id}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{products}</TableCell>
                  <TableCell>{orderTotal}</TableCell>
                  <TableCell>{tax}</TableCell>
                  <TableCell>{shipping}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
