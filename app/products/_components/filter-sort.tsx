"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSortProps {
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function FilterSort({
  onFilterChange,
  onSortChange,
}: FilterSortProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        type="text"
        placeholder="Search by name..."
        className="border p-2 rounded flex-1"
        onChange={(e) => onFilterChange(e.target.value)}
      />

      <Select onValueChange={(value) => onSortChange(value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
