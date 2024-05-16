import { UserActions } from "./_components/UserActions";

export default function Home() {
  return (
    <main className="overflow-hidden flex justify-center items-center bg-gradient-to-tl from-lime-400 to-blue-600 min-h-[calc(100vh-49px)]">
      <UserActions />
    </main>
  );
}
