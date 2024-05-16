"use client";
import Link from "next/link";
import { UserAction } from "./UserAction";

export function UserActions() {
  return (
    <section className="flex gap-4">
      <Link href="/delivery">
        <UserAction>Handle deliveries</UserAction>
      </Link>
      <Link href="/storage">
        <UserAction>Check storage state</UserAction>
      </Link>
      <Link href="/overview">
        <UserAction>Items overview</UserAction>
      </Link>
    </section>
  );
}
