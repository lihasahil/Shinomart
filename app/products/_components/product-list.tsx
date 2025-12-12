"use client";

import { useState, useMemo } from "react";
import ProductCard from "./product-card";
import FilterSort from "./filter-sort";
import { Product } from "@/types/product";
import { ProductSkeleton } from "./product-card-skeleton";
import { getProducts } from "@/services/product-service";

export default function ProductListClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const maxLimit = 30;

  const loadMore = async () => {
    setLoading(true);
    try {
      const newLimit = Math.min(limit + 6, maxLimit);
      const data = await getProducts(newLimit, 0);
      setProducts(data.products);
      setLimit(newLimit);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadLess = async () => {
    setLoading(true);
    try {
      const newLimit = Math.max(limit - 6, 6);
      const data = await getProducts(newLimit, 0);
      setProducts(data.products);
      setLimit(newLimit);
    } catch (error) {
      console.error("Error loading less products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <FilterSort onFilterChange={setSearchQuery} onSortChange={setSortBy} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {limit > 6 && (
          <button
            onClick={loadLess}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 cursor-pointer text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            Show Less
          </button>
        )}
        {limit < maxLimit && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Load More
          </button>
        )}
        {limit === maxLimit && (
          <p className="text-gray-500">All products loaded</p>
        )}
      </div>
    </div>
  );
}
