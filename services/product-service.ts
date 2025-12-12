import { Product, ProductsResponse } from "@/types/product";

const API_BASE = "https://dummyjson.com";

export async function getProducts(
  limit: number = 6,
  skip: number = 0
): Promise<ProductsResponse> {
  try {
    const res = await fetch(
      `${API_BASE}/products?limit=${limit}&skip=${skip}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string | number): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}
