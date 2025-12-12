import { getProducts } from "@/services/product-service";
import ProductListClient from "./_components/product-list";

export default async function ProductsPage() {
  const data = await getProducts(6);

  return <ProductListClient initialProducts={data.products} />;
}
