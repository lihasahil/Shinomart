"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex fixed w-full justify-between z-50 items-center bg-transparent backdrop-blur-md p-4">
      <Link href={"/"}>
        <h1 className="font-extrabold text-xl cursor-pointer">ShinoMart</h1>
      </Link>

      <div className="flex items-center justify-between gap-4">
        <Link
          href={"/products"}
          className={`${
            isActive("/products")
              ? "font-semibold underline underline-offset-4"
              : "text-gray-600 dark:text-gray-400"
          } hover:text-black dark:hover:text-white`}
        >
          Products
        </Link>
        <Link
          href={"/cart"}
          className={`${
            isActive("/cart")
              ? "font-semibold underline underline-offset-4"
              : "text-gray-600 dark:text-gray-400"
          } hover:text-black dark:hover:text-white`}
        >
          Cart {totalItems > 0 && `(${totalItems})`}
        </Link>

        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="p-2 rounded-full cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
