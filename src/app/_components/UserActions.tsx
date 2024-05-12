"use client";
import Link from "next/link";
import { UserAction } from "./UserAction";

export function UserActions() {
  return (
    <section className="flex gap-4">
      <UserAction>
        <Link href="/delivery">Przyjmij dostawę</Link>
      </UserAction>
      <UserAction>Dostarcz na produkcję</UserAction>
      <UserAction>
        <Link href="/overview">Zobacz stan Magazynu</Link>
      </UserAction>
    </section>
  );
}
