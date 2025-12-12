"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cart-context";
import Image from "next/image";

export default function Cart() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="flex items-center gap-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    height={48}
                    width={48}
                    className="object-contain"
                  />
                  <span>{item.title}</span>
                </TableCell>

                <TableCell className="text-center">{item.quantity}</TableCell>

                <TableCell className="text-blue-600 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total
              </TableCell>
              <TableCell className="text-blue-600 font-bold">
                ${totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
