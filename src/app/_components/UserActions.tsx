import Link from "next/link";
import { UserAction } from "./UserAction";
import type { ReactNode } from "react";

type Action = {
  label: ReactNode;
  href: string;
};

const USER_ACTIONS: Action[] = [
  { label: "Handle deliveries!", href: "/delivery" },
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
