import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
} & Partial<ComponentProps<typeof Link>>;

export default function LinkButton({
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className="bg-gradient-to-l from-blue-500 to-green-600 text-white p-2 rounded-md"
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
