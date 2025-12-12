import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProductsLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="sm:mx-15 lg:mx-30 pt-15">{children}</main>
    </div>
  );
}
