import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

type Action = {
  label: ReactNode;
  href: string;
};

const USER_ACTIONS: Action[] = [
  { label: "Check storage state!", href: "/storage" },
  { label: "Items overview!", href: "/overview" },
];

export function UserActions() {
  return (
    <section className="flex gap-4">
      {USER_ACTIONS.map(({ label, href }) => (
        <Link key={href} href={href}>
          <UserAction>{label}</UserAction>
        </Link>
      ))}
    </section>
  );
}

export function UserAction({ children }: PropsWithChildren) {
  return (
    <button className="text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer rounded-lg text-2xl">
      {children}
    </button>
  );
}
