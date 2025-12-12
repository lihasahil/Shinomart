"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, getQuantity } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <Card className="border rounded-lg shadow-md flex flex-col p-2 bg-background">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              height={120}
              width={120}
              className="object-contain rounded"
            />
          )}
        </div>
      </Link>

      <CardHeader className="text-center">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
            {product.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="flex items-center justify-between text-center">
        <p className="text-gray-600 capitalize text-sm">{product.category}</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-blue-600 font-semibold">${product.price}</p>
          {product.discountPercentage > 0 && (
            <p className="text-red-500 text-sm font-semibold">
              -{product.discountPercentage}%
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-yellow-500">
            <Star />
          </span>
          <span className="font-semibold text-sm">{product.rating}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-center gap-2 flex-wrap">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button className="w-full px-4 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 text-sm">
            View Product
          </Button>
        </Link>
        {quantity === 0 ? (
          <Button
            onClick={() => {
              addToCart(product);
              toast.success("Item added to cart successfully!");
            }}
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 text-sm"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    removeFromCart(product.id);
                    toast.success("Decreased item from cart!");
                  }}
                  className="px-2 py-1 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600"
                >
                  <Minus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Decrease</TooltipContent>
            </Tooltip>

            <span className="px-2 text-sm font-semibold">{quantity}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added item to cart!");
                  }}
                  className="px-2 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
                >
                  <Plus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Increase</TooltipContent>
            </Tooltip>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
