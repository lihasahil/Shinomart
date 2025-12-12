
import { getProductById } from "@/services/product-service";
import ProductDetailClient from "./_components/product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  return <ProductDetailClient product={product} />;
}