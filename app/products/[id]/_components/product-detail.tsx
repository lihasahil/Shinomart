"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types/product";
import { Minus, Plus, ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addToCart, removeFromCart, getQuantity } = useCart();
  const quantity = getQuantity(product.id);

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="p-4 md:p-10">
      <Link href="/products" className="flex gap-4">
          <ArrowLeft size={20} />
          Back to Products
      </Link>

      <Card className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-8 bg-background rounded-md p-6">
        {/* Product Images */}
        <CardHeader className="flex flex-col gap-4">
          <div className="flex items-center justify-center bg-background rounded-lg p-8 min-h-96">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                height={400}
                width={400}
                className="object-contain max-w-full max-h-96"
              />
            ) : (
              <div className="text-gray-500 text-center">
                Image not available
              </div>
            )}
          </div>
        </CardHeader>

        {/* Product Info */}
        <CardContent className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 text-lg mb-4 capitalize">
              Category: {product.category}
            </p>

            {product.brand && (
              <p className="text-muted-foreground mb-4">
                Brand: <span className="font-semibold">{product.brand}</span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold">{product.rating}</span>
              <span className="text-gray-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <p className="text-4xl font-bold text-blue-600">
                  ${discountedPrice}
                </p>
                {product.discountPercentage > 0 && (
                  <>
                    <p className="text-2xl text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <Badge variant="default">
                      -{product.discountPercentage}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Description</p>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              {product.stock !== undefined && (
                <div>
                  <p className="text-gray-600 mb-1">Stock</p>
                  <p className="font-semibold">
                    {product.stock > 0 ? (
                      <span className="text-green-600">
                        In Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                </div>
              )}
              {product.availabilityStatus && (
                <div>
                  <p className="text-gray-600 mb-1">Availability</p>
                  <p className="font-semibold capitalize">
                    {product.availabilityStatus}
                  </p>
                </div>
              )}
              {product.shippingInformation && (
                <div>
                  <p className="text-gray-600 mb-1">Shipping</p>
                  <p className="font-semibold">{product.shippingInformation}</p>
                </div>
              )}
              {product.returnPolicy && (
                <div>
                  <p className="text-gray-600 mb-1">Returns</p>
                  <p className="font-semibold">{product.returnPolicy}</p>
                </div>
              )}
            </div>

            {product.warrantyInformation && (
              <div className="mb-6 p-3 bg-blue-50 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Warranty:</strong> {product.warrantyInformation}
                </p>
              </div>
            )}
          </div>

          {/* Cart Actions */}
          <div className="flex flex-col gap-4">
            {quantity === 0 ? (
              <Button
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-lg rounded"
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded">
                  <Button
                    onClick={() => removeFromCart(product.id)}
                    className="px-4 py-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded"
                  >
                    <Minus />
                  </Button>
                  <span className="text-2xl font-semibold text-black">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Card className="mt-8 bg-background rounded-md p-4">
          <CardHeader className="text-2xl font-bold">
            <CardTitle> Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{review.reviewerName}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
